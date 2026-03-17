import { PageShell } from "@/components/PageShell";
import { CreditCard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  { name: "Free", price: "R$ 0", period: "/mês", features: ["Feed Científico", "Atlas Scanner (3/dia)", "Chat IA (5 msgs/dia)", "1 programa de treino"], highlight: false },
  { name: "Pro", price: "R$ 29,90", period: "/mês", features: ["Tudo do Free", "Chat IA ilimitado", "AI Mentor", "Nexus Lab completo", "Prescrição IA", "10 programas de treino"], highlight: false },
  { name: "Pro+", price: "R$ 59,90", period: "/mês", features: ["Tudo do Pro", "Nexus Premium (Mentorias)", "Loja: publicar produtos", "Afiliados", "Programas ilimitados", "Acadêmico completo"], highlight: true },
  { name: "University", price: "R$ 99,90", period: "/mês", features: ["Tudo do Pro+", "Editorial Pro", "API access", "Suporte prioritário", "Multi-user", "White-label"], highlight: false },
];

export default function PricingPage() {
  return (
    <PageShell icon={CreditCard} title="Planos & Preços" description="Escolha o plano ideal para sua jornada científica">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((p) => (
          <div key={p.name} className={`glass-card p-6 flex flex-col ${p.highlight ? "border-primary/40 gold-glow" : ""}`}>
            <h3 className="font-display font-bold text-lg">{p.name}</h3>
            <div className="mt-2 mb-4"><span className="text-3xl font-display font-bold gold-text">{p.price}</span><span className="text-sm text-muted-foreground font-sans">{p.period}</span></div>
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
        <p className="text-sm text-muted-foreground font-sans"><strong className="text-foreground">Enterprise:</strong> Planos customizados para empresas e instituições. Entre em contato.</p>
      </div>
    </PageShell>
  );
}
