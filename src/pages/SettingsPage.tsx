import { PageShell } from "@/components/PageShell";
import { Settings, User, Bell, Shield, Palette, Globe } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const sections = [
  { id: "account", label: "Conta", icon: User },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "privacy", label: "Privacidade", icon: Shield },
  { id: "appearance", label: "Aparência", icon: Palette },
  { id: "language", label: "Idioma", icon: Globe },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("account");
  const { user } = useAuth();

  return (
    <PageShell icon={Settings} title="Configurações" description="Ajustes de conta, notificações, privacidade e preferências">
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="space-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-sans transition-colors ${
                activeSection === s.id
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <s.icon className="h-4 w-4" /> {s.label}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          {activeSection === "account" && (
            <div className="glass-card p-6 space-y-6">
              <h3 className="font-display font-semibold text-lg">Informações da Conta</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-sans">E-mail</Label>
                  <Input value={user?.email || ""} disabled className="bg-secondary border-border mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-sans">Nome</Label>
                  <Input defaultValue={user?.user_metadata?.full_name || ""} className="bg-secondary border-border mt-1" />
                </div>
                <Button variant="hero">Salvar alterações</Button>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="glass-card p-6 space-y-6">
              <h3 className="font-display font-semibold text-lg">Preferências de Notificação</h3>
              <div className="space-y-4">
                {[
                  { label: "Novos artigos no feed", desc: "Receba alertas sobre novos conteúdos científicos" },
                  { label: "Respostas no fórum", desc: "Notificações quando alguém responder seus tópicos" },
                  { label: "Atualizações de treino", desc: "Alertas sobre novos programas e prescrições" },
                  { label: "E-mails promocionais", desc: "Ofertas e novidades da loja Nexus" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                    <div>
                      <p className="text-sm font-sans font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground font-sans">{item.desc}</p>
                    </div>
                    <Switch />
                  </div>
                ))}
              </div>
            </div>
          )}

          {["privacy", "appearance", "language"].includes(activeSection) && (
            <div className="glass-card p-8 text-center">
              <Settings className="h-10 w-10 mx-auto mb-3 text-primary/30" />
              <p className="text-sm text-muted-foreground font-sans">
                {sections.find((s) => s.id === activeSection)?.label} — Em desenvolvimento.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
