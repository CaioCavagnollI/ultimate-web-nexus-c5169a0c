import { PageShell } from "@/components/PageShell";
import { Shield, Users, Upload, Crown, Settings, BarChart3, Plug, FileText, Activity } from "lucide-react";
import { DomainCard } from "@/components/DomainCard";

const adminModules = [
  { icon: BarChart3, title: "Visão Executiva", desc: "KPIs e métricas de negócio", href: "/admin/executive" },
  { icon: Users, title: "Usuários", desc: "Gerenciar usuários e permissões", href: "/admin/users" },
  { icon: Crown, title: "Planos", desc: "Configurar planos e limites", href: "/admin/plans" },
  { icon: Plug, title: "Integrações", desc: "Gerenciar integrações da plataforma", href: "/admin/integrations" },
  { icon: Upload, title: "Uploads & RAG", desc: "Base de conhecimento da IA", href: "/admin/uploads" },
  { icon: Activity, title: "Health", desc: "Status dos serviços", href: "/admin/health" },
  { icon: FileText, title: "Logs", desc: "Logs do sistema", href: "/admin/logs" },
  { icon: Settings, title: "Configurações", desc: "Ajustes globais", href: "/admin/settings" },
];

export default function AdminPage() {
  return (
    <PageShell icon={Shield} title="Painel Admin" description="Governança, integrações e gerenciamento do ecossistema">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminModules.map((m) => (
          <DomainCard key={m.title} icon={m.icon} title={m.title} description={m.desc} href={m.href} />
        ))}
      </div>
    </PageShell>
  );
}
