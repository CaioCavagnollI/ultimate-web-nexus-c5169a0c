import { PageShell } from "@/components/PageShell";
import { Link, Copy, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AffiliatesPage() {
  return (
    <PageShell icon={Link} title="Afiliados" description="Tracking de cliques, conversões e comissões — 50% de comissão padrão">
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold mb-3">Seu Link de Afiliado</h3>
        <div className="flex gap-2">
          <Input readOnly value="https://nexusfitlab.com/ref/seu-codigo" className="bg-secondary border-border" />
          <Button variant="hero-outline" className="gap-2 shrink-0"><Copy className="h-4 w-4" /> Copiar</Button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass-card p-5 text-center"><p className="text-3xl font-display font-bold text-primary">0</p><p className="text-sm text-muted-foreground font-sans">Cliques</p></div>
        <div className="glass-card p-5 text-center"><p className="text-3xl font-display font-bold text-primary">0</p><p className="text-sm text-muted-foreground font-sans">Conversões</p></div>
        <div className="glass-card p-5 text-center"><p className="text-3xl font-display font-bold gold-text">R$ 0,00</p><p className="text-sm text-muted-foreground font-sans">Comissões</p></div>
      </div>
    </PageShell>
  );
}
