import { SubPageShell } from "@/components/SubPageShell";
import { BookOpen, TrendingUp } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";

export function PerformanceInsightsPage() {
  return (<SubPageShell icon={TrendingUp} title="Insights" breadcrumbs={[{label:"Performance",href:"/performance"},{label:"Insights"}]}><EmptyState icon={TrendingUp} title="Sem dados suficientes" description="Complete mais sessões para gerar insights de performance." /></SubPageShell>);
}
export function PerformanceLogbookPage() {
  return (<SubPageShell icon={BookOpen} title="Logbook" breadcrumbs={[{label:"Performance",href:"/performance"},{label:"Logbook"}]}><EmptyState icon={BookOpen} title="Logbook vazio" description="Registre sessões de treino para preencher seu logbook." /></SubPageShell>);
}
