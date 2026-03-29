import { SubPageShell } from "@/components/SubPageShell";
import { CreditCard, Receipt, Crown, Shield } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";

export function BillingSubscriptionPage() {
  return (<SubPageShell icon={Crown} title="Assinatura" breadcrumbs={[{label:"Billing",href:"/billing"},{label:"Assinatura"}]}><div className="glass-card p-6"><h3 className="font-display font-semibold text-lg mb-3">Plano Atual: Free</h3><p className="text-sm text-muted-foreground font-sans">Faça upgrade para Pro ou Premium para desbloquear todas as funcionalidades.</p></div></SubPageShell>);
}
export function BillingHistoryPage() {
  return (<SubPageShell icon={Receipt} title="Histórico de Pagamentos" breadcrumbs={[{label:"Billing",href:"/billing"},{label:"Histórico"}]}><EmptyState icon={Receipt} title="Nenhum pagamento" description="Seu histórico de pagamentos aparecerá aqui." /></SubPageShell>);
}
export function BillingEntitlementsPage() {
  return (<SubPageShell icon={Shield} title="Permissões" breadcrumbs={[{label:"Billing",href:"/billing"},{label:"Permissões"}]}><div className="glass-card p-6"><h3 className="font-display font-semibold text-lg mb-4">Funcionalidades do seu plano</h3><div className="space-y-2 text-sm font-sans">{["Dashboard básico","AI Mentor (5 msgs/dia)","Scanner Atlas (3/dia)","Feed limitado"].map(f=><div key={f} className="flex items-center gap-2 text-muted-foreground"><div className="w-1.5 h-1.5 rounded-full bg-primary" />{f}</div>)}</div></div></SubPageShell>);
}
