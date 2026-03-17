import { PageShell } from "@/components/PageShell";
import { PenTool, Upload, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditorialProPage() {
  return (
    <PageShell icon={PenTool} title="Editorial Pro" description="Submissions, métricas e orientação acadêmica completa">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass-card-hover p-5"><Upload className="h-5 w-5 text-primary mb-3" /><h3 className="font-display font-semibold">Submeter Trabalho</h3><p className="text-xs text-muted-foreground font-sans mt-1">Envie seu trabalho para revisão e orientação.</p></div>
        <div className="glass-card-hover p-5"><FileText className="h-5 w-5 text-primary mb-3" /><h3 className="font-display font-semibold">Revisão</h3><p className="text-xs text-muted-foreground font-sans mt-1">Patches auditáveis em DOCX com orientador.</p></div>
        <div className="glass-card-hover p-5"><BarChart3 className="h-5 w-5 text-primary mb-3" /><h3 className="font-display font-semibold">Métricas</h3><p className="text-xs text-muted-foreground font-sans mt-1">Acompanhe progresso e qualidade do trabalho.</p></div>
      </div>
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold mb-3">Trabalhos em Andamento</h3>
        <p className="text-sm text-muted-foreground font-sans">Nenhum trabalho submetido. Disponível para assinantes Pro+.</p>
      </div>
    </PageShell>
  );
}
