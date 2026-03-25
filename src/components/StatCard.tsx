import { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: string;
  label: string;
  icon?: LucideIcon;
  note?: string;
}

export function StatCard({ value, label, icon: Icon, note }: StatCardProps) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-2">
        {Icon && <Icon className="h-5 w-5 text-primary" />}
        <span className="text-2xl font-display font-bold">{value}</span>
      </div>
      <p className="text-sm text-muted-foreground font-sans">{label}</p>
      {note && <p className="text-xs text-muted-foreground/70 font-sans mt-1">{note}</p>}
    </div>
  );
}
