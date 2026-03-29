import { SubPageShell } from "@/components/SubPageShell";
import { History } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";

const history = [
  { id: "RX-003", client: "Pedro Lima", type: "Reabilitação", created: "2026-01-15", archived: "2026-03-20", sessions: "24" },
  { id: "RX-004", client: "Ana Costa", type: "Hipertrofia", created: "2025-11-01", archived: "2026-01-10", sessions: "32" },
];

export default function PrescriptionHistoryPage() {
  return (
    <SubPageShell icon={History} title="Histórico de Prescrições" description="Prescrições arquivadas e finalizadas" breadcrumbs={[{ label: "Prescrições", href: "/prescriptions" }, { label: "Histórico" }]}>
      <DataTable
        columns={[
          { key: "id", label: "ID", className: "text-primary font-mono" },
          { key: "client", label: "Cliente" },
          { key: "type", label: "Tipo" },
          { key: "created", label: "Criada em" },
          { key: "archived", label: "Arquivada em" },
          { key: "sessions", label: "Sessões" },
        ]}
        data={history}
      />
    </SubPageShell>
  );
}
