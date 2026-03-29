import { SubPageShell } from "@/components/SubPageShell";
import { Scan as ScanIcon, History, Eye, Upload, Activity, Camera } from "lucide-react";
import { DomainCard } from "@/components/DomainCard";

const modules = [
  { icon: Camera, title: "Novo Scan", desc: "Identificar equipamento via câmera ou upload", href: "/scanner/vision" },
  { icon: History, title: "Histórico", desc: "Scans anteriores e resultados", href: "/scanner/history" },
  { icon: Upload, title: "Uploads", desc: "Imagens enviadas para análise", href: "/scanner/uploads" },
  { icon: Activity, title: "Biomecânica", desc: "Análise biomecânica por equipamento", href: "/scanner/biomechanics" },
];

export default function ScannerHubPage() {
  return (
    <SubPageShell icon={ScanIcon} title="Atlas Scanner" description="Scanner de equipamentos — identifica equipamentos via Vision e retorna exercícios com evidência">
      <div className="glass-card overflow-hidden rounded-xl">
        <iframe
          src="https://351e4c56-34f1-4ea8-a674-4abad950716d-00-bjc1oo7fteio.kirk.replit.dev/scanner"
          width="100%"
          height="500"
          style={{ border: "none", borderRadius: "12px" }}
          allow="camera; microphone"
          title="Atlas Scanner"
        />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((m) => (
          <DomainCard key={m.title} icon={m.icon} title={m.title} description={m.desc} href={m.href} />
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold mb-2">Como funciona</h3>
          <p className="text-sm text-muted-foreground font-sans">Upload ou tire uma foto do equipamento. Atlas identifica via Vision e mapeia ao catálogo.</p>
        </div>
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold mb-2">Resultados</h3>
          <p className="text-sm text-muted-foreground font-sans">Músculos-alvo, exercícios compatíveis, substituições e dicas técnicas com evidência.</p>
        </div>
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold mb-2">Base Científica</h3>
          <p className="text-sm text-muted-foreground font-sans">Cada sugestão é fundamentada em literatura peer-reviewed.</p>
        </div>
      </div>
    </SubPageShell>
  );
}
