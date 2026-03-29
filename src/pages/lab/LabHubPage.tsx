import { SubPageShell } from "@/components/SubPageShell";
import { FlaskConical, Calculator, BarChart3, BookOpen, Target, Scale, Flame, Activity, Beaker } from "lucide-react";
import { DomainCard } from "@/components/DomainCard";

const tools = [
  { icon: Target, title: "Calculadora %RM", desc: "Percentual de repetição máxima", href: "/lab/rm" },
  { icon: Calculator, title: "Calculadora RPE", desc: "Intensidade percebida do esforço", href: "/lab/rpe" },
  { icon: BarChart3, title: "Volume de Treino", desc: "Volume semanal por grupamento", href: "/lab/volume" },
  { icon: Scale, title: "IMC / Composição", desc: "Índice de massa corporal", href: "/lab/bmi" },
  { icon: Flame, title: "TMB / TDEE", desc: "Taxa metabólica e gasto energético", href: "/lab/bmr" },
  { icon: Activity, title: "Macronutrientes", desc: "Calculadora de macros", href: "/lab/macros" },
  { icon: Beaker, title: "Dose-Resposta", desc: "Relação dose-resposta no treino", href: "/lab/dose-response" },
  { icon: BookOpen, title: "Research Hub", desc: "Resumos de estudos recentes", href: "/lab/research" },
];

export default function LabHubPage() {
  return (
    <SubPageShell icon={FlaskConical} title="Nexus Lab" description="Laboratório de pesquisa aplicada — ferramentas avançadas para treinamento científico">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((t) => (
          <DomainCard key={t.title} icon={t.icon} title={t.title} description={t.desc} href={t.href} />
        ))}
      </div>
    </SubPageShell>
  );
}
