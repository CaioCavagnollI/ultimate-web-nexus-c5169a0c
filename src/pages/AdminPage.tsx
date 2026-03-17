import { PageShell } from "@/components/PageShell";
import { Shield, Upload, Database, Users, Settings, BarChart3, FileText, Plug } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "overview", label: "Visão Geral", icon: BarChart3 },
  { id: "uploads", label: "Uploads & RAG", icon: Upload },
  { id: "users", label: "Usuários", icon: Users },
  { id: "atlas", label: "Atlas Mapping", icon: Database },
  { id: "integrations", label: "Integrações", icon: Plug },
  { id: "logs", label: "Logs", icon: FileText },
  { id: "settings", label: "Configurações", icon: Settings },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [uploadFiles, setUploadFiles] = useState<{ name: string; status: string }[]>([]);

  const handleAdminUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadFiles((p) => [...p, ...files.map((f) => ({ name: f.name, status: "Processando..." }))]);
    setTimeout(() => {
      setUploadFiles((p) => p.map((f) => ({ ...f, status: "Vetorizado ✓" })));
    }, 2000);
  }, []);

  return (
    <PageShell icon={Shield} title="Painel Admin" description="Governança, uploads, integrações e gerenciamento do ecossistema">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-sans whitespace-nowrap transition-colors ${activeTab === t.id ? "bg-primary/20 text-primary border border-primary/40" : "bg-secondary text-muted-foreground border border-border"}`}>
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid md:grid-cols-3 gap-4">
          {[{ label: "Usuários Total", value: "0" }, { label: "Produtos na Loja", value: "6" }, { label: "Documentos RAG", value: uploadFiles.filter((f) => f.status.includes("✓")).length.toString() }, { label: "Receita Total", value: "R$ 0,00" }, { label: "Afiliados Ativos", value: "0" }, { label: "Mentorias Ativas", value: "0" }].map((s) => (
            <div key={s.label} className="glass-card p-5">
              <p className="text-sm text-muted-foreground font-sans">{s.label}</p>
              <p className="text-2xl font-display font-bold mt-1">{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "uploads" && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold text-lg mb-4">Upload de Conhecimento (RAG)</h3>
            <p className="text-sm text-muted-foreground font-sans mb-4">Faça upload de PDFs, DOCX e textos para alimentar a base de conhecimento da IA.</p>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/30 transition-colors" onClick={() => document.getElementById("admin-upload")?.click()}>
              <Upload className="h-8 w-8 mx-auto mb-2 text-primary/50" />
              <p className="text-sm text-muted-foreground font-sans">Clique ou arraste arquivos (PDF, DOCX, TXT)</p>
              <input id="admin-upload" type="file" multiple accept=".pdf,.docx,.txt" className="hidden" onChange={handleAdminUpload} />
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold text-lg mb-4">Acervo Processado</h3>
            {uploadFiles.length === 0 ? (
              <p className="text-sm text-muted-foreground font-sans">Nenhum documento processado ainda.</p>
            ) : (
              <div className="space-y-2">
                {uploadFiles.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <span className="text-sm font-sans">{f.name}</span>
                    <span className="text-xs text-primary font-sans">{f.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "atlas" && (
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg mb-4">Mapeamento Atlas — Taxonomia</h3>
          <p className="text-sm text-muted-foreground font-sans mb-4">Organize o vínculo entre o Atlas ID do scanner e informações internas de equipamentos.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead><tr className="border-b border-border text-muted-foreground"><th className="text-left p-3">Atlas ID</th><th className="text-left p-3">Equipamento</th><th className="text-left p-3">Músculos-alvo</th><th className="text-left p-3">Status</th></tr></thead>
              <tbody>
                <tr className="border-b border-border/50"><td className="p-3 text-primary">ATL-001</td><td className="p-3">Supino Reto</td><td className="p-3 text-muted-foreground">Peitoral, Tríceps, Deltóide</td><td className="p-3"><span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Ativo</span></td></tr>
                <tr className="border-b border-border/50"><td className="p-3 text-primary">ATL-002</td><td className="p-3">Leg Press 45°</td><td className="p-3 text-muted-foreground">Quadríceps, Glúteos</td><td className="p-3"><span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Ativo</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {["users", "integrations", "logs", "settings"].includes(activeTab) && (
        <div className="glass-card p-8 text-center text-muted-foreground font-sans">
          <Settings className="h-10 w-10 mx-auto mb-3 text-primary/30" />
          <p>Módulo {tabs.find((t) => t.id === activeTab)?.label} — Em desenvolvimento.</p>
        </div>
      )}
    </PageShell>
  );
}
