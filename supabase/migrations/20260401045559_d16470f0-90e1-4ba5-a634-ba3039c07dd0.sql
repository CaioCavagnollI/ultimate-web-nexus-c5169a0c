
-- Store products table
CREATE TABLE public.store_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'ebook',
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  file_url TEXT,
  cover_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Store purchases table
CREATE TABLE public.store_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.store_products(id) ON DELETE CASCADE NOT NULL,
  price_paid NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.store_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_purchases ENABLE ROW LEVEL SECURITY;

-- Products: anyone authenticated can view approved products
CREATE POLICY "Anyone can view approved products"
  ON public.store_products FOR SELECT TO authenticated
  USING (status = 'approved');

-- Products: authors can view their own products regardless of status
CREATE POLICY "Authors can view own products"
  ON public.store_products FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Products: authenticated users with Pro+ plan can insert
CREATE POLICY "Authenticated users can submit products"
  ON public.store_products FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Products: authors can update their own products
CREATE POLICY "Authors can update own products"
  ON public.store_products FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- Products: admins can do everything
CREATE POLICY "Admins can manage all products"
  ON public.store_products FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Purchases: users can view own purchases
CREATE POLICY "Users can view own purchases"
  ON public.store_purchases FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Purchases: users can create purchases
CREATE POLICY "Users can create purchases"
  ON public.store_purchases FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Purchases: admins can view all
CREATE POLICY "Admins can view all purchases"
  ON public.store_purchases FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_store_products_updated_at
  BEFORE UPDATE ON public.store_products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
