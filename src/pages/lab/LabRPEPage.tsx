import { SubPageShell } from "@/components/SubPageShell";
import { Calculator } from "lucide-react";
import { useState } from "react";

const rpeTable = [
  { rpe: 10, reps: [100, 95.5, 92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9] },
  { rpe: 9.5, reps: [97.8, 93.9, 90.7, 87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3] },
  { rpe: 9, reps: [95.5, 92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7] },
  { rpe: 8.5, reps: [93.9, 90.7, 87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4] },
  { rpe: 8, reps: [92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0] },
  { rpe: 7.5, reps: [90.7, 87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7] },
  { rpe: 7, reps: [89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0, 65.3] },
];

export default function LabRPEPage() {
  const [highlight, setHighlight] = useState<{r: number; c: number} | null>(null);
  return (
    <SubPageShell icon={Calculator} title="Tabela RPE" description="Rating of Perceived Exertion — Tabela de intensidade" breadcrumbs={[{ label: "Lab", href: "/lab" }, { label: "RPE" }]}>
      <div className="glass-card p-6 overflow-x-auto">
        <h3 className="font-display font-semibold text-lg mb-4">Tabela RPE × Repetições (% do 1RM)</h3>
        <table className="w-full text-sm font-sans">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 text-muted-foreground">RPE</th>
              {[1,2,3,4,5,6,7,8,9,10].map((r) => <th key={r} className="p-2 text-center text-muted-foreground">{r} rep{r>1?"s":""}</th>)}
            </tr>
          </thead>
          <tbody>
            {rpeTable.map((row, ri) => (
              <tr key={row.rpe} className="border-b border-border/30">
                <td className="p-2 font-medium text-primary">{row.rpe}</td>
                {row.reps.map((val, ci) => (
                  <td key={ci} className={`p-2 text-center cursor-pointer transition-colors ${highlight?.r === ri && highlight?.c === ci ? "bg-primary/20 text-primary font-bold" : "hover:bg-secondary"}`} onClick={() => setHighlight({r: ri, c: ci})}>
                    {val}%
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-muted-foreground font-sans mt-4">Baseado em Helms et al., 2018 — RPE como ferramenta de autoregulação de volume.</p>
      </div>
    </SubPageShell>
  );
}
