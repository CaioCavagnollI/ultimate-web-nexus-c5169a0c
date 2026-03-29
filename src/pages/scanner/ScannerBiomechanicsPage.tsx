import { SubPageShell } from "@/components/SubPageShell";
import { Activity } from "lucide-react";

export default function ScannerBiomechanicsPage() {
  return (
    <SubPageShell icon={Activity} title="Análise Biomecânica" description="Análise biomecânica detalhada por equipamento e exercício" breadcrumbs={[{ label: "Scanner", href: "/scanner" }, { label: "Biomecânica" }]}>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold mb-4">Perfil de Resistência</h3>
          <p className="text-sm text-muted-foreground font-sans mb-4">Análise do perfil de resistência (ascendente, descendente, parabólico) por exercício e equipamento.</p>
          <div className="space-y-3">
            {[{ ex: "Supino Reto — Barra", profile: "Ascendente" }, { ex: "Leg Press 45°", profile: "Descendente" }, { ex: "Rosca Bíceps — Scott", profile: "Parabólico" }].map((e) => (
              <div key={e.ex} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg text-sm font-sans">
                <span>{e.ex}</span><span className="text-primary">{e.profile}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold mb-4">Ativação Muscular (EMG)</h3>
          <p className="text-sm text-muted-foreground font-sans mb-4">Dados de eletromiografia por exercício e variação de posição.</p>
          <div className="space-y-3">
            {[{ muscle: "Peitoral Maior (esternal)", value: "95% MVC" }, { muscle: "Tríceps Lateral", value: "72% MVC" }, { muscle: "Deltóide Anterior", value: "58% MVC" }].map((m) => (
              <div key={m.muscle} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg text-sm font-sans">
                <span>{m.muscle}</span><span className="text-primary font-medium">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SubPageShell>
  );
}
