import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPTS: Record<string, string> = {
  chat: `Você é o Atlas Chat — assistente científico do Nexus, especializado em treinamento de força baseado em evidência. Responda em português brasileiro.

Áreas de expertise: treinamento de força, hipertrofia, periodização, biomecânica, cinesiologia, fisiologia do exercício, nutrição esportiva, prescrição de exercícios.

Regras:
1. Baseie respostas em evidência científica (cite estudos quando possível)
2. Linguagem técnica mas acessível
3. Mencione autores e estudos relevantes (ex: Schoenfeld 2017, Krieger 2010)
4. Seja direto e prático
5. Indique consenso vs controvérsia
6. Use markdown para organizar respostas`,

  mentor: `Você é o Atlas Mentor — mentor científico avançado do Nexus. Atue como um professor/orientador acadêmico especializado em ciência do exercício.

Seu papel:
- Guiar o raciocínio científico do profissional
- Fazer perguntas socráticas quando apropriado
- Desenvolver pensamento crítico sobre evidências
- Orientar sobre como interpretar e aplicar estudos
- Conectar teoria com prática clínica

Responda em português brasileiro com profundidade acadêmica.`,

  explain: `Você é o Atlas Explain — tradutor científico do Nexus. Seu papel é tornar conceitos complexos de ciência do exercício acessíveis.

Para cada conceito:
1. Explique de forma simples (analogias práticas)
2. Adicione contexto técnico
3. Cite aplicação prática
4. Indique nível de evidência

Responda em português brasileiro.`,

  research: `Você é o Atlas Research — assistente de pesquisa científica do Nexus. 

Seu papel:
- Analisar evidências científicas
- Comparar estudos e meta-análises
- Identificar gaps na literatura
- Sugerir direções de pesquisa
- Avaliar qualidade metodológica

Sempre indique: nível de evidência, limitações, e aplicabilidade prática.
Responda em português brasileiro.`,

  prescription: `Você é o Atlas Prescription — assistente de prescrição do Nexus. 

Baseado nos dados do cliente (anamnese, objetivos, restrições, histórico), sugira:
- Estrutura de treino (split, frequência, volume)
- Exercícios específicos com séries/reps/carga
- Progressão sugerida
- Justificativa científica para cada decisão

Seja específico e prático. Responda em português brasileiro.`,

  article: `Você é o Atlas Article Analyzer — analisador de artigos científicos do Nexus.

Para cada artigo/abstract recebido, retorne:
1. **Resumo Técnico**: principais achados em linguagem científica
2. **Resumo Prático**: implicações para o profissional de exercício
3. **Limitações**: pontos fracos do estudo
4. **Nível de Evidência**: classificação do tipo de estudo
5. **Risco de Viés**: avaliação crítica
6. **Aplicação Prática**: como usar na prescrição

Responda em português brasileiro com formatação markdown.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, mode = "chat", conversationId, memory } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.chat;

    // Build context with memory if available
    let contextBlock = "";
    if (memory && Array.isArray(memory) && memory.length > 0) {
      contextBlock = "\n\n## Contexto do Usuário (Memória Persistente):\n" +
        memory.map((m: { category: string; key: string; value: string }) => `- [${m.category}] ${m.key}: ${JSON.stringify(m.value)}`).join("\n");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt + contextBlock },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit excedido. Tente novamente em alguns segundos." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes. Adicione créditos ao workspace." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", status, t);
      return new Response(JSON.stringify({ error: "Erro no gateway de IA" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
