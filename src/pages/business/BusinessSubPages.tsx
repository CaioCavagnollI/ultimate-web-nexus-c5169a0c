import { SubPageShell } from "@/components/SubPageShell";
import { Building2, BarChart3, CreditCard, Plug, Crown, Settings, Users, Layers } from "lucide-react";
import { DomainCard } from "@/components/DomainCard";
import { MetricCard } from "@/components/MetricCard";
import { EmptyState } from "@/components/EmptyState";

const bc = (l: string) => [{ label: "Business", href: "/business" }, { label: l }];

export function BusinessDashboardPage() {
  return (<SubPageShell icon={Building2} title="Business Dashboard" breadcrumbs={bc("Dashboard")}><div className="grid grid-cols-2 lg:grid-cols-4 gap-4"><MetricCard label="Workspaces" value="1" /><MetricCard label="Usuários" value="0" /><MetricCard label="Receita" value="R$ 0" /><MetricCard label="Retenção" value="—" /></div></SubPageShell>);
}
export function BusinessAnalyticsPage() {
  return (<SubPageShell icon={BarChart3} title="Analytics" breadcrumbs={bc("Analytics")}><EmptyState icon={BarChart3} title="Analytics empresarial" description="Métricas e dashboards para gestão organizacional." /></SubPageShell>);
}
export function BusinessBillingPage() {
  return (<SubPageShell icon={CreditCard} title="Billing Empresarial" breadcrumbs={bc("Billing")}><EmptyState icon={CreditCard} title="Faturamento centralizado" description="Gerencie o faturamento da organização." /></SubPageShell>);
}
export function BusinessIntegrationsPage() {
  return (<SubPageShell icon={Plug} title="Integrações" breadcrumbs={bc("Integrações")}><EmptyState icon={Plug} title="Integrações enterprise" description="SSO, SCIM e integrações customizadas." /></SubPageShell>);
}
export function BusinessPlansPage() {
  return (<SubPageShell icon={Crown} title="Planos" breadcrumbs={bc("Planos")}><EmptyState icon={Crown} title="Gestão de planos" description="Configure planos para sua organização." /></SubPageShell>);
}
export function BusinessSettingsPage() {
  return (<SubPageShell icon={Settings} title="Configurações" breadcrumbs={bc("Configurações")}><EmptyState icon={Settings} title="Configurações enterprise" description="Ajustes da organização." /></SubPageShell>);
}
export function BusinessTenantsPage() {
  return (<SubPageShell icon={Layers} title="Tenants" breadcrumbs={bc("Tenants")}><EmptyState icon={Layers} title="Multi-tenant" description="Gerencie unidades, filiais e tenants." /></SubPageShell>);
}
export function BusinessUsersPage() {
  return (<SubPageShell icon={Users} title="Usuários" breadcrumbs={bc("Usuários")}><EmptyState icon={Users} title="Usuários da organização" description="Gerencie colaboradores e permissões." /></SubPageShell>);
}
export function BusinessWorkspacesPage() {
  return (<SubPageShell icon={Building2} title="Workspaces" breadcrumbs={bc("Workspaces")}><EmptyState icon={Building2} title="Workspaces" description="Espaços de trabalho da organização." /></SubPageShell>);
}

export function BusinessHubPage() {
  const modules = [
    { icon: BarChart3, title: "Analytics", desc: "Métricas organizacionais", href: "/business/analytics" },
    { icon: Users, title: "Usuários", desc: "Gestão de colaboradores", href: "/business/users" },
    { icon: Layers, title: "Tenants", desc: "Multi-tenant", href: "/business/tenants" },
    { icon: Building2, title: "Workspaces", desc: "Espaços de trabalho", href: "/business/workspaces" },
    { icon: CreditCard, title: "Billing", desc: "Faturamento centralizado", href: "/business/billing" },
    { icon: Settings, title: "Configurações", desc: "Ajustes enterprise", href: "/business/settings" },
  ];
  return (
    <SubPageShell icon={Building2} title="Business / Enterprise" description="Painel de gestão organizacional">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Workspaces" value="0" /><MetricCard label="Usuários" value="0" /><MetricCard label="Receita" value="R$ 0" /><MetricCard label="Tenants" value="0" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((m) => <DomainCard key={m.title} icon={m.icon} title={m.title} description={m.desc} href={m.href} />)}
      </div>
    </SubPageShell>
  );
}
