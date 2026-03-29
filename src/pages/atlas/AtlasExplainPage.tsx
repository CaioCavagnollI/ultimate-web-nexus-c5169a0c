import { SubPageShell } from "@/components/SubPageShell";
import { Lightbulb, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const topics = [
  { term: "Periodização Ondulatória", definition: "Modelo de periodização que varia volume e intensidade ao longo da semana para otimizar adaptações musculares e neurais." },
  { term: "RPE (Rating of Perceived Exertion)", definition: "Escala subjetiva de 1-10 usada para monitorar e autoregular intensidade de treinamento. Validada como ferramenta confiável para prescrição." },
  { term: "Volume de Treino", definition: "Número total de séries efetivas por grupamento muscular por semana. A dose mínima efetiva (MEV) e o volume máximo recuperável (MRV) são individualizados." },
  { term: "Dose-Resposta", definition: "Relação entre a quantidade de estímulo (volume, intensidade) e a magnitude da resposta adaptativa (hipertrofia, força)." },
  { term: "Especificidade", definition: "Princípio que indica que adaptações são específicas ao tipo de estímulo aplicado. Treinamento pesado gera adaptações neurais; moderado gera hipertrofia." },
  { term: "Progressive Overload", definition: "Aumento progressivo da demanda mecânica ao longo do tempo para garantir adaptações contínuas. Pode ser via carga, volume, frequência ou tempo sob tensão." },
  { term: "Deload", definition: "Período planejado de redução de volume e/ou intensidade para permitir recuperação e supercompensação." },
  { term: "Failure Training", definition: "Treino até a falha concêntrica. Eficaz para hipertrofia mas gera maior fadiga. Recomendado de forma estratégica, não sistemática." },
];

export default function AtlasExplainPage() {
  const [search, setSearch] = useState("");
  const filtered = topics.filter((t) => t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase()));

  return (
    <SubPageShell icon={Lightbulb} title="Atlas Explain" description="Glossário científico e explicações detalhadas de conceitos" breadcrumbs={[{ label: "Atlas", href: "/atlas" }, { label: "Explain" }]}>
      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar conceito..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-secondary border-border" />
      </div>
      <div className="space-y-4">
        {filtered.map((t) => (
          <div key={t.term} className="glass-card p-6">
            <h3 className="font-display font-semibold text-lg mb-2 text-primary">{t.term}</h3>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed">{t.definition}</p>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground font-sans text-center py-8">Nenhum conceito encontrado.</p>}
      </div>
    </SubPageShell>
  );
}
