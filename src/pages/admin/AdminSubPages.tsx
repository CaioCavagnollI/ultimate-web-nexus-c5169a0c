import { SubPageShell } from "@/components/SubPageShell";
import { Shield, Users, Upload, BookOpen, Crown, ShoppingBag, CreditCard, DollarSign, FileText, Activity, Eye, Settings, BarChart3, FolderOpen, Download, Trash2, Loader2, Filter } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { MetricCard } from "@/components/MetricCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const bc = (l: string) => [{ label: "Admin", href: "/admin" }, { label: l }];

export function AdminUsersPage() {
  return (<SubPageShell icon={Users} title="Usuários" breadcrumbs={bc("Usuários")}><DataTable columns={[{key:"name",label:"Nome"},{key:"email",label:"E-mail"},{key:"plan",label:"Plano"},{key:"status",label:"Status",render:()=><StatusBadge variant="active">Ativo</StatusBadge>}]} data={[{name:"João Silva",email:"joao@email.com",plan:"Free",status:"Ativo"}]} /></SubPageShell>);
}

const uploadCategories = ["Geral", "IA/RAG", "Store", "Scanner", "Editorial", "Acadêmico"];

interface AdminFile {
  name: string;
  category: string;
  size: string;
  date: string;
  path: string;
}

export function AdminUploadsPage() {
  const [files, setFiles] = useState<AdminFile[]>([]);
  const [selectedCat, setSelectedCat] = useState("IA/RAG");
  const [filterCat, setFilterCat] = useState("Todos");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchFiles = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const allFiles: AdminFile[] = [];
      for (const cat of uploadCategories) {
        const folder = `${user.id}/${cat}`;
        const { data } = await supabase.storage.from("uploads").list(folder);
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
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchFiles(); }, [fetchFiles]);

  const handleUpload = async (fileList: File[]) => {
    if (!user || fileList.length === 0) return;
    setUploading(true);
    let ok = 0;
    for (const file of fileList) {
      const path = `${user.id}/${selectedCat}/${file.name}`;
      const { error } = await supabase.storage.from("uploads").upload(path, file, { upsert: true });
      if (error) toast.error(`Erro: ${file.name}`);
      else ok++;
    }
    if (ok > 0) { toast.success(`${ok} arquivo(s) enviado(s)`); await fetchFiles(); }
    setUploading(false);
  };

  const handleDownload = async (file: AdminFile) => {
    const { data, error } = await supabase.storage.from("uploads").createSignedUrl(file.path, 60);
    if (error || !data?.signedUrl) { toast.error("Erro ao gerar link"); return; }
    window.open(data.signedUrl, "_blank");
  };

  const handleDelete = async (file: AdminFile) => {
    const { error } = await supabase.storage.from("uploads").remove([file.path]);
    if (error) { toast.error("Erro ao excluir"); return; }
    toast.success("Arquivo excluído");
    setFiles((p) => p.filter((f) => f.path !== file.path));
  };

  const filtered = filterCat === "Todos" ? files : files.filter((f) => f.category === filterCat);

  return (
    <SubPageShell icon={Upload} title="Uploads & Conhecimento (RAG)" description="Upload de documentos para alimentar a base de conhecimento da IA" breadcrumbs={bc("Uploads")}>
      {/* Category selector */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground font-sans">Pasta destino:</span>
        {uploadCategories.map((c) => (
          <button key={c} onClick={() => setSelectedCat(c)} className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-colors ${c === selectedCat ? "bg-primary/20 text-primary border border-primary/40" : "bg-secondary text-muted-foreground border border-border hover:border-primary/20"}`}>
            <FolderOpen className="h-3 w-3 inline mr-1" /> {c}
          </button>
        ))}
      </div>

      {/* Drop zone */}
      <div
        className="glass-card p-10 text-center border-2 border-dashed border-border hover:border-primary/30 transition-colors cursor-pointer"
        onClick={() => !uploading && document.getElementById("admin-upload-input")?.click()}
      >
        {uploading ? (
          <Loader2 className="h-10 w-10 mx-auto mb-3 text-primary animate-spin" />
        ) : (
          <Upload className="h-10 w-10 mx-auto mb-3 text-primary/50" />
        )}
        <p className="text-muted-foreground font-sans text-sm">
          {uploading ? "Enviando arquivos..." : "Clique ou arraste arquivos (PDF, DOCX, TXT, imagens)"}
        </p>
        <p className="text-xs text-muted-foreground/60 font-sans mt-1">Máximo 20MB por arquivo</p>
        <input
          id="admin-upload-input"
          type="file"
          multiple
          accept=".pdf,.docx,.txt,.png,.jpg,.jpeg,.csv"
          className="hidden"
          onChange={(e) => { handleUpload(Array.from(e.target.files || [])); e.target.value = ""; }}
        />
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground font-sans">Filtrar:</span>
        <button onClick={() => setFilterCat("Todos")} className={`px-3 py-1 rounded-lg text-xs font-sans ${filterCat === "Todos" ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}>Todos</button>
        {uploadCategories.map((c) => (
          <button key={c} onClick={() => setFilterCat(c)} className={`px-3 py-1 rounded-lg text-xs font-sans ${filterCat === c ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}>{c}</button>
        ))}
      </div>

      {/* File list */}
      {loading ? (
        <div className="glass-card p-8 text-center"><Loader2 className="h-6 w-6 mx-auto animate-spin text-primary" /></div>
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
    </SubPageShell>
  );
}

export function AdminLibraryPage() {
  return (<SubPageShell icon={BookOpen} title="Biblioteca" breadcrumbs={bc("Biblioteca")}><EmptyState icon={BookOpen} title="Gerenciamento de conteúdo" description="Administre a biblioteca de conteúdos do Nexus." /></SubPageShell>);
}
export function AdminPlansPage() {
  return (<SubPageShell icon={Crown} title="Planos" breadcrumbs={bc("Planos")}><EmptyState icon={Crown} title="Gerenciamento de planos" description="Configure planos, limites e funcionalidades por tier." /></SubPageShell>);
}
export function AdminProductsPage() {
  return (<SubPageShell icon={ShoppingBag} title="Produtos" breadcrumbs={bc("Produtos")}><EmptyState icon={ShoppingBag} title="Catálogo de produtos" description="Gerencie produtos digitais da loja." /></SubPageShell>);
}
export function AdminStorePage() {
  return (<SubPageShell icon={ShoppingBag} title="Loja" breadcrumbs={bc("Loja")}><EmptyState icon={ShoppingBag} title="Admin da Loja" description="Controle operacional da loja digital." /></SubPageShell>);
}
export function AdminBillingPage() {
  return (<SubPageShell icon={CreditCard} title="Billing" breadcrumbs={bc("Billing")}><EmptyState icon={CreditCard} title="Faturamento" description="Visão geral de faturamento e assinaturas." /></SubPageShell>);
}
export function AdminPayoutsPage() {
  return (<SubPageShell icon={DollarSign} title="Payouts" breadcrumbs={bc("Payouts")}><EmptyState icon={DollarSign} title="Repasses" description="Gerencie repasses para afiliados e mentores." /></SubPageShell>);
}
export function AdminLogsPage() {
  return (<SubPageShell icon={FileText} title="Logs" breadcrumbs={bc("Logs")}><EmptyState icon={FileText} title="Logs do sistema" description="Logs de operação, erros e eventos." /></SubPageShell>);
}
export function AdminHealthPage() {
  return (<SubPageShell icon={Activity} title="Health" breadcrumbs={bc("Health")}><div className="grid grid-cols-2 lg:grid-cols-4 gap-4"><MetricCard label="API" value="Online" trend="up" change="99.9%" /><MetricCard label="DB" value="Online" trend="up" change="< 50ms" /><MetricCard label="Storage" value="Online" /><MetricCard label="Edge Functions" value="Online" /></div></SubPageShell>);
}
export function AdminObservabilityPage() {
  return (<SubPageShell icon={Eye} title="Observabilidade" breadcrumbs={bc("Observabilidade")}><EmptyState icon={Eye} title="Métricas e monitoramento" description="Dashboards de observabilidade do sistema." /></SubPageShell>);
}
export function AdminAuditPage() {
  return (<SubPageShell icon={Shield} title="Auditoria" breadcrumbs={bc("Auditoria")}><EmptyState icon={Shield} title="Trilha de auditoria" description="Registro de ações administrativas e mudanças no sistema." /></SubPageShell>);
}
export function AdminSettingsPage() {
  return (<SubPageShell icon={Settings} title="Configurações Admin" breadcrumbs={bc("Configurações")}><EmptyState icon={Settings} title="Configurações do sistema" description="Ajustes globais da plataforma." /></SubPageShell>);
}
export function AdminExecutivePage() {
  return (<SubPageShell icon={BarChart3} title="Visão Executiva" breadcrumbs={bc("Executivo")}><div className="grid grid-cols-2 lg:grid-cols-4 gap-4"><MetricCard label="Usuários" value="1" change="+1" trend="up" /><MetricCard label="Receita" value="R$ 0" /><MetricCard label="Retenção" value="—" /><MetricCard label="NPS" value="—" /></div></SubPageShell>);
}
