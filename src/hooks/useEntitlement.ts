import { useSubscription, PlanTier } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

// Feature access matrix by tier
const TIER_LEVEL: Record<PlanTier, number> = {
  free: 0,
  pro: 1,
  premium: 2,
  admin: 3,
};

export type Feature =
  | "atlas_chat"
  | "atlas_mentor"
  | "atlas_explain"
  | "atlas_research"
  | "atlas_prescription"
  | "atlas_analyzer"
  | "scanner_unlimited"
  | "prescription_advanced"
  | "performance_full"
  | "library_full"
  | "article_analyzer"
  | "mentoria_premium"
  | "editorial_tools"
  | "admin_panel"
  | "store_submit";

// Minimum tier required for each feature
const FEATURE_TIER: Record<Feature, PlanTier> = {
  atlas_chat: "free",
  atlas_mentor: "pro",
  atlas_explain: "pro",
  atlas_research: "premium",
  atlas_prescription: "pro",
  atlas_analyzer: "premium",
  scanner_unlimited: "pro",
  prescription_advanced: "pro",
  performance_full: "pro",
  library_full: "premium",
  article_analyzer: "premium",
  mentoria_premium: "premium",
  editorial_tools: "premium",
  admin_panel: "admin",
  store_submit: "pro",
};

// Feature → entitlement_grants code mapping
const FEATURE_GRANT_CODE: Record<Feature, string> = {
  atlas_chat: "atlas-chat",
  atlas_mentor: "atlas-mentor",
  atlas_explain: "atlas-explain",
  atlas_research: "atlas-research",
  atlas_prescription: "atlas-prescription",
  atlas_analyzer: "atlas-analyzer",
  scanner_unlimited: "scanner",
  prescription_advanced: "prescription-generate",
  performance_full: "performance_full",
  library_full: "library_full",
  article_analyzer: "atlas-analyzer",
  mentoria_premium: "mentoria_premium",
  editorial_tools: "atlas-editorial",
  admin_panel: "admin_panel",
  store_submit: "store_submit",
};

// Daily usage limits by tier
const USAGE_LIMITS: Record<PlanTier, { ai_messages: number; scans: number; prescriptions: number }> = {
  free: { ai_messages: 5, scans: 3, prescriptions: 3 },
  pro: { ai_messages: 50, scans: -1, prescriptions: -1 },
  premium: { ai_messages: -1, scans: -1, prescriptions: -1 },
  admin: { ai_messages: -1, scans: -1, prescriptions: -1 },
};

export function useEntitlement() {
  const { tier, loading, subscribed } = useSubscription();
  const { user } = useAuth();

  // Fetch active entitlement grants from DB
  const { data: grants } = useQuery({
    queryKey: ["entitlement_grants", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("entitlement_grants")
        .select("code, active, ends_at")
        .eq("user_id", user.id)
        .eq("active", true);
      return data || [];
    },
    enabled: !!user,
    staleTime: 60_000,
  });

  const hasGrant = (code: string): boolean => {
    if (!grants) return false;
    return grants.some((g) => {
      if (g.code !== code && g.code !== "all") return false;
      if (!g.ends_at) return true;
      return new Date(g.ends_at) > new Date();
    });
  };

  const hasAccess = (feature: Feature): boolean => {
    // Check tier-based access first
    const requiredTier = FEATURE_TIER[feature];
    if (TIER_LEVEL[tier] >= TIER_LEVEL[requiredTier]) return true;

    // Check entitlement grants (overrides tier for specific features)
    const grantCode = FEATURE_GRANT_CODE[feature];
    if (grantCode && hasGrant(grantCode)) return true;

    return false;
  };

  const getRequiredTier = (feature: Feature): PlanTier => {
    return FEATURE_TIER[feature];
  };

  const getLimits = () => USAGE_LIMITS[tier];

  const tierLabel = (t: PlanTier = tier): string => {
    const labels: Record<PlanTier, string> = {
      free: "Free",
      pro: "Pro",
      premium: "Premium",
      admin: "Admin",
    };
    return labels[t];
  };

  return {
    tier,
    loading,
    subscribed,
    hasAccess,
    getRequiredTier,
    getLimits,
    tierLabel,
    hasGrant,
  };
}
