import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Tables } from "@/integrations/supabase/types";

export type Plan = Tables<"plans">;
export type Subscription = Tables<"subscriptions">;

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data, error } = await supabase.from("plans").select("*").eq("active", true).order("price");
      if (error) throw error;
      return data;
    },
  });
}

export function useMySubscription() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["subscriptions", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*, plans(*)")
        .eq("user_id", user!.id)
        .eq("status", "active")
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export type UserPlanLevel = "free" | "pro" | "premium" | "admin";

export function useUserPlan(): { plan: UserPlanLevel; loading: boolean } {
  const { user } = useAuth();
  const { data: subscription, isLoading: subLoading } = useMySubscription();
  const { data: roles, isLoading: roleLoading } = useQuery({
    queryKey: ["user_roles", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", user!.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const loading = subLoading || roleLoading;

  if (loading) return { plan: "free", loading: true };

  const isAdmin = roles?.some((r) => r.role === "admin");
  if (isAdmin) return { plan: "admin", loading: false };

  if (!subscription) return { plan: "free", loading: false };

  const planCode = (subscription as Record<string, unknown>).plans as Record<string, unknown> | null;
  const code = (planCode?.code as string) || "";
  if (code.startsWith("premium")) return { plan: "premium", loading: false };
  if (code.startsWith("pro")) return { plan: "pro", loading: false };

  return { plan: "free", loading: false };
}
