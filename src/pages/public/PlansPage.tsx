import { CheckCircle, ArrowRight, Crown, Zap, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Free", icon: Zap, price: "R$ 0", period: "para sempre",
    features: ["Dashboard básico", "AI Mentor (5 msgs/dia)", "Scanner Atlas (3/dia)", "Feed científico limitado", "Biblioteca parcial"],
    cta: "Começar Grátis"
  },
  {
    name: "Pro", icon: Crown, price: "R$ 49,90", period: "/mês", highlight: true,
    features: ["Tudo do Free", "AI Mentor ilimitado", "Scanner Atlas ilimitado", "Prescrição IA completa", "Anamnese avançada", "Nexus Lab completo", "Logbook e Performance", "Suporte prioritário"],
    cta: "Assinar Pro"
  },
  {
    name: "Premium", icon: Crown, price: "R$ 99,90", period: "/mês",
    features: ["Tudo do Pro", "Mentorias Pro (4 áreas)", "Editorial Pro", "Coach Pro 1:1", "API access", "Exportação avançada", "Selo verificado", "Acesso antecipado"],
    cta: "Assinar Premium"
  },
  {
    name: "Enterprise", icon: Building2, price: "Sob consulta", period: "",
    features: ["Tudo do Premium", "Multi-tenant", "Analytics avançados", "SSO & SCIM", "SLA dedicado", "Onboarding personalizado", "Integrações customizadas", "Faturamento centralizado"],
    cta: "Falar com Vendas"
  },
];

export default function PlansPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-0">
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Planos & <span className="gold-text">Preços</span>
          </h1>
          <p className="text-xl text-muted-foreground font-sans max-w-3xl mx-auto">
            Escolha o plano ideal para sua jornada de treinamento científico.
          </p>
        </div>
      </section>

      <section className="py-10 px-6 pb-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className={`glass-card p-8 flex flex-col ${plan.highlight ? "border-primary/40 ring-1 ring-primary/20 relative" : ""}`}>
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-sans font-semibold bg-primary text-primary-foreground px-3 py-1 rounded-full">Mais popular</span>
              )}
              <plan.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-display font-bold text-xl">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mt-3 mb-1">
                <span className="text-3xl font-display font-bold gold-text">{plan.price}</span>
                {plan.period && <span className="text-sm text-muted-foreground font-sans">{plan.period}</span>}
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm font-sans text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.highlight ? "hero" : "hero-outline"} className="w-full mt-8" onClick={() => navigate("/auth")}>
                {plan.cta} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
