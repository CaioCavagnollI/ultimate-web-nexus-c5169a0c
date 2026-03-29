import { SubPageShell } from "@/components/SubPageShell";
import { FileText, Target, Dumbbell, BarChart3, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabNav } from "@/components/TabNav";
import { useState } from "react";

const steps = [
  { id: "client", label: "Cliente", icon: Target },
  { id: "parameters", label: "Parâmetros", icon: BarChart3 },
  { id: "exercises", label: "Exercícios", icon: Dumbbell },
  { id: "review", label: "Revisão", icon: CheckCircle },
];

export default function PrescriptionNewPage() {
  const [activeStep, setActiveStep] = useState("client");
  return (
    <SubPageShell icon={FileText} title="Nova Prescrição" description="Criar prescrição assistida por IA" breadcrumbs={[{ label: "Prescrições", href: "/prescriptions" }, { label: "Nova" }]}>
      <TabNav tabs={steps} active={activeStep} onChange={setActiveStep} />
      <div className="glass-card p-8">
        {activeStep === "client" && (
          <div className="space-y-6">
            <h3 className="font-display font-semibold text-lg">Selecionar Cliente</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label className="text-sm font-sans">Cliente</Label><Input className="bg-secondary border-border mt-1" placeholder="Buscar cliente..." /></div>
              <div><Label className="text-sm font-sans">Anamnese vinculada</Label><Input className="bg-secondary border-border mt-1" placeholder="Selecionar anamnese" /></div>
              <div><Label className="text-sm font-sans">Objetivo principal</Label><Input className="bg-secondary border-border mt-1" placeholder="Hipertrofia / Força / Emagrecimento" /></div>
              <div><Label className="text-sm font-sans">Nível</Label><Input className="bg-secondary border-border mt-1" placeholder="Iniciante / Intermediário / Avançado" /></div>
            </div>
          </div>
        )}
        {activeStep === "parameters" && (
          <div className="space-y-6">
            <h3 className="font-display font-semibold text-lg">Parâmetros de Treino</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div><Label className="text-sm font-sans">Frequência semanal</Label><Input className="bg-secondary border-border mt-1" type="number" placeholder="4" /></div>
              <div><Label className="text-sm font-sans">Duração (semanas)</Label><Input className="bg-secondary border-border mt-1" type="number" placeholder="8" /></div>
              <div><Label className="text-sm font-sans">Divisão (split)</Label><Input className="bg-secondary border-border mt-1" placeholder="Upper/Lower, PPL, Full Body" /></div>
              <div><Label className="text-sm font-sans">Volume inicial (séries/sem)</Label><Input className="bg-secondary border-border mt-1" type="number" placeholder="12" /></div>
              <div><Label className="text-sm font-sans">Estratégia de rep</Label><Input className="bg-secondary border-border mt-1" placeholder="6-12 reps" /></div>
              <div><Label className="text-sm font-sans">Progressão</Label><Input className="bg-secondary border-border mt-1" placeholder="Double Progression" /></div>
            </div>
          </div>
        )}
        {activeStep === "exercises" && (
          <div className="space-y-6">
            <h3 className="font-display font-semibold text-lg">Seleção de Exercícios</h3>
            <p className="text-sm text-muted-foreground font-sans">O Atlas sugere exercícios baseados nos parâmetros e anamnese do cliente.</p>
            <div className="space-y-3">
              {["Supino Reto — Barra", "Agachamento — Barra", "Remada Curvada", "Desenvolvimento — Halteres", "Leg Press 45°", "Puxada Frontal"].map((ex) => (
                <div key={ex} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm font-sans">{ex}</span>
                  <span className="text-xs text-primary font-sans">3x 8-12 reps</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeStep === "review" && (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-display font-semibold text-lg mb-2">Revisão da Prescrição</h3>
            <p className="text-sm text-muted-foreground font-sans mb-6">Revise e confirme para gerar a prescrição final.</p>
            <Button variant="hero">Gerar Prescrição</Button>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <Button variant="outline" disabled={activeStep === "client"} onClick={() => { const idx = steps.findIndex((s) => s.id === activeStep); if (idx > 0) setActiveStep(steps[idx - 1].id); }}>Anterior</Button>
        <Button variant="hero" disabled={activeStep === "review"} onClick={() => { const idx = steps.findIndex((s) => s.id === activeStep); if (idx < steps.length - 1) setActiveStep(steps[idx + 1].id); }}>Próximo</Button>
      </div>
    </SubPageShell>
  );
}
