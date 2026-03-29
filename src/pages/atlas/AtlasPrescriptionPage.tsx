import { SubPageShell } from "@/components/SubPageShell";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AtlasPrescriptionPage() {
  const navigate = useNavigate();
  return (
    <SubPageShell icon={FileText} title="Atlas Prescription" description="Prescrição de treino assistida por IA científica" breadcrumbs={[{ label: "Atlas", href: "/atlas" }, { label: "Prescription" }]}>
      <div className="glass-card p-8 text-center">
        <FileText className="h-12 w-12 mx-auto mb-4 text-primary/40" />
        <h3 className="font-display font-semibold text-lg mb-2">Prescrição Assistida</h3>
        <p className="text-sm text-muted-foreground font-sans max-w-lg mx-auto mb-6">O Atlas analisa a anamnese, nível de treinamento e objetivos do aluno para gerar uma prescrição personalizada e auditável.</p>
        <div className="flex gap-3 justify-center">
          <Button variant="hero" onClick={() => navigate("/prescriptions/new")}>Nova Prescrição</Button>
          <Button variant="hero-outline" onClick={() => navigate("/prescriptions")}>Ver Prescrições</Button>
        </div>
      </div>
    </SubPageShell>
  );
}
