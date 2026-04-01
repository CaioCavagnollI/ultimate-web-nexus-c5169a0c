
-- CLIENTS
CREATE TABLE IF NOT EXISTS public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  phone text,
  birth_date date,
  sex text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own clients" ON public.clients FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own clients" ON public.clients FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own clients" ON public.clients FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own clients" ON public.clients FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all clients" ON public.clients FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ANAMNESES
CREATE TABLE IF NOT EXISTS public.anamneses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'draft',
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.anamneses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own anamneses" ON public.anamneses FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own anamneses" ON public.anamneses FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own anamneses" ON public.anamneses FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own anamneses" ON public.anamneses FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all anamneses" ON public.anamneses FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_anamneses_updated_at BEFORE UPDATE ON public.anamneses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- PRESCRIPTIONS
CREATE TABLE IF NOT EXISTS public.prescriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  anamnesis_id uuid REFERENCES public.anamneses(id) ON DELETE SET NULL,
  title text NOT NULL DEFAULT 'Nova Prescrição',
  status text NOT NULL DEFAULT 'draft',
  frequency_per_week int,
  duration_weeks int,
  split text,
  notes text,
  version int NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own prescriptions" ON public.prescriptions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own prescriptions" ON public.prescriptions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own prescriptions" ON public.prescriptions FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own prescriptions" ON public.prescriptions FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all prescriptions" ON public.prescriptions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_prescriptions_updated_at BEFORE UPDATE ON public.prescriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- PRESCRIPTION EXERCISES
CREATE TABLE IF NOT EXISTS public.prescription_exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id uuid NOT NULL REFERENCES public.prescriptions(id) ON DELETE CASCADE,
  name text NOT NULL,
  sets int NOT NULL DEFAULT 3,
  reps text NOT NULL DEFAULT '10',
  load text,
  rpe text,
  rir text,
  rest_seconds int,
  notes text,
  sort_order int NOT NULL DEFAULT 0,
  day_label text
);
ALTER TABLE public.prescription_exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own prescription exercises" ON public.prescription_exercises FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.prescriptions p WHERE p.id = prescription_id AND p.user_id = auth.uid()));
CREATE POLICY "Users can insert own prescription exercises" ON public.prescription_exercises FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.prescriptions p WHERE p.id = prescription_id AND p.user_id = auth.uid()));
CREATE POLICY "Users can update own prescription exercises" ON public.prescription_exercises FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.prescriptions p WHERE p.id = prescription_id AND p.user_id = auth.uid()));
CREATE POLICY "Users can delete own prescription exercises" ON public.prescription_exercises FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.prescriptions p WHERE p.id = prescription_id AND p.user_id = auth.uid()));
CREATE POLICY "Admins manage all prescription exercises" ON public.prescription_exercises FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- TRAINING SESSIONS
CREATE TABLE IF NOT EXISTS public.training_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  prescription_id uuid REFERENCES public.prescriptions(id) ON DELETE SET NULL,
  date timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'in_progress',
  duration_minutes int,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.training_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions" ON public.training_sessions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sessions" ON public.training_sessions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sessions" ON public.training_sessions FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own sessions" ON public.training_sessions FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all sessions" ON public.training_sessions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- SESSION SETS
CREATE TABLE IF NOT EXISTS public.session_sets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.training_sessions(id) ON DELETE CASCADE,
  exercise_name text NOT NULL,
  set_number int NOT NULL DEFAULT 1,
  reps int,
  load_kg numeric,
  rpe numeric,
  rir int,
  completed boolean NOT NULL DEFAULT false
);
ALTER TABLE public.session_sets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own session sets" ON public.session_sets FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.training_sessions t WHERE t.id = session_id AND t.user_id = auth.uid()));
CREATE POLICY "Users can insert own session sets" ON public.session_sets FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.training_sessions t WHERE t.id = session_id AND t.user_id = auth.uid()));
CREATE POLICY "Users can update own session sets" ON public.session_sets FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.training_sessions t WHERE t.id = session_id AND t.user_id = auth.uid()));
CREATE POLICY "Users can delete own session sets" ON public.session_sets FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.training_sessions t WHERE t.id = session_id AND t.user_id = auth.uid()));
CREATE POLICY "Admins manage all session sets" ON public.session_sets FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- SCANNER RESULTS
CREATE TABLE IF NOT EXISTS public.scanner_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url text,
  equipment_name text,
  confidence numeric,
  muscles text[] DEFAULT '{}',
  exercises text[] DEFAULT '{}',
  classification text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.scanner_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scans" ON public.scanner_results FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own scans" ON public.scanner_results FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins manage all scans" ON public.scanner_results FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- CONVERSATIONS
CREATE TABLE IF NOT EXISTS public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT 'Nova Conversa',
  mode text NOT NULL DEFAULT 'chat',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own conversations" ON public.conversations FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own conversations" ON public.conversations FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own conversations" ON public.conversations FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own conversations" ON public.conversations FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON public.conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- MESSAGES
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'user',
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = conversation_id AND c.user_id = auth.uid()));
CREATE POLICY "Users can insert own messages" ON public.messages FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = conversation_id AND c.user_id = auth.uid()));

-- PLANS
CREATE TABLE IF NOT EXISTS public.plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  interval text NOT NULL DEFAULT 'month',
  features jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view plans" ON public.plans FOR SELECT USING (true);
CREATE POLICY "Admins manage plans" ON public.plans FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id uuid REFERENCES public.plans(id),
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz
);
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all subscriptions" ON public.subscriptions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
