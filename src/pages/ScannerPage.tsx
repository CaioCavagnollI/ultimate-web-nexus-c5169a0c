import { PageShell } from "@/components/PageShell";
import { Scan } from "lucide-react";

export default function ScannerPage() {
  return (
    <PageShell icon={Scan} title="Atlas Scanner" description="Scanner de equipamentos — identifica equipamentos via Vision e retorna exercícios com evidência">
      <div className="glass-card overflow-hidden rounded-xl">
        <iframe
          src="https://351e4c56-34f1-4ea8-a674-4abad950716d-00-bjc1oo7fteio.kirk.replit.dev/scanner"
          width="100%"
          height="600"
          style={{ border: "none", borderRadius: "12px" }}
          allow="camera; microphone"
          title="Atlas Scanner"
        />
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
    </PageShell>
  );
}
