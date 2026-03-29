import { Building2, Users, BarChart3, Shield, Plug, Headphones, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: Users, title: "Multi-Tenant", desc: "Gerencie múltiplas unidades, times ou clínicas em um único painel" },
  { icon: BarChart3, title: "Analytics Avançados", desc: "Dashboards executivos com KPIs, tendências e relatórios customizados" },
  { icon: Shield, title: "SSO & SCIM", desc: "Single Sign-On e provisionamento automático de usuários" },
  { icon: Plug, title: "Integrações Custom", desc: "API dedicada, webhooks e integrações com sistemas internos" },
  { icon: Headphones, title: "SLA & Suporte", desc: "SLA dedicado com tempo de resposta garantido e account manager" },
  { icon: Building2, title: "Faturamento Centralizado", desc: "Billing unificado para toda a organização com relatórios fiscais" },
];

const useCases = [
  { title: "Academias & Redes", desc: "Prescrição padronizada para centenas de alunos com supervisão centralizada" },
  { title: "Clínicas de Reabilitação", desc: "Anamnese integrada, prescrição personalizada e acompanhamento longitudinal" },
  { title: "Universidades", desc: "Acesso acadêmico à base de pesquisa, calculadoras e ferramentas de análise" },
  { title: "Franquias Fitness", desc: "Multi-tenant com branding customizado e analytics por unidade" },
];

export default function EnterprisePage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-0">
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm mb-6 font-sans">
            <Building2 className="h-4 w-4" /> Para Organizações
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Nexus <span className="gold-text">Enterprise</span>
          </h1>
          <p className="text-xl text-muted-foreground font-sans max-w-3xl mx-auto mb-10">
            Ciência aplicada ao treinamento de força em escala organizacional. Para academias, clínicas, universidades e redes.
          </p>
          <Button variant="hero" size="lg" onClick={() => navigate("/contact")}>
            Falar com Vendas <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-16">Recursos <span className="gold-text">Enterprise</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass-card p-6">
                <f.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground font-sans">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-16">Casos de <span className="gold-text">Uso</span></h2>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((u) => (
              <div key={u.title} className="glass-card p-6 flex items-start gap-4">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-semibold mb-1">{u.title}</h3>
                  <p className="text-sm text-muted-foreground font-sans">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
