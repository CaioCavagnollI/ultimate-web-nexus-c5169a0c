import {
  LayoutDashboard, BookOpen, Brain, MessageSquare,
  ClipboardList, FileText, Scan, Crown, FlaskConical,
  Library, Dumbbell, Users, Upload, User, CreditCard,
  Shield, CalendarDays, Activity, Settings,
  Building2, Sparkles, Search, PenTool
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import nexusLogo from "@/assets/nexus-logo.jpg";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Hoje", url: "/today", icon: CalendarDays },
  { title: "Feed Científico", url: "/feed", icon: BookOpen },
];

const atlasItems = [
  { title: "Atlas Brain", url: "/atlas", icon: Brain },
  { title: "Chat IA", url: "/atlas/chat", icon: MessageSquare },
  { title: "Mentor IA", url: "/atlas/mentor", icon: Sparkles },
  { title: "Atlas Scanner", url: "/scanner", icon: Scan },
];

const clinicalItems = [
  { title: "Anamnese", url: "/anamnesis", icon: ClipboardList },
  { title: "Prescrição de Treino", url: "/prescriptions", icon: FileText },
  { title: "Treinos", url: "/training", icon: Dumbbell },
];

const toolsItems = [
  { title: "Atlas Lab", url: "/lab", icon: FlaskConical },
  { title: "Atlas Sci-Search", url: "/academic", icon: Search },
  { title: "Biblioteca", url: "/library", icon: Library },
  { title: "Performance", url: "/performance", icon: Activity },
];

const primeItems = [
  { title: "Mentoria Prime", url: "/premium", icon: Crown },
  { title: "Treinamento Personalizado", url: "/treinamento-pro", icon: Dumbbell },
  { title: "Orientação Acadêmica", url: "/editorial-pro", icon: PenTool },
];

const professionalItems = [
  { title: "Clientes", url: "/clients", icon: Users },
];

const systemItems = [
  { title: "Uploads", url: "/uploads", icon: Upload },
  { title: "Perfil", url: "/profile", icon: User },
  { title: "Configurações", url: "/settings", icon: Settings },
  { title: "Billing", url: "/billing", icon: CreditCard },
];

const adminItems = [
  { title: "Admin", url: "/admin", icon: Shield },
  { title: "Business", url: "/business", icon: Building2 },
];

const groups = [
  { label: "Principal", items: mainItems },
  { label: "Atlas IA", items: atlasItems },
  { label: "Clínico", items: clinicalItems },
  { label: "Ferramentas", items: toolsItems },
  { label: "Mentoria Prime", items: primeItems },
  { label: "Profissional", items: professionalItems },
  { label: "Sistema", items: systemItems },
  { label: "Gestão", items: adminItems },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent className="pt-4">
        <div className="px-4 pb-4 flex items-center gap-2">
          <img src={nexusLogo} alt="Nexus" className="w-8 h-8 rounded-lg object-cover shrink-0" />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-tight">Nexus</span>
              <span className="text-[8px] text-muted-foreground/60 font-sans tracking-widest uppercase leading-none">Powered by Atlas</span>
            </div>
          )}
        </div>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/60">
              {!collapsed && group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/dashboard" || item.url === "/today"}
                        className="hover:bg-sidebar-accent/50 transition-colors"
                        activeClassName="bg-primary/10 text-primary font-medium border-l-2 border-primary"
                      >
                        <item.icon className="mr-2 h-4 w-4 shrink-0" />
                        {!collapsed && <span className="truncate">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
