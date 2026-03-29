import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: LucideIcon;
  subtitle?: string;
}

export function MetricCard({ label, value, change, trend = "neutral", icon: Icon, subtitle }: MetricCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  return (
    <div className="glass-card p-5 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider">{label}</span>
        {Icon && <Icon className="h-4 w-4 text-primary/60" />}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-display font-bold">{value}</span>
        {change && (
          <span className={cn("flex items-center gap-0.5 text-xs font-sans mb-1", trend === "up" && "text-green-400", trend === "down" && "text-destructive", trend === "neutral" && "text-muted-foreground")}>
            <TrendIcon className="h-3 w-3" /> {change}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-muted-foreground font-sans">{subtitle}</p>}
    </div>
  );
}
