import { PageShell } from "@/components/PageShell";
import { Crown, Dumbbell, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";

const mentorias = [
  { icon: Dumbbell, title: "Treinamento Pro", desc: "Mentoria com personal trainer. Prescrição de treinos personalizados via IA.", url: "/treinamento-pro" },
  { icon: PenTool, title: "Editorial Pro", desc: "Orientação acadêmica, revisão e tradução de trabalhos científicos.", url: "/editorial-pro" },
];

export default function NexusPremiumPage() {
  return (
    <PageShell icon={Crown} title="Nexus Premium" description="Marketplace de mentorias profissionais para assinantes Premium">
      <div className="grid md:grid-cols-2 gap-6">
        {mentorias.map((m) => (
          <div key={m.title} className="glass-card-hover p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <m.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">{m.title}</h3>
                <p className="text-sm text-muted-foreground font-sans">{m.desc}</p>
              </div>
            </div>
            <Button variant="hero" size="sm" className="w-full mt-4" onClick={() => window.location.href = m.url}>Acessar Mentoria</Button>
          </div>
        ))}
      </div>
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold mb-2">Profissionais Disponíveis</h3>
        <p className="text-sm text-muted-foreground font-sans">Assine o plano Premium para acessar todos os mentores.</p>
      </div>
    </PageShell>
  );
}
