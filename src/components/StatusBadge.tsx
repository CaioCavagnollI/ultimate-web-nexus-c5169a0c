import { cn } from "@/lib/utils";

const variants = {
  active: "bg-green-500/10 text-green-400 border-green-500/20",
  inactive: "bg-secondary text-muted-foreground border-border",
  warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  error: "bg-destructive/10 text-destructive border-destructive/20",
  info: "bg-primary/10 text-primary border-primary/20",
  pending: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

interface StatusBadgeProps {
  variant: keyof typeof variants;
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  return (
    <span className={cn("text-xs px-2 py-0.5 rounded-full border font-sans inline-flex items-center", variants[variant], className)}>
      {children}
    </span>
  );
}
