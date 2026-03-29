import { SubPageShell } from "@/components/SubPageShell";
import { Target } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LabRMPage() {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const w = parseFloat(weight) || 0;
  const r = parseFloat(reps) || 0;
  const rm = w > 0 && r > 0 ? Math.round(w * (1 + r / 30) * 10) / 10 : 0; // Epley
  const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60];

  return (
    <SubPageShell icon={Target} title="Calculadora %RM" description="Estime sua repetição máxima e percentuais de carga" breadcrumbs={[{ label: "Lab", href: "/lab" }, { label: "%RM" }]}>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-display font-semibold text-lg">Dados de Entrada</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-sm font-sans">Carga (kg)</Label><Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="bg-secondary border-border mt-1" placeholder="100" /></div>
            <div><Label className="text-sm font-sans">Repetições</Label><Input type="number" value={reps} onChange={(e) => setReps(e.target.value)} className="bg-secondary border-border mt-1" placeholder="5" /></div>
          </div>
          <p className="text-xs text-muted-foreground font-sans">Fórmula: Epley (1RM = carga × (1 + reps/30))</p>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg mb-4">Resultados</h3>
          {rm > 0 ? (
            <>
              <div className="text-center mb-6">
                <span className="text-4xl font-display font-bold gold-text">{rm} kg</span>
                <p className="text-sm text-muted-foreground font-sans mt-1">1RM Estimado</p>
              </div>
              <div className="space-y-2">
                {percentages.map((pct) => (
                  <div key={pct} className="flex items-center justify-between p-2 bg-secondary/50 rounded text-sm font-sans">
                    <span>{pct}%</span>
                    <span className="text-primary font-medium">{Math.round(rm * pct / 100 * 10) / 10} kg</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground font-sans text-center py-8">Insira carga e repetições para calcular.</p>
          )}
        </div>
      </div>
    </SubPageShell>
  );
}
