import { PageShell } from "@/components/PageShell";
import { StatCard } from "@/components/StatCard";
import { DomainCard } from "@/components/DomainCard";
import { Activity, Medal, TrendingUp, Users, Flame, BarChart3, Trophy, BookOpen } from "lucide-react";

const modules = [
  { icon: BookOpen, title: "Logbook", desc: "Registre sessões de treino", href: "/performance/logbook" },
  { icon: TrendingUp, title: "Insights", desc: "Análise de progressão e tendências", href: "/performance/insights" },
  { icon: Trophy, title: "Leaderboards", desc: "Rankings e comparações", href: "/performance/leaderboards" },
  { icon: Flame, title: "Challenges", desc: "Desafios ativos da comunidade", href: "/performance/challenges" },
  { icon: Users, title: "Feed Social", desc: "Atividades da comunidade", href: "/performance/feed" },
  { icon: Medal, title: "Cards", desc: "Compartilhe conquistas", href: "/performance/cards" },
];

export default function PerformancePage() {
  return (
    <PageShell icon={Activity} title="Performance" description="Camada social e de acompanhamento de desempenho">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value="0" label="Sessões registradas" icon={BookOpen} />
        <StatCard value="0" label="PRs alcançados" icon={Medal} />
        <StatCard value="—" label="Consistência" icon={Flame} />
        <StatCard value="—" label="Ranking" icon={Trophy} />
      </div>

      <div>
        <h2 className="font-display font-semibold text-lg mb-4">Módulos de Performance</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => (
            <DomainCard key={m.title} icon={m.icon} title={m.title} description={m.desc} href={m.href} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
