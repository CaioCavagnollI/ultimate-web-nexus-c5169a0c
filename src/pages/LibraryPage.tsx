import { PageShell } from "@/components/PageShell";
import { Library, BookOpen, GraduationCap, Dumbbell } from "lucide-react";

export default function LibraryPage() {
  return (
    <PageShell icon={Library} title="Biblioteca" description="Acervo científico completo com progresso de leitura">
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, label: "E-books", count: "0" },
          { icon: GraduationCap, label: "Artigos", count: "0" },
          { icon: Dumbbell, label: "Programas", count: "0" },
          { icon: Library, label: "Cursos", count: "0" },
        ].map((c) => (
          <div key={c.label} className="glass-card p-5 text-center">
            <c.icon className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="font-display font-semibold">{c.label}</p>
            <p className="text-2xl font-display font-bold text-primary mt-1">{c.count}</p>
          </div>
        ))}
      </div>
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold mb-3">Sua Biblioteca</h3>
        <p className="text-sm text-muted-foreground font-sans">Compre, salve ou anexe materiais para vê-los aqui com progresso de leitura.</p>
      </div>
    </PageShell>
  );
}
