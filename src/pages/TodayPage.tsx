import { PageShell } from "@/components/PageShell";
import { StatCard } from "@/components/StatCard";
import { DomainCard } from "@/components/DomainCard";
import { CalendarDays, ClipboardList, Brain, Dumbbell, BookOpen, Target } from "lucide-react";

const todayActions = [
  { icon: ClipboardList, title: "Revisar anamneses", desc: "Verifique avaliações pendentes", href: "/anamnese" },
  { icon: Brain, title: "Consultar Mentor", desc: "Tire dúvidas com a IA", href: "/ai-mentor" },
  { icon: Dumbbell, title: "Prescrição do dia", desc: "Confira treinos programados", href: "/prescricao" },
  { icon: BookOpen, title: "Leitura científica", desc: "Artigos recomendados de hoje", href: "/feed" },
];

export default function TodayPage() {
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <PageShell icon={CalendarDays} title="Hoje" description={today.charAt(0).toUpperCase() + today.slice(1)}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value="0" label="Tarefas pendentes" icon={Target} />
        <StatCard value="0" label="Anamneses a revisar" icon={ClipboardList} />
        <StatCard value="0" label="Treinos agendados" icon={Dumbbell} />
        <StatCard value="0" label="Artigos novos" icon={BookOpen} />
      </div>

      <div>
        <h2 className="font-display font-semibold text-lg mb-4">Ações do dia</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {todayActions.map((action) => (
            <DomainCard
              key={action.title}
              icon={action.icon}
              title={action.title}
              description={action.desc}
              href={action.href}
            />
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg mb-3">Agenda</h3>
        <p className="text-sm text-muted-foreground font-sans">Nenhum compromisso agendado para hoje.</p>
      </div>
    </PageShell>
  );
}
