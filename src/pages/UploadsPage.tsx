import { useState, useCallback, useEffect } from "react";
import { PageShell } from "@/components/PageShell";
import { Upload, FolderOpen, Trash2, Download, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const categories = ["Geral", "IA/RAG", "Store", "Scanner", "Editorial", "Acadêmico"];

interface StoredFile {
  name: string;
  category: string;
  size: string;
  date: string;
  path: string;
}

export default function UploadsPage() {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [selectedCat, setSelectedCat] = useState("Geral");
  const [filterCat, setFilterCat] = useState("Todos");
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const { user } = useAuth();

  const fetchFiles = useCallback(async () => {
    if (!user) return;
    setLoadingFiles(true);
    try {
      const allFiles: StoredFile[] = [];
      for (const cat of categories) {
        const folder = `${user.id}/${cat}`;
        const { data, error } = await supabase.storage.from("uploads").list(folder);
        if (error) continue;
        if (data) {
          for (const f of data) {
            if (f.name === ".emptyFolderPlaceholder") continue;
            allFiles.push({
              name: f.name,
              category: cat,
              size: f.metadata?.size ? (Number(f.metadata.size) / 1024).toFixed(0) + " KB" : "—",
              date: f.created_at ? new Date(f.created_at).toLocaleDateString("pt-BR") : "—",
              path: `${folder}/${f.name}`,
            });
          }
        }
      }
      setFiles(allFiles);
    } finally {
      setLoadingFiles(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const uploadFiles = async (fileList: File[]) => {
    if (!user || fileList.length === 0) return;
    setUploading(true);
    let successCount = 0;
    for (const file of fileList) {
      const filePath = `${user.id}/${selectedCat}/${file.name}`;
      const { error } = await supabase.storage.from("uploads").upload(filePath, file, { upsert: true });
      if (error) {
        toast.error(`Erro ao enviar ${file.name}: ${error.message}`);
      } else {
        successCount++;
      }
    }
    if (successCount > 0) {
      toast.success(`${successCount} arquivo(s) enviado(s) com sucesso!`);
      await fetchFiles();
    }
    setUploading(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    uploadFiles(Array.from(e.dataTransfer.files));
  }, [user, selectedCat]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadFiles(Array.from(e.target.files || []));
    e.target.value = "";
  };

  const handleDownload = async (file: StoredFile) => {
    const { data, error } = await supabase.storage.from("uploads").createSignedUrl(file.path, 60);
    if (error || !data?.signedUrl) {
      toast.error("Erro ao gerar link de download.");
      return;
    }
    window.open(data.signedUrl, "_blank");
  };

  const handleDelete = async (file: StoredFile) => {
    const { error } = await supabase.storage.from("uploads").remove([file.path]);
    if (error) {
      toast.error("Erro ao excluir arquivo.");
      return;
    }
    toast.success("Arquivo excluído.");
    setFiles((p) => p.filter((f) => f.path !== file.path));
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
        onClick={() => !uploading && document.getElementById("file-input")?.click()}
      >
        {uploading ? (
          <Loader2 className="h-10 w-10 mx-auto mb-3 text-primary animate-spin" />
        ) : (
          <Upload className="h-10 w-10 mx-auto mb-3 text-primary/50" />
        )}
        <p className="text-muted-foreground font-sans text-sm">
          {uploading ? "Enviando arquivos..." : "Arraste arquivos aqui ou clique para selecionar"}
        </p>
        <p className="text-xs text-muted-foreground/60 font-sans mt-1">Suporta PDF, DOCX, TXT, imagens e mais</p>
        <input id="file-input" type="file" multiple className="hidden" onChange={handleInput} />
      </div>

      {/* Filter & List */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground font-sans">Filtrar:</span>
        <button onClick={() => setFilterCat("Todos")} className={`px-3 py-1 rounded-lg text-xs font-sans ${filterCat === "Todos" ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}>Todos</button>
        {categories.map((c) => (
          <button key={c} onClick={() => setFilterCat(c)} className={`px-3 py-1 rounded-lg text-xs font-sans ${filterCat === c ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}>{c}</button>
        ))}
      </div>

      {loadingFiles ? (
        <div className="glass-card p-8 text-center">
          <Loader2 className="h-6 w-6 mx-auto animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card p-8 text-center text-muted-foreground font-sans text-sm">Nenhum arquivo enviado ainda.</div>
      ) : (
        <div className="space-y-2">
          {filtered.map((f) => (
            <div key={f.path} className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <FolderOpen className="h-4 w-4 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-sans font-medium truncate">{f.name}</p>
                  <p className="text-xs text-muted-foreground font-sans">{f.category} • {f.size} • {f.date}</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDownload(f)}><Download className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(f)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
