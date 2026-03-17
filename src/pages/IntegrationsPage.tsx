import { PageShell } from "@/components/PageShell";
import { Plug, Scan, CreditCard, Brain, Mail } from "lucide-react";

const integrations = [
  { icon: Scan, title: "Atlas Scanner", desc: "Engine de identificação de equipamentos", status: "Ativo" },
  { icon: CreditCard, title: "Stripe", desc: "Processamento de pagamentos", status: "Configurar" },
  { icon: Brain, title: "Lovable AI", desc: "IA Gateway para chat e prescrições", status: "Ativo" },
  { icon: Mail, title: "E-mail", desc: "Notificações e comunicação", status: "Configurar" },
];

export default function IntegrationsPage() {
  return (
    <PageShell icon={Plug} title="Integrações" description="Conecte serviços externos ao ecossistema Nexus">
      <div className="grid md:grid-cols-2 gap-4">
        {integrations.map((i) => (
          <div key={i.title} className="glass-card-hover p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center"><i.icon className="h-5 w-5 text-primary" /></div>
            <div className="flex-1"><h3 className="font-display font-semibold">{i.title}</h3><p className="text-xs text-muted-foreground font-sans">{i.desc}</p></div>
            <span className={`text-xs px-2 py-1 rounded-full font-sans ${i.status === "Ativo" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-secondary text-muted-foreground border border-border"}`}>{i.status}</span>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
