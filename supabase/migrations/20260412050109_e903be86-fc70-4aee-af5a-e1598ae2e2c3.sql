
-- 1. Make uploads bucket private
UPDATE storage.buckets SET public = false WHERE id = 'uploads';

-- 2. Drop overly-permissive storage policies
DROP POLICY IF EXISTS "Auth users can view uploads" ON storage.objects;
DROP POLICY IF EXISTS "Auth users can upload" ON storage.objects;

-- 3. Fix research_documents: remove NULL user_id clause, add admin policy
DROP POLICY IF EXISTS "research_documents_select_own" ON public.research_documents;
CREATE POLICY "research_documents_select_own" ON public.research_documents
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "research_chunks_select_own" ON public.research_chunks;
CREATE POLICY "research_chunks_select_own" ON public.research_chunks
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "research_sources_select_own" ON public.research_sources;
CREATE POLICY "research_sources_select_own" ON public.research_sources
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
