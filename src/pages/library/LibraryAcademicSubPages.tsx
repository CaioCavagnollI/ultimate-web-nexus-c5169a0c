import { SubPageShell } from "@/components/SubPageShell";
import { BookOpen, Heart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/EmptyState";
import { useParams } from "react-router-dom";

export function LibraryFavoritesPage() {
  return (<SubPageShell icon={Heart} title="Favoritos" breadcrumbs={[{label:"Biblioteca",href:"/library"},{label:"Favoritos"}]}><EmptyState icon={Heart} title="Nenhum favorito" description="Salve conteúdos para acessar rapidamente." /></SubPageShell>);
}
export function LibraryDetailPage() {
  const { id } = useParams();
  return (<SubPageShell icon={BookOpen} title={`Documento ${id || ""}`} breadcrumbs={[{label:"Biblioteca",href:"/library"},{label:id||"Detalhe"}]}><div className="glass-card p-8 text-center"><p className="text-sm text-muted-foreground font-sans">Detalhes do documento.</p></div></SubPageShell>);
}
export function AcademicSearchPage() {
  return (<SubPageShell icon={Search} title="Busca Acadêmica" breadcrumbs={[{label:"Acadêmico",href:"/academic"},{label:"Busca"}]}><div className="relative max-w-lg"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Buscar por título, DOI ou autor..." className="pl-10 bg-secondary border-border" /></div><EmptyState icon={Search} title="Busque artigos" description="Pesquise nas bases PubMed, Crossref e Google Scholar." /></SubPageShell>);
}
export function AcademicSavedPage() {
  return (<SubPageShell icon={Heart} title="Artigos Salvos" breadcrumbs={[{label:"Acadêmico",href:"/academic"},{label:"Salvos"}]}><EmptyState icon={Heart} title="Nenhum artigo salvo" description="Salve artigos para revisão posterior." /></SubPageShell>);
}
export function AcademicPaperPage() {
  const { id } = useParams();
  return (<SubPageShell icon={BookOpen} title={`Paper ${id || ""}`} breadcrumbs={[{label:"Acadêmico",href:"/academic"},{label:id||"Paper"}]}><div className="glass-card p-8 text-center"><p className="text-sm text-muted-foreground font-sans">Detalhes do artigo científico.</p></div></SubPageShell>);
}
