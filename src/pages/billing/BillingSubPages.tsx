import { SubPageShell } from "@/components/SubPageShell";
import { CreditCard, Receipt, Crown, Shield, Check, Loader2, ExternalLink } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { useSubscription, STRIPE_PLANS } from "@/hooks/useSubscription";
import { toast } from "sonner";

const plans = [
  { key: "free" as const, name: "Free", price: "R$ 0", features: ["Dashboard básico", "IA limitada (5/dia)", "Scanner limitado", "Biblioteca restrita"] },
  { key: "pro_monthly" as const, name: "Pro", price: "R$ 19,90/mês", annual: "pro_yearly" as const, annualPrice: "R$ 199,90/ano", features: ["Dashboard completo", "IA estendida", "Prescrição avançada", "Performance tools", "Histórico expandido"] },
  { key: "premium_monthly" as const, name: "Premium", price: "R$ 59,90/mês", annual: "premium_yearly" as const, annualPrice: "R$ 599,90/ano", features: ["Acesso completo", "Research Atlas", "Article Analyzer", "Biblioteca completa", "Mentoria Premium", "Ferramentas editoriais"] },
];

export function BillingSubscriptionPage() {
  const { tier, subscribed, subscriptionEnd, loading, startCheckout, openPortal } = useSubscription();

  const handleCheckout = async (planKey: string) => {
    try {
      const plan = STRIPE_PLANS[planKey as keyof typeof STRIPE_PLANS];
      if (!plan) return;
      await startCheckout(plan.priceId);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Erro ao iniciar checkout");
    }
  };

  const handlePortal = async () => {
    try {
      await openPortal();
    } catch {
      toast.error("Erro ao abrir portal de gerenciamento");
    }
  };

  return (
    <SubPageShell icon={Crown} title="Assinatura" breadcrumbs={[{ label: "Billing", href: "/billing" }, { label: "Assinatura" }]}>
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <>
          {/* Current plan */}
          <div className="glass-card p-6 mb-6">
            <h3 className="font-display font-semibold text-lg mb-2">
              Plano Atual: <span className="text-primary capitalize">{tier}</span>
              {tier === "admin" && <span className="text-xs ml-2 bg-primary/20 text-primary px-2 py-0.5 rounded-full">Vitalício</span>}
            </h3>
            {subscriptionEnd && (
              <p className="text-sm text-muted-foreground font-sans">
                Válido até: {new Date(subscriptionEnd).toLocaleDateString("pt-BR")}
              </p>
            )}
            {subscribed && tier !== "admin" && (
              <Button variant="outline" size="sm" className="mt-3 gap-2" onClick={handlePortal}>
                <ExternalLink className="h-3 w-3" /> Gerenciar Assinatura
              </Button>
            )}
          </div>

          {/* Plan cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan) => {
              const isCurrent = (tier === "free" && plan.key === "free") ||
                (tier === "pro" && plan.key === "pro_monthly") ||
                (tier === "premium" && plan.key === "premium_monthly") ||
                (tier as string) === "admin";
              return (
                <div key={plan.key} className={`glass-card p-6 ${isCurrent ? "border-primary/50 gold-glow" : ""}`}>
                  {isCurrent && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-sans mb-3 inline-block">
                      {tier === "admin" ? "Admin" : "Seu Plano"}
                    </span>
                  )}
                  <h3 className="font-display font-bold text-xl mb-1">{plan.name}</h3>
                  <p className="text-2xl font-display font-bold text-primary mb-4">{plan.price}</p>
                  {plan.annualPrice && (
                    <p className="text-xs text-muted-foreground font-sans mb-3">ou {plan.annualPrice}</p>
                  )}
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm font-sans text-muted-foreground">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  {plan.key !== "free" && !isCurrent && tier !== "admin" && (
                    <div className="space-y-2">
                      <Button variant="hero" className="w-full" onClick={() => handleCheckout(plan.key)}>
                        Assinar Mensal
                      </Button>
                      {plan.annual && (
                        <Button variant="hero-outline" className="w-full" onClick={() => handleCheckout(plan.annual!)}>
                          Assinar Anual (economia)
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </SubPageShell>
  );
}

export function BillingHistoryPage() {
  return (
    <SubPageShell icon={Receipt} title="Histórico de Pagamentos" breadcrumbs={[{ label: "Billing", href: "/billing" }, { label: "Histórico" }]}>
      <EmptyState icon={Receipt} title="Nenhum pagamento" description="Seu histórico de pagamentos aparecerá aqui após sua primeira assinatura." />
    </SubPageShell>
  );
}

export function BillingEntitlementsPage() {
  const { tier, loading } = useSubscription();

  const featuresByTier: Record<string, string[]> = {
    free: ["Dashboard básico", "AI Mentor (5 msgs/dia)", "Scanner Atlas (3/dia)", "Biblioteca limitada"],
    pro: ["Dashboard completo", "AI estendida (50 msgs/dia)", "Scanner ilimitado", "Prescrição avançada", "Performance expandida", "Histórico completo"],
    premium: ["Acesso completo", "AI ilimitada", "Research Atlas", "Article Analyzer", "Biblioteca completa", "Mentoria Premium", "Ferramentas editoriais"],
    admin: ["Acesso total (Premium vitalício)", "Gestão de usuários", "Aprovação de produtos", "Métricas administrativas", "Override de acesso"],
  };

  return (
    <SubPageShell icon={Shield} title="Permissões" breadcrumbs={[{ label: "Billing", href: "/billing" }, { label: "Permissões" }]}>
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg mb-4">
            Funcionalidades do plano <span className="text-primary capitalize">{tier}</span>
          </h3>
          <div className="space-y-2 text-sm font-sans">
            {(featuresByTier[tier] || featuresByTier.free).map((f) => (
              <div key={f} className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4 text-primary flex-shrink-0" /> {f}
              </div>
            ))}
          </div>
        </div>
      )}
    </SubPageShell>
  );
}
