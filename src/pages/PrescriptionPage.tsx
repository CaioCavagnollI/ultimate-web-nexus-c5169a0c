import { PageShell } from "@/components/PageShell";
import { FileText, Brain, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrescriptionPage() {
  return (
    <PageShell icon={FileText} title="Prescrição IA" description="Fluxo anamnese → geração → export. Prescrições auditáveis com citações rastreáveis">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4"><span className="font-display font-bold text-primary text-lg">1</span></div>
          <h3 className="font-display font-semibold mb-2">Anamnese</h3>
          <p className="text-sm text-muted-foreground font-sans">Preencha a Smart Anamnese com dados completos do aluno.</p>
          <Button variant="hero-outline" size="sm" className="mt-4" onClick={() => window.location.href = "/anamnese"}>Ir para Anamnese</Button>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4"><Brain className="h-6 w-6 text-primary" /></div>
          <h3 className="font-display font-semibold mb-2">Geração IA</h3>
          <p className="text-sm text-muted-foreground font-sans">IA gera prescrição baseada na anamnese e em evidência científica.</p>
          <Button variant="hero" size="sm" className="mt-4">Gerar Prescrição</Button>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4"><Download className="h-6 w-6 text-primary" /></div>
          <h3 className="font-display font-semibold mb-2">Exportar</h3>
          <p className="text-sm text-muted-foreground font-sans">Exporte em PDF, DOCX ou envie via WhatsApp/e-mail.</p>
          <Button variant="hero-outline" size="sm" className="mt-4">Exportar</Button>
        </div>
      </div>
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold mb-3">Prescrições Recentes</h3>
        <p className="text-sm text-muted-foreground font-sans">Nenhuma prescrição gerada ainda. Preencha a anamnese para começar.</p>
      </div>
    </PageShell>
  );
}
