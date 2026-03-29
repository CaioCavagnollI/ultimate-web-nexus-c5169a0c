import { SubPageShell } from "@/components/SubPageShell";
import { BookOpen, TrendingUp, Trophy, Flame, Users, Medal, Activity } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";

export function PerformanceFeedPage() {
  return (<SubPageShell icon={Users} title="Feed Social" breadcrumbs={[{label:"Performance",href:"/performance"},{label:"Feed"}]}><EmptyState icon={Users} title="Nenhuma atividade" description="Atividades da comunidade aparecerão aqui." /></SubPageShell>);
}
export function PerformanceInsightsPage() {
  return (<SubPageShell icon={TrendingUp} title="Insights" breadcrumbs={[{label:"Performance",href:"/performance"},{label:"Insights"}]}><EmptyState icon={TrendingUp} title="Sem dados suficientes" description="Complete mais sessões para gerar insights de performance." /></SubPageShell>);
}
export function PerformanceLeaderboardsPage() {
  return (<SubPageShell icon={Trophy} title="Leaderboards" breadcrumbs={[{label:"Performance",href:"/performance"},{label:"Leaderboards"}]}><EmptyState icon={Trophy} title="Rankings" description="Rankings e comparações da comunidade." /></SubPageShell>);
}
export function PerformanceChallengesPage() {
  return (<SubPageShell icon={Flame} title="Desafios" breadcrumbs={[{label:"Performance",href:"/performance"},{label:"Desafios"}]}><EmptyState icon={Flame} title="Nenhum desafio ativo" description="Desafios da comunidade aparecerão aqui." /></SubPageShell>);
}
export function PerformanceLogbookPage() {
  return (<SubPageShell icon={BookOpen} title="Logbook" breadcrumbs={[{label:"Performance",href:"/performance"},{label:"Logbook"}]}><EmptyState icon={BookOpen} title="Logbook vazio" description="Registre sessões de treino para preencher seu logbook." /></SubPageShell>);
}
export function PerformanceCardsPage() {
  return (<SubPageShell icon={Medal} title="Cards" breadcrumbs={[{label:"Performance",href:"/performance"},{label:"Cards"}]}><EmptyState icon={Medal} title="Nenhum card" description="Conquistas e cards de performance." /></SubPageShell>);
}
