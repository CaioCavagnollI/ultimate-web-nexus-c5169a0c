import { FlaskConical, BookOpen, BarChart3, Brain, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const pillars = [
  { icon: BookOpen, title: "Revisões Sistemáticas", desc: "Base de conhecimento construída a partir de meta-análises e revisões sistemáticas das principais bases acadêmicas", stats: "10K+ artigos indexados" },
  { icon: BarChart3, title: "Dose-Resposta", desc: "Modelagem de relações dose-resposta para volume, intensidade e frequência de treinamento", stats: "50+ variáveis analisadas" },
  { icon: Brain, title: "IA Científica", desc: "Atlas processa evidências e traduz em prescrições práticas e personalizadas", stats: "99.2% de acurácia" },
  { icon: FileText, title: "Prescrição Auditável", desc: "Cada recomendação é rastreável até sua fonte científica original", stats: "100% referenciado" },
];

const sources = [
  "PubMed / MEDLINE", "Crossref", "Google Scholar", "Scopus", "Web of Science",
  "NSCA Journals", "ACSM Guidelines", "ISSN Position Stands", "Cochrane Library",
];

export default function SciencePage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-0">
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm mb-6 font-sans">
            <FlaskConical className="h-4 w-4" /> Metodologia Científica
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Ciência no <span className="gold-text">DNA</span>
          </h1>
          <p className="text-xl text-muted-foreground font-sans max-w-3xl mx-auto">
            Cada funcionalidade do Nexus é construída sobre uma base sólida de evidência científica peer-reviewed.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-16">Pilares <span className="gold-text">Científicos</span></h2>
          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="glass-card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <p.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground font-sans mb-3">{p.desc}</p>
                    <span className="text-xs text-primary font-sans font-medium">{p.stats}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Fontes <span className="gold-text">Acadêmicas</span></h2>
          <div className="grid grid-cols-3 gap-3">
            {sources.map((s) => (
              <div key={s} className="glass-card p-4 flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm font-sans">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-card/30 text-center">
        <h2 className="text-3xl font-display font-bold mb-4">Explore a <span className="gold-text">ciência</span></h2>
        <p className="text-muted-foreground font-sans mb-8">Acesse o feed científico e a biblioteca de pesquisa do Nexus.</p>
        <Button variant="hero" size="lg" onClick={() => navigate("/auth")}>Acessar Plataforma <ArrowRight className="ml-2 h-5 w-5" /></Button>
      </section>
    </div>
  );
}
