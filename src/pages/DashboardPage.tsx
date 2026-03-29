import { PageShell } from "@/components/PageShell";
import { StatCard } from "@/components/StatCard";
import { DomainCard } from "@/components/DomainCard";
import {
  LayoutDashboard, Brain, Scan, ShoppingBag, BookOpen, Users,
  Bell, TrendingUp, MessageSquare, ClipboardList, FileText,
  FlaskConical, GraduationCap, Dumbbell
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const quickAccess = [
  { icon: Brain, title: "AI Mentor", url: "/ai-mentor", desc: "Assistente científico", badge: "IA" },
  { icon: Scan, title: "Atlas Scanner", url: "/scanner", desc: "Scanner de equipamentos", badge: "Atlas" },
  { icon: ClipboardList, title: "Anamnese", url: "/anamnesis", desc: "Avaliação inteligente" },
  { icon: FileText, title: "Prescrição", url: "/prescriptions", desc: "Prescrição baseada em evidência" },
  { icon: FlaskConical, title: "Nexus Lab", url: "/lab", desc: "Calculadoras científicas", badge: "Lab" },
  { icon: GraduationCap, title: "Acadêmico", url: "/academic", desc: "Pesquisa e artigos" },
  { icon: ShoppingBag, title: "Loja", url: "/store", desc: "Produtos digitais" },
  { icon: BookOpen, title: "Feed Científico", url: "/feed", desc: "Conteúdo técnico" },
  { icon: MessageSquare, title: "Chat IA", url: "/chat", desc: "Chat com IA científica" },
  { icon: Users, title: "Fórum", url: "/forum", desc: "Discussão técnica" },
  { icon: Dumbbell, title: "Programas", url: "/programs", desc: "Programas de treino" },
];

const stats = [
  { label: "Produtos Vendidos", value: "0", icon: TrendingUp },
  { label: "Alunos Ativos", value: "0", icon: Users },
  { label: "Artigos Lidos", value: "0", icon: BookOpen },
  { label: "Conversas IA", value: "0", icon: Brain },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Profissional";

  return (
    <PageShell icon={LayoutDashboard} title="Dashboard" description={`Bem-vindo de volta, ${displayName}`}>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} value={s.value} label={s.label} icon={s.icon} />
        ))}
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="font-display font-semibold text-lg mb-4">Acesso Rápido</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {quickAccess.map((item) => (
            <DomainCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.desc}
              href={item.url}
              badge={item.badge}
            />
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" /> Notificações
          </h2>
          <div className="glass-card p-5">
            <p className="text-sm text-muted-foreground font-sans">Nenhuma notificação nova.</p>
          </div>
        </div>
        <div>
          <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" /> Chat Rápido
          </h2>
          <div className="glass-card p-5">
            <p className="text-sm text-muted-foreground font-sans">Nenhuma conversa ativa.</p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
