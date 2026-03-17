import { PageShell } from "@/components/PageShell";
import { Dumbbell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TrainingProgramsPage() {
  return (
    <PageShell icon={Dumbbell} title="Programas de Treino" description="Gerencie e versione programas, protocolos e rotinas de treino">
      <div className="flex justify-end">
        <Button variant="hero" className="gap-2"><Plus className="h-4 w-4" /> Novo Programa</Button>
      </div>
      <div className="glass-card p-8 text-center text-muted-foreground font-sans">
        <Dumbbell className="h-10 w-10 mx-auto mb-3 text-primary/30" />
        <p>Nenhum programa criado. Crie treinos para armazenar e usar quando quiser.</p>
        <p className="text-xs mt-2">Programas podem ser enviados para venda na loja.</p>
      </div>
    </PageShell>
  );
}
