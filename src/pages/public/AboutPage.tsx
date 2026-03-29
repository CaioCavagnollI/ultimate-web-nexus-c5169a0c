import { Brain, Scan, FlaskConical, Crown, Users, Target, Dumbbell, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const timeline = [
  { year: "2024", title: "Pesquisa & Validação", desc: "Início do desenvolvimento com base em revisões sistemáticas e literatura peer-reviewed" },
  { year: "2025", title: "MVP & Engine de IA", desc: "Lançamento do Atlas — motor de IA aplicada ao treinamento de força" },
  { year: "2026", title: "Plataforma Completa", desc: "Nexus como ecossistema premium para profissionais e praticantes" },
];

const values = [
  { icon: GraduationCap, title: "Evidência Científica", desc: "Cada funcionalidade é fundamentada em pesquisa peer-reviewed e protocolos validados" },
  { icon: Brain, title: "IA Aplicada", desc: "Atlas transforma dados complexos em decisões práticas e prescrições personalizadas" },
  { icon: Users, title: "Comunidade Pro", desc: "Rede de profissionais, pesquisadores e praticantes avançados" },
  { icon: Target, title: "Precisão", desc: "Ferramentas calibradas para análise, prescrição e monitoramento de performance" },
];

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Sobre o <span className="gold-text">Nexus</span>
          </h1>
          <p className="text-xl text-muted-foreground font-sans max-w-3xl mx-auto mb-4">
            Plataforma Científica do Treinamento de Força
          </p>
          <p className="text-sm text-muted-foreground/60 font-sans">Powered by Atlas</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold mb-6">Nossa <span className="gold-text">Missão</span></h2>
            <p className="text-muted-foreground font-sans leading-relaxed mb-4">
              Democratizar o acesso ao conhecimento científico sobre treinamento de força, conectando pesquisa acadêmica de ponta à prática clínica e à prescrição baseada em evidência.
            </p>
            <p className="text-muted-foreground font-sans leading-relaxed">
              O Nexus não é apenas uma ferramenta — é um ecossistema que integra IA, análise biomecânica, prescrição inteligente, formação acadêmica e comunidade profissional em uma única plataforma premium.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {values.map((v) => (
              <div key={v.title} className="glass-card p-5">
                <v.icon className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-display font-semibold text-sm mb-1">{v.title}</h3>
                <p className="text-xs text-muted-foreground font-sans">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-16">Nossa <span className="gold-text">Trajetória</span></h2>
          <div className="space-y-8">
            {timeline.map((t, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-20 shrink-0">
                  <span className="text-2xl font-display font-bold gold-text">{t.year}</span>
                </div>
                <div className="glass-card p-6 flex-1">
                  <h3 className="font-display font-semibold text-lg mb-2">{t.title}</h3>
                  <p className="text-sm text-muted-foreground font-sans">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Pronto para <span className="gold-text">evoluir</span>?</h2>
          <p className="text-muted-foreground font-sans mb-8">Junte-se a milhares de profissionais que já usam ciência aplicada.</p>
          <Button variant="hero" size="lg" onClick={() => navigate("/auth")}>
            Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
