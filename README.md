# Nexus — Science & Strength

Plataforma científica web-first para musculação baseada em evidência, combinando prescrição técnica, avaliação inteligente, IA contextualizada, biblioteca premium e camada de performance social.

## Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 18 + Vite + TypeScript |
| UI | Tailwind CSS + shadcn/ui + Radix UI |
| Backend | Supabase (Lovable Cloud) — Auth, Database, Storage, Edge Functions |
| State | TanStack React Query |
| Routing | React Router v6 |
| Design | Playfair Display + Inter, tema dark premium com gold accent |
| Testes | Vitest + Playwright |

## Estrutura do Repositório

```
src/
├── components/         # Componentes reutilizáveis
│   ├── ui/            # shadcn/ui components
│   ├── AppSidebar.tsx # Sidebar principal
│   ├── Layout.tsx     # Layout autenticado
│   ├── PageShell.tsx  # Shell padrão de página
│   ├── StatCard.tsx   # Card de estatísticas
│   ├── DomainCard.tsx # Card de módulo/domínio
│   ├── EmptyState.tsx # Estado vazio reutilizável
│   └── ProtectedRoute.tsx
├── hooks/             # Custom hooks (useAuth, etc.)
├── integrations/      # Supabase client + types
├── pages/             # Todas as páginas
├── lib/               # Utilitários
└── index.css          # Design tokens

public/brand/          # Assets de marca
content/authored/      # Manifests de conteúdo autoral
docs/                  # Documentação de produto e arquitetura
supabase/              # Migrations, functions, config
```

## Módulos do Produto

### Camada Pública
Landing, Pricing, Termos, Privacidade, Contato

### Camada Autenticada
Dashboard, Hoje, Onboarding, Perfil, Configurações, AI Mentor, Chat IA, Atlas Scanner, Anamnese, Prescrição, Clientes, Nexus Lab, Acadêmico, Biblioteca, Programas, Loja, Fórum, Performance, Uploads, Afiliados, Integrações, Billing, Mentorias Pro, Admin

### Infraestrutura
- Auth real com Supabase (email/senha + Google OAuth)
- RLS policies para isolamento de dados
- Storage com URLs assinadas
- Edge Functions para AI chat
- Profiles com auto-criação via trigger

## Comandos

```bash
npm run dev       # Desenvolvimento
npm run build     # Build
npm run preview   # Preview
```

## Documentação

Consulte `docs/` para documentação completa.

## Licença

Proprietária.
