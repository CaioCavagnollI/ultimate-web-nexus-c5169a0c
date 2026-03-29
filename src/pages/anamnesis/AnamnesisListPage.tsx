import { SubPageShell } from "@/components/SubPageShell";
import { ClipboardList, Plus, Search, FileUp } from "lucide-react";
import { DomainCard } from "@/components/DomainCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { MetricCard } from "@/components/MetricCard";
import { useNavigate } from "react-router-dom";

const mockAnamneses = [
  { id: "ANM-001", client: "João Silva", date: "2026-03-28", status: "Completa", score: "85%" },
  { id: "ANM-002", client: "Maria Santos", date: "2026-03-27", status: "Pendente", score: "—" },
  { id: "ANM-003", client: "Pedro Lima", date: "2026-03-25", status: "Completa", score: "92%" },
];

export default function AnamnesisList() {
  const navigate = useNavigate();
  return (
    <SubPageShell icon={ClipboardList} title="Anamnese Inteligente" description="Avaliação clínica e funcional para prescrição baseada em evidência" actions={
      <div className="flex gap-2">
        <Button variant="hero-outline" size="sm" onClick={() => navigate("/anamnesis/import")}><FileUp className="h-4 w-4 mr-2" />Importar</Button>
        <Button variant="hero" size="sm" onClick={() => navigate("/anamnesis/new")}><Plus className="h-4 w-4 mr-2" />Nova Anamnese</Button>
      </div>
    }>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total" value="3" icon={ClipboardList} />
        <MetricCard label="Completas" value="2" change="+1" trend="up" />
        <MetricCard label="Pendentes" value="1" />
        <MetricCard label="Score Médio" value="88.5%" />
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar anamnese por cliente..." className="pl-10 bg-secondary border-border" />
      </div>

      <DataTable
        columns={[
          { key: "id", label: "ID", className: "text-primary font-mono" },
          { key: "client", label: "Cliente" },
          { key: "date", label: "Data" },
          { key: "score", label: "Score", render: (r) => <span className="text-primary font-medium">{r.score}</span> },
          { key: "status", label: "Status", render: (r) => <StatusBadge variant={r.status === "Completa" ? "active" : "pending"}>{r.status}</StatusBadge> },
        ]}
        data={mockAnamneses}
        onRowClick={(r) => navigate(`/anamnesis/${r.id}`)}
      />
    </SubPageShell>
  );
}
