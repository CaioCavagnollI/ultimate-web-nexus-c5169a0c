import { SubPageShell } from "@/components/SubPageShell";
import { Scale, Flame, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function LabBMIPage() {
  const [h, setH] = useState(""); const [w, setW] = useState("");
  const hm = parseFloat(h) / 100 || 0; const wk = parseFloat(w) || 0;
  const bmi = hm > 0 && wk > 0 ? Math.round(wk / (hm * hm) * 10) / 10 : 0;
  const cat = bmi === 0 ? "—" : bmi < 18.5 ? "Abaixo do peso" : bmi < 25 ? "Normal" : bmi < 30 ? "Sobrepeso" : "Obesidade";
  return (
    <SubPageShell icon={Scale} title="IMC / Composição" description="Índice de massa corporal" breadcrumbs={[{ label: "Lab", href: "/lab" }, { label: "IMC" }]}>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-sm font-sans">Altura (cm)</Label><Input type="number" value={h} onChange={(e) => setH(e.target.value)} className="bg-secondary border-border mt-1" placeholder="175" /></div>
            <div><Label className="text-sm font-sans">Peso (kg)</Label><Input type="number" value={w} onChange={(e) => setW(e.target.value)} className="bg-secondary border-border mt-1" placeholder="80" /></div>
          </div>
        </div>
        <div className="glass-card p-6 text-center">
          {bmi > 0 ? (<><span className="text-4xl font-display font-bold gold-text">{bmi}</span><p className="text-sm text-muted-foreground font-sans mt-2">{cat}</p></>) : <p className="text-sm text-muted-foreground font-sans py-8">Insira altura e peso.</p>}
        </div>
      </div>
    </SubPageShell>
  );
}

export function LabBMRPage() {
  const [w, setW] = useState(""); const [h, setH] = useState(""); const [a, setA] = useState(""); const [sex, setSex] = useState("m");
  const wk = parseFloat(w) || 0; const hc = parseFloat(h) || 0; const age = parseFloat(a) || 0;
  const bmr = wk > 0 && hc > 0 && age > 0 ? Math.round(sex === "m" ? 10 * wk + 6.25 * hc - 5 * age + 5 : 10 * wk + 6.25 * hc - 5 * age - 161) : 0;
  const multipliers = [{ label: "Sedentário", val: 1.2 }, { label: "Leve (1-3x/sem)", val: 1.375 }, { label: "Moderado (3-5x)", val: 1.55 }, { label: "Ativo (6-7x)", val: 1.725 }, { label: "Muito ativo", val: 1.9 }];
  return (
    <SubPageShell icon={Flame} title="TMB / TDEE" description="Taxa metabólica basal e gasto energético total" breadcrumbs={[{ label: "Lab", href: "/lab" }, { label: "TMB" }]}>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-display font-semibold text-lg">Dados</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-sm font-sans">Peso (kg)</Label><Input type="number" value={w} onChange={(e) => setW(e.target.value)} className="bg-secondary border-border mt-1" /></div>
            <div><Label className="text-sm font-sans">Altura (cm)</Label><Input type="number" value={h} onChange={(e) => setH(e.target.value)} className="bg-secondary border-border mt-1" /></div>
            <div><Label className="text-sm font-sans">Idade</Label><Input type="number" value={a} onChange={(e) => setA(e.target.value)} className="bg-secondary border-border mt-1" /></div>
            <div><Label className="text-sm font-sans">Sexo</Label>
              <select value={sex} onChange={(e) => setSex(e.target.value)} className="w-full mt-1 bg-secondary border border-border rounded-md px-3 py-2 text-sm">
                <option value="m">Masculino</option><option value="f">Feminino</option>
              </select>
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-sans">Fórmula: Mifflin-St Jeor</p>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg mb-4">Resultados</h3>
          {bmr > 0 ? (
            <div className="space-y-3">
              <div className="text-center mb-4"><span className="text-3xl font-display font-bold gold-text">{bmr} kcal</span><p className="text-xs text-muted-foreground font-sans">TMB (repouso)</p></div>
              {multipliers.map((m) => (
                <div key={m.label} className="flex items-center justify-between p-2 bg-secondary/50 rounded text-sm font-sans">
                  <span>{m.label}</span><span className="text-primary font-medium">{Math.round(bmr * m.val)} kcal</span>
                </div>
              ))}
            </div>
          ) : <p className="text-sm text-muted-foreground font-sans text-center py-8">Preencha os dados.</p>}
        </div>
      </div>
    </SubPageShell>
  );
}

export function LabMacrosPage() {
  const [cal, setCal] = useState(""); const c = parseFloat(cal) || 0;
  const p = Math.round(c * 0.3 / 4); const f = Math.round(c * 0.25 / 9); const carb = Math.round(c * 0.45 / 4);
  return (
    <SubPageShell icon={Activity} title="Macronutrientes" description="Calculadora de macros baseada em calorias" breadcrumbs={[{ label: "Lab", href: "/lab" }, { label: "Macros" }]}>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <Label className="text-sm font-sans">TDEE / Calorias diárias (kcal)</Label>
          <Input type="number" value={cal} onChange={(e) => setCal(e.target.value)} className="bg-secondary border-border mt-1" placeholder="2500" />
          <p className="text-xs text-muted-foreground font-sans mt-2">Distribuição: 30% proteína, 25% gordura, 45% carboidrato</p>
        </div>
        <div className="glass-card p-6">
          {c > 0 ? (
            <div className="space-y-4">
              {[{ label: "Proteína", val: `${p}g`, pct: "30%" }, { label: "Gordura", val: `${f}g`, pct: "25%" }, { label: "Carboidrato", val: `${carb}g`, pct: "45%" }].map((m) => (
                <div key={m.label} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg text-sm font-sans">
                  <span>{m.label} ({m.pct})</span><span className="text-primary font-bold text-lg">{m.val}</span>
                </div>
              ))}
            </div>
          ) : <p className="text-sm text-muted-foreground font-sans text-center py-8">Insira as calorias diárias.</p>}
        </div>
      </div>
    </SubPageShell>
  );
}
