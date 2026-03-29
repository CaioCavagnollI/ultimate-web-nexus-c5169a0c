import { SubPageShell } from "@/components/SubPageShell";
import { FileText, Plus, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { MetricCard } from "@/components/MetricCard";
import { useNavigate } from "react-router-dom";

const mockPrescriptions = [
  { id: "RX-001", client: "João Silva", type: "Hipertrofia", date: "2026-03-28", status: "Ativa", sessions: "12" },
  { id: "RX-002", client: "Maria Santos", type: "Força", date: "2026-03-25", status: "Rascunho", sessions: "0" },
  { id: "RX-003", client: "Pedro Lima", type: "Reabilitação", date: "2026-03-20", status: "Arquivada", sessions: "24" },
];

export default function PrescriptionListPage() {
  const navigate = useNavigate();
  return (
    <SubPageShell icon={FileText} title="Prescrições" description="Engine de prescrição baseada em evidência" actions={
      <Button variant="hero" size="sm" onClick={() => navigate("/prescriptions/new")}><Plus className="h-4 w-4 mr-2" />Nova Prescrição</Button>
    }>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total" value="3" icon={FileText} />
        <MetricCard label="Ativas" value="1" change="+1" trend="up" />
        <MetricCard label="Sessões Geradas" value="36" />
        <MetricCard label="Clientes Atendidos" value="3" />
      </div>
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar prescrição..." className="pl-10 bg-secondary border-border" />
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate("/prescriptions/history")}><Download className="h-4 w-4 mr-2" />Histórico</Button>
      </div>
      <DataTable
        columns={[
          { key: "id", label: "ID", className: "text-primary font-mono" },
          { key: "client", label: "Cliente" },
          { key: "type", label: "Tipo" },
          { key: "date", label: "Data" },
          { key: "sessions", label: "Sessões" },
          { key: "status", label: "Status", render: (r) => <StatusBadge variant={r.status === "Ativa" ? "active" : r.status === "Rascunho" ? "pending" : "inactive"}>{r.status}</StatusBadge> },
        ]}
        data={mockPrescriptions}
        onRowClick={(r) => navigate(`/prescriptions/${r.id}`)}
      />
    </SubPageShell>
  );
}
