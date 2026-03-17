import { PageShell } from "@/components/PageShell";
import { Utensils } from "lucide-react";

export default function NutriProPage() {
  return (
    <PageShell icon={Utensils} title="Nutrição Pro" description="Orientação, acompanhamento nutricionista e prescrição de dietas">
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold mb-3">Mentoria Nutricional</h3>
        <p className="text-sm text-muted-foreground font-sans">Acompanhamento com nutricionistas certificados. Prescrição de dietas personalizadas baseadas em evidência.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-secondary rounded-xl p-4"><h4 className="font-display font-semibold text-sm mb-1">Avaliação</h4><p className="text-xs text-muted-foreground font-sans">Anamnese nutricional completa</p></div>
        <div className="bg-secondary rounded-xl p-4"><h4 className="font-display font-semibold text-sm mb-1">Plano Alimentar</h4><p className="text-xs text-muted-foreground font-sans">Dieta personalizada com macros</p></div>
        <div className="bg-secondary rounded-xl p-4"><h4 className="font-display font-semibold text-sm mb-1">Acompanhamento</h4><p className="text-xs text-muted-foreground font-sans">Ajustes contínuos baseados em progresso</p></div>
      </div>
    </PageShell>
  );
}
