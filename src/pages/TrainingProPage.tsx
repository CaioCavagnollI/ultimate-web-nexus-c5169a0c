import { PageShell } from "@/components/PageShell";
import { Dumbbell } from "lucide-react";

export default function TrainingProPage() {
  return (
    <PageShell icon={Dumbbell} title="Treinamento Pro" description="Prescrição e periodização completa do treinamento personalizado">
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold mb-3">Mentoria com Personal Trainer</h3>
        <p className="text-sm text-muted-foreground font-sans mb-4">O personal pode exportar treinos gerados pela anamnese por IA em DOCX, revisar e ajustar. Após ajustar, é só importar na plataforma ou enviar via WhatsApp/e-mail em PDF.</p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-secondary rounded-xl p-4"><h4 className="font-display font-semibold text-sm mb-1">Anamnese → IA</h4><p className="text-xs text-muted-foreground font-sans">Gerar treino baseado em dados</p></div>
          <div className="bg-secondary rounded-xl p-4"><h4 className="font-display font-semibold text-sm mb-1">Revisar & Editar</h4><p className="text-xs text-muted-foreground font-sans">Ajustar na plataforma ou DOCX</p></div>
          <div className="bg-secondary rounded-xl p-4"><h4 className="font-display font-semibold text-sm mb-1">Exportar & Enviar</h4><p className="text-xs text-muted-foreground font-sans">PDF, DOCX, WhatsApp ou e-mail</p></div>
        </div>
      </div>
    </PageShell>
  );
}
