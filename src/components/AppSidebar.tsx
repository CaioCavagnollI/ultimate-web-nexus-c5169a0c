import {
  LayoutDashboard, BookOpen, Brain, ShoppingBag, MessageSquare,
  ClipboardList, FileText, Scan, GraduationCap, Crown, FlaskConical,
  Library, Dumbbell, Users, Upload, Link, Plug, User, CreditCard,
  Shield, Utensils, Trophy, PenTool
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Feed Científico", url: "/feed", icon: BookOpen },
  { title: "AI Mentor", url: "/ai-mentor", icon: Brain },
  { title: "Chat IA", url: "/chat", icon: MessageSquare },
  { title: "Atlas Scanner", url: "/scanner", icon: Scan },
  { title: "Smart Anamnese", url: "/anamnese", icon: ClipboardList },
  { title: "Prescrição IA", url: "/prescricao", icon: FileText },
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
  { title: "Acadêmico", url: "/academico", icon: GraduationCap },
  { title: "Biblioteca", url: "/biblioteca", icon: Library },
  { title: "Programas de Treino", url: "/programas", icon: Dumbbell },
  { title: "Loja", url: "/loja", icon: ShoppingBag },
  { title: "Fórum Técnico", url: "/forum", icon: Users },
];

const systemItems = [
  { title: "Uploads", url: "/uploads", icon: Upload },
  { title: "Afiliados", url: "/afiliados", icon: Link },
  { title: "Integrações", url: "/integracoes", icon: Plug },
  { title: "Perfil", url: "/perfil", icon: User },
  { title: "Planos & Preços", url: "/pricing", icon: CreditCard },
  { title: "Admin", url: "/admin", icon: Shield },
];

const groups = [
  { label: "Principal", items: mainItems },
  { label: "Mentorias Pro", items: proItems },
  { label: "Ferramentas", items: toolsItems },
  { label: "Sistema", items: systemItems },
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
          {!collapsed && <span className="font-display font-bold text-lg">Nexus</span>}
        </div>
        {groups.map((group) => (
          <SidebarGroup key={group.label} defaultOpen>
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
                        end
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
