import { PageShell } from "@/components/PageShell";
import { EmptyState } from "@/components/EmptyState";
import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Contato</h1>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto">
            Dúvidas, parcerias ou suporte? Fale com a equipe Nexus.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Mail, title: "E-mail", info: "contato@nexus.fit" },
            { icon: Phone, title: "WhatsApp", info: "+55 11 00000-0000" },
            { icon: MapPin, title: "Localização", info: "São Paulo, SP — Brasil" },
          ].map((c) => (
            <div key={c.title} className="glass-card p-6 text-center">
              <c.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-display font-semibold">{c.title}</h3>
              <p className="text-sm text-muted-foreground font-sans mt-1">{c.info}</p>
            </div>
          ))}
        </div>

        <div className="glass-card p-8">
          <h2 className="font-display font-semibold text-xl mb-6">Enviar mensagem</h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-sans">Nome</Label>
                <Input placeholder="Seu nome" className="bg-secondary border-border mt-1" />
              </div>
              <div>
                <Label className="text-sm font-sans">E-mail</Label>
                <Input type="email" placeholder="seu@email.com" className="bg-secondary border-border mt-1" />
              </div>
            </div>
            <div>
              <Label className="text-sm font-sans">Assunto</Label>
              <Input placeholder="Sobre o que deseja falar?" className="bg-secondary border-border mt-1" />
            </div>
            <div>
              <Label className="text-sm font-sans">Mensagem</Label>
              <Textarea placeholder="Sua mensagem..." rows={5} className="bg-secondary border-border mt-1" />
            </div>
            <Button variant="hero" className="w-full">Enviar</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
