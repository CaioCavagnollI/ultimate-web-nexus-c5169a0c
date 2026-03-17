import { PageShell } from "@/components/PageShell";
import { ShoppingBag, Package, Star, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  { title: "Guia de Periodização Científica", price: "R$ 29,90", type: "E-book" },
  { title: "Curso: Biomecânica do Agachamento", price: "R$ 59,90", type: "Curso" },
  { title: "Pack: Treinamento Baseado em Evidência", price: "R$ 49,90", type: "Pack" },
  { title: "Template: Protocolo de Hipertrofia", price: "R$ 19,90", type: "Template" },
  { title: "Audiobook: Fisiologia Muscular", price: "R$ 39,90", type: "Audiobook" },
  { title: "Programa: Força 12 Semanas", price: "R$ 79,90", type: "Programa" },
];

export default function StorePage() {
  return (
    <PageShell icon={ShoppingBag} title="Loja Digital" description="E-books, cursos, programas, templates e materiais científicos">
      {/* Boxes */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6 border-primary/30 gold-glow">
          <div className="flex items-center gap-3 mb-3">
            <Package className="h-6 w-6 text-primary" />
            <h3 className="font-display font-bold text-xl">MY BOX</h3>
          </div>
          <p className="text-sm text-muted-foreground font-sans mb-4">Todos os produtos de autoria própria em um único pack.</p>
          <div className="text-3xl font-display font-bold gold-text mb-4">R$ 197,00</div>
          <Button variant="hero" className="w-full">Comprar MY BOX</Button>
        </div>
        <div className="glass-card p-6 border-primary/30 gold-glow">
          <div className="flex items-center gap-3 mb-3">
            <Star className="h-6 w-6 text-primary" />
            <h3 className="font-display font-bold text-xl">FULL BOX</h3>
          </div>
          <p className="text-sm text-muted-foreground font-sans mb-4">Acesso a todos os produtos disponíveis na plataforma.</p>
          <div className="text-3xl font-display font-bold gold-text mb-4">R$ 297,00</div>
          <Button variant="hero" className="w-full">Comprar FULL BOX</Button>
        </div>
      </div>

      {/* Submission */}
      <div className="glass-card p-5 flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold">Publicar seu Produto</h3>
          <p className="text-sm text-muted-foreground font-sans">Submeta e-books, cursos, artigos científicos. Comissão: 80% para você, 20% Nexus.</p>
        </div>
        <Button variant="hero-outline" className="gap-2"><Upload className="h-4 w-4" /> Submeter</Button>
      </div>

      {/* Products Grid */}
      <h2 className="font-display font-semibold text-lg">Catálogo</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.title} className="glass-card-hover p-5">
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20 font-sans">{p.type}</span>
            <h3 className="font-display font-semibold mt-3 mb-1">{p.title}</h3>
            <p className="text-sm text-muted-foreground font-sans mb-4">Conteúdo baseado em evidência científica.</p>
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-primary">{p.price}</span>
              <Button variant="hero" size="sm">Comprar</Button>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
