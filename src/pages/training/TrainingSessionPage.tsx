import { SubPageShell } from "@/components/SubPageShell";
import { Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TrainingSessionPage() {
  return (
    <SubPageShell icon={Play} title="Sessão de Treino" description="Execute e registre sua sessão atual" breadcrumbs={[{ label: "Treinamento", href: "/training" }, { label: "Sessão" }]}>
      <div className="glass-card p-8 text-center">
        <Play className="h-16 w-16 text-primary/40 mx-auto mb-4" />
        <h3 className="font-display font-semibold text-xl mb-2">Nenhuma sessão ativa</h3>
        <p className="text-sm text-muted-foreground font-sans mb-6">Inicie uma nova sessão de treino para registrar exercícios, séries, cargas e RPE em tempo real.</p>
        <Button variant="hero" size="lg"><Plus className="h-5 w-5 mr-2" />Iniciar Sessão</Button>
      </div>
    </SubPageShell>
  );
}
