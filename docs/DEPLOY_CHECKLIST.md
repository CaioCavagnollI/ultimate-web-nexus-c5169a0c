# Checklist de Deploy — Produção

## Infraestrutura
- [x] Supabase conectado (Lovable Cloud)
- [x] Auth configurado (email + Google OAuth)
- [x] RLS em todas as tabelas
- [x] Storage bucket `uploads` configurado
- [x] Edge Functions deployadas

## Edge Functions
- [x] `chat` — Atlas AI streaming
- [x] `analyze-article` — Análise de artigos científicos
- [x] `check-subscription` — Verificação de assinatura Stripe
- [x] `create-checkout` — Criação de sessão de checkout
- [x] `customer-portal` — Portal de gerenciamento de assinatura
- [x] `stripe-webhook` — Webhook idempotente com entitlements
- [x] `execution-router` — Router de execução com policy engine
- [x] `setup-admin` — Configuração de admin

## Billing (Stripe)
- [x] Produtos e preços reais configurados
- [x] Checkout funcional
- [ ] Webhook URL configurado no Stripe Dashboard
- [ ] `STRIPE_WEBHOOK_SECRET` configurado
- [x] Idempotência via `billing_webhook_receipts`
- [x] Entitlement grants automáticos

## V10 Core
- [x] Tabelas V10 aditivas (exercises, progress, twin, executions, etc.)
- [x] Execution Router com policy engine
- [x] Fallback system
- [x] Observability (executions + events + violations)
- [x] Engine registry
- [x] Entitlement grants server-side

## Segurança
- [x] RLS obrigatória em todas as tabelas
- [x] `has_role()` SECURITY DEFINER
- [x] Service role apenas no backend
- [x] Signed URLs para storage privado
- [x] JWT validado em Edge Functions
- [ ] Leaked password protection (recomendado)

## Frontend
- [x] Auth funcional (login/signup/Google)
- [x] Dashboard operacional
- [x] Gating por tier (UpgradeGate)
- [x] useEntitlement com grants + tier
- [x] Loading/error states
- [x] Rotas protegidas (ProtectedRoute + AdminRoute)
