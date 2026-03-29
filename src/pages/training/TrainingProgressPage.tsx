import { SubPageShell } from "@/components/SubPageShell";
import { TrendingUp } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";

export default function TrainingProgressPage() {
  return (
    <SubPageShell icon={TrendingUp} title="Progresso" description="Evolução de cargas, volume e performance" breadcrumbs={[{ label: "Treinamento", href: "/training" }, { label: "Progresso" }]}>
      <EmptyState icon={TrendingUp} title="Sem dados de progresso" description="Registre sessões de treino ao longo do tempo para acompanhar a evolução de cargas e volume." />
    </SubPageShell>
  );
}
