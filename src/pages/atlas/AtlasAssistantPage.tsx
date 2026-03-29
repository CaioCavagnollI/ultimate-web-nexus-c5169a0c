import { SubPageShell } from "@/components/SubPageShell";
import { Sparkles, ClipboardList, FileText, Dumbbell, Calculator, Search } from "lucide-react";
import { DomainCard } from "@/components/DomainCard";

const tasks = [
  { icon: ClipboardList, title: "Criar Anamnese", desc: "Guia passo a passo para avaliação", href: "/anamnesis/new" },
  { icon: FileText, title: "Gerar Prescrição", desc: "Prescrição assistida por IA", href: "/prescriptions/new" },
  { icon: Dumbbell, title: "Montar Treino", desc: "Programa de treino personalizado", href: "/training/programs" },
  { icon: Calculator, title: "Calcular Volume", desc: "Volume ótimo por grupamento", href: "/lab/volume" },
  { icon: Search, title: "Pesquisar Artigo", desc: "Busca em bases acadêmicas", href: "/academic/search" },
];

export default function AtlasAssistantPage() {
  return (
    <SubPageShell icon={Sparkles} title="Atlas Assistant" description="Assistente guiado para tarefas específicas" breadcrumbs={[{ label: "Atlas", href: "/atlas" }, { label: "Assistant" }]}>
      <div className="glass-card p-6 bg-gradient-to-br from-primary/5 to-transparent">
        <p className="text-sm text-muted-foreground font-sans">Selecione uma tarefa e o Atlas vai guiar você passo a passo com suporte científico.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((t) => (
          <DomainCard key={t.title} icon={t.icon} title={t.title} description={t.desc} href={t.href} />
        ))}
      </div>
    </SubPageShell>
  );
}
