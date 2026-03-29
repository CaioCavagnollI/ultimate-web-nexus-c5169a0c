import { SubPageShell } from "@/components/SubPageShell";
import { Shield, Users, Upload, BookOpen, Crown, ShoppingBag, CreditCard, DollarSign, FileText, Activity, Eye, Settings, BarChart3 } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { MetricCard } from "@/components/MetricCard";
import { EmptyState } from "@/components/EmptyState";

const bc = (l: string) => [{ label: "Admin", href: "/admin" }, { label: l }];

export function AdminUsersPage() {
  return (<SubPageShell icon={Users} title="Usuários" breadcrumbs={bc("Usuários")}><DataTable columns={[{key:"name",label:"Nome"},{key:"email",label:"E-mail"},{key:"plan",label:"Plano"},{key:"status",label:"Status",render:()=><StatusBadge variant="active">Ativo</StatusBadge>}]} data={[{name:"João Silva",email:"joao@email.com",plan:"Free",status:"Ativo"}]} /></SubPageShell>);
}
export function AdminUploadsPage() {
  return (<SubPageShell icon={Upload} title="Uploads" breadcrumbs={bc("Uploads")}><EmptyState icon={Upload} title="Gerenciamento de uploads" description="Visualize e gerencie todos os uploads do sistema." /></SubPageShell>);
}
export function AdminLibraryPage() {
  return (<SubPageShell icon={BookOpen} title="Biblioteca" breadcrumbs={bc("Biblioteca")}><EmptyState icon={BookOpen} title="Gerenciamento de conteúdo" description="Administre a biblioteca de conteúdos do Nexus." /></SubPageShell>);
}
export function AdminPlansPage() {
  return (<SubPageShell icon={Crown} title="Planos" breadcrumbs={bc("Planos")}><EmptyState icon={Crown} title="Gerenciamento de planos" description="Configure planos, limites e funcionalidades por tier." /></SubPageShell>);
}
export function AdminProductsPage() {
  return (<SubPageShell icon={ShoppingBag} title="Produtos" breadcrumbs={bc("Produtos")}><EmptyState icon={ShoppingBag} title="Catálogo de produtos" description="Gerencie produtos digitais da loja." /></SubPageShell>);
}
export function AdminStorePage() {
  return (<SubPageShell icon={ShoppingBag} title="Loja" breadcrumbs={bc("Loja")}><EmptyState icon={ShoppingBag} title="Admin da Loja" description="Controle operacional da loja digital." /></SubPageShell>);
}
export function AdminBillingPage() {
  return (<SubPageShell icon={CreditCard} title="Billing" breadcrumbs={bc("Billing")}><EmptyState icon={CreditCard} title="Faturamento" description="Visão geral de faturamento e assinaturas." /></SubPageShell>);
}
export function AdminPayoutsPage() {
  return (<SubPageShell icon={DollarSign} title="Payouts" breadcrumbs={bc("Payouts")}><EmptyState icon={DollarSign} title="Repasses" description="Gerencie repasses para afiliados e mentores." /></SubPageShell>);
}
export function AdminLogsPage() {
  return (<SubPageShell icon={FileText} title="Logs" breadcrumbs={bc("Logs")}><EmptyState icon={FileText} title="Logs do sistema" description="Logs de operação, erros e eventos." /></SubPageShell>);
}
export function AdminHealthPage() {
  return (<SubPageShell icon={Activity} title="Health" breadcrumbs={bc("Health")}><div className="grid grid-cols-2 lg:grid-cols-4 gap-4"><MetricCard label="API" value="Online" trend="up" change="99.9%" /><MetricCard label="DB" value="Online" trend="up" change="< 50ms" /><MetricCard label="Storage" value="Online" /><MetricCard label="Edge Functions" value="Online" /></div></SubPageShell>);
}
export function AdminObservabilityPage() {
  return (<SubPageShell icon={Eye} title="Observabilidade" breadcrumbs={bc("Observabilidade")}><EmptyState icon={Eye} title="Métricas e monitoramento" description="Dashboards de observabilidade do sistema." /></SubPageShell>);
}
export function AdminAuditPage() {
  return (<SubPageShell icon={Shield} title="Auditoria" breadcrumbs={bc("Auditoria")}><EmptyState icon={Shield} title="Trilha de auditoria" description="Registro de ações administrativas e mudanças no sistema." /></SubPageShell>);
}
export function AdminSettingsPage() {
  return (<SubPageShell icon={Settings} title="Configurações Admin" breadcrumbs={bc("Configurações")}><EmptyState icon={Settings} title="Configurações do sistema" description="Ajustes globais da plataforma." /></SubPageShell>);
}
export function AdminExecutivePage() {
  return (<SubPageShell icon={BarChart3} title="Visão Executiva" breadcrumbs={bc("Executivo")}><div className="grid grid-cols-2 lg:grid-cols-4 gap-4"><MetricCard label="Usuários" value="1" change="+1" trend="up" /><MetricCard label="Receita" value="R$ 0" /><MetricCard label="Retenção" value="—" /><MetricCard label="NPS" value="—" /></div></SubPageShell>);
}
