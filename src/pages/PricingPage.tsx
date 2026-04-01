import { PageShell } from "@/components/PageShell";
import { CreditCard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  { name: "Free", price: "R$ 0", period: "/mês", features: ["Feed Científico", "Atlas Scanner (3/dia)", "Chat IA (5 msgs/dia)", "1 programa de treino"], highlight: false },
  { name: "Pro", price: "R$ 19,90", period: "/mês", annual: "R$ 199,90/ano", features: ["Tudo do Free", "Chat IA ilimitado", "AI Mentor", "Nexus Lab completo", "Prescrição IA", "10 programas de treino", "Atlas Store: publicar produtos"], highlight: false },
  { name: "Premium", price: "R$ 59,90", period: "/mês", annual: "R$ 599,90/ano", features: ["Tudo do Pro", "Nexus Premium (Mentorias)", "Programas ilimitados", "Acadêmico completo", "Performance analytics", "Suporte prioritário"], highlight: true },
  { name: "Enterprise", price: "Sob consulta", period: "", features: ["Tudo do Premium", "API access", "Multi-user", "White-label", "SSO & SCIM", "SLA dedicado"], highlight: false },
];

export default function PricingPage() {
  return (
    <PageShell icon={CreditCard} title="Planos & Preços" description="Escolha o plano ideal para sua jornada científica">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((p) => (
          <div key={p.name} className={`glass-card p-6 flex flex-col ${p.highlight ? "border-primary/40 gold-glow" : ""}`}>
            <h3 className="font-display font-bold text-lg">{p.name}</h3>
            <div className="mt-2 mb-1"><span className="text-3xl font-display font-bold gold-text">{p.price}</span><span className="text-sm text-muted-foreground font-sans">{p.period}</span></div>
            {(p as any).annual && <p className="text-xs text-muted-foreground/70 font-sans mb-3">ou {(p as any).annual}</p>}
            <ul className="space-y-2 flex-1 mb-6">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm font-sans text-muted-foreground"><Check className="h-4 w-4 text-primary shrink-0" />{f}</li>
              ))}
            </ul>
            <Button variant={p.highlight ? "hero" : "hero-outline"} className="w-full">Assinar</Button>
          </div>
        ))}
      </div>
      <div className="glass-card p-5">
        <p className="text-sm text-muted-foreground font-sans"><strong className="text-foreground">Admin:</strong> Administradores possuem acesso Premium vitalício gratuito.</p>
      </div>
    </PageShell>
  );
}
