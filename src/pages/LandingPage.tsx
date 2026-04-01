import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Brain, Scan, ShoppingBag, GraduationCap, Dumbbell, Crown,
  FlaskConical, Users, BookOpen, ArrowRight, Mail, Instagram,
  MessageSquare, FileText, Activity, ClipboardList, Shield,
  Zap, Target, Award, ChevronRight, Check
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import nexusLogo from "@/assets/nexus-logo.jpg";

const features = [
  { icon: Brain, title: "Atlas IA", desc: "Assistente científico com IA para treinamento de força — chat, mentor, prescrição e pesquisa" },
  { icon: Scan, title: "Atlas Scanner", desc: "Identifica equipamentos via visão computacional e retorna exercícios com evidência" },
  { icon: FileText, title: "Prescrição IA", desc: "Prescrições auditáveis baseadas em anamnese + evidência científica" },
  { icon: FlaskConical, title: "Atlas Lab", desc: "Calculadoras RPE, %RM, volume, dose-resposta, TMB, TDEE e macros" },
  { icon: ClipboardList, title: "Anamnese Smart", desc: "Avaliação estruturada em 6 etapas com score de qualidade e integração com prescrição" },
  { icon: Activity, title: "Performance", desc: "Métricas, logbook, insights, leaderboards e desafios de performance" },
  { icon: GraduationCap, title: "Acadêmico", desc: "Pesquisa, DOIs, PubMed e Crossref integrados com IA" },
  { icon: Crown, title: "Mentoria Prime", desc: "Mentorias profissionais exclusivas para assinantes Pro+" },
];

const stats = [
  { value: "10K+", label: "Artigos Indexados" },
  { value: "500+", label: "Exercícios Mapeados" },
  { value: "50+", label: "Mentores Pro" },
  { value: "99.9%", label: "Uptime" },
];

const plans = [
  { name: "Free", price: "R$ 0", period: "/mês", features: ["Atlas Chat básico", "Feed Científico", "Atlas Lab", "Scanner (3/dia)"], highlight: false },
  { name: "Pro", price: "R$ 19,90", period: "/mês", features: ["Atlas IA completo", "Scanner ilimitado", "Prescrições ilimitadas", "Anamnese Smart", "Atlas Store", "Nexus Lab completo"], highlight: false },
  { name: "Premium", price: "R$ 59,90", period: "/mês", features: ["Tudo do Pro", "Mentorias Pro", "Performance analytics", "Programas ilimitados", "Suporte prioritário", "Acesso antecipado"], highlight: true },
];

const differentials = [
  { icon: Shield, title: "Base Científica", desc: "Cada funcionalidade é fundamentada em literatura peer-reviewed e evidência de alta qualidade." },
  { icon: Zap, title: "IA Aplicada", desc: "Atlas processa, interpreta e prescreve com base em evidência, não em achismo." },
  { icon: Target, title: "Prescrição Precisa", desc: "Anamnese → análise → prescrição auditável com rastreabilidade completa." },
  { icon: Award, title: "Ecossistema Completo", desc: "Do scanner ao lab, do acadêmico ao coach — tudo em uma única plataforma." },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={nexusLogo} alt="Nexus Atlas" className="w-9 h-9 rounded-lg object-cover" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl leading-tight">Nexus</span>
              <span className="text-[7px] text-muted-foreground/60 font-sans tracking-widest uppercase leading-none">Powered by Atlas</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground font-sans">
            <a href="/about" className="hover:text-foreground transition-colors">Sobre</a>
            <a href="/science" className="hover:text-foreground transition-colors">Ciência</a>
            <a href="/plans" className="hover:text-foreground transition-colors">Planos</a>
            <a href="/faq" className="hover:text-foreground transition-colors">FAQ</a>
            <a href="/contact" className="hover:text-foreground transition-colors">Contato</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="hero-outline" size="sm" onClick={() => navigate("/auth")}>Entrar</Button>
            <Button variant="hero" size="sm" onClick={() => navigate("/auth")}>Criar Conta</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Nexus Hero" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm mb-8 font-sans">
            <FlaskConical className="h-4 w-4" /> Plataforma Científica do Treinamento de Força
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-[1.05]">
            <span className="gold-text">Nexus</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4 font-sans font-light">
            Plataforma Científica do Treinamento de Força
          </p>
          <p className="text-sm md:text-base text-muted-foreground/70 max-w-2xl mx-auto mb-10 font-sans">
            Powered by Atlas — IA aplicada, prescrição baseada em evidência, scanner de equipamentos, calculadoras científicas e ecossistema completo para profissionais e praticantes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" onClick={() => navigate("/auth")} className="px-10 text-base gold-glow">
              Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="hero-outline" size="lg" onClick={() => navigate("/plans")} className="px-8 text-base">
              Ver Planos
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border/50 bg-card/20">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold gold-text">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1 font-sans">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Differentials */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Por que <span className="gold-text">Nexus</span>?
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto font-sans">
            A única plataforma que combina ciência, inteligência artificial e prescrição baseada em evidência em um único ecossistema.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentials.map((d) => (
              <div key={d.title} className="glass-card p-6 text-center">
                <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mx-auto mb-4">
                  <d.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{d.title}</h3>
                <p className="text-sm text-muted-foreground font-sans">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-card/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Ecossistema <span className="gold-text">Completo</span>
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto font-sans">
            Tudo que você precisa para treinamento baseado em evidência, em uma única plataforma.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass-card-hover p-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:gold-gradient group-hover:border-transparent transition-all">
                  <f.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Escolha seu <span className="gold-text">Plano</span>
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto font-sans">
            Comece gratuitamente e evolua conforme suas necessidades.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className={`glass-card p-8 relative ${plan.highlight ? "border-primary/50 gold-glow" : ""}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-sans font-medium gold-gradient text-primary-foreground">
                    Mais Popular
                  </div>
                )}
                <h3 className="font-display font-bold text-2xl mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-display font-bold gold-text">{plan.price}</span>
                  <span className="text-sm text-muted-foreground font-sans">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm font-sans text-muted-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlight ? "hero" : "hero-outline"}
                  className="w-full"
                  onClick={() => navigate("/auth")}
                >
                  {plan.name === "Free" ? "Começar Grátis" : "Assinar Agora"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feed Preview */}
      <section className="py-20 px-6 bg-card/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Feed <span className="gold-text">Científico</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["Periodização Ondulatória vs Linear", "Dose-Resposta no Volume de Treino", "RPE como Ferramenta de Autoregulação"].map((title, i) => (
              <div key={i} className="glass-card-hover p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-xs text-primary font-sans font-medium">Evidência Científica</span>
                </div>
                <h3 className="font-display font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground font-sans">Análise baseada em literatura peer-reviewed recente sobre treinamento de força.</p>
                <button className="flex items-center gap-1 text-xs text-primary mt-4 font-sans hover:underline">
                  Ler mais <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Pronto para elevar seu <span className="gold-text">treinamento</span>?
          </h2>
          <p className="text-muted-foreground font-sans mb-10 max-w-xl mx-auto">
            Junte-se a profissionais e praticantes que já utilizam ciência aplicada e inteligência artificial para prescrever, treinar e evoluir.
          </p>
          <Button variant="hero" size="lg" onClick={() => navigate("/auth")} className="px-12 text-base gold-glow">
            Criar Conta Gratuita <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border/50 bg-card/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={nexusLogo} alt="Nexus Atlas" className="w-9 h-9 rounded-lg object-cover" />
                <div className="flex flex-col">
                  <span className="font-display font-bold text-xl leading-tight">Nexus</span>
                  <span className="text-[7px] text-muted-foreground/60 font-sans tracking-widest uppercase leading-none">Powered by Atlas</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-sans">Plataforma Científica do Treinamento de Força.</p>
              <p className="text-xs text-muted-foreground/60 mt-4 font-sans">ACME Nexus Fit © 2026</p>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-4">Produto</h3>
              <div className="flex flex-col gap-2 text-sm font-sans">
                <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">Sobre</a>
                <a href="/science" className="text-muted-foreground hover:text-primary transition-colors">Ciência</a>
                <a href="/methods" className="text-muted-foreground hover:text-primary transition-colors">Métodos</a>
                <a href="/research" className="text-muted-foreground hover:text-primary transition-colors">Pesquisa</a>
                <a href="/plans" className="text-muted-foreground hover:text-primary transition-colors">Planos</a>
              </div>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-4">Fale Conosco</h3>
              <div className="flex flex-col gap-3">
                <a href="mailto:caio.gm11@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                  <Mail className="h-4 w-4" /> caio.gm11@gmail.com
                </a>
                <a href="https://instagram.com/caiocavagnolli" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                  <Instagram className="h-4 w-4" /> @caiocavagnolli
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-4">Legal</h3>
              <div className="flex flex-col gap-2 text-sm font-sans">
                <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Termos de Uso</a>
                <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacidade</a>
                <a href="/enterprise" className="text-muted-foreground hover:text-primary transition-colors">Enterprise</a>
                <a href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
