import {
  LayoutDashboard, BookOpen, Brain, ShoppingBag, MessageSquare,
  ClipboardList, FileText, Scan, GraduationCap, Crown, FlaskConical,
  Library, Dumbbell, Users, Upload, Link, Plug, User, CreditCard,
  Shield, Utensils, Trophy, PenTool, CalendarDays, Activity, Settings,
  Building2, Sparkles
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Hoje", url: "/today", icon: CalendarDays },
  { title: "Feed Científico", url: "/feed", icon: BookOpen },
];

const atlasItems = [
  { title: "Atlas Hub", url: "/atlas", icon: Brain },
  { title: "Atlas Chat", url: "/atlas/chat", icon: MessageSquare },
  { title: "AI Mentor", url: "/ai-mentor", icon: Sparkles },
  { title: "Scanner", url: "/scanner", icon: Scan },
];

const clinicalItems = [
  { title: "Anamnese", url: "/anamnesis", icon: ClipboardList },
  { title: "Prescrições", url: "/prescriptions", icon: FileText },
  { title: "Treinamento", url: "/training", icon: Dumbbell },
];

const proItems = [
  { title: "Nexus Premium", url: "/premium", icon: Crown },
  { title: "Treinamento Pro", url: "/treinamento-pro", icon: Dumbbell },
  { title: "Editorial Pro", url: "/editorial-pro", icon: PenTool },
  { title: "Nutrição Pro", url: "/nutricao-pro", icon: Utensils },
  { title: "Coach Pro", url: "/coach-pro", icon: Trophy },
];

const toolsItems = [
  { title: "Nexus Lab", url: "/lab", icon: FlaskConical },
  { title: "Acadêmico", url: "/academic", icon: GraduationCap },
  { title: "Biblioteca", url: "/library", icon: Library },
  { title: "Performance", url: "/performance", icon: Activity },
  { title: "Loja", url: "/store", icon: ShoppingBag },
  { title: "Fórum", url: "/forum", icon: Users },
];

const professionalItems = [
  { title: "Clientes", url: "/clients", icon: Users },
  { title: "Programas", url: "/programs", icon: Dumbbell },
];

const systemItems = [
  { title: "Uploads", url: "/uploads", icon: Upload },
  { title: "Integrações", url: "/integrations", icon: Plug },
  { title: "Afiliados", url: "/affiliates", icon: Link },
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
  { label: "Mentorias Pro", items: proItems },
  { label: "Ferramentas", items: toolsItems },
  { label: "Profissional", items: professionalItems },
  { label: "Sistema", items: systemItems },
  { label: "Gestão", items: adminItems },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent className="pt-4">
        <div className="px-4 pb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center font-display font-bold text-primary-foreground text-lg">
            N
          </div>
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
