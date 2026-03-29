import { SubPageShell } from "@/components/SubPageShell";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrescriptionExportPage() {
  return (
    <SubPageShell icon={Download} title="Exportar Prescrição" description="Gere um PDF ou documento da prescrição" breadcrumbs={[{ label: "Prescrições", href: "/prescriptions" }, { label: "Exportar" }]}>
      <div className="glass-card p-8 text-center">
        <FileText className="h-12 w-12 mx-auto mb-4 text-primary/40" />
        <h3 className="font-display font-semibold text-lg mb-2">Exportar Prescrição</h3>
        <p className="text-sm text-muted-foreground font-sans max-w-md mx-auto mb-6">Selecione uma prescrição ativa para gerar o documento em PDF com exercícios, séries, referências científicas e orientações.</p>
        <div className="flex gap-3 justify-center">
          <Button variant="hero">Exportar PDF</Button>
          <Button variant="outline">Exportar CSV</Button>
        </div>
      </div>
    </SubPageShell>
  );
}
