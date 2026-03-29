import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface TabNavProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

export function TabNav({ tabs, active, onChange, className }: TabNavProps) {
  return (
    <div className={cn("flex gap-1 overflow-x-auto pb-1", className)}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-sans whitespace-nowrap transition-colors",
            active === t.id
              ? "bg-primary/15 text-primary border border-primary/30"
              : "bg-secondary/50 text-muted-foreground border border-border hover:bg-secondary"
          )}
        >
          {t.icon && <t.icon className="h-4 w-4" />}
          {t.label}
        </button>
      ))}
    </div>
  );
}
