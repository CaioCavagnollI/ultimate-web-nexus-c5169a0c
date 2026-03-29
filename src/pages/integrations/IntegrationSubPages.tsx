import { SubPageShell } from "@/components/SubPageShell";
import { Plug, Watch, Activity as Strava, Smartphone } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";

function IntegrationDetail({ name, icon: Icon, desc, features }: { name: string; icon: any; desc: string; features: string[] }) {
  return (
    <SubPageShell icon={Icon} title={name} breadcrumbs={[{ label: "Integrações", href: "/integrations" }, { label: name }]}>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-lg">{name}</h3>
            <StatusBadge variant="inactive">Desconectado</StatusBadge>
          </div>
          <p className="text-sm text-muted-foreground font-sans mb-6">{desc}</p>
          <h4 className="font-display font-semibold mb-3">Dados sincronizáveis</h4>
          <div className="space-y-2">
            {features.map((f) => <div key={f} className="flex items-center gap-2 text-sm font-sans text-muted-foreground"><div className="w-1.5 h-1.5 rounded-full bg-primary" />{f}</div>)}
          </div>
          <Button variant="hero" className="mt-6">Conectar {name}</Button>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold mb-3">Status</h3>
          <p className="text-sm text-muted-foreground font-sans">Não conectado. Configure a integração para sincronizar dados automaticamente.</p>
        </div>
      </div>
    </SubPageShell>
  );
}

export function GarminPage() { return <IntegrationDetail name="Garmin" icon={Watch} desc="Sincronize dados de FC, sono, VO2max e atividades do seu Garmin." features={["Frequência cardíaca", "Qualidade do sono", "VO2max estimado", "Passos e calorias", "Atividades de treino"]} />; }
export function GoogleFitPage() { return <IntegrationDetail name="Google Fit" icon={Smartphone} desc="Conecte dados de saúde e atividade do Google Fit." features={["Passos diários", "Calorias gastas", "Atividades", "Dados de saúde"]} />; }
export function StravaPage() { return <IntegrationDetail name="Strava" icon={Strava} desc="Importe treinos e atividades do Strava." features={["Atividades de treino", "Distância e ritmo", "Zonas de FC", "Segmentos"]} />; }
