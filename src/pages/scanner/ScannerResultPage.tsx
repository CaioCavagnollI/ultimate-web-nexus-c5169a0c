import { SubPageShell } from "@/components/SubPageShell";
import { Eye, Dumbbell, Target, BarChart3 } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

export default function ScannerResultPage() {
  return (
    <SubPageShell icon={Eye} title="Resultado do Scan" description="Detalhes da identificação e exercícios associados" breadcrumbs={[{ label: "Scanner", href: "/scanner" }, { label: "Resultado" }]}>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-lg">Supino Reto — Barra</h3>
              <StatusBadge variant="active">Confiança: 98%</StatusBadge>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div><span className="text-xs text-muted-foreground font-sans block">Atlas ID</span><span className="text-sm font-mono text-primary">ATL-001</span></div>
              <div><span className="text-xs text-muted-foreground font-sans block">Categoria</span><span className="text-sm font-sans">Peso Livre</span></div>
              <div><span className="text-xs text-muted-foreground font-sans block">Tipo</span><span className="text-sm font-sans">Multiarticular</span></div>
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold mb-4">Exercícios Compatíveis</h3>
            <div className="space-y-3">
              {[
                { name: "Supino Reto com Barra", muscles: "Peitoral maior, Tríceps, Deltóide anterior", level: "Intermediário" },
                { name: "Supino Reto com Halteres", muscles: "Peitoral maior, Estabilizadores", level: "Intermediário" },
                { name: "Floor Press", muscles: "Peitoral maior, Tríceps", level: "Avançado" },
              ].map((e) => (
                <div key={e.name} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="text-sm font-sans font-medium">{e.name}</p>
                    <p className="text-xs text-muted-foreground font-sans">{e.muscles}</p>
                  </div>
                  <StatusBadge variant="info">{e.level}</StatusBadge>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold mb-3">Músculos-Alvo</h3>
            <div className="space-y-2">
              {[{ name: "Peitoral Maior", pct: "85%" }, { name: "Tríceps Braquial", pct: "60%" }, { name: "Deltóide Anterior", pct: "45%" }].map((m) => (
                <div key={m.name} className="flex items-center justify-between text-sm font-sans">
                  <span>{m.name}</span><span className="text-primary">{m.pct}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold mb-3">Referências</h3>
            <p className="text-xs text-muted-foreground font-sans">Dados baseados em análise EMG (Schoenfeld et al., 2021) e taxonomia de exercícios do catálogo Atlas.</p>
          </div>
        </div>
      </div>
    </SubPageShell>
  );
}
