import { SubPageShell } from "@/components/SubPageShell";
import { FileUp, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnamnesisImportPage() {
  return (
    <SubPageShell icon={FileUp} title="Importar Anamnese" description="Importe anamneses de arquivos externos" breadcrumbs={[{ label: "Anamnese", href: "/anamnesis" }, { label: "Importar" }]}>
      <div className="glass-card p-8">
        <div className="border-2 border-dashed border-border rounded-xl p-16 text-center hover:border-primary/30 transition-colors cursor-pointer">
          <Upload className="h-12 w-12 mx-auto mb-4 text-primary/40" />
          <p className="text-sm text-muted-foreground font-sans mb-2">Arraste um arquivo ou clique para selecionar</p>
          <p className="text-xs text-muted-foreground/60 font-sans">CSV, XLSX, JSON — dados de anamnese de outros sistemas</p>
        </div>
        <div className="flex gap-3 mt-6 justify-center">
          <Button variant="hero">Importar Dados</Button>
          <Button variant="outline">Baixar Template</Button>
        </div>
      </div>
    </SubPageShell>
  );
}
