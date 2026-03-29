import { SubPageShell } from "@/components/SubPageShell";
import { Beaker } from "lucide-react";

export default function LabDoseResponsePage() {
  return (
    <SubPageShell icon={Beaker} title="Dose-Resposta" description="Análise da relação dose-resposta no treinamento" breadcrumbs={[{ label: "Lab", href: "/lab" }, { label: "Dose-Resposta" }]}>
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg mb-4">Relação Dose-Resposta</h3>
        <p className="text-sm text-muted-foreground font-sans mb-6">A relação dose-resposta no treinamento de força segue uma curva em U invertido: existe uma faixa ótima de volume que maximiza as adaptações, abaixo da qual o estímulo é insuficiente e acima da qual a recuperação é comprometida.</p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-secondary/50 rounded-lg text-center">
            <span className="text-2xl font-display font-bold text-yellow-400">MEV</span>
            <p className="text-xs text-muted-foreground font-sans mt-1">~6-10 séries/sem</p>
            <p className="text-xs text-muted-foreground/60 font-sans">Mínimo efetivo</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg text-center border border-primary/20">
            <span className="text-2xl font-display font-bold text-primary">MAV</span>
            <p className="text-xs text-muted-foreground font-sans mt-1">~12-20 séries/sem</p>
            <p className="text-xs text-muted-foreground/60 font-sans">Faixa ótima</p>
          </div>
          <div className="p-4 bg-secondary/50 rounded-lg text-center">
            <span className="text-2xl font-display font-bold text-destructive">MRV</span>
            <p className="text-xs text-muted-foreground font-sans mt-1">>20-25 séries/sem</p>
            <p className="text-xs text-muted-foreground/60 font-sans">Máximo recuperável</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground font-sans mt-4">Referência: Schoenfeld et al., 2017; Scarpelli et al., 2022</p>
      </div>
    </SubPageShell>
  );
}
