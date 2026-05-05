-- Reviews
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title text,
  body text,
  approved boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews: public read approved" ON public.reviews FOR SELECT USING (approved = true OR has_role(auth.uid(),'admin'));
CREATE POLICY "Reviews: own insert" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Reviews: own update" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Reviews: own delete" ON public.reviews FOR DELETE USING (auth.uid() = user_id OR has_role(auth.uid(),'admin'));
CREATE POLICY "Reviews: admin update" ON public.reviews FOR UPDATE USING (has_role(auth.uid(),'admin'));

-- Newsletter
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Newsletter: anyone insert" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Newsletter: admin read" ON public.newsletter_subscribers FOR SELECT USING (has_role(auth.uid(),'admin'));
CREATE POLICY "Newsletter: admin delete" ON public.newsletter_subscribers FOR DELETE USING (has_role(auth.uid(),'admin'));

-- Orders / purchase requests
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  plan text NOT NULL DEFAULT 'buy',
  amount numeric NOT NULL DEFAULT 0,
  notes text,
  referral_code text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Orders: anyone insert" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Orders: own select" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Orders: admin select" ON public.orders FOR SELECT USING (has_role(auth.uid(),'admin'));
CREATE POLICY "Orders: admin update" ON public.orders FOR UPDATE USING (has_role(auth.uid(),'admin'));

-- Blog posts
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  body text NOT NULL,
  cover_url text,
  tags text[] DEFAULT '{}',
  published boolean NOT NULL DEFAULT false,
  author_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Blog: public read published" ON public.blog_posts FOR SELECT USING (published = true OR has_role(auth.uid(),'admin'));
CREATE POLICY "Blog: admin write" ON public.blog_posts FOR ALL USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Affiliates
CREATE TABLE public.affiliates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  code text NOT NULL UNIQUE,
  commission_pct numeric NOT NULL DEFAULT 15,
  clicks integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Affiliates: own select" ON public.affiliates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Affiliates: own insert" ON public.affiliates FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Affiliates: admin all" ON public.affiliates FOR ALL USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "Affiliates: public read code" ON public.affiliates FOR SELECT USING (true);