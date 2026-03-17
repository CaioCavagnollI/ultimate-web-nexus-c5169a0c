import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PrivacyPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 font-sans"><ArrowLeft className="h-4 w-4" /> Voltar</button>
        <h1 className="text-4xl font-display font-bold mb-2">Política de Privacidade</h1>
        <p className="text-sm text-muted-foreground font-sans mb-8">Última atualização: 17 de março de 2026.</p>
        <div className="prose prose-invert prose-sm max-w-none font-sans space-y-6">
          <h2 className="font-display">1. Dados Coletados</h2>
          <p>Coletamos informações fornecidas diretamente por você (nome, e-mail, dados de anamnese) e dados gerados automaticamente durante o uso da plataforma (logs de acesso, interações com a IA, preferências de navegação). Dados de pagamento são processados exclusivamente por nosso parceiro de pagamentos (Stripe) e não são armazenados em nossos servidores.</p>
          <h2 className="font-display">2. Finalidade do Uso</h2>
          <p>Seus dados são utilizados para: personalizar a experiência na plataforma, gerar prescrições de treino via IA, melhorar nossos algoritmos, processar pagamentos, enviar comunicações relevantes e cumprir obrigações legais. Não vendemos dados pessoais a terceiros.</p>
          <h2 className="font-display">3. Base Legal</h2>
          <p>O processamento de dados é realizado com base no consentimento do titular, na execução de contrato (prestação de serviço) e no legítimo interesse (melhoria dos serviços), conforme a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).</p>
          <h2 className="font-display">4. Compartilhamento</h2>
          <p>Compartilhamos dados apenas com: processadores de pagamento (Stripe), serviços de infraestrutura, provedores de IA (sem dados pessoais identificáveis), e quando exigido por lei ou ordem judicial.</p>
          <h2 className="font-display">5. Segurança</h2>
          <p>Empregamos criptografia em trânsito (TLS) e em repouso, controle de acesso baseado em roles (RBAC), backups automatizados, monitoramento contínuo de segurança e práticas alinhadas com a ISO 27001.</p>
          <h2 className="font-display">6. Seus Direitos</h2>
          <p>Conforme a LGPD, você tem direito a: acessar seus dados, corrigir informações incorretas, solicitar a exclusão de dados, revogar consentimento, portabilidade de dados e solicitar informações sobre compartilhamento. Para exercer esses direitos, entre em contato através de privacidade@nexusfitlab.com.</p>
          <h2 className="font-display">7. Cookies</h2>
          <p>Utilizamos cookies essenciais para funcionamento da plataforma, cookies analíticos para entender o uso do serviço e cookies de preferência para personalizar sua experiência. Você pode gerenciar suas preferências de cookies a qualquer momento.</p>
          <h2 className="font-display">8. Retenção</h2>
          <p>Mantemos seus dados pelo tempo necessário para fornecer o serviço e cumprir obrigações legais. Após o encerramento da conta, os dados são anonimizados ou excluídos em até 90 dias, exceto quando a lei exigir retenção por período maior.</p>
        </div>
      </div>
    </div>
  );
}
