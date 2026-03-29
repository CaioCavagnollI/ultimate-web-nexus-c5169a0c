import { SubPageShell } from "@/components/SubPageShell";
import { BarChart3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const muscles = ["Peitoral", "Costas", "Ombros", "Bíceps", "Tríceps", "Quadríceps", "Posterior", "Glúteos"];

export default function LabVolumePage() {
  const [volumes, setVolumes] = useState<Record<string, string>>({});
  return (
    <SubPageShell icon={BarChart3} title="Volume de Treino" description="Cálculo de volume semanal por grupamento muscular" breadcrumbs={[{ label: "Lab", href: "/lab" }, { label: "Volume" }]}>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg mb-4">Séries Semanais por Grupamento</h3>
          <div className="space-y-3">
            {muscles.map((m) => (
              <div key={m} className="flex items-center gap-4">
                <span className="text-sm font-sans w-28">{m}</span>
                <Input type="number" placeholder="0" className="bg-secondary border-border w-20" value={volumes[m] || ""} onChange={(e) => setVolumes({...volumes, [m]: e.target.value})} />
                <span className="text-xs text-muted-foreground font-sans">séries/sem</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg mb-4">Análise</h3>
          <div className="space-y-3">
            {muscles.map((m) => {
              const v = parseInt(volumes[m] || "0");
              const status = v === 0 ? "—" : v < 10 ? "Abaixo do MEV" : v <= 20 ? "Faixa ótima" : "Acima do MRV";
              const color = v === 0 ? "text-muted-foreground" : v < 10 ? "text-yellow-400" : v <= 20 ? "text-green-400" : "text-destructive";
              return (
                <div key={m} className="flex items-center justify-between p-2 bg-secondary/50 rounded text-sm font-sans">
                  <span>{m}: {v} séries</span><span className={color}>{status}</span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground font-sans mt-4">Referência: MEV ~6-10 séries, MAV ~12-20 séries (Schoenfeld et al., 2017)</p>
        </div>
      </div>
    </SubPageShell>
  );
}
