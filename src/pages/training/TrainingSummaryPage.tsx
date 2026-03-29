import { SubPageShell } from "@/components/SubPageShell";
import { BarChart3 } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";

export default function TrainingSummaryPage() {
  return (
    <SubPageShell icon={BarChart3} title="Resumo de Treinos" description="Visão geral das sessões recentes" breadcrumbs={[{ label: "Treinamento", href: "/training" }, { label: "Resumo" }]}>
      <EmptyState icon={BarChart3} title="Sem dados" description="Complete sessões de treino para ver um resumo com métricas, volume e progressão." />
    </SubPageShell>
  );
}
