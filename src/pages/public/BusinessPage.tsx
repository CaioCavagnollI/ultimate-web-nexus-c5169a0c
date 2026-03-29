import { Briefcase, TrendingUp, Users, BarChart3, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const benefits = [
  "Prescrição baseada em evidência para toda sua equipe",
  "Dashboard de performance dos alunos com métricas reais",
  "Atlas Scanner em todos os equipamentos da academia",
  "Anamnese digital com integração ao prontuário",
  "Relatórios de aderência e engajamento",
  "Suporte dedicado e onboarding assistido",
];

export default function BusinessPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-0">
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Nexus para <span className="gold-text">Negócios</span>
          </h1>
          <p className="text-xl text-muted-foreground font-sans max-w-3xl mx-auto mb-10">
            Transforme sua operação com ciência aplicada e tecnologia de ponta.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" onClick={() => navigate("/contact")}>Solicitar Demo <ArrowRight className="ml-2 h-5 w-5" /></Button>
            <Button variant="hero-outline" size="lg" onClick={() => navigate("/plans")}>Ver Planos</Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Por que escolher o <span className="gold-text">Nexus</span>?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((b) => (
              <div key={b} className="glass-card p-5 flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-sans">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="glass-card p-8 text-center">
            <TrendingUp className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-3xl font-display font-bold gold-text mb-2">40%</h3>
            <p className="text-sm text-muted-foreground font-sans">Aumento na retenção de alunos</p>
          </div>
          <div className="glass-card p-8 text-center">
            <Users className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-3xl font-display font-bold gold-text mb-2">3x</h3>
            <p className="text-sm text-muted-foreground font-sans">Mais eficiência na prescrição</p>
          </div>
          <div className="glass-card p-8 text-center">
            <BarChart3 className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-3xl font-display font-bold gold-text mb-2">95%</h3>
            <p className="text-sm text-muted-foreground font-sans">Satisfação dos profissionais</p>
          </div>
        </div>
      </section>
    </div>
  );
}
