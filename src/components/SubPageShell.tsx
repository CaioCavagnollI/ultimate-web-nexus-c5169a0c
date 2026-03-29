import { LucideIcon, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface SubPageShellProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function SubPageShell({ icon: Icon, title, description, breadcrumbs, actions, children }: SubPageShellProps) {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-xs font-sans text-muted-foreground">
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3" />}
              {b.href ? (
                <Link to={b.href} className="hover:text-primary transition-colors">{b.label}</Link>
              ) : (
                <span className="text-foreground">{b.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">{title}</h1>
            {description && <p className="text-muted-foreground text-sm">{description}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}
