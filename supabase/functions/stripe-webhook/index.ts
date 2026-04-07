import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2025-08-27.basil",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  { auth: { persistSession: false } }
);

const log = (step: string, details?: unknown) =>
  console.log(`[STRIPE-WEBHOOK] ${step}${details ? ` - ${JSON.stringify(details)}` : ""}`);

// Map Stripe product IDs to plan tier
const PRODUCT_TIER: Record<string, string> = {
  prod_UGBiFzKaFhnz9s: "pro",
  prod_UGBk6c7Foj9GrL: "pro",
  prod_UGBlhYtZUP8m4X: "premium",
  prod_UGBnHc8iYs1W1d: "premium",
};

async function getUserByEmail(email: string) {
  const { data } = await supabase.auth.admin.listUsers();
  return data?.users?.find((u) => u.email === email) ?? null;
}

async function upsertSubscription(
  userId: string,
  sub: Stripe.Subscription,
  customerId: string
) {
  const item = sub.items.data[0];
  const productId = item.price.product as string;
  const tier = PRODUCT_TIER[productId] || "free";

  // Upsert subscription record
  await supabase.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_subscription_id: sub.id,
      stripe_customer_id: customerId,
      status: sub.status,
      current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
      current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
      cancel_at_period_end: sub.cancel_at_period_end,
      amount: item.price.unit_amount ? item.price.unit_amount / 100 : 0,
      interval: item.price.recurring?.interval || "month",
    },
    { onConflict: "stripe_subscription_id" }
  );

  // Update profile plan
  await supabase
    .from("profiles")
    .update({ plan: sub.status === "active" ? tier : "free" })
    .eq("user_id", userId);

  log("Subscription upserted", { userId, tier, status: sub.status });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    // If we have a webhook secret, verify the signature
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    let event: Stripe.Event;

    if (webhookSecret && signature) {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    } else {
      // For development/testing without webhook secret
      event = JSON.parse(body) as Stripe.Event;
    }

    log("Event received", { type: event.type, id: event.id });

    // Log billing event
    await supabase.from("billing_events").insert({
      stripe_event_id: event.id,
      event_type: event.type,
      payload: event.data.object as Record<string, unknown>,
      processed: true,
    });

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== "subscription" || !session.subscription) break;

        const sub = await stripe.subscriptions.retrieve(session.subscription as string);
        const customer = await stripe.customers.retrieve(session.customer as string);
        if (customer.deleted) break;

        const user = await getUserByEmail(customer.email!);
        if (!user) {
          log("No user found for customer", { email: customer.email });
          break;
        }

        await upsertSubscription(user.id, sub, customer.id);
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(sub.customer as string);
        if (customer.deleted) break;

        const user = await getUserByEmail(customer.email!);
        if (!user) break;

        if (event.type === "customer.subscription.deleted") {
          // Mark subscription as canceled and reset plan
          await supabase
            .from("subscriptions")
            .update({ status: "canceled" })
            .eq("stripe_subscription_id", sub.id);
          await supabase
            .from("profiles")
            .update({ plan: "free" })
            .eq("user_id", user.id);
          log("Subscription canceled", { userId: user.id });
        } else {
          await upsertSubscription(user.id, sub, customer.id);
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        if (!invoice.subscription) break;

        const customer = await stripe.customers.retrieve(invoice.customer as string);
        if (customer.deleted) break;

        const user = await getUserByEmail(customer.email!);
        if (!user) break;

        await supabase.from("payments").insert({
          user_id: user.id,
          amount: (invoice.amount_paid || 0) / 100,
          currency: invoice.currency,
          status: "succeeded",
          stripe_invoice_id: invoice.id,
          stripe_payment_intent_id: invoice.payment_intent as string,
          subscription_id: null,
        });

        log("Payment recorded", { userId: user.id, amount: invoice.amount_paid });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customer = await stripe.customers.retrieve(invoice.customer as string);
        if (customer.deleted) break;

        const user = await getUserByEmail(customer.email!);
        if (!user) break;

        await supabase.from("payments").insert({
          user_id: user.id,
          amount: (invoice.amount_due || 0) / 100,
          currency: invoice.currency,
          status: "failed",
          stripe_invoice_id: invoice.id,
        });

        log("Payment failed", { userId: user.id });
        break;
      }

      default:
        log("Unhandled event type", { type: event.type });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    log("ERROR", { message: error instanceof Error ? error.message : String(error) });
    return new Response(JSON.stringify({ error: "Webhook processing failed" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
