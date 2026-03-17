import { LucideIcon } from "lucide-react";

interface PageShellProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const PageShell = ({ icon: Icon, title, description, children }: PageShellProps) => (
  <div className="p-6 space-y-6 max-w-7xl mx-auto">
    <div className="flex items-center gap-3">
      <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h1 className="text-2xl font-display font-bold">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
    {children}
  </div>
);
