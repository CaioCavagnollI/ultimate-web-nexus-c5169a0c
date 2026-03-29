import { SubPageShell } from "@/components/SubPageShell";
import { FileText, Download } from "lucide-react";
import { useParams } from "react-router-dom";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";

export default function PrescriptionDetailPage() {
  const { id } = useParams();
  return (
    <SubPageShell icon={FileText} title={`Prescrição ${id || ""}`} description="Detalhes da prescrição" breadcrumbs={[{ label: "Prescrições", href: "/prescriptions" }, { label: id || "Detalhe" }]} actions={
      <Button variant="hero-outline" size="sm"><Download className="h-4 w-4 mr-2" />Exportar PDF</Button>
    }>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-lg">Informações Gerais</h3>
              <StatusBadge variant="active">Ativa</StatusBadge>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm font-sans">
              <div><span className="text-muted-foreground block text-xs">Cliente</span>João Silva</div>
              <div><span className="text-muted-foreground block text-xs">Objetivo</span>Hipertrofia</div>
              <div><span className="text-muted-foreground block text-xs">Split</span>Upper / Lower</div>
              <div><span className="text-muted-foreground block text-xs">Frequência</span>4x/semana</div>
              <div><span className="text-muted-foreground block text-xs">Duração</span>8 semanas</div>
              <div><span className="text-muted-foreground block text-xs">Progressão</span>Double Progression</div>
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold text-lg mb-4">Treino A — Upper Push</h3>
            <div className="space-y-2">
              {[
                { ex: "Supino Reto — Barra", sets: "3x8-12", rest: "2-3 min", rpe: "7-8" },
                { ex: "Desenvolvimento — Halteres", sets: "3x10-12", rest: "2 min", rpe: "7-8" },
                { ex: "Tríceps Pulley", sets: "3x12-15", rest: "90s", rpe: "8-9" },
              ].map((e) => (
                <div key={e.ex} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg text-sm font-sans">
                  <span className="flex-1">{e.ex}</span>
                  <span className="text-muted-foreground w-24">{e.sets}</span>
                  <span className="text-muted-foreground w-20">{e.rest}</span>
                  <span className="text-primary w-16 text-right">RPE {e.rpe}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold mb-3">Métricas</h3>
            <div className="space-y-3 text-sm font-sans">
              <div className="flex justify-between"><span className="text-muted-foreground">Volume total</span><span>48 séries/sem</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Sessões completadas</span><span>12/32</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Aderência</span><span className="text-primary">87%</span></div>
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold mb-3">Referências</h3>
            <p className="text-xs text-muted-foreground font-sans">Baseado em Schoenfeld et al., 2017 (dose-resposta) e Helms et al., 2018 (RPE autoregulation).</p>
          </div>
        </div>
      </div>
    </SubPageShell>
  );
}
