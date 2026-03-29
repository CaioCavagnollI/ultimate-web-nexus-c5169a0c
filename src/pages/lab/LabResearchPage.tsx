import { SubPageShell } from "@/components/SubPageShell";
import { BookOpen } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";

export default function LabResearchPage() {
  return (
    <SubPageShell icon={BookOpen} title="Research Hub" description="Resumos e análises de estudos recentes" breadcrumbs={[{ label: "Lab", href: "/lab" }, { label: "Research" }]}>
      <EmptyState icon={BookOpen} title="Em desenvolvimento" description="Resumos de artigos peer-reviewed com análises aplicáveis ao treinamento." />
    </SubPageShell>
  );
}
