import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  { q: "O que é o Nexus?", a: "O Nexus é uma plataforma científica de treinamento de força que integra IA aplicada, prescrição baseada em evidência, análise biomecânica e formação acadêmica em um único ecossistema premium." },
  { q: "O que é o Atlas?", a: "Atlas é o motor de inteligência artificial do Nexus. Ele processa evidências científicas, analisa dados de treinamento e gera prescrições personalizadas e auditáveis." },
  { q: "Preciso ser profissional para usar?", a: "Não. O Nexus é projetado tanto para profissionais (personal trainers, nutricionistas, fisioterapeutas) quanto para praticantes avançados e estudantes de ciência do exercício." },
  { q: "Como funciona o Scanner Atlas?", a: "O Atlas Scanner utiliza visão computacional para identificar equipamentos de academia. Basta tirar uma foto ou fazer upload e o sistema retorna exercícios compatíveis com evidência científica." },
  { q: "As prescrições são baseadas em evidência?", a: "Sim. Cada prescrição gerada pelo Nexus é fundamentada em literatura peer-reviewed e rastreável até a fonte original. Usamos meta-análises, revisões sistemáticas e diretrizes de entidades reconhecidas." },
  { q: "Posso cancelar minha assinatura a qualquer momento?", a: "Sim. Todos os planos podem ser cancelados a qualquer momento sem taxas adicionais. Você mantém acesso até o final do período pago." },
  { q: "O Nexus tem API?", a: "Sim. Planos Premium e Enterprise incluem acesso à API do Nexus para integração com sistemas de terceiros, aplicativos e plataformas corporativas." },
  { q: "Como funciona o plano Enterprise?", a: "O Enterprise é projetado para academias, clínicas e instituições. Inclui multi-tenant, analytics avançados, SSO, SLA dedicado e onboarding personalizado. Entre em contato para uma proposta." },
];

export default function FAQPage() {
  return (
    <div className="space-y-0">
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Perguntas <span className="gold-text">Frequentes</span>
          </h1>
          <p className="text-xl text-muted-foreground font-sans">Tire suas dúvidas sobre o Nexus e o Atlas.</p>
        </div>
      </section>

      <section className="py-10 px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass-card px-6 border-border/50">
                <AccordionTrigger className="font-display font-semibold text-left hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground font-sans pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
