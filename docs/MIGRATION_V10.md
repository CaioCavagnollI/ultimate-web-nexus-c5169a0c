# NEXUS / ATLAS V10 — Estratégia de Migração e Deploy

## 1. Situação Atual

A versão atual do Nexus está em produção no Lovable com:
- React 18 + Vite + TypeScript (SPA)
- Supabase Auth + DB + Storage + Edge Functions
- Stripe integrado com 4 preços reais (Pro mensal/anual, Premium mensal/anual)
- 23+ tabelas com RLS completa
- 6 Edge Functions funcionais

## 2. Estratégia de Coexistência

### FASE 1 — Isolamento (✅ Concluída)
- Versão nova opera no **mesmo projeto Supabase** com mudanças **somente aditivas**
- Nenhuma tabela existente foi alterada ou removida
- Novas tabelas V10 adicionadas: `exercises`, `progress_entries`, `digital_twin_snapshots`, `engine_registry`, `executions`, `execution_events`, `policy_violations`, `entitlements`, `entitlement_grants`, `billing_webhook_receipts`, `client_scanner_signals`
- Novos enums: `execution_mode`, `execution_status`, `policy_decision`, `engine_release_status`

### FASE 2 — Compatibilidade (✅ Concluída)
- Schema é backward-compatible: nenhuma coluna removida, nenhuma tabela renomeada
- Webhook Stripe atualizado com:
  - **Idempotência** via `billing_webhook_receipts` (previne processamento duplicado)
  - **Entitlement grants** automáticos na ativação de subscription
  - **Revogação** automática no cancelamento
- `useEntitlement` consulta tanto `profiles.plan` quanto `entitlement_grants`
- Adaptadores backward: código antigo continua funcionando sem alteração

### FASE 3 — Rollout Controlado
- Deploy via preview URL primeiro (Lovable preview)
- Testar com usuário admin interno
- Validar:
  - [ ] Login/logout funcional
  - [ ] Checkout Stripe → webhook → entitlements ativados
  - [ ] Execution router com policy engine
  - [ ] Gating de features por tier
  - [ ] Dados existentes intactos
- Só após validação, publicar como versão principal

### FASE 4 — Cutover Seguro
- Verificar logs de `billing_webhook_receipts` (status: processed)
- Verificar `executions` (sem blocked inesperado)
- Verificar `policy_violations` (nenhuma violação crítica)
- Verificar `entitlement_grants` (grants ativos para subscribers)
- Manter versão antiga acessível via rollback de publish no Lovable

## 3. Arquitetura V10

```
UI (React/Vite)
  → Edge Functions (API)
    → Execution Router (policy + billing guard)
      → Engine (prescription, atlas, scanner)
        → Fallback (se engine falhar)
    → Observability (executions, events, violations)
  → Supabase (DB + Auth + Storage + RLS)
  → Stripe (billing source of truth)
```

## 4. Billing — Regra Soberana

- Stripe é a fonte da verdade
- Webhook com idempotência (`billing_webhook_receipts.provider_event_id` UNIQUE)
- Entitlements gerados server-side no webhook, nunca no frontend
- Frontend consulta `entitlement_grants` e `profiles.plan` para gating visual
- Execution router valida entitlements antes de executar qualquer engine

## 5. Rollback

- **Frontend**: Restore versão anterior no Lovable (versão anterior preservada no histórico)
- **Database**: Tabelas novas são aditivas — remover é seguro, não afeta tabelas existentes
- **Edge Functions**: Versões anteriores preservadas no Git
- **Stripe**: Nenhum produto/preço foi alterado — billing legacy intacto

## 6. Checklist de Deploy

### Pré-deploy
- [ ] Confirmar que `STRIPE_SECRET_KEY` e `STRIPE_WEBHOOK_SECRET` estão configurados
- [ ] Confirmar que `LOVABLE_API_KEY` está configurado
- [ ] Verificar que todas as Edge Functions estão deployed
- [ ] Testar login → checkout → webhook → entitlements

### Deploy
- [ ] Publicar no Lovable
- [ ] Configurar webhook URL no Stripe: `https://xjpwywuwlcyrvdiirpkz.supabase.co/functions/v1/stripe-webhook`
- [ ] Testar um checkout real (modo teste do Stripe)
- [ ] Verificar `billing_webhook_receipts` após webhook

### Pós-deploy
- [ ] Monitorar `executions` e `policy_violations`
- [ ] Verificar que subscribers existentes mantêm acesso
- [ ] Verificar que novos subscribers recebem `entitlement_grants`

## 7. Compatibilidade com Plataformas

| Plataforma | Uso |
|-----------|-----|
| **Lovable** | Frontend principal + Edge Functions + DB |
| **Vercel** | Deploy alternativo do frontend (build estático do Vite) |
| **Bolt** | Refinamento de UI e componentes |
| **Replit** | Prototipagem e testes de Edge Functions |

### Deploy no Vercel (opcional)
```bash
npm run build
# Output: dist/
# Configurar SPA rewrite: /* → /index.html
# Env vars: VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY
```

## 8. Tabelas Legadas Preservadas

Todas as tabelas existentes permanecem intactas:
`profiles`, `user_roles`, `clients`, `anamneses`, `prescriptions`, `prescription_exercises`,
`training_sessions`, `session_sets`, `conversations`, `messages`, `ai_memory`,
`ai_usage_logs`, `ai_prescription_suggestions`, `article_analyses`, `scanner_results`,
`research_*`, `store_*`, `subscriptions`, `payments`, `billing_events`, `plans`, `library_items`
