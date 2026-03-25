import { PageShell } from "@/components/PageShell";
import { StatCard } from "@/components/StatCard";
import { CreditCard, Receipt, Crown, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "R$ 0",
    features: ["Dashboard básico", "AI Mentor (5 msgs/dia)", "Scanner Atlas (3/dia)", "Biblioteca limitada"],
    current: true,
  },
  {
    name: "Pro",
    price: "R$ 49,90/mês",
    features: ["Tudo do Free", "AI Mentor ilimitado", "Scanner Atlas ilimitado", "Prescrição IA", "Anamnese avançada", "Nexus Lab completo"],
    current: false,
    highlight: true,
  },
  {
    name: "Premium",
    price: "R$ 99,90/mês",
    features: ["Tudo do Pro", "Mentorias Pro", "Editorial Pro", "Coach Pro", "Suporte prioritário", "API access"],
    current: false,
  },
];

export default function BillingPage() {
  const navigate = useNavigate();
  return (
    <PageShell icon={CreditCard} title="Billing" description="Gerencie sua assinatura, plano e histórico de pagamentos">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value="Free" label="Plano atual" icon={Crown} />
        <StatCard value="R$ 0" label="Próxima cobrança" icon={CreditCard} />
        <StatCard value="0" label="Faturas pagas" icon={Receipt} />
        <StatCard value="—" label="Válido até" icon={CheckCircle} />
      </div>

      <div>
        <h2 className="font-display font-semibold text-lg mb-4">Planos disponíveis</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div key={plan.name} className={`glass-card p-6 ${plan.highlight ? "border-primary/40 ring-1 ring-primary/20" : ""}`}>
              <h3 className="font-display font-bold text-lg">{plan.name}</h3>
              <p className="text-2xl font-display font-bold text-primary mt-2">{plan.price}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm font-sans text-muted-foreground">
                    <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full mt-6"
                variant={plan.current ? "outline" : plan.highlight ? "hero" : "secondary"}
                disabled={plan.current}
              >
                {plan.current ? "Plano atual" : "Upgrade"}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg mb-3">Histórico de pagamentos</h3>
        <p className="text-sm text-muted-foreground font-sans">Nenhum pagamento registrado.</p>
      </div>
    </PageShell>
  );
}
