import { SubPageShell } from "@/components/SubPageShell";
import { ClipboardList, User, Target, Dumbbell, Heart, Activity, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { TabNav } from "@/components/TabNav";

const steps = [
  { id: "personal", label: "Dados Pessoais", icon: User },
  { id: "anthropometry", label: "Antropometria", icon: Activity },
  { id: "objectives", label: "Objetivos", icon: Target },
  { id: "logistics", label: "Logística", icon: Dumbbell },
  { id: "health", label: "Saúde", icon: Heart },
  { id: "review", label: "Revisão", icon: CheckCircle },
];

export default function AnamnesisNewPage() {
  const [activeStep, setActiveStep] = useState("personal");
  return (
    <SubPageShell icon={ClipboardList} title="Nova Anamnese" description="Formulário completo de avaliação" breadcrumbs={[{ label: "Anamnese", href: "/anamnesis" }, { label: "Nova" }]}>
      <TabNav tabs={steps} active={activeStep} onChange={setActiveStep} />

      <div className="glass-card p-8">
        {activeStep === "personal" && (
          <div className="space-y-6">
            <h3 className="font-display font-semibold text-lg">Dados Pessoais</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label className="text-sm font-sans">Nome completo</Label><Input className="bg-secondary border-border mt-1" placeholder="Nome do cliente" /></div>
              <div><Label className="text-sm font-sans">E-mail</Label><Input className="bg-secondary border-border mt-1" placeholder="email@exemplo.com" type="email" /></div>
              <div><Label className="text-sm font-sans">Data de nascimento</Label><Input className="bg-secondary border-border mt-1" type="date" /></div>
              <div><Label className="text-sm font-sans">Sexo biológico</Label><Input className="bg-secondary border-border mt-1" placeholder="Masculino / Feminino" /></div>
              <div><Label className="text-sm font-sans">Telefone</Label><Input className="bg-secondary border-border mt-1" placeholder="(11) 99999-9999" /></div>
              <div><Label className="text-sm font-sans">Profissão</Label><Input className="bg-secondary border-border mt-1" placeholder="Profissão atual" /></div>
            </div>
          </div>
        )}
        {activeStep === "anthropometry" && (
          <div className="space-y-6">
            <h3 className="font-display font-semibold text-lg">Dados Antropométricos</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div><Label className="text-sm font-sans">Altura (cm)</Label><Input className="bg-secondary border-border mt-1" type="number" placeholder="175" /></div>
              <div><Label className="text-sm font-sans">Peso (kg)</Label><Input className="bg-secondary border-border mt-1" type="number" placeholder="80" /></div>
              <div><Label className="text-sm font-sans">% Gordura</Label><Input className="bg-secondary border-border mt-1" type="number" placeholder="15" /></div>
              <div><Label className="text-sm font-sans">Circunferência abdominal (cm)</Label><Input className="bg-secondary border-border mt-1" type="number" placeholder="85" /></div>
              <div><Label className="text-sm font-sans">Circunferência de braço (cm)</Label><Input className="bg-secondary border-border mt-1" type="number" placeholder="35" /></div>
              <div><Label className="text-sm font-sans">Circunferência de coxa (cm)</Label><Input className="bg-secondary border-border mt-1" type="number" placeholder="55" /></div>
            </div>
          </div>
        )}
        {activeStep === "objectives" && (
          <div className="space-y-6">
            <h3 className="font-display font-semibold text-lg">Objetivos</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label className="text-sm font-sans">Objetivo principal</Label><Input className="bg-secondary border-border mt-1" placeholder="Hipertrofia / Força / Emagrecimento" /></div>
              <div><Label className="text-sm font-sans">Objetivo secundário</Label><Input className="bg-secondary border-border mt-1" placeholder="Saúde / Estética / Performance" /></div>
              <div className="md:col-span-2"><Label className="text-sm font-sans">Expectativas e metas</Label><Input className="bg-secondary border-border mt-1" placeholder="Descreva objetivos específicos..." /></div>
            </div>
          </div>
        )}
        {activeStep === "logistics" && (
          <div className="space-y-6">
            <h3 className="font-display font-semibold text-lg">Logística de Treino</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label className="text-sm font-sans">Frequência semanal</Label><Input className="bg-secondary border-border mt-1" type="number" placeholder="4" /></div>
              <div><Label className="text-sm font-sans">Duração por sessão (min)</Label><Input className="bg-secondary border-border mt-1" type="number" placeholder="60" /></div>
              <div><Label className="text-sm font-sans">Equipamentos disponíveis</Label><Input className="bg-secondary border-border mt-1" placeholder="Academia completa / Home gym" /></div>
              <div><Label className="text-sm font-sans">Experiência (anos)</Label><Input className="bg-secondary border-border mt-1" type="number" placeholder="3" /></div>
            </div>
          </div>
        )}
        {activeStep === "health" && (
          <div className="space-y-6">
            <h3 className="font-display font-semibold text-lg">Saúde e Histórico</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label className="text-sm font-sans">Lesões anteriores</Label><Input className="bg-secondary border-border mt-1" placeholder="Descreva lesões ou cirurgias" /></div>
              <div><Label className="text-sm font-sans">Doenças crônicas</Label><Input className="bg-secondary border-border mt-1" placeholder="Hipertensão, diabetes, etc." /></div>
              <div><Label className="text-sm font-sans">Medicamentos</Label><Input className="bg-secondary border-border mt-1" placeholder="Listar medicamentos em uso" /></div>
              <div><Label className="text-sm font-sans">Restrições de movimento</Label><Input className="bg-secondary border-border mt-1" placeholder="Limitações articulares ou dor" /></div>
            </div>
          </div>
        )}
        {activeStep === "review" && (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-display font-semibold text-lg mb-2">Revisão da Anamnese</h3>
            <p className="text-sm text-muted-foreground font-sans mb-6">Revise os dados e confirme para salvar.</p>
            <Button variant="hero">Salvar Anamnese</Button>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" disabled={activeStep === "personal"} onClick={() => { const idx = steps.findIndex((s) => s.id === activeStep); if (idx > 0) setActiveStep(steps[idx - 1].id); }}>Anterior</Button>
        <Button variant="hero" disabled={activeStep === "review"} onClick={() => { const idx = steps.findIndex((s) => s.id === activeStep); if (idx < steps.length - 1) setActiveStep(steps[idx + 1].id); }}>Próximo</Button>
      </div>
    </SubPageShell>
  );
}
