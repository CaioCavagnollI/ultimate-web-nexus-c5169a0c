import { PageShell } from "@/components/PageShell";
import { GraduationCap, Search, BookOpen, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AcademicPage() {
  return (
    <PageShell icon={GraduationCap} title="Acadêmico" description="Pesquisa acadêmica, DOIs, PubMed, Crossref e biblioteca de artigos">
      <div className="glass-card p-5 flex gap-3">
        <Search className="h-5 w-5 text-muted-foreground mt-2.5" />
        <Input placeholder="Buscar artigos científicos por título, DOI ou autor..." className="bg-secondary border-border" />
        <Button variant="hero">Buscar</Button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass-card-hover p-5"><BookOpen className="h-5 w-5 text-primary mb-3" /><h3 className="font-display font-semibold">PubMed</h3><p className="text-xs text-muted-foreground font-sans mt-1">Acesso direto a artigos indexados.</p></div>
        <div className="glass-card-hover p-5"><ExternalLink className="h-5 w-5 text-primary mb-3" /><h3 className="font-display font-semibold">Crossref</h3><p className="text-xs text-muted-foreground font-sans mt-1">Resolução de DOIs e metadados.</p></div>
        <div className="glass-card-hover p-5"><GraduationCap className="h-5 w-5 text-primary mb-3" /><h3 className="font-display font-semibold">Biblioteca Privada</h3><p className="text-xs text-muted-foreground font-sans mt-1">Artigos salvos e acessados recentemente.</p></div>
      </div>
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold mb-3">Artigos Recentes</h3>
        <p className="text-sm text-muted-foreground font-sans">Nenhum artigo acessado ainda. Use a busca acima.</p>
      </div>
    </PageShell>
  );
}
