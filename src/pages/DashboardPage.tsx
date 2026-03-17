import { PageShell } from "@/components/PageShell";
import { LayoutDashboard, Brain, Scan, ShoppingBag, BookOpen, Users, Bell, TrendingUp, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quickAccess = [
  { icon: Brain, title: "AI Mentor", url: "/ai-mentor", desc: "Assistente científico" },
  { icon: Scan, title: "Atlas Scanner", url: "/scanner", desc: "Scanner de equipamentos" },
  { icon: ShoppingBag, title: "Loja", url: "/loja", desc: "Produtos digitais" },
  { icon: BookOpen, title: "Feed Científico", url: "/feed", desc: "Conteúdo técnico" },
  { icon: MessageSquare, title: "Chat IA", url: "/chat", desc: "Chat com IA científica" },
  { icon: Users, title: "Fórum", url: "/forum", desc: "Discussão técnica" },
];

const stats = [
  { label: "Produtos Vendidos", value: "0", icon: TrendingUp },
  { label: "Alunos Ativos", value: "0", icon: Users },
  { label: "Artigos Lidos", value: "0", icon: BookOpen },
  { label: "Conversas IA", value: "0", icon: Brain },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <PageShell icon={LayoutDashboard} title="Dashboard" description="Visão geral do seu ecossistema Nexus">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-5">
            <div className="flex items-center justify-between mb-2">
              <s.icon className="h-5 w-5 text-primary" />
              <span className="text-2xl font-display font-bold">{s.value}</span>
            </div>
            <p className="text-sm text-muted-foreground font-sans">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Access */}
        <div className="lg:col-span-2">
          <h2 className="font-display font-semibold text-lg mb-4">Acesso Rápido</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickAccess.map((item) => (
              <div
                key={item.title}
                onClick={() => navigate(item.url)}
                className="glass-card-hover p-5 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:gold-gradient group-hover:border-transparent transition-all">
                  <item.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display font-semibold">{item.title}</h3>
                <p className="text-xs text-muted-foreground font-sans mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications & Chat */}
        <div className="space-y-6">
          <div>
            <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" /> Notificações
            </h2>
            <div className="glass-card p-5 space-y-3">
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
      </div>
    </PageShell>
  );
}
