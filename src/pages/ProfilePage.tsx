import { PageShell } from "@/components/PageShell";
import { User, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <PageShell icon={User} title="Perfil" description="Gerencie suas informações pessoais e preferências">
      <div className="glass-card p-6 max-w-2xl space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"><User className="h-8 w-8 text-primary" /></div>
          <div><h3 className="font-display font-semibold text-lg">Usuário Nexus</h3><p className="text-sm text-muted-foreground font-sans">Plano Free</p></div>
        </div>
        <div><Label className="font-sans text-sm">Nome</Label><Input className="bg-secondary border-border mt-1" placeholder="Seu nome" /></div>
        <div><Label className="font-sans text-sm">E-mail</Label><Input className="bg-secondary border-border mt-1" placeholder="seu@email.com" /></div>
        <div><Label className="font-sans text-sm">Telefone</Label><Input className="bg-secondary border-border mt-1" placeholder="+55 11 99999-9999" /></div>
        <Button variant="hero" className="mt-4">Salvar Alterações</Button>
      </div>
    </PageShell>
  );
}
