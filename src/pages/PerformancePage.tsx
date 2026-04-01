import { PageShell } from "@/components/PageShell";
import { StatCard } from "@/components/StatCard";
import { DomainCard } from "@/components/DomainCard";
import { Activity, Medal, TrendingUp, BarChart3, BookOpen } from "lucide-react";

const modules = [
  { icon: BookOpen, title: "Logbook", desc: "Registre sessões de treino", href: "/performance/logbook" },
  { icon: TrendingUp, title: "Insights", desc: "Análise de progressão e tendências", href: "/performance/insights" },
];

export default function PerformancePage() {
  return (
    <PageShell icon={Activity} title="Performance" description="Acompanhamento de desempenho e progressão">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value="0" label="Sessões registradas" icon={BookOpen} />
        <StatCard value="0" label="PRs alcançados" icon={Medal} />
        <StatCard value="—" label="Consistência" icon={BarChart3} />
        <StatCard value="—" label="Tendência" icon={TrendingUp} />
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
