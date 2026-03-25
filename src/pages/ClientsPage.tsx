import { PageShell } from "@/components/PageShell";
import { EmptyState } from "@/components/EmptyState";
import { Users, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ClientsPage() {
  return (
    <PageShell icon={Users} title="Clientes" description="Gerencie seus alunos e clientes — anamneses, prescrições e acompanhamento">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar cliente por nome ou e-mail..." className="pl-10 bg-secondary border-border" />
        </div>
        <Button variant="hero">
          <Plus className="h-4 w-4 mr-2" /> Novo Cliente
        </Button>
      </div>
      <EmptyState
        icon={Users}
        title="Nenhum cliente cadastrado"
        description="Adicione seus primeiros clientes para começar a prescrever treinos, acompanhar anamneses e monitorar progresso."
        action={
          <Button variant="hero">
            <Plus className="h-4 w-4 mr-2" /> Adicionar Cliente
          </Button>
        }
      />
    </PageShell>
  );
}
