import { Brain, MessageSquare, Sparkles, BookOpen, FileText, GraduationCap, Mic, Lightbulb } from "lucide-react";
import { DomainCard } from "@/components/DomainCard";
import { SubPageShell } from "@/components/SubPageShell";

const modes = [
  { icon: MessageSquare, title: "Atlas Chat", desc: "Conversa livre com IA científica", href: "/atlas/chat", badge: "Chat" },
  { icon: Sparkles, title: "Atlas Assistant", desc: "Assistente guiado para tarefas específicas", href: "/atlas/assistant", badge: "IA" },
  { icon: Lightbulb, title: "Atlas Explain", desc: "Explicações detalhadas de conceitos", href: "/atlas/explain" },
  { icon: Brain, title: "Atlas Mentor", desc: "Mentoria científica personalizada", href: "/atlas/mentor", badge: "Pro" },
  { icon: GraduationCap, title: "Atlas Research", desc: "Pesquisa e análise de artigos", href: "/atlas/research" },
  { icon: FileText, title: "Atlas Prescription", desc: "Prescrição assistida por IA", href: "/atlas/prescription" },
  { icon: Mic, title: "Atlas Speak", desc: "Interface por voz (em breve)", href: "/atlas/speak", badge: "Soon" },
];

export default function AtlasHubPage() {
  return (
    <SubPageShell icon={Brain} title="Atlas — IA Científica" description="Motor de inteligência artificial do Nexus para treinamento baseado em evidência">
      <div className="glass-card p-8 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center">
            <Brain className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold">Atlas</h2>
            <p className="text-sm text-muted-foreground font-sans">Powered by science. Built for strength.</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground font-sans max-w-2xl">
          O Atlas é o motor de IA do Nexus. Ele processa evidências científicas, analisa dados de treinamento, gera prescrições personalizadas e responde perguntas com referências peer-reviewed.
        </p>
      </div>

      <div>
        <h2 className="font-display font-semibold text-lg mb-4">Modos de Uso</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modes.map((m) => (
            <DomainCard key={m.title} icon={m.icon} title={m.title} description={m.desc} href={m.href} badge={m.badge} />
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold mb-3">Capacidades</h3>
          <ul className="space-y-2 text-sm font-sans text-muted-foreground">
            <li>• Respostas com citações científicas</li>
            <li>• Análise de artigos e DOIs</li>
            <li>• Prescrição baseada em anamnese</li>
            <li>• Cálculos de volume e intensidade</li>
            <li>• Explicações biomecânicas</li>
          </ul>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold mb-3">Modelos</h3>
          <ul className="space-y-2 text-sm font-sans text-muted-foreground">
            <li>• GPT-5 para raciocínio complexo</li>
            <li>• Gemini 2.5 para multimodal</li>
            <li>• RAG sobre base científica</li>
            <li>• Fine-tuning em exercício</li>
          </ul>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold mb-3">Integrações</h3>
          <ul className="space-y-2 text-sm font-sans text-muted-foreground">
            <li>• PubMed / Crossref</li>
            <li>• Scanner Atlas</li>
            <li>• Anamnese & Prescrição</li>
            <li>• Nexus Lab calculadoras</li>
          </ul>
        </div>
      </div>
    </SubPageShell>
  );
}
