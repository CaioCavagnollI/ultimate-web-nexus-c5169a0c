
-- AI MEMORY
CREATE TABLE IF NOT EXISTS public.ai_memory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category text NOT NULL,
  key text NOT NULL,
  value jsonb NOT NULL,
  source text,
  confidence numeric DEFAULT 0.8,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_ai_memory_user_id ON public.ai_memory(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_memory_category ON public.ai_memory(category);
ALTER TABLE public.ai_memory ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_ai_memory_updated_at BEFORE UPDATE ON public.ai_memory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RESEARCH SOURCES
CREATE TABLE IF NOT EXISTS public.research_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  source_type text NOT NULL,
  title text,
  authors text,
  doi text,
  journal text,
  publication_year int,
  source_url text,
  file_url text,
  abstract text,
  raw_text text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_research_sources_user_id ON public.research_sources(user_id);
CREATE INDEX IF NOT EXISTS idx_research_sources_doi ON public.research_sources(doi);
ALTER TABLE public.research_sources ENABLE ROW LEVEL SECURITY;

-- RESEARCH DOCUMENTS
CREATE TABLE IF NOT EXISTS public.research_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid NOT NULL REFERENCES public.research_sources(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  document_type text,
  full_text text,
  summary text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_research_documents_source_id ON public.research_documents(source_id);
ALTER TABLE public.research_documents ENABLE ROW LEVEL SECURITY;

-- RESEARCH CHUNKS
CREATE TABLE IF NOT EXISTS public.research_chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES public.research_documents(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  chunk_index int NOT NULL,
  content text NOT NULL,
  embedding jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_research_chunks_document_id ON public.research_chunks(document_id);
ALTER TABLE public.research_chunks ENABLE ROW LEVEL SECURITY;

-- RESEARCH QUERIES
CREATE TABLE IF NOT EXISTS public.research_queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_id uuid REFERENCES public.conversations(id) ON DELETE SET NULL,
  query text NOT NULL,
  mode text DEFAULT 'research',
  answer text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_research_queries_user_id ON public.research_queries(user_id);
ALTER TABLE public.research_queries ENABLE ROW LEVEL SECURITY;

-- RESEARCH CITATIONS
CREATE TABLE IF NOT EXISTS public.research_citations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  research_query_id uuid NOT NULL REFERENCES public.research_queries(id) ON DELETE CASCADE,
  source_id uuid REFERENCES public.research_sources(id) ON DELETE SET NULL,
  document_id uuid REFERENCES public.research_documents(id) ON DELETE SET NULL,
  chunk_id uuid REFERENCES public.research_chunks(id) ON DELETE SET NULL,
  citation_text text,
  doi text,
  source_title text,
  source_url text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_research_citations_query_id ON public.research_citations(research_query_id);
ALTER TABLE public.research_citations ENABLE ROW LEVEL SECURITY;

-- ARTICLE ANALYSES
CREATE TABLE IF NOT EXISTS public.article_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  research_source_id uuid REFERENCES public.research_sources(id) ON DELETE SET NULL,
  title text,
  doi text,
  abstract text,
  summary_technical text,
  summary_practical text,
  limitations text,
  evidence_level text,
  risk_of_bias text,
  practical_application text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_article_analyses_user_id ON public.article_analyses(user_id);
ALTER TABLE public.article_analyses ENABLE ROW LEVEL SECURITY;

-- AI PRESCRIPTION SUGGESTIONS
CREATE TABLE IF NOT EXISTS public.ai_prescription_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
  anamnesis_id uuid REFERENCES public.anamneses(id) ON DELETE SET NULL,
  prescription_id uuid REFERENCES public.prescriptions(id) ON DELETE SET NULL,
  input_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
  suggestion jsonb NOT NULL DEFAULT '{}'::jsonb,
  rationale text,
  accepted boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_ai_prescription_suggestions_user_id ON public.ai_prescription_suggestions(user_id);
ALTER TABLE public.ai_prescription_suggestions ENABLE ROW LEVEL SECURITY;

-- PAYMENTS
CREATE TABLE IF NOT EXISTS public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id uuid REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  stripe_payment_intent_id text,
  stripe_invoice_id text,
  amount numeric NOT NULL,
  currency text DEFAULT 'brl',
  status text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- BILLING EVENTS
CREATE TABLE IF NOT EXISTS public.billing_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  stripe_event_id text UNIQUE,
  event_type text NOT NULL,
  payload jsonb NOT NULL,
  processed boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_billing_events_user_id ON public.billing_events(user_id);
ALTER TABLE public.billing_events ENABLE ROW LEVEL SECURITY;

-- STORE BUNDLES
CREATE TABLE IF NOT EXISTS public.store_bundles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price numeric NOT NULL DEFAULT 0,
  status text DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.store_bundles ENABLE ROW LEVEL SECURITY;

-- STORE BUNDLE ITEMS
CREATE TABLE IF NOT EXISTS public.store_bundle_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_id uuid NOT NULL REFERENCES public.store_bundles(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.store_products(id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_store_bundle_items_unique ON public.store_bundle_items(bundle_id, product_id);
ALTER TABLE public.store_bundle_items ENABLE ROW LEVEL SECURITY;

-- LIBRARY ITEMS
CREATE TABLE IF NOT EXISTS public.library_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.store_products(id) ON DELETE CASCADE,
  bundle_id uuid REFERENCES public.store_bundles(id) ON DELETE CASCADE,
  source text NOT NULL DEFAULT 'purchase',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_library_items_user_id ON public.library_items(user_id);
ALTER TABLE public.library_items ENABLE ROW LEVEL SECURITY;

-- CREATOR COMMISSIONS
CREATE TABLE IF NOT EXISTS public.creator_commissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  purchase_id uuid REFERENCES public.store_purchases(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.store_products(id) ON DELETE CASCADE,
  gross_amount numeric NOT NULL,
  commission_amount numeric NOT NULL,
  commission_rate numeric NOT NULL DEFAULT 0.8,
  status text DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_creator_commissions_creator_user_id ON public.creator_commissions(creator_user_id);
ALTER TABLE public.creator_commissions ENABLE ROW LEVEL SECURITY;

-- AI USAGE LOGS
CREATE TABLE IF NOT EXISTS public.ai_usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_id uuid REFERENCES public.conversations(id) ON DELETE SET NULL,
  mode text NOT NULL,
  tokens_input int DEFAULT 0,
  tokens_output int DEFAULT 0,
  request_count int DEFAULT 1,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_ai_usage_logs_user_id ON public.ai_usage_logs(user_id);
ALTER TABLE public.ai_usage_logs ENABLE ROW LEVEL SECURITY;

-- UPGRADE CONVERSATIONS
ALTER TABLE public.conversations ADD COLUMN IF NOT EXISTS related_client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL;
ALTER TABLE public.conversations ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;
CREATE INDEX IF NOT EXISTS idx_conversations_mode ON public.conversations(mode);

-- UPGRADE MESSAGES
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);

-- UPGRADE SUBSCRIPTIONS
ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS stripe_customer_id text;
ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS stripe_subscription_id text;
ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS current_period_start timestamptz;
ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS current_period_end timestamptz;
ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS cancel_at_period_end boolean DEFAULT false;
ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS interval text;
ALTER TABLE public.subscriptions ADD COLUMN IF NOT EXISTS amount numeric;
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id ON public.subscriptions(stripe_customer_id);

-- UPGRADE PLANS
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS code text;
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS stripe_price_id text;
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS active boolean DEFAULT true;
CREATE UNIQUE INDEX IF NOT EXISTS idx_plans_code_unique ON public.plans(code);

-- UPGRADE SCANNER RESULTS
ALTER TABLE public.scanner_results ADD COLUMN IF NOT EXISTS related_client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL;
ALTER TABLE public.scanner_results ADD COLUMN IF NOT EXISTS source text;
ALTER TABLE public.scanner_results ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;

-- UPGRADE STORE PRODUCTS
ALTER TABLE public.store_products ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;

-- UPGRADE STORE PURCHASES
ALTER TABLE public.store_purchases ADD COLUMN IF NOT EXISTS payment_id uuid;
ALTER TABLE public.store_purchases ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;

-- RLS POLICIES: AI MEMORY
CREATE POLICY "ai_memory_select_own" ON public.ai_memory FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "ai_memory_insert_own" ON public.ai_memory FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "ai_memory_update_own" ON public.ai_memory FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "ai_memory_delete_own" ON public.ai_memory FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "ai_memory_admin_all" ON public.ai_memory FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS POLICIES: RESEARCH SOURCES
CREATE POLICY "research_sources_select_own" ON public.research_sources FOR SELECT TO authenticated USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "research_sources_insert_own" ON public.research_sources FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "research_sources_update_own" ON public.research_sources FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "research_sources_delete_own" ON public.research_sources FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "research_sources_admin_all" ON public.research_sources FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS POLICIES: RESEARCH DOCUMENTS
CREATE POLICY "research_documents_select_own" ON public.research_documents FOR SELECT TO authenticated USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "research_documents_insert_own" ON public.research_documents FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "research_documents_update_own" ON public.research_documents FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "research_documents_delete_own" ON public.research_documents FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "research_documents_admin_all" ON public.research_documents FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS POLICIES: RESEARCH CHUNKS
CREATE POLICY "research_chunks_select_own" ON public.research_chunks FOR SELECT TO authenticated USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "research_chunks_insert_own" ON public.research_chunks FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "research_chunks_admin_all" ON public.research_chunks FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS POLICIES: RESEARCH QUERIES
CREATE POLICY "research_queries_select_own" ON public.research_queries FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "research_queries_insert_own" ON public.research_queries FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "research_queries_update_own" ON public.research_queries FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "research_queries_admin_all" ON public.research_queries FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS POLICIES: RESEARCH CITATIONS
CREATE POLICY "research_citations_select_via_query" ON public.research_citations FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.research_queries rq WHERE rq.id = research_query_id AND rq.user_id = auth.uid()));
CREATE POLICY "research_citations_insert_via_query" ON public.research_citations FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.research_queries rq WHERE rq.id = research_query_id AND rq.user_id = auth.uid()));
CREATE POLICY "research_citations_admin_all" ON public.research_citations FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS POLICIES: ARTICLE ANALYSES
CREATE POLICY "article_analyses_select_own" ON public.article_analyses FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "article_analyses_insert_own" ON public.article_analyses FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "article_analyses_update_own" ON public.article_analyses FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "article_analyses_delete_own" ON public.article_analyses FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "article_analyses_admin_all" ON public.article_analyses FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS POLICIES: AI PRESCRIPTION SUGGESTIONS
CREATE POLICY "ai_rx_select_own" ON public.ai_prescription_suggestions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "ai_rx_insert_own" ON public.ai_prescription_suggestions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "ai_rx_update_own" ON public.ai_prescription_suggestions FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "ai_rx_admin_all" ON public.ai_prescription_suggestions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS POLICIES: PAYMENTS
CREATE POLICY "payments_select_own" ON public.payments FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "payments_admin_all" ON public.payments FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS POLICIES: BILLING EVENTS
CREATE POLICY "billing_events_select_own" ON public.billing_events FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "billing_events_admin_all" ON public.billing_events FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS POLICIES: STORE BUNDLES
CREATE POLICY "store_bundles_select_all" ON public.store_bundles FOR SELECT USING (true);
CREATE POLICY "store_bundles_admin_all" ON public.store_bundles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS POLICIES: STORE BUNDLE ITEMS
CREATE POLICY "store_bundle_items_select_all" ON public.store_bundle_items FOR SELECT USING (true);
CREATE POLICY "store_bundle_items_admin_all" ON public.store_bundle_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS POLICIES: LIBRARY ITEMS
CREATE POLICY "library_items_select_own" ON public.library_items FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "library_items_insert_own" ON public.library_items FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "library_items_admin_all" ON public.library_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS POLICIES: CREATOR COMMISSIONS
CREATE POLICY "creator_commissions_select_own" ON public.creator_commissions FOR SELECT TO authenticated USING (auth.uid() = creator_user_id);
CREATE POLICY "creator_commissions_admin_all" ON public.creator_commissions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS POLICIES: AI USAGE LOGS
CREATE POLICY "ai_usage_logs_select_own" ON public.ai_usage_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "ai_usage_logs_insert_own" ON public.ai_usage_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "ai_usage_logs_admin_all" ON public.ai_usage_logs FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- SEED PLANS
INSERT INTO public.plans (name, code, price, interval, features, active) VALUES
  ('Free', 'free', 0, 'month', '["dashboard_basic","limited_ai","limited_scanner","limited_library"]'::jsonb, true),
  ('Pro', 'pro_monthly', 19.90, 'month', '["dashboard","extended_ai","advanced_prescription","performance_tools"]'::jsonb, true),
  ('Pro Anual', 'pro_yearly', 199.90, 'year', '["dashboard","extended_ai","advanced_prescription","performance_tools"]'::jsonb, true),
  ('Premium', 'premium_monthly', 59.90, 'month', '["full_ai","research_atlas","article_analyzer","full_library","mentorship","editorial_tools"]'::jsonb, true),
  ('Premium Anual', 'premium_yearly', 599.90, 'year', '["full_ai","research_atlas","article_analyzer","full_library","mentorship","editorial_tools"]'::jsonb, true),
  ('Admin Vitalício', 'admin_lifetime', 0, 'lifetime', '["all_access","admin_override"]'::jsonb, true)
ON CONFLICT DO NOTHING;
