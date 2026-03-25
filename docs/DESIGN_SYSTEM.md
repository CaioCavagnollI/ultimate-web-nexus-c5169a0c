# Design System — Nexus

## Direção Visual
Plataforma científica premium, não um app fitness genérico. Combina software técnico, linguagem editorial e contraste de laboratório.

## Paleta (Dark Mode)

| Token | HSL | Uso |
|-------|-----|-----|
| `--background` | 220 20% 4% | Fundo principal |
| `--card` | 220 15% 8% | Cards e superfícies |
| `--primary` | 43 72% 50% | Gold accent (CTA, links, destaques) |
| `--primary-foreground` | 220 20% 4% | Texto sobre primary |
| `--secondary` | 220 12% 14% | Backgrounds secundários |
| `--muted-foreground` | 220 8% 55% | Texto secundário |
| `--border` | 220 10% 18% | Bordas |
| `--gold` | 43 72% 50% | Gold base |
| `--gold-light` | 43 80% 65% | Gold claro |
| `--gold-dark` | 43 60% 35% | Gold escuro |

## Tipografia
- **Headings**: Playfair Display (serif, premium, editorial)
- **Body**: Inter (sans-serif, legibilidade)
- **Monospace**: JetBrains Mono (uso técnico/código)

## Componentes Base (shadcn/ui)
Button, Input, Textarea, Select, Dialog, Drawer, Tabs, Badge, Table, Card, Checkbox, Switch, Tooltip, Popover, Accordion, Sheet

## Componentes Customizados
- `PageShell` — shell padrão de página com ícone, título e descrição
- `StatCard` — card de métrica com ícone, valor, label e nota
- `DomainCard` — card de módulo/domínio com navegação
- `EmptyState` — estado vazio com ícone, título, descrição e ação
- `NavLink` — link de navegação com estado ativo

## Classes Utilitárias
- `.glass-card` — card com glassmorphism (backdrop-blur, borda translúcida)
- `.glass-card-hover` — glass-card com hover interativo
- `.gold-gradient` — gradiente gold para destaques
- `.gold-text` — texto com gradiente gold

## Regras de Interface
- Cards com `rounded-xl` e respiro alto
- Sidebar fixa em desktop, colapsável
- Header contextual por módulo
- Badges e labels curtas para orientação rápida
- Tabelas densas, limpas e com status visível
- Estados de erro, vazio e loading elegantes

## Domínios Visuais
- Prescrições → gold/primary
- Mentor / IA → primary com accent
- Scanner Atlas → primary com badge
- Lab → primary/muted
- Admin → neutro com primary accent
