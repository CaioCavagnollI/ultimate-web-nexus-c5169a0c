import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { title, doi, abstract: abstractText, rawText, mode = "analyze" } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let prompt = "";
    if (mode === "analyze") {
      const inputParts: string[] = [];
      if (title) inputParts.push(`Título: ${title}`);
      if (doi) inputParts.push(`DOI: ${doi}`);
      if (abstractText) inputParts.push(`Abstract:\n${abstractText}`);
      if (rawText) inputParts.push(`Texto completo:\n${rawText.slice(0, 8000)}`);
      
      prompt = `Analise o seguinte artigo científico:\n\n${inputParts.join("\n\n")}\n\nRetorne a análise no seguinte formato JSON:
{
  "summary_technical": "resumo técnico dos achados",
  "summary_practical": "implicações práticas para profissionais de exercício",
  "limitations": "limitações do estudo",
  "evidence_level": "nível de evidência (meta-análise, RCT, observacional, etc)",
  "risk_of_bias": "avaliação crítica de risco de viés",
  "practical_application": "como aplicar na prescrição de treino de força"
}`;
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
          {
            role: "system",
            content: `Você é o Atlas Article Analyzer — analisador de artigos científicos especializado em ciência do exercício e treinamento de força. Responda SOMENTE em JSON válido quando solicitado. Seja rigoroso na avaliação metodológica.`,
          },
          { role: "user", content: prompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "article_analysis",
              description: "Return structured article analysis",
              parameters: {
                type: "object",
                properties: {
                  summary_technical: { type: "string", description: "Technical summary of findings" },
                  summary_practical: { type: "string", description: "Practical implications for exercise professionals" },
                  limitations: { type: "string", description: "Study limitations" },
                  evidence_level: { type: "string", description: "Level of evidence classification" },
                  risk_of_bias: { type: "string", description: "Critical bias risk assessment" },
                  practical_application: { type: "string", description: "How to apply in strength training prescription" },
                },
                required: ["summary_technical", "summary_practical", "limitations", "evidence_level", "risk_of_bias", "practical_application"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "article_analysis" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit excedido." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const result = await response.json();
    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
    let analysis;
    if (toolCall?.function?.arguments) {
      analysis = JSON.parse(toolCall.function.arguments);
    } else {
      // Fallback: try to parse content as JSON
      const content = result.choices?.[0]?.message?.content || "";
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Could not parse analysis" };
    }

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e) {
    console.error("analyze-article error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
