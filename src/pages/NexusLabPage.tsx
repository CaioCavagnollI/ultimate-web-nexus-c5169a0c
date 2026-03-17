import { PageShell } from "@/components/PageShell";
import { FlaskConical, Calculator, BarChart3, BookOpen, Target } from "lucide-react";

const tools = [
  { icon: Calculator, title: "Calculadora RPE", desc: "Calcule a intensidade percebida do esforço" },
  { icon: Target, title: "Calculadora %RM", desc: "Percentual de repetição máxima" },
  { icon: BarChart3, title: "Volume de Treino", desc: "Análise e cálculo de volume semanal" },
  { icon: BarChart3, title: "Dose-Resposta", desc: "Análise da relação dose-resposta no treino" },
  { icon: Calculator, title: "Macronutrientes", desc: "Calculadora de macros baseada em objetivos" },
  { icon: BookOpen, title: "Research Hub", desc: "Resumos de estudos recentes e relevantes" },
];

export default function NexusLabPage() {
  return (
    <PageShell icon={FlaskConical} title="Nexus Lab" description="Laboratório de pesquisa aplicada — ferramentas avançadas para treinamento científico">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((t) => (
          <div key={t.title} className="glass-card-hover p-6 cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:gold-gradient group-hover:border-transparent transition-all">
              <t.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-display font-semibold">{t.title}</h3>
            <p className="text-xs text-muted-foreground font-sans mt-1">{t.desc}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
