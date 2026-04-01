import { useState, useRef, useEffect, useCallback } from "react";
import { SubPageShell } from "@/components/SubPageShell";
import { MessageSquare, Send, Loader2, Brain, Plus, History, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/hooks/useAuth";
import { useConversations, useMessages, useCreateConversation, useSaveMessage } from "@/hooks/useConversations";
import { useAiMemory } from "@/hooks/useAiMemory";
import { toast } from "sonner";

type AtlasMode = "chat" | "mentor" | "explain" | "research" | "prescription" | "article";

const MODE_LABELS: Record<AtlasMode, { label: string; description: string }> = {
  chat: { label: "Chat", description: "Conversa livre com IA científica" },
  mentor: { label: "Mentor", description: "Mentoria acadêmica avançada" },
  explain: { label: "Explain", description: "Explicações acessíveis de conceitos" },
  research: { label: "Research", description: "Pesquisa científica com citações" },
  prescription: { label: "Prescrição", description: "Assistente de prescrição de treino" },
  article: { label: "Analyzer", description: "Análise de artigos científicos" },
};

interface LocalMsg { role: "user" | "assistant"; content: string }

export default function AtlasChatPage() {
  const { user } = useAuth();
  const [mode, setMode] = useState<AtlasMode>("chat");
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [localMessages, setLocalMessages] = useState<LocalMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: conversations } = useConversations(mode);
  const { data: dbMessages } = useMessages(activeConversationId ?? undefined);
  const createConversation = useCreateConversation();
  const saveMessage = useSaveMessage();
  const { data: memoryItems } = useAiMemory();

  // Sync DB messages to local state when conversation changes
  useEffect(() => {
    if (dbMessages) {
      setLocalMessages(dbMessages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })));
    }
  }, [dbMessages]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [localMessages]);

  const startNewConversation = useCallback(() => {
    setActiveConversationId(null);
    setLocalMessages([]);
  }, []);

  const loadConversation = useCallback((id: string) => {
    setActiveConversationId(id);
    setShowHistory(false);
  }, []);

  const send = async () => {
    if (!input.trim() || loading || !user) return;
    const userContent = input.trim();
    const userMsg: LocalMsg = { role: "user", content: userContent };
    const allMsgs = [...localMessages, userMsg];
    setLocalMessages(allMsgs);
    setInput("");
    setLoading(true);

    try {
      // Create conversation if new
      let convId = activeConversationId;
      if (!convId) {
        const conv = await createConversation.mutateAsync({
          title: userContent.slice(0, 80),
          mode,
        });
        convId = conv.id;
        setActiveConversationId(convId);
      }

      // Save user message
      await saveMessage.mutateAsync({ conversation_id: convId, role: "user", content: userContent });

      // Prepare memory context
      const memory = memoryItems?.slice(0, 20).map((m) => ({
        category: m.category,
        key: m.key,
        value: m.value,
      })) ?? [];

      // Stream from edge function
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: allMsgs.map((m) => ({ role: m.role, content: m.content })),
          mode,
          conversationId: convId,
          memory,
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => null);
        const errorMsg = errorData?.error || `Erro ${resp.status}`;
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }

      if (!resp.body) throw new Error("No stream body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantSoFar = "";

      const upsert = (chunk: string) => {
        assistantSoFar += chunk;
        setLocalMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
          }
          return [...prev, { role: "assistant", content: assistantSoFar }];
        });
      };

      let streamDone = false;
      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") { streamDone = true; break; }
          try {
            const p = JSON.parse(jsonStr);
            const c = p.choices?.[0]?.delta?.content as string | undefined;
            if (c) upsert(c);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Flush remaining
      if (buffer.trim()) {
        for (let raw of buffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const p = JSON.parse(jsonStr);
            const c = p.choices?.[0]?.delta?.content as string | undefined;
            if (c) upsert(c);
          } catch { /* partial */ }
        }
      }

      // Save assistant message
      if (assistantSoFar && convId) {
        await saveMessage.mutateAsync({ conversation_id: convId, role: "assistant", content: assistantSoFar });
      }
    } catch {
      if (localMessages[localMessages.length - 1]?.role !== "assistant") {
        setLocalMessages((prev) => [...prev, { role: "assistant", content: "Erro ao conectar com Atlas. Tente novamente." }]);
      }
    }
    setLoading(false);
  };

  return (
    <SubPageShell
      icon={MessageSquare}
      title={`Atlas ${MODE_LABELS[mode].label}`}
      description={MODE_LABELS[mode].description}
      breadcrumbs={[{ label: "Atlas", href: "/atlas" }, { label: MODE_LABELS[mode].label }]}
    >
      {/* Mode Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(MODE_LABELS) as AtlasMode[]).map((m) => (
          <Button
            key={m}
            variant={mode === m ? "default" : "outline"}
            size="sm"
            onClick={() => { setMode(m); startNewConversation(); }}
            className="text-xs"
          >
            {MODE_LABELS[m].label}
          </Button>
        ))}
      </div>

      <div className="glass-card flex" style={{ height: "calc(100vh - 320px)" }}>
        {/* Sidebar: History */}
        {showHistory && (
          <div className="w-64 border-r border-border flex flex-col">
            <div className="p-3 border-b border-border flex items-center justify-between">
              <span className="text-sm font-medium">Histórico</span>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={startNewConversation}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {conversations?.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => loadConversation(c.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs truncate transition-colors ${
                      activeConversationId === c.id ? "bg-primary/20 text-primary" : "hover:bg-secondary text-muted-foreground"
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
                {(!conversations || conversations.length === 0) && (
                  <p className="text-xs text-muted-foreground text-center py-4">Nenhuma conversa ainda</p>
                )}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Main Chat */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-2 p-3 border-b border-border">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowHistory(!showHistory)}>
              <History className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium truncate">
              {activeConversationId
                ? conversations?.find((c) => c.id === activeConversationId)?.title || "Conversa"
                : "Nova Conversa"}
            </span>
            <div className="ml-auto">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={startNewConversation}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {localMessages.length === 0 && (
              <div className="text-center py-20 text-muted-foreground font-sans">
                <Brain className="h-12 w-12 mx-auto mb-4 text-primary/40" />
                <p className="text-lg font-display">Atlas {MODE_LABELS[mode].label}</p>
                <p className="text-sm mt-2">{MODE_LABELS[mode].description}</p>
                {mode === "article" && (
                  <p className="text-xs mt-3 text-muted-foreground/60">
                    Cole um abstract, DOI ou texto de artigo para análise
                  </p>
                )}
              </div>
            )}
            {localMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm font-sans ${
                  m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                }`}>
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm prose-invert max-w-none">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : m.content}
                </div>
              </div>
            ))}
            {loading && localMessages[localMessages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="bg-secondary rounded-xl px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-4 border-t border-border">
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === "article" ? "Cole o abstract ou DOI do artigo..." : "Pergunte ao Atlas..."}
                className="bg-secondary border-border"
                disabled={loading}
              />
              <Button type="submit" size="icon" disabled={loading || !input.trim()}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </SubPageShell>
  );
}
