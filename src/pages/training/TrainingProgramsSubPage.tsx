import { SubPageShell } from "@/components/SubPageShell";
import { BookOpen } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";

export default function TrainingProgramsSubPage() {
  return (
    <SubPageShell icon={BookOpen} title="Programas de Treino" description="Programas ativos e disponíveis" breadcrumbs={[{ label: "Treinamento", href: "/training" }, { label: "Programas" }]}>
      <EmptyState icon={BookOpen} title="Nenhum programa ativo" description="Inicie um programa a partir de uma prescrição ou selecione um programa pré-configurado." action={<Button variant="hero">Ver Programas</Button>} />
    </SubPageShell>
  );
}
