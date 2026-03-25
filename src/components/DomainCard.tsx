import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DomainCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  badge?: string;
}

export function DomainCard({ icon: Icon, title, description, href, badge }: DomainCardProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(href)}
      className="glass-card-hover p-6 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:gold-gradient group-hover:border-transparent transition-all">
          <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
        </div>
        {badge && (
          <span className="text-[10px] font-sans uppercase tracking-wider text-primary/70 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <h3 className="font-display font-semibold">{title}</h3>
      <p className="text-xs text-muted-foreground font-sans mt-1">{description}</p>
    </div>
  );
}
