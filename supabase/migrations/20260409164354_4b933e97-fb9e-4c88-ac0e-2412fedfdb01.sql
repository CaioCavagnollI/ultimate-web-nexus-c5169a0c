
-- V10 additive enums
DO $$ BEGIN
  CREATE TYPE public.execution_mode AS ENUM ('sync', 'async');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.execution_status AS ENUM ('queued', 'running', 'success', 'error', 'fallback_success', 'blocked');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.policy_decision AS ENUM ('allow', 'deny', 'degrade', 'require_manual_review');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.engine_release_status AS ENUM ('draft', 'active', 'deprecated', 'rolled_back');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- exercises library
CREATE TABLE IF NOT EXISTS public.exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  primary_muscle text,
  equipment text,
  execution text,
  variation_of uuid REFERENCES public.exercises(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "exercises_select_all" ON public.exercises FOR SELECT TO authenticated USING (true);
CREATE POLICY "exercises_admin_all" ON public.exercises FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_exercises_updated_at BEFORE UPDATE ON public.exercises
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- progress_entries
CREATE TABLE IF NOT EXISTS public.progress_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  metric_type text NOT NULL,
  metric_value numeric(10,2),
  unit text,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  notes text
);

ALTER TABLE public.progress_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "progress_select_own" ON public.progress_entries FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "progress_insert_own" ON public.progress_entries FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "progress_update_own" ON public.progress_entries FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "progress_delete_own" ON public.progress_entries FOR DELETE TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "progress_admin_all" ON public.progress_entries FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- client_scanner_signals
CREATE TABLE IF NOT EXISTS public.client_scanner_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  shoulder_sensitive boolean NOT NULL DEFAULT false,
  lumbar_sensitive boolean NOT NULL DEFAULT false,
  knee_sensitive boolean NOT NULL DEFAULT false,
  squat_pattern_limited boolean NOT NULL DEFAULT false,
  hinge_pattern_limited boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.client_scanner_signals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "scanner_signals_select_own" ON public.client_scanner_signals FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "scanner_signals_insert_own" ON public.client_scanner_signals FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "scanner_signals_update_own" ON public.client_scanner_signals FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "scanner_signals_admin_all" ON public.client_scanner_signals FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- digital_twin_snapshots
CREATE TABLE IF NOT EXISTS public.digital_twin_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  readiness_score numeric(5,2) NOT NULL DEFAULT 50,
  recovery_score numeric(5,2) NOT NULL DEFAULT 50,
  adherence_score numeric(5,2) NOT NULL DEFAULT 50,
  fatigue_score numeric(5,2) NOT NULL DEFAULT 50,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.digital_twin_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "twin_select_own" ON public.digital_twin_snapshots FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "twin_insert_own" ON public.digital_twin_snapshots FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "twin_update_own" ON public.digital_twin_snapshots FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "twin_admin_all" ON public.digital_twin_snapshots FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- engine_registry
CREATE TABLE IF NOT EXISTS public.engine_registry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  engine_key text NOT NULL,
  version text NOT NULL,
  status public.engine_release_status NOT NULL DEFAULT 'draft',
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  checksum text,
  released_by text,
  released_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(engine_key, version)
);

ALTER TABLE public.engine_registry ENABLE ROW LEVEL SECURITY;

CREATE POLICY "engine_registry_select_all" ON public.engine_registry FOR SELECT TO authenticated USING (true);
CREATE POLICY "engine_registry_admin_all" ON public.engine_registry FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- executions (audit trail)
CREATE TABLE IF NOT EXISTS public.executions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid NOT NULL,
  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  prescription_id uuid REFERENCES public.prescriptions(id) ON DELETE SET NULL,
  engine_key text NOT NULL,
  engine_version text,
  fallback_engine_key text,
  fallback_engine_version text,
  mode public.execution_mode NOT NULL DEFAULT 'sync',
  status public.execution_status NOT NULL DEFAULT 'queued',
  policy_result public.policy_decision NOT NULL DEFAULT 'allow',
  billing_result text NOT NULL DEFAULT 'entitled',
  request_id text,
  correlation_id text,
  input jsonb NOT NULL DEFAULT '{}'::jsonb,
  output jsonb NOT NULL DEFAULT '{}'::jsonb,
  error_code text,
  error_message text,
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.executions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "executions_select_own" ON public.executions FOR SELECT TO authenticated
  USING (actor_id = auth.uid());
CREATE POLICY "executions_insert_own" ON public.executions FOR INSERT TO authenticated
  WITH CHECK (actor_id = auth.uid());
CREATE POLICY "executions_admin_all" ON public.executions FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- execution_events
CREATE TABLE IF NOT EXISTS public.execution_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id uuid NOT NULL REFERENCES public.executions(id) ON DELETE CASCADE,
  level text NOT NULL DEFAULT 'info',
  event_name text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.execution_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "exec_events_select_via_exec" ON public.execution_events FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.executions e WHERE e.id = execution_events.execution_id AND e.actor_id = auth.uid()));
CREATE POLICY "exec_events_insert_via_exec" ON public.execution_events FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.executions e WHERE e.id = execution_events.execution_id AND e.actor_id = auth.uid()));
CREATE POLICY "exec_events_admin_all" ON public.execution_events FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- policy_violations
CREATE TABLE IF NOT EXISTS public.policy_violations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid,
  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  execution_id uuid REFERENCES public.executions(id) ON DELETE SET NULL,
  policy_name text NOT NULL,
  decision public.policy_decision NOT NULL,
  reason text,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.policy_violations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "policy_violations_admin_only" ON public.policy_violations FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- entitlements
CREATE TABLE IF NOT EXISTS public.entitlements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  code text NOT NULL,
  source_type text NOT NULL DEFAULT 'plan',
  source_ref text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "entitlements_select_own" ON public.entitlements FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "entitlements_admin_all" ON public.entitlements FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- entitlement_grants (time-bounded)
CREATE TABLE IF NOT EXISTS public.entitlement_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  code text NOT NULL,
  source_type text NOT NULL,
  source_id text,
  starts_at timestamptz NOT NULL DEFAULT now(),
  ends_at timestamptz,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.entitlement_grants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "grants_select_own" ON public.entitlement_grants FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "grants_admin_all" ON public.entitlement_grants FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- billing_webhook_receipts (idempotency)
CREATE TABLE IF NOT EXISTS public.billing_webhook_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL DEFAULT 'stripe',
  provider_event_id text NOT NULL UNIQUE,
  event_type text NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz,
  status text NOT NULL DEFAULT 'received',
  payload jsonb NOT NULL DEFAULT '{}'::jsonb
);

ALTER TABLE public.billing_webhook_receipts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "webhook_receipts_admin_only" ON public.billing_webhook_receipts FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_executions_actor ON public.executions(actor_id);
CREATE INDEX IF NOT EXISTS idx_executions_engine ON public.executions(engine_key);
CREATE INDEX IF NOT EXISTS idx_executions_status ON public.executions(status);
CREATE INDEX IF NOT EXISTS idx_execution_events_exec ON public.execution_events(execution_id);
CREATE INDEX IF NOT EXISTS idx_entitlements_user ON public.entitlements(user_id);
CREATE INDEX IF NOT EXISTS idx_entitlement_grants_user ON public.entitlement_grants(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_client ON public.progress_entries(client_id);
CREATE INDEX IF NOT EXISTS idx_twin_client ON public.digital_twin_snapshots(client_id);
CREATE INDEX IF NOT EXISTS idx_webhook_receipts_event ON public.billing_webhook_receipts(provider_event_id);
