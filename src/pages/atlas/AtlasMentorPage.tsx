import { SubPageShell } from "@/components/SubPageShell";
import { Brain } from "lucide-react";

export default function AtlasMentorPage() {
  return (
    <SubPageShell icon={Brain} title="Atlas Mentor" description="Mentoria científica personalizada com IA" breadcrumbs={[{ label: "Atlas", href: "/atlas" }, { label: "Mentor" }]}>
      <div className="glass-card p-8 text-center">
        <Brain className="h-12 w-12 mx-auto mb-4 text-primary/40" />
        <h3 className="font-display font-semibold text-lg mb-2">Mentoria IA Personalizada</h3>
        <p className="text-sm text-muted-foreground font-sans max-w-md mx-auto">O Atlas Mentor analisa seu perfil, histórico e objetivos para criar um plano de evolução científica personalizado. Disponível para assinantes Pro e Premium.</p>
      </div>
    </SubPageShell>
  );
}
