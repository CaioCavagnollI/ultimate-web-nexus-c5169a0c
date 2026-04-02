import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

// Stripe product/price mapping
export const STRIPE_PLANS = {
  pro_monthly: {
    priceId: "price_1THfLOLBiU3vW738tErBSAHd",
    productId: "prod_UGBiFzKaFhnz9s",
    name: "Pro",
    price: "R$ 19,90/mês",
    amount: 19.90,
    interval: "month" as const,
  },
  pro_yearly: {
    priceId: "price_1THfMqLBiU3vW738Yzfk64EP",
    productId: "prod_UGBk6c7Foj9GrL",
    name: "Pro Anual",
    price: "R$ 199,90/ano",
    amount: 199.90,
    interval: "year" as const,
  },
  premium_monthly: {
    priceId: "price_1THfNqLBiU3vW738HjLM7LXv",
    productId: "prod_UGBlhYtZUP8m4X",
    name: "Premium",
    price: "R$ 59,90/mês",
    amount: 59.90,
    interval: "month" as const,
  },
  premium_yearly: {
    priceId: "price_1THfQ6LBiU3vW738CHYXF1Rv",
    productId: "prod_UGBnHc8iYs1W1d",
    name: "Premium Anual",
    price: "R$ 599,90/ano",
    amount: 599.90,
    interval: "year" as const,
  },
} as const;

export type PlanTier = "free" | "pro" | "premium" | "admin";

function getProductTier(productId: string | null): PlanTier {
  if (!productId) return "free";
  if (productId === STRIPE_PLANS.pro_monthly.productId || productId === STRIPE_PLANS.pro_yearly.productId) return "pro";
  if (productId === STRIPE_PLANS.premium_monthly.productId || productId === STRIPE_PLANS.premium_yearly.productId) return "premium";
  return "free";
}

interface SubscriptionState {
  subscribed: boolean;
  tier: PlanTier;
  productId: string | null;
  subscriptionEnd: string | null;
  loading: boolean;
}

export function useSubscription() {
  const { user } = useAuth();
  const [state, setState] = useState<SubscriptionState>({
    subscribed: false,
    tier: "free",
    productId: null,
    subscriptionEnd: null,
    loading: true,
  });

  const checkSubscription = useCallback(async () => {
    if (!user) {
      setState({ subscribed: false, tier: "free", productId: null, subscriptionEnd: null, loading: false });
      return;
    }

    try {
      // Check admin role first
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      if (roles?.some((r) => r.role === "admin")) {
        setState({ subscribed: true, tier: "admin", productId: null, subscriptionEnd: null, loading: false });
        return;
      }

      const { data, error } = await supabase.functions.invoke("check-subscription");
      if (error) throw error;

      const tier = getProductTier(data?.product_id);
      setState({
        subscribed: data?.subscribed || false,
        tier,
        productId: data?.product_id || null,
        subscriptionEnd: data?.subscription_end || null,
        loading: false,
      });
    } catch (err) {
      console.error("check-subscription error:", err);
      setState((s) => ({ ...s, loading: false }));
    }
  }, [user]);

  useEffect(() => {
    checkSubscription();
    // Auto-refresh every 60s
    const interval = setInterval(checkSubscription, 60_000);
    return () => clearInterval(interval);
  }, [checkSubscription]);

  const startCheckout = async (priceId: string) => {
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: { priceId },
    });
    if (error) throw error;
    if (data?.url) window.open(data.url, "_blank");
  };

  const openPortal = async () => {
    const { data, error } = await supabase.functions.invoke("customer-portal");
    if (error) throw error;
    if (data?.url) window.open(data.url, "_blank");
  };

  return { ...state, checkSubscription, startCheckout, openPortal };
}
