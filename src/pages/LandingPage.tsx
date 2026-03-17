import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Brain, Scan, ShoppingBag, GraduationCap, Dumbbell, Crown,
  FlaskConical, Users, BookOpen, ArrowRight, Mail, Instagram,
  MessageSquare, FileText
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Brain, title: "AI Mentor", desc: "Assistente científico com IA para treinamento de força" },
  { icon: Scan, title: "Atlas Scanner", desc: "Identifica equipamentos e retorna exercícios com evidência" },
  { icon: FileText, title: "Prescrição IA", desc: "Prescrições auditáveis baseadas em anamnese + evidência" },
  { icon: ShoppingBag, title: "Loja Digital", desc: "E-books, cursos, programas de treino e materiais" },
  { icon: GraduationCap, title: "Acadêmico", desc: "Pesquisa, DOIs, PubMed e Crossref integrados" },
  { icon: FlaskConical, title: "Nexus Lab", desc: "Calculadoras RPE, %RM, volume, dose-resposta" },
  { icon: Crown, title: "Nexus Premium", desc: "Mentorias Pro com profissionais certificados" },
  { icon: Users, title: "Fórum Técnico", desc: "Discussão técnica entre profissionais da ciência" },
];

const stats = [
  { value: "10K+", label: "Artigos Indexados" },
  { value: "500+", label: "Exercícios Mapeados" },
  { value: "50+", label: "Mentores Pro" },
  { value: "99.9%", label: "Uptime" },
];

const mentors = [
  { name: "Dr. Paulo Gentil", specialty: "Treinamento de Força", type: "Coach Pro" },
  { name: "Dra. Marina Santos", specialty: "Nutrição Esportiva", type: "Nutri Pro" },
  { name: "Prof. Ricardo Lima", specialty: "Periodização", type: "Treinamento Pro" },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center font-display font-bold text-primary-foreground text-xl">N</div>
            <span className="font-display font-bold text-xl">Nexus</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Recursos</a>
            <a href="#mentors" className="hover:text-foreground transition-colors">Mentores</a>
            <a href="#about" className="hover:text-foreground transition-colors">Sobre</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contato</a>
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
          <img src={heroBg} alt="Nexus Hero" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm mb-6">
            <FlaskConical className="h-4 w-4" /> Fitversum Lab — Ciência Aplicada
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
            Nexus — <span className="gold-text">O Multiverso da Musculação</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-sans">
            O Multiverso da Ciência Aplicada ao Treinamento. Plataforma para profissionais da saúde, estudantes e praticantes de musculação.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" onClick={() => navigate("/auth")} className="px-8 text-base">
              Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="hero-outline" size="lg" onClick={() => navigate("/auth")} className="px-8 text-base">
              Sou Profissional
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border/50">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold gold-text">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1 font-sans">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
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
                <p className="text-sm text-muted-foreground font-sans">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feed Preview */}
      <section className="py-20 px-6 bg-card/30">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section id="mentors" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-4">
            Mentores <span className="gold-text">Premium</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 font-sans">
            Profissionais certificados oferecendo mentorias na Nexus Premium.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {mentors.map((m) => (
              <div key={m.name} className="glass-card-hover p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 mx-auto mb-4 flex items-center justify-center">
                  <Crown className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg">{m.name}</h3>
                <p className="text-sm text-muted-foreground font-sans">{m.specialty}</p>
                <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20 font-sans">{m.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 bg-card/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold mb-6">Nossa <span className="gold-text">Missão</span></h2>
          <p className="text-muted-foreground font-sans leading-relaxed">
            Democratizar o acesso ao conhecimento científico sobre treinamento de força, usando inteligência artificial para traduzir pesquisas complexas em prescrições práticas e personalizadas.
          </p>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="py-16 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center font-display font-bold text-primary-foreground text-xl">N</div>
                <span className="font-display font-bold text-xl">Nexus</span>
              </div>
              <p className="text-sm text-muted-foreground font-sans">Science & Strength — O Multiverso da Ciência Aplicada ao Treinamento.</p>
              <p className="text-xs text-muted-foreground/60 mt-4 font-sans">ACME Nexus Fit © 2026</p>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-4">Fale Conosco</h3>
              <p className="text-sm text-muted-foreground mb-4 font-sans">Dúvidas, sugestões ou parcerias? Estamos aqui para ajudar.</p>
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
              <h3 className="font-display font-semibold mb-4">Links Rápidos</h3>
              <div className="flex flex-col gap-2 text-sm font-sans">
                <a href="/auth" className="text-muted-foreground hover:text-primary transition-colors">Entrar no Nexus</a>
                <a href="/loja" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"><ShoppingBag className="h-3 w-3" /> Loja</a>
                <a href="/chat" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"><MessageSquare className="h-3 w-3" /> Chat IA</a>
                <a href="/termos" className="text-muted-foreground hover:text-primary transition-colors">Termos de Uso</a>
                <a href="/privacidade" className="text-muted-foreground hover:text-primary transition-colors">Política de Privacidade</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
