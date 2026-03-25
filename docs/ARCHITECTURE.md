# Arquitetura do Sistema

## 1. Topologia
Aplicação SPA (Single Page Application) com backend serverless via Supabase/Lovable Cloud.

## 2. Stack
- **Frontend**: React 18 + Vite + TypeScript
- **UI Framework**: Tailwind CSS + shadcn/ui + Radix UI
- **State Management**: TanStack React Query
- **Routing**: React Router v6 (client-side)
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Hosting**: Lovable Cloud

## 3. Camadas do Sistema
- **Presentation**: `src/pages/` + `src/components/`
- **Business Logic**: Edge Functions (`supabase/functions/`)
- **Data/Auth**: Supabase Client SDK
- **Storage**: Supabase Storage (bucket `uploads`)
- **Content**: `content/authored/manifests/` (JSON knowledge base)

## 4. Autenticação
- Supabase Auth com email/senha e Google OAuth
- AuthProvider global via React Context
- ProtectedRoute para rotas autenticadas
- Auto-criação de perfil via trigger `handle_new_user`
- RLS policies isolam dados por `auth.uid()`

## 5. Database
- `profiles` — dados do usuário (display_name, avatar, plan)
- `user_roles` — papéis (admin, moderator, user) via enum `app_role`
- `has_role()` — função SECURITY DEFINER para verificação de roles

## 6. Storage
- Bucket `uploads` com RLS por pasta do usuário
- Download via URLs assinadas (60s TTL)
- Organização: `{user_id}/{categoria}/{arquivo}`

## 7. Edge Functions
- `chat` — Streaming de respostas do AI Mentor via Lovable AI

## 8. Design System
- Tema dark premium (black/graphite + gold accent)
- Tokens CSS em HSL via `index.css`
- Componentes shadcn/ui com variantes customizadas
- Glassmorphism cards, Playfair Display headings, Inter body

## 9. Domínios de Conteúdo Autoral
- Anamnese (question bank, flags, outputs)
- Prescrição (decision matrix, rules)
- RAG (chunking, destinations)
- Níveis e objetivos (level rules, objective rules)
