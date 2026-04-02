import { useState } from "react";
import { SubPageShell } from "@/components/SubPageShell";
import { FileSearch, Loader2, Upload, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useArticleAnalyses, useSaveArticleAnalysis } from "@/hooks/useArticleAnalyses";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

interface AnalysisResult {
  summary_technical: string;
  summary_practical: string;
  limitations: string;
  evidence_level: string;
  risk_of_bias: string;
  practical_application: string;
}

export default function ArticleAnalyzerPage() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [doi, setDoi] = useState("");
  const [abstractText, setAbstractText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const { data: pastAnalyses } = useArticleAnalyses();
  const saveAnalysis = useSaveArticleAnalysis();

  const analyze = async () => {
    if (!abstractText.trim() && !doi.trim() && !title.trim()) {
      toast.error("Preencha pelo menos o abstract, DOI ou título");
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-article", {
        body: { title, doi, abstract: abstractText },
      });
      if (error) throw error;
      if (data?.analysis) {
        setResult(data.analysis);
        // Save to DB
        await saveAnalysis.mutateAsync({
          title: title || "Artigo sem título",
          doi: doi || null,
          abstract: abstractText || null,
          summary_technical: data.analysis.summary_technical,
          summary_practical: data.analysis.summary_practical,
          limitations: data.analysis.limitations,
          evidence_level: data.analysis.evidence_level,
          risk_of_bias: data.analysis.risk_of_bias,
          practical_application: data.analysis.practical_application,
        });
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Erro na análise");
    }
    setLoading(false);
  };

  return (
    <SubPageShell
      icon={FileSearch}
      title="Article Analyzer"
      description="Análise estruturada de artigos científicos com IA"
      breadcrumbs={[{ label: "Atlas", href: "/atlas" }, { label: "Article Analyzer" }]}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-4">
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-display font-semibold">Dados do Artigo</h3>
            <Input placeholder="Título do artigo" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="DOI (ex: 10.1111/sms.14044)" value={doi} onChange={(e) => setDoi(e.target.value)} />
            <Textarea
              placeholder="Cole o abstract ou texto do artigo aqui..."
              className="min-h-[200px]"
              value={abstractText}
              onChange={(e) => setAbstractText(e.target.value)}
            />
            <Button variant="hero" className="w-full" onClick={analyze} disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Analisando...</> : "Analisar Artigo"}
            </Button>
          </div>

          {/* Past analyses */}
          {pastAnalyses && pastAnalyses.length > 0 && (
            <div className="glass-card p-4">
              <h4 className="font-display font-semibold text-sm mb-3">Análises Anteriores</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {pastAnalyses.slice(0, 10).map((a) => (
                  <button
                    key={a.id}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-secondary text-xs font-sans truncate text-muted-foreground"
                    onClick={() => {
                      setResult({
                        summary_technical: a.summary_technical || "",
                        summary_practical: a.summary_practical || "",
                        limitations: a.limitations || "",
                        evidence_level: a.evidence_level || "",
                        risk_of_bias: a.risk_of_bias || "",
                        practical_application: a.practical_application || "",
                      });
                      setTitle(a.title || "");
                      setDoi(a.doi || "");
                    }}
                  >
                    {a.title || "Sem título"} — {new Date(a.created_at).toLocaleDateString("pt-BR")}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Result */}
        <div className="space-y-4">
          {result ? (
            <>
              <Section title="📊 Resumo Técnico" content={result.summary_technical} />
              <Section title="🎯 Aplicação Prática" content={result.summary_practical} />
              <Section title="⚠️ Limitações" content={result.limitations} />
              <Section title="📈 Nível de Evidência" content={result.evidence_level} />
              <Section title="🔍 Risco de Viés" content={result.risk_of_bias} />
              <Section title="💪 Aplicação na Prescrição" content={result.practical_application} />
            </>
          ) : (
            <div className="glass-card p-8 text-center text-muted-foreground font-sans">
              <FileSearch className="h-12 w-12 mx-auto mb-4 opacity-40" />
              <p>Cole o abstract ou DOI de um artigo para análise estruturada.</p>
              <p className="text-xs mt-2">A IA avaliará: achados, limitações, nível de evidência, viés e aplicação prática.</p>
            </div>
          )}
        </div>
      </div>
    </SubPageShell>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div className="glass-card p-4">
      <h4 className="font-display font-semibold text-sm mb-2">{title}</h4>
      <div className="text-sm font-sans text-muted-foreground prose prose-sm prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
