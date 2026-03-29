import { SubPageShell } from "@/components/SubPageShell";
import { Mic } from "lucide-react";

export default function AtlasSpeakPage() {
  return (
    <SubPageShell icon={Mic} title="Atlas Speak" description="Interface por voz para interagir com o Atlas" breadcrumbs={[{ label: "Atlas", href: "/atlas" }, { label: "Speak" }]}>
      <div className="glass-card p-8 text-center">
        <Mic className="h-12 w-12 mx-auto mb-4 text-primary/40" />
        <h3 className="font-display font-semibold text-lg mb-2">Em Breve</h3>
        <p className="text-sm text-muted-foreground font-sans max-w-md mx-auto">A interface de voz do Atlas permitirá interações naturais por áudio. Fale com o Atlas enquanto treina ou consulta.</p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-sans">
          <Mic className="h-4 w-4" /> Coming Soon
        </div>
      </div>
    </SubPageShell>
  );
}
