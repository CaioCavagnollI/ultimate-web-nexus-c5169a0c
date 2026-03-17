import { useState, useRef, useEffect } from "react";
import { PageShell } from "@/components/PageShell";
import { MessageSquare, Send, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";

interface Msg { role: "user" | "assistant"; content: string }
interface Conv { id: string; title: string; messages: Msg[] }

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conv[]>([{ id: "1", title: "Nova conversa", messages: [] }]);
  const [activeId, setActiveId] = useState("1");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const active = conversations.find((c) => c.id === activeId)!;

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [active.messages]);

  const newConv = () => {
    const id = Date.now().toString();
    setConversations((p) => [...p, { id, title: "Nova conversa", messages: [] }]);
    setActiveId(id);
  };

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: input };
    const msgs = [...active.messages, userMsg];
    setConversations((p) => p.map((c) => c.id === activeId ? { ...c, messages: msgs, title: msgs[0]?.content.slice(0, 30) || c.title } : c));
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ messages: msgs }),
      });
      if (!resp.ok || !resp.body) throw new Error("fail");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "", acc = "";

      const upsert = (chunk: string) => {
        acc += chunk;
        setConversations((p) => p.map((c) => {
          if (c.id !== activeId) return c;
          const last = c.messages[c.messages.length - 1];
          if (last?.role === "assistant") return { ...c, messages: c.messages.map((m, i) => i === c.messages.length - 1 ? { ...m, content: acc } : m) };
          return { ...c, messages: [...c.messages, { role: "assistant", content: acc }] };
        }));
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl); buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") break;
          try { const p = JSON.parse(json); const c = p.choices?.[0]?.delta?.content; if (c) upsert(c); } catch {}
        }
      }
    } catch {
      setConversations((p) => p.map((c) => c.id === activeId ? { ...c, messages: [...c.messages, { role: "assistant", content: "Erro na conexão." }] } : c));
    }
    setLoading(false);
  };

  return (
    <PageShell icon={MessageSquare} title="Chat IA" description="Chat científico com streaming e citações em tempo real">
      <div className="flex gap-4" style={{ height: "calc(100vh - 220px)" }}>
        {/* Sidebar */}
        <div className="w-64 glass-card p-3 flex flex-col gap-2 shrink-0 overflow-y-auto hidden md:flex">
          <Button variant="hero" size="sm" onClick={newConv} className="w-full gap-2"><Plus className="h-4 w-4" /> Nova Conversa</Button>
          <div className="space-y-1 mt-2">
            {conversations.map((c) => (
              <button key={c.id} onClick={() => setActiveId(c.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-sans truncate transition-colors ${c.id === activeId ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"}`}>
                {c.title}
              </button>
            ))}
          </div>
        </div>
        {/* Chat */}
        <div className="flex-1 glass-card flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {active.messages.length === 0 && (
              <div className="text-center py-16 text-muted-foreground font-sans">
                <MessageSquare className="h-10 w-10 mx-auto mb-3 text-primary/40" />
                <p>Inicie uma conversa científica com a IA.</p>
              </div>
            )}
            {active.messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm font-sans ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                  {m.role === "assistant" ? <div className="prose prose-sm prose-invert max-w-none"><ReactMarkdown>{m.content}</ReactMarkdown></div> : m.content}
                </div>
              </div>
            ))}
            {loading && active.messages[active.messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start"><div className="bg-secondary rounded-xl px-4 py-3"><Loader2 className="h-4 w-4 animate-spin text-primary" /></div></div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="p-4 border-t border-border">
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Pergunte sobre ciência do exercício..." className="bg-secondary border-border" disabled={loading} />
              <Button type="submit" variant="hero" size="icon" disabled={loading || !input.trim()}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
