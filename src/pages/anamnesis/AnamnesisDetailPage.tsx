import { SubPageShell } from "@/components/SubPageShell";
import { ClipboardList, User, Target, Dumbbell, Heart, Activity } from "lucide-react";
import { useParams } from "react-router-dom";
import { StatusBadge } from "@/components/StatusBadge";

export default function AnamnesisDetailPage() {
  const { id } = useParams();
  return (
    <SubPageShell icon={ClipboardList} title={`Anamnese ${id || ""}`} description="Detalhes da avaliação" breadcrumbs={[{ label: "Anamnese", href: "/anamnesis" }, { label: id || "Detalhe" }]}>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-lg">Dados do Cliente</h3>
              <StatusBadge variant="active">Completa</StatusBadge>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm font-sans">
              <div><span className="text-muted-foreground block text-xs">Nome</span>João Silva</div>
              <div><span className="text-muted-foreground block text-xs">E-mail</span>joao@email.com</div>
              <div><span className="text-muted-foreground block text-xs">Idade</span>28 anos</div>
              <div><span className="text-muted-foreground block text-xs">Sexo</span>Masculino</div>
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold text-lg mb-4">Antropometria</h3>
            <div className="grid grid-cols-3 gap-4 text-sm font-sans">
              <div><span className="text-muted-foreground block text-xs">Altura</span>178 cm</div>
              <div><span className="text-muted-foreground block text-xs">Peso</span>82 kg</div>
              <div><span className="text-muted-foreground block text-xs">% Gordura</span>14%</div>
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold text-lg mb-4">Objetivos</h3>
            <p className="text-sm font-sans">Hipertrofia muscular com foco em desenvolvimento de membros superiores.</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold mb-3">Score</h3>
            <div className="text-4xl font-display font-bold gold-text text-center py-4">85%</div>
            <p className="text-xs text-muted-foreground font-sans text-center">Avaliação completa com boa qualidade de dados</p>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold mb-3">Ações</h3>
            <div className="space-y-2 text-sm font-sans">
              <button className="w-full text-left p-2 rounded-lg hover:bg-secondary transition-colors text-primary">→ Gerar Prescrição</button>
              <button className="w-full text-left p-2 rounded-lg hover:bg-secondary transition-colors text-primary">→ Exportar PDF</button>
              <button className="w-full text-left p-2 rounded-lg hover:bg-secondary transition-colors text-primary">→ Editar Anamnese</button>
            </div>
          </div>
        </div>
      </div>
    </SubPageShell>
  );
}
