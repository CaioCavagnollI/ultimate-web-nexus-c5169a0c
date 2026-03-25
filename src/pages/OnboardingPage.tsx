import { PageShell } from "@/components/PageShell";
import { Rocket, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const steps = [
  { title: "Completar perfil", desc: "Adicione seu nome, foto e especialidade", done: false, href: "/perfil" },
  { title: "Preencher anamnese", desc: "Responda o questionário de avaliação inicial", done: false, href: "/anamnese" },
  { title: "Explorar o Scanner", desc: "Escaneie seu primeiro equipamento com o Atlas", done: false, href: "/scanner" },
  { title: "Conversar com o Mentor", desc: "Faça sua primeira pergunta ao AI Mentor", done: false, href: "/ai-mentor" },
  { title: "Conhecer o Lab", desc: "Use as calculadoras científicas do Nexus Lab", done: false, href: "/lab" },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const displayName = user?.user_metadata?.full_name || "profissional";

  return (
    <PageShell icon={Rocket} title="Onboarding" description={`Olá, ${displayName}! Vamos configurar seu ecossistema Nexus.`}>
      <div className="glass-card p-6 border-primary/20">
        <h2 className="font-display font-semibold text-lg mb-1">Primeiros passos</h2>
        <p className="text-sm text-muted-foreground font-sans mb-6">Complete as etapas abaixo para aproveitar ao máximo a plataforma.</p>
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 border border-border/50 group hover:border-primary/30 transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${step.done ? "bg-green-500/20 text-green-400" : "bg-primary/10 text-primary"}`}>
                {step.done ? <CheckCircle className="h-4 w-4" /> : <span className="text-sm font-display font-bold">{i + 1}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-sans font-medium text-sm">{step.title}</h3>
                <p className="text-xs text-muted-foreground font-sans">{step.desc}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate(step.href)} className="shrink-0">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <Button variant="hero" size="lg" onClick={() => navigate("/dashboard")}>
          Ir para o Dashboard <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </PageShell>
  );
}
