import { SubPageShell } from "@/components/SubPageShell";
import { GraduationCap, Search, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AtlasResearchPage() {
  const [query, setQuery] = useState("");
  return (
    <SubPageShell icon={GraduationCap} title="Atlas Research" description="Pesquisa de artigos e análise científica assistida" breadcrumbs={[{ label: "Atlas", href: "/atlas" }, { label: "Research" }]}>
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold mb-4">Buscar Artigos</h3>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por título, DOI, autor ou tema..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10 bg-secondary border-border" />
          </div>
          <Button variant="hero">Pesquisar</Button>
        </div>
      </div>
      <div className="glass-card p-8 text-center">
        <GraduationCap className="h-10 w-10 mx-auto mb-3 text-primary/30" />
        <p className="text-sm text-muted-foreground font-sans">Digite um termo de busca para pesquisar artigos nas bases PubMed, Crossref e Google Scholar via Atlas.</p>
      </div>
    </SubPageShell>
  );
}
