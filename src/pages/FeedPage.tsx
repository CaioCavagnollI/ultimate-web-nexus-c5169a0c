import { PageShell } from "@/components/PageShell";
import { BookOpen, ExternalLink } from "lucide-react";

const articles = [
  { title: "Periodização Ondulatória vs Linear: Meta-análise", tag: "Periodização", date: "2026-03-15" },
  { title: "Dose-Resposta no Volume de Treino para Hipertrofia", tag: "Hipertrofia", date: "2026-03-12" },
  { title: "RPE como Ferramenta de Autoregulação no Treinamento", tag: "Autoregulação", date: "2026-03-10" },
  { title: "Biomecânica do Supino: Angulações e Ativação Muscular", tag: "Biomecânica", date: "2026-03-08" },
  { title: "Efeitos da Creatina na Composição Corporal", tag: "Nutrição", date: "2026-03-05" },
  { title: "Frequência de Treino e Adaptações Neuromusculares", tag: "Fisiologia", date: "2026-03-01" },
];

export default function FeedPage() {
  return (
    <PageShell icon={BookOpen} title="Feed Científico" description="Conteúdo técnico baseado em evidências sobre treinamento de força">
      <div className="space-y-4">
        {articles.map((a) => (
          <div key={a.title} className="glass-card-hover p-6 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20 font-sans">{a.tag}</span>
                <span className="text-xs text-muted-foreground font-sans">{a.date}</span>
              </div>
              <h3 className="font-display font-semibold text-lg">{a.title}</h3>
              <p className="text-sm text-muted-foreground font-sans mt-1">Análise baseada em literatura peer-reviewed recente.</p>
            </div>
            <ExternalLink className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
          </div>
        ))}
      </div>
    </PageShell>
  );
}
