import { PageShell } from "@/components/PageShell";
import { Trophy } from "lucide-react";

export default function CoachProPage() {
  return (
    <PageShell icon={Trophy} title="Coach Pro" description="Prescrição de treinos, dietas e acompanhamento endocrinologista">
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold mb-3">Mentoria de Fisiculturismo</h3>
        <p className="text-sm text-muted-foreground font-sans">Coachs de fisiculturismo ofertando serviços de treino, dieta e endocrinologia. Prescrição de treinos via IA com revisão pelo coach.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-secondary rounded-xl p-4"><h4 className="font-display font-semibold text-sm mb-1">Treino</h4><p className="text-xs text-muted-foreground font-sans">Periodização e prescrição avançada</p></div>
        <div className="bg-secondary rounded-xl p-4"><h4 className="font-display font-semibold text-sm mb-1">Dieta</h4><p className="text-xs text-muted-foreground font-sans">Planos alimentares para performance</p></div>
        <div className="bg-secondary rounded-xl p-4"><h4 className="font-display font-semibold text-sm mb-1">Endocrinologia</h4><p className="text-xs text-muted-foreground font-sans">Acompanhamento hormonal e metabólico</p></div>
      </div>
    </PageShell>
  );
}
