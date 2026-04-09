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

// Product → tier mapping
const PRODUCT_TIER: Record<string, string> = {
  prod_UGBiFzKaFhnz9s: "pro",
  prod_UGBk6c7Foj9GrL: "pro",
  prod_UGBlhYtZUP8m4X: "premium",
  prod_UGBnHc8iYs1W1d: "premium",
};

// Tier → entitlement codes
const TIER_ENTITLEMENTS: Record<string, string[]> = {
  pro: ["atlas-chat", "atlas-mentor", "atlas-explain", "atlas-prescription", "scanner", "prescription-generate", "store_submit"],
  premium: ["atlas-chat", "atlas-mentor", "atlas-explain", "atlas-prescription", "atlas-research", "atlas-analyzer", "atlas-editorial", "scanner", "prescription-generate", "store_submit", "library_full", "mentoria_premium"],
};

// ── Idempotency Check ──────────────────────────────────────────
async function checkAndRecordEvent(eventId: string, eventType: string, payload: unknown): Promise<boolean> {
  const { data: existing } = await supabase
    .from("billing_webhook_receipts")
    .select("id, status")
    .eq("provider_event_id", eventId)
    .single();

  if (existing) {
    log("Duplicate event skipped", { eventId, status: existing.status });
    return false; // already processed
  }

  await supabase.from("billing_webhook_receipts").insert({
    provider: "stripe",
    provider_event_id: eventId,
    event_type: eventType,
    status: "processing",
    payload: payload as Record<string, unknown>,
  });

  return true; // new event, proceed
}

async function markEventProcessed(eventId: string) {
  await supabase
    .from("billing_webhook_receipts")
    .update({ status: "processed", processed_at: new Date().toISOString() })
    .eq("provider_event_id", eventId);
}

async function markEventFailed(eventId: string, error: string) {
  await supabase
    .from("billing_webhook_receipts")
    .update({ status: `failed: ${error.slice(0, 200)}`, processed_at: new Date().toISOString() })
    .eq("provider_event_id", eventId);
}

// ── User Lookup ────────────────────────────────────────────────
async function getUserByEmail(email: string) {
  const { data } = await supabase.auth.admin.listUsers();
  return data?.users?.find((u) => u.email === email) ?? null;
}

// ── Entitlement Management ─────────────────────────────────────
async function grantEntitlements(userId: string, tier: string, subscriptionId: string, periodEnd: Date) {
  const codes = TIER_ENTITLEMENTS[tier] || [];
  if (codes.length === 0) return;

  // Deactivate old grants from this subscription
  await supabase
    .from("entitlement_grants")
    .update({ active: false })
    .eq("user_id", userId)
    .eq("source_type", "subscription")
    .eq("source_id", subscriptionId);

  // Insert new grants
  const grants = codes.map((code) => ({
    user_id: userId,
    code,
    source_type: "subscription",
    source_id: subscriptionId,
    starts_at: new Date().toISOString(),
    ends_at: periodEnd.toISOString(),
    active: true,
  }));

  await supabase.from("entitlement_grants").insert(grants);

  // Also upsert into entitlements table for quick lookup
  for (const code of codes) {
    const { data: existing } = await supabase
      .from("entitlements")
      .select("id")
      .eq("user_id", userId)
      .eq("code", code)
      .single();

    if (!existing) {
      await supabase.from("entitlements").insert({
        user_id: userId,
        code,
        source_type: "plan",
        source_ref: tier,
      });
    }
  }

  log("Entitlements granted", { userId, tier, codes: codes.length });
}

async function revokeEntitlements(userId: string, subscriptionId: string) {
  await supabase
    .from("entitlement_grants")
    .update({ active: false })
    .eq("user_id", userId)
    .eq("source_type", "subscription")
    .eq("source_id", subscriptionId);

  // Remove plan-based entitlements
  await supabase
    .from("entitlements")
    .delete()
    .eq("user_id", userId)
    .eq("source_type", "plan");

  log("Entitlements revoked", { userId, subscriptionId });
}

// ── Subscription Upsert ────────────────────────────────────────
async function upsertSubscription(userId: string, sub: Stripe.Subscription, customerId: string) {
  const item = sub.items.data[0];
  const productId = item.price.product as string;
  const tier = PRODUCT_TIER[productId] || "free";
  const periodEnd = new Date(sub.current_period_end * 1000);

  await supabase.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_subscription_id: sub.id,
      stripe_customer_id: customerId,
      status: sub.status,
      current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
      current_period_end: periodEnd.toISOString(),
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

  // Grant entitlements
  if (sub.status === "active") {
    await grantEntitlements(userId, tier, sub.id, periodEnd);
  }

  log("Subscription upserted", { userId, tier, status: sub.status });
}

// ── Main Handler ───────────────────────────────────────────────
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*" },
    });
  }

  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    let event: Stripe.Event;
    if (webhookSecret && signature) {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }

    log("Event received", { type: event.type, id: event.id });

    // Idempotency check
    const isNew = await checkAndRecordEvent(event.id, event.type, event.data.object);
    if (!isNew) {
      return new Response(JSON.stringify({ received: true, deduplicated: true }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Also log to billing_events for backward compatibility
    await supabase.from("billing_events").insert({
      stripe_event_id: event.id,
      event_type: event.type,
      payload: event.data.object as Record<string, unknown>,
      processed: true,
    });

    try {
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
            await supabase
              .from("subscriptions")
              .update({ status: "canceled" })
              .eq("stripe_subscription_id", sub.id);
            await supabase
              .from("profiles")
              .update({ plan: "free" })
              .eq("user_id", user.id);
            await revokeEntitlements(user.id, sub.id);
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

      await markEventProcessed(event.id);
    } catch (processingError) {
      const msg = processingError instanceof Error ? processingError.message : String(processingError);
      await markEventFailed(event.id, msg);
      throw processingError;
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
