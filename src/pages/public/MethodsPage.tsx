import { Target, BarChart3, Dumbbell, Brain, RefreshCcw, TrendingUp } from "lucide-react";

const methods = [
  { icon: BarChart3, title: "Periodização Baseada em Evidência", desc: "Modelos ondulatórios, lineares e por blocos com suporte científico. Cada periodização é ajustada automaticamente com base no nível, histórico e objetivos do praticante.", details: ["Periodização Linear", "Periodização Ondulatória Diária", "Periodização por Blocos", "Autoregulação via RPE/RIR"] },
  { icon: Target, title: "Prescrição de Volume", desc: "Cálculos de volume baseados na relação dose-resposta validada por meta-análises recentes. MEV, MAV, MRV e volume ótimo individualizados.", details: ["MEV — Minimum Effective Volume", "MAV — Maximum Adaptive Volume", "MRV — Maximum Recoverable Volume", "Landmark System"] },
  { icon: Dumbbell, title: "Seleção de Exercícios", desc: "Exercícios selecionados com base em ativação eletromiográfica (EMG), biomecânica articular e especificidade ao objetivo.", details: ["Análise EMG por grupamento", "Seleção por perfil de resistência", "Substituições validadas", "Progressão de complexidade"] },
  { icon: RefreshCcw, title: "Recuperação & Deload", desc: "Protocolos de deload baseados em marcadores de fadiga acumulada e sinais de overreaching funcional.", details: ["Deload proativo", "Monitoramento de fadiga", "Readiness scores", "Auto-regulação dinâmica"] },
  { icon: TrendingUp, title: "Progressão de Carga", desc: "Sistemas de progressão linear, por RPE e por performance, com ajuste automático baseado em respostas do praticante.", details: ["Double progression", "RPE-based progression", "Performance-based autoregulation", "Tempo manipulation"] },
  { icon: Brain, title: "Análise via Atlas IA", desc: "O Atlas IA integra todas as variáveis do treinamento para gerar prescrições coerentes e individualizadas.", details: ["Integração multi-variável", "Contextualização científica", "Justificativa por referência", "Ajuste contínuo"] },
];

export default function MethodsPage() {
  return (
    <div className="space-y-0">
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Nossos <span className="gold-text">Métodos</span>
          </h1>
          <p className="text-xl text-muted-foreground font-sans max-w-3xl mx-auto">
            Metodologias de treinamento fundamentadas em ciência do exercício e validadas por pesquisas de alto impacto.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto space-y-8">
          {methods.map((m, i) => (
            <div key={i} className="glass-card p-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <m.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-xl mb-3">{m.title}</h3>
                  <p className="text-sm text-muted-foreground font-sans mb-4">{m.desc}</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {m.details.map((d) => (
                      <div key={d} className="flex items-center gap-2 text-sm font-sans text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
