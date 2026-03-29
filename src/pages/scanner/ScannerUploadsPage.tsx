import { SubPageShell } from "@/components/SubPageShell";
import { Upload } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";

export default function ScannerUploadsPage() {
  return (
    <SubPageShell icon={Upload} title="Scanner Uploads" description="Imagens enviadas para análise pelo Atlas Scanner" breadcrumbs={[{ label: "Scanner", href: "/scanner" }, { label: "Uploads" }]}>
      <EmptyState icon={Upload} title="Nenhum upload" description="Envie imagens de equipamentos para serem analisadas pelo Atlas Scanner." />
    </SubPageShell>
  );
}
