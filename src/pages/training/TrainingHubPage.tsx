import { SubPageShell } from "@/components/SubPageShell";
import { Dumbbell, BookOpen, Play, BarChart3, TrendingUp } from "lucide-react";
import { DomainCard } from "@/components/DomainCard";
import { MetricCard } from "@/components/MetricCard";

const modules = [
  { icon: BookOpen, title: "Programas", desc: "Programas de treino disponíveis", href: "/training/programs" },
  { icon: Play, title: "Sessão Atual", desc: "Executar sessão de treino", href: "/training/session" },
  { icon: BarChart3, title: "Resumo", desc: "Resumo de treinos recentes", href: "/training/summary" },
  { icon: TrendingUp, title: "Progresso", desc: "Evolução de cargas e volume", href: "/training/progress" },
];

export default function TrainingHubPage() {
  return (
    <SubPageShell icon={Dumbbell} title="Treinamento" description="Execução, acompanhamento e progressão de treinos">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Sessões esta semana" value="0" icon={Play} />
        <MetricCard label="Volume semanal" value="0 séries" />
        <MetricCard label="PRs este mês" value="0" />
        <MetricCard label="Consistência" value="—" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((m) => (
          <DomainCard key={m.title} icon={m.icon} title={m.title} description={m.desc} href={m.href} />
        ))}
      </div>
    </SubPageShell>
  );
}
