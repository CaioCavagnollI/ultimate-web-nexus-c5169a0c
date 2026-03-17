import { PageShell } from "@/components/PageShell";
import { Users, MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForumPage() {
  return (
    <PageShell icon={Users} title="Fórum Técnico" description="Espaço de discussão técnica entre profissionais da educação física">
      <div className="flex justify-end">
        <Button variant="hero" className="gap-2"><Plus className="h-4 w-4" /> Nova Discussão</Button>
      </div>
      <div className="glass-card p-8 text-center text-muted-foreground font-sans">
        <MessageSquare className="h-10 w-10 mx-auto mb-3 text-primary/30" />
        <p>Nenhuma discussão iniciada ainda. Seja o primeiro a abrir um tópico!</p>
      </div>
    </PageShell>
  );
}
