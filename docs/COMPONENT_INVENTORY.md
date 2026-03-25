# Inventário de Componentes — Nexus

## Componentes de Layout
| Componente | Arquivo | Descrição |
|-----------|---------|-----------|
| Layout | `src/components/Layout.tsx` | Layout autenticado com sidebar, header e outlet |
| AppSidebar | `src/components/AppSidebar.tsx` | Sidebar com 5 grupos de navegação |
| PageShell | `src/components/PageShell.tsx` | Shell padrão com ícone, título e descrição |
| ProtectedRoute | `src/components/ProtectedRoute.tsx` | Guard de autenticação |
| NavLink | `src/components/NavLink.tsx` | Link com estado ativo |

## Componentes de Dados
| Componente | Arquivo | Descrição |
|-----------|---------|-----------|
| StatCard | `src/components/StatCard.tsx` | Card de métrica com ícone, valor e label |
| DomainCard | `src/components/DomainCard.tsx` | Card de módulo com navegação e badge |
| EmptyState | `src/components/EmptyState.tsx` | Estado vazio com ação |

## Componentes shadcn/ui (53 componentes)
Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer, DropdownMenu, Form, HoverCard, Input, InputOTP, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toast, Toaster, Toggle, ToggleGroup, Tooltip

## Hooks Customizados
| Hook | Arquivo | Descrição |
|------|---------|-----------|
| useAuth | `src/hooks/useAuth.tsx` | Context de autenticação (session, user, signOut) |
| useMobile | `src/hooks/use-mobile.tsx` | Detecção de viewport mobile |
| useToast | `src/hooks/use-toast.ts` | Toast notifications |

## Páginas (28 páginas)
### Core
DashboardPage, TodayPage, OnboardingPage

### Módulos Principais
FeedPage, AIMentorPage, ChatPage, ScannerPage, AnamnesePage, PrescriptionPage

### Pro
NexusPremiumPage, TrainingProPage, EditorialProPage, NutriProPage, CoachProPage

### Ferramentas
NexusLabPage, AcademicPage, LibraryPage, StorePage, TrainingProgramsPage, ForumPage, PerformancePage

### Profissional
ClientsPage

### Sistema
UploadsPage, AffiliatesPage, IntegrationsPage, ProfilePage, SettingsPage, BillingPage, PricingPage, AdminPage

### Público
LandingPage, AuthPage, TermsPage, PrivacyPage, ContactPage, NotFound
