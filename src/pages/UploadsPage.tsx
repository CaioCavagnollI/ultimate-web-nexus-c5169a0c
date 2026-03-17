import { useState, useCallback } from "react";
import { PageShell } from "@/components/PageShell";
import { Upload, FolderOpen, Trash2, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["Geral", "IA/RAG", "Store", "Scanner", "Editorial", "Acadêmico"];

interface UpFile { name: string; category: string; size: string; date: string }

export default function UploadsPage() {
  const [files, setFiles] = useState<UpFile[]>([]);
  const [selectedCat, setSelectedCat] = useState("Geral");
  const [filterCat, setFilterCat] = useState("Todos");
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files);
    const newFiles = dropped.map((f) => ({
      name: f.name,
      category: selectedCat,
      size: (f.size / 1024).toFixed(0) + " KB",
      date: new Date().toLocaleDateString("pt-BR"),
    }));
    setFiles((p) => [...p, ...newFiles]);
  }, [selectedCat]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const newFiles = selected.map((f) => ({
      name: f.name,
      category: selectedCat,
      size: (f.size / 1024).toFixed(0) + " KB",
      date: new Date().toLocaleDateString("pt-BR"),
    }));
    setFiles((p) => [...p, ...newFiles]);
  };

  const filtered = filterCat === "Todos" ? files : files.filter((f) => f.category === filterCat);

  return (
    <PageShell icon={Upload} title="Uploads" description="Arraste e solte arquivos para alimentar IA, loja, scanner e mais">
      {/* Category selector */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground font-sans">Pasta destino:</span>
        {categories.map((c) => (
          <button key={c} onClick={() => setSelectedCat(c)} className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-colors ${c === selectedCat ? "bg-primary/20 text-primary border border-primary/40" : "bg-secondary text-muted-foreground border border-border hover:border-primary/20"}`}>
            <FolderOpen className="h-3 w-3 inline mr-1" /> {c}
          </button>
        ))}
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`glass-card p-12 text-center border-2 border-dashed transition-colors cursor-pointer ${dragOver ? "border-primary bg-primary/5" : "border-border"}`}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <Upload className="h-10 w-10 mx-auto mb-3 text-primary/50" />
        <p className="text-muted-foreground font-sans text-sm">Arraste arquivos aqui ou clique para selecionar</p>
        <p className="text-xs text-muted-foreground/60 font-sans mt-1">Suporta PDF, DOCX, TXT, imagens e mais</p>
        <input id="file-input" type="file" multiple className="hidden" onChange={handleInput} />
      </div>

      {/* Filter & List */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground font-sans">Filtrar:</span>
        <button onClick={() => setFilterCat("Todos")} className={`px-3 py-1 rounded-lg text-xs font-sans ${filterCat === "Todos" ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}>Todos</button>
        {categories.map((c) => (
          <button key={c} onClick={() => setFilterCat(c)} className={`px-3 py-1 rounded-lg text-xs font-sans ${filterCat === c ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}>{c}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card p-8 text-center text-muted-foreground font-sans text-sm">Nenhum arquivo enviado ainda.</div>
      ) : (
        <div className="space-y-2">
          {filtered.map((f, i) => (
            <div key={i} className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FolderOpen className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-sans font-medium">{f.name}</p>
                  <p className="text-xs text-muted-foreground font-sans">{f.category} • {f.size} • {f.date}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setFiles((p) => p.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
