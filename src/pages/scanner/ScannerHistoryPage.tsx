import { SubPageShell } from "@/components/SubPageShell";
import { History } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";

const mockScans = [
  { id: "SCN-001", equipment: "Supino Reto", date: "2026-03-28", confidence: "98%", status: "Identificado" },
  { id: "SCN-002", equipment: "Leg Press 45°", date: "2026-03-27", confidence: "95%", status: "Identificado" },
  { id: "SCN-003", equipment: "Crossover", date: "2026-03-26", confidence: "87%", status: "Identificado" },
];

export default function ScannerHistoryPage() {
  return (
    <SubPageShell icon={History} title="Histórico de Scans" description="Todos os equipamentos identificados pelo Atlas Scanner" breadcrumbs={[{ label: "Scanner", href: "/scanner" }, { label: "Histórico" }]}>
      <DataTable
        columns={[
          { key: "id", label: "ID", className: "text-primary font-mono" },
          { key: "equipment", label: "Equipamento" },
          { key: "date", label: "Data" },
          { key: "confidence", label: "Confiança", render: (r) => <span className="text-primary font-medium">{r.confidence}</span> },
          { key: "status", label: "Status", render: () => <StatusBadge variant="active">Identificado</StatusBadge> },
        ]}
        data={mockScans}
        emptyMessage="Nenhum scan realizado ainda."
      />
    </SubPageShell>
  );
}
