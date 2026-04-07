import { useEntitlement, Feature } from "@/hooks/useEntitlement";
import { Button } from "@/components/ui/button";
import { Crown, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

interface UpgradeGateProps {
  feature: Feature;
  children: ReactNode;
  fallback?: ReactNode;
}

export function UpgradeGate({ feature, children, fallback }: UpgradeGateProps) {
  const { hasAccess, getRequiredTier, tierLabel, loading } = useEntitlement();
  const navigate = useNavigate();

  if (loading) return null;

  if (hasAccess(feature)) {
    return <>{children}</>;
  }

  if (fallback) return <>{fallback}</>;

  const required = getRequiredTier(feature);

  return (
    <div className="glass-card p-8 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
        <Lock className="h-8 w-8 text-primary" />
      </div>
      <h3 className="font-display font-bold text-xl">
        Recurso exclusivo do plano {tierLabel(required)}
      </h3>
      <p className="text-sm text-muted-foreground font-sans max-w-md mx-auto">
        Faça upgrade para desbloquear este recurso e aproveitar todo o potencial do Nexus.
      </p>
      <Button variant="hero" onClick={() => navigate("/billing")} className="gap-2">
        <Crown className="h-4 w-4" /> Fazer Upgrade
      </Button>
    </div>
  );
}
