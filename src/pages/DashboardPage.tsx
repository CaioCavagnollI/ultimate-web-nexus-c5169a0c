import { PageShell } from "@/components/PageShell";
import { StatCard } from "@/components/StatCard";
import { DomainCard } from "@/components/DomainCard";
import {
  LayoutDashboard, Brain, Scan, BookOpen, Users,
  Bell, ClipboardList, FileText, FlaskConical, GraduationCap, Dumbbell, TrendingUp
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useClients } from "@/hooks/useClients";
import { useAnamneses } from "@/hooks/useAnamneses";
import { usePrescriptions } from "@/hooks/usePrescriptions";
import { useTrainingSessions } from "@/hooks/useTraining";
import { useConversations } from "@/hooks/useConversations";

const quickAccess = [
  { icon: Brain, title: "Atlas Brain", url: "/atlas", desc: "IA científica", badge: "IA" },
  { icon: Scan, title: "Atlas Scanner", url: "/scanner", desc: "Scanner de equipamentos", badge: "Atlas" },
  { icon: ClipboardList, title: "Anamnese", url: "/anamnesis", desc: "Avaliação inteligente" },
  { icon: FileText, title: "Prescrição de Treino", url: "/prescriptions", desc: "Prescrição baseada em evidência" },
  { icon: Dumbbell, title: "Treinos", url: "/training", desc: "Sessões e progresso" },
  { icon: FlaskConical, title: "Atlas Lab", url: "/lab", desc: "Calculadoras científicas", badge: "Lab" },
  { icon: GraduationCap, title: "Atlas Sci-Search", url: "/academic", desc: "Pesquisa científica" },
  { icon: Users, title: "Clientes", url: "/clients", desc: "Gestão de alunos" },
  { icon: BookOpen, title: "Biblioteca", url: "/library", desc: "Referências e artigos" },
  { icon: TrendingUp, title: "Performance", url: "/performance", desc: "Métricas de evolução" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: clients } = useClients();
  const { data: anamneses } = useAnamneses();
  const { data: prescriptions } = usePrescriptions();
  const { data: sessions } = useTrainingSessions();
  const { data: conversations } = useConversations();
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Profissional";

  const activePrescriptions = (prescriptions || []).filter(p => p.status === "active").length;
  const completedSessions = (sessions || []).filter(s => s.status === "completed").length;

  return (
    <PageShell icon={LayoutDashboard} title="Dashboard" description={`Bem-vindo de volta, ${displayName}`}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value={String((clients || []).length)} label="Clientes" icon={Users} />
        <StatCard value={String(activePrescriptions)} label="Prescrições Ativas" icon={FileText} />
        <StatCard value={String(completedSessions)} label="Sessões Realizadas" icon={Dumbbell} />
        <StatCard value={String((conversations || []).length)} label="Conversas IA" icon={Brain} />
      </div>

      <div>
        <h2 className="font-display font-semibold text-lg mb-4">Acesso Rápido</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {quickAccess.map((item) => (
            <DomainCard key={item.title} icon={item.icon} title={item.title} description={item.desc} href={item.url} badge={item.badge} />
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2"><ClipboardList className="h-5 w-5 text-primary" />Anamneses Recentes</h2>
          <div className="glass-card p-5 space-y-2">
            {(anamneses || []).length === 0 ? (
              <p className="text-sm text-muted-foreground font-sans">Nenhuma anamnese registrada.</p>
            ) : (anamneses || []).slice(0, 3).map((a) => (
              <div key={a.id} className="flex justify-between items-center text-sm font-sans">
                <span>{a.client_name || "Sem cliente"}</span>
                <span className="text-xs text-muted-foreground">{new Date(a.updated_at).toLocaleDateString("pt-BR")}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2"><Bell className="h-5 w-5 text-primary" />Atividade Recente</h2>
          <div className="glass-card p-5 space-y-2">
            {(sessions || []).length === 0 ? (
              <p className="text-sm text-muted-foreground font-sans">Nenhuma atividade recente.</p>
            ) : (sessions || []).slice(0, 3).map((s) => (
              <div key={s.id} className="flex justify-between items-center text-sm font-sans">
                <span>Sessão {s.status === "completed" ? "concluída" : "em andamento"}</span>
                <span className="text-xs text-muted-foreground">{new Date(s.date).toLocaleDateString("pt-BR")}{s.duration_minutes ? ` · ${s.duration_minutes}min` : ""}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
