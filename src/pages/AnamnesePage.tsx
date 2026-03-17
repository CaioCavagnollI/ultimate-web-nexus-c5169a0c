import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { ClipboardList, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const steps = ["Identificação", "Antropometria", "Objetivos", "Logística", "Saúde", "Adicional"];

const objectives = ["Hipertrofia", "Emagrecimento", "Força Máxima", "Resistência Muscular", "Saúde Geral", "Reabilitação", "Performance Esportiva"];

export default function AnamnesePage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, any>>({});

  const update = (key: string, value: any) => setData((p) => ({ ...p, [key]: value }));

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="space-y-4">
          <div><Label className="font-sans text-sm">Nome Completo</Label><Input className="bg-secondary border-border mt-1" value={data.nome || ""} onChange={(e) => update("nome", e.target.value)} /></div>
          <div><Label className="font-sans text-sm">E-mail</Label><Input className="bg-secondary border-border mt-1" value={data.email || ""} onChange={(e) => update("email", e.target.value)} /></div>
          <div><Label className="font-sans text-sm">Telefone</Label><Input className="bg-secondary border-border mt-1" value={data.telefone || ""} onChange={(e) => update("telefone", e.target.value)} /></div>
          <div><Label className="font-sans text-sm">Contato Preferencial</Label><Input className="bg-secondary border-border mt-1" value={data.contato || ""} onChange={(e) => update("contato", e.target.value)} placeholder="WhatsApp, e-mail..." /></div>
        </div>
      );
      case 1: return (
        <div className="space-y-4">
          <div><Label className="font-sans text-sm">Altura (cm)</Label><Input type="number" className="bg-secondary border-border mt-1" value={data.altura || ""} onChange={(e) => update("altura", e.target.value)} /></div>
          <div><Label className="font-sans text-sm">Peso (kg)</Label><Input type="number" className="bg-secondary border-border mt-1" value={data.peso || ""} onChange={(e) => update("peso", e.target.value)} /></div>
          {data.altura && data.peso && (
            <div className="glass-card p-4">
              <span className="text-sm text-muted-foreground font-sans">IMC calculado: </span>
              <span className="font-display font-bold text-primary">{(Number(data.peso) / ((Number(data.altura) / 100) ** 2)).toFixed(1)}</span>
            </div>
          )}
        </div>
      );
      case 2: return (
        <div className="space-y-3">
          <Label className="font-sans text-sm">Selecione seus objetivos:</Label>
          <div className="grid grid-cols-2 gap-2">
            {objectives.map((obj) => (
              <button key={obj} onClick={() => {
                const sel = data.objetivos || [];
                update("objetivos", sel.includes(obj) ? sel.filter((o: string) => o !== obj) : [...sel, obj]);
              }} className={`p-3 rounded-lg text-sm font-sans text-left transition-all ${(data.objetivos || []).includes(obj) ? "bg-primary/20 border border-primary/40 text-primary" : "bg-secondary border border-border text-muted-foreground hover:border-primary/20"}`}>
                {obj}
              </button>
            ))}
          </div>
        </div>
      );
      case 3: return (
        <div className="space-y-4">
          <div><Label className="font-sans text-sm">Local de Treino</Label><Input className="bg-secondary border-border mt-1" value={data.local || ""} onChange={(e) => update("local", e.target.value)} placeholder="Academia, casa..." /></div>
          <div><Label className="font-sans text-sm">Frequência Semanal</Label><Input className="bg-secondary border-border mt-1" value={data.frequencia || ""} onChange={(e) => update("frequencia", e.target.value)} placeholder="Ex: 4x por semana" /></div>
          <div><Label className="font-sans text-sm">Duração por Sessão</Label><Input className="bg-secondary border-border mt-1" value={data.duracao || ""} onChange={(e) => update("duracao", e.target.value)} placeholder="Ex: 60 minutos" /></div>
          <div><Label className="font-sans text-sm">Nível de Experiência</Label><Input className="bg-secondary border-border mt-1" value={data.nivel || ""} onChange={(e) => update("nivel", e.target.value)} placeholder="Iniciante, intermediário, avançado" /></div>
        </div>
      );
      case 4: return (
        <div className="space-y-4">
          <div><Label className="font-sans text-sm">Tabagismo</Label><Input className="bg-secondary border-border mt-1" value={data.tabagismo || ""} onChange={(e) => update("tabagismo", e.target.value)} placeholder="Sim/Não" /></div>
          <div><Label className="font-sans text-sm">Atividades Físicas Atuais</Label><Input className="bg-secondary border-border mt-1" value={data.atividades || ""} onChange={(e) => update("atividades", e.target.value)} /></div>
          <div><Label className="font-sans text-sm">Cirurgias Anteriores</Label><Input className="bg-secondary border-border mt-1" value={data.cirurgias || ""} onChange={(e) => update("cirurgias", e.target.value)} /></div>
          <div><Label className="font-sans text-sm">Medicamentos em Uso</Label><Input className="bg-secondary border-border mt-1" value={data.medicamentos || ""} onChange={(e) => update("medicamentos", e.target.value)} /></div>
          <div><Label className="font-sans text-sm">Patologias / Condições</Label><Input className="bg-secondary border-border mt-1" value={data.patologias || ""} onChange={(e) => update("patologias", e.target.value)} /></div>
          <div><Label className="font-sans text-sm">Dor ou Limitação</Label><Input className="bg-secondary border-border mt-1" value={data.dor || ""} onChange={(e) => update("dor", e.target.value)} /></div>
        </div>
      );
      case 5: return (
        <div className="space-y-4">
          <div><Label className="font-sans text-sm">Data do Último Check-up</Label><Input type="date" className="bg-secondary border-border mt-1" value={data.checkup || ""} onChange={(e) => update("checkup", e.target.value)} /></div>
          <div><Label className="font-sans text-sm">Observações Adicionais</Label><textarea className="w-full bg-secondary border border-border rounded-lg p-3 text-sm font-sans min-h-[100px] text-foreground" value={data.observacoes || ""} onChange={(e) => update("observacoes", e.target.value)} /></div>
          <div className="glass-card p-4">
            <p className="text-sm text-muted-foreground font-sans">Os dados serão salvos como JSON e utilizados pela IA para prescrições personalizadas.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <PageShell icon={ClipboardList} title="Smart Anamnese" description="Coleta de dados para prescrição personalizada baseada em IA">
      {/* Steps indicator */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s} className={`flex items-center gap-2 shrink-0`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-medium transition-colors ${i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary/20 text-primary border border-primary/40" : "bg-secondary text-muted-foreground"}`}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-xs font-sans ${i === step ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
            {i < steps.length - 1 && <div className="w-6 h-px bg-border" />}
          </div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h2 className="font-display font-semibold text-lg mb-4">{steps[step]}</h2>
        {renderStep()}
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>
          {step < steps.length - 1 ? (
            <Button variant="hero" onClick={() => setStep((s) => s + 1)} className="gap-2">
              Próximo <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="hero" className="gap-2" onClick={() => alert("Anamnese salva! Dados enviados para a IA.")}>
              <Check className="h-4 w-4" /> Finalizar e Enviar
            </Button>
          )}
        </div>
      </div>
    </PageShell>
  );
}
