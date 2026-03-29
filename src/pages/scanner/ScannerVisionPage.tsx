import { SubPageShell } from "@/components/SubPageShell";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScannerVisionPage() {
  return (
    <SubPageShell icon={Camera} title="Vision Scanner" description="Capture ou envie uma imagem para identificação" breadcrumbs={[{ label: "Scanner", href: "/scanner" }, { label: "Vision" }]}>
      <div className="glass-card p-8">
        <div className="border-2 border-dashed border-border rounded-xl p-16 text-center hover:border-primary/30 transition-colors cursor-pointer" onClick={() => document.getElementById("scanner-input")?.click()}>
          <Camera className="h-12 w-12 mx-auto mb-4 text-primary/40" />
          <p className="text-sm text-muted-foreground font-sans mb-2">Arraste uma imagem ou clique para selecionar</p>
          <p className="text-xs text-muted-foreground/60 font-sans">JPG, PNG, HEIC — máximo 20MB</p>
          <input id="scanner-input" type="file" accept="image/*" capture="environment" className="hidden" />
        </div>
        <div className="flex gap-3 mt-6 justify-center">
          <Button variant="hero">Identificar Equipamento</Button>
          <Button variant="hero-outline" onClick={() => document.getElementById("scanner-input")?.click()}>Usar Câmera</Button>
        </div>
      </div>
    </SubPageShell>
  );
}
