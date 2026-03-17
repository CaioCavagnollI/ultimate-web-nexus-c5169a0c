import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TermsPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 font-sans"><ArrowLeft className="h-4 w-4" /> Voltar</button>
        <h1 className="text-4xl font-display font-bold mb-2">Termos de Uso</h1>
        <p className="text-sm text-muted-foreground font-sans mb-8">Última atualização: 17 de Março de 2026.</p>
        <div className="prose prose-invert prose-sm max-w-none font-sans space-y-6">
          <h2 className="font-display">1. Aceitação dos Termos</h2>
          <p>Ao acessar e utilizar a plataforma Nexus FitLab, você concorda com estes Termos de Uso. Se não concordar com algum dos termos, não utilize o serviço. O Nexus FitLab reserva-se o direito de modificar estes termos a qualquer momento, com aviso prévio de 30 dias.</p>
          <h2 className="font-display">2. Descrição do Serviço</h2>
          <p>O Nexus FitLab é uma plataforma digital para profissionais de educação física, oferecendo conteúdo científico sobre treinamento de força, chat com inteligência artificial baseada em literatura acadêmica, prescrição de treinos personalizados, scanner de equipamentos e comunidade técnica.</p>
          <h2 className="font-display">3. Cadastro e Conta</h2>
          <p>Para acessar funcionalidades exclusivas, é necessário criar uma conta. Você é responsável por manter a confidencialidade de suas credenciais e por todas as atividades realizadas em sua conta. Informações falsas podem resultar na suspensão da conta.</p>
          <h2 className="font-display">4. Planos e Pagamentos</h2>
          <p>O Nexus FitLab oferece planos gratuitos e pagos. Os planos pagos são cobrados de forma recorrente conforme o ciclo de faturamento escolhido. Cancelamentos podem ser feitos a qualquer momento, com acesso mantido até o fim do período pago.</p>
          <h2 className="font-display">5. Propriedade Intelectual</h2>
          <p>Todo conteúdo da plataforma, incluindo textos, ilustrações, software, algoritmos de IA e bases de dados, é propriedade exclusiva do Nexus FitLab ou de seus licenciadores. É proibida a reprodução, distribuição ou modificação sem autorização prévia por escrito.</p>
          <h2 className="font-display">6. Limitação de Responsabilidade</h2>
          <p>O conteúdo fornecido pelo Nexus FitLab é de caráter informativo e educacional. Não substitui orientação profissional individualizada. O Nexus FitLab não se responsabiliza por lesões, danos ou prejuízos decorrentes do uso das informações ou prescrições geradas pela plataforma.</p>
          <h2 className="font-display">7. Uso Aceitável</h2>
          <p>É proibido utilizar a plataforma para: difundir informações falsas, tentar manipular as respostas da IA, compartilhar credenciais de acesso, realizar engenharia reversa do sistema, ou qualquer outra atividade que viole a lei ou prejudique outros usuários.</p>
          <h2 className="font-display">8. Privacidade</h2>
          <p>O tratamento de dados pessoais é regido pela nossa Política de Privacidade, que é parte integrante destes Termos de Uso. Ao utilizar a plataforma, você consente com a coleta e processamento de dados conforme descrito na referida política.</p>
        </div>
      </div>
    </div>
  );
}
