import { Outlet, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FlaskConical, ShoppingBag, MessageSquare, Mail, Instagram } from "lucide-react";

const navLinks = [
  { label: "Sobre", href: "/about" },
  { label: "Ciência", href: "/science" },
  { label: "Planos", href: "/plans" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "FAQ", href: "/faq" },
  { label: "Contato", href: "/contact" },
];

export default function PublicLayout() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center font-display font-bold text-primary-foreground text-xl">N</div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-tight">Nexus</span>
              <span className="text-[9px] text-muted-foreground font-sans tracking-widest uppercase leading-none">Powered by Atlas</span>
            </div>
          </Link>
          <div className="hidden lg:flex items-center gap-5 text-sm text-muted-foreground font-sans">
            {navLinks.map((l) => (
              <Link key={l.href} to={l.href} className="hover:text-foreground transition-colors">{l.label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="hero-outline" size="sm" onClick={() => navigate("/auth")}>Entrar</Button>
            <Button variant="hero" size="sm" onClick={() => navigate("/auth")}>Criar Conta</Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border/50 bg-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center font-display font-bold text-primary-foreground text-xl">N</div>
                <span className="font-display font-bold text-xl">Nexus</span>
              </div>
              <p className="text-sm text-muted-foreground font-sans">Plataforma Científica do Treinamento de Força.</p>
              <p className="text-xs text-muted-foreground/50 mt-2 font-sans">Powered by Atlas</p>
              <p className="text-xs text-muted-foreground/40 mt-4 font-sans">ACME Nexus Fit © 2026</p>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-4 text-sm">Plataforma</h3>
              <div className="flex flex-col gap-2 text-sm font-sans">
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Sobre</Link>
                <Link to="/science" className="text-muted-foreground hover:text-primary transition-colors">Ciência</Link>
                <Link to="/methods" className="text-muted-foreground hover:text-primary transition-colors">Métodos</Link>
                <Link to="/research" className="text-muted-foreground hover:text-primary transition-colors">Pesquisa</Link>
              </div>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-4 text-sm">Links Rápidos</h3>
              <div className="flex flex-col gap-2 text-sm font-sans">
                <Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">Entrar</Link>
                <Link to="/plans" className="text-muted-foreground hover:text-primary transition-colors">Planos</Link>
                <Link to="/enterprise" className="text-muted-foreground hover:text-primary transition-colors">Enterprise</Link>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Termos</Link>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacidade</Link>
              </div>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-4 text-sm">Contato</h3>
              <div className="flex flex-col gap-3">
                <a href="mailto:caio.gm11@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                  <Mail className="h-4 w-4" /> caio.gm11@gmail.com
                </a>
                <a href="https://instagram.com/caiocavagnolli" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                  <Instagram className="h-4 w-4" /> @caiocavagnolli
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
