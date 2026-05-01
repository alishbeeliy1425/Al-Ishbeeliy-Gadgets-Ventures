-- Set up the tables for Al Ishbeeliy Gadgets Ventures
-- Run this in your Supabase SQL Editor

-- 1. Create Users Table (Public Profiles)
CREATE TABLE IF NOT EXISTS public.users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text,
  role text DEFAULT 'customer',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on users" ON public.users;
CREATE POLICY "Allow public read access on users"
  ON public.users FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow public writes on users" ON public.users;
CREATE POLICY "Allow public writes on users"
  ON public.users FOR ALL
  USING (true)
  WITH CHECK (true);

-- 2. Create Products Table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  price numeric NOT NULL,
  description text,
  image_url text,
  video_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security for Products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Product Policies:
DROP POLICY IF EXISTS "Allow public read access on products" ON public.products;
CREATE POLICY "Allow public read access on products"
  ON public.products FOR SELECT
  USING (true);

-- Allow public write access for demo/testing since admin uses a frontend password
DROP POLICY IF EXISTS "Allow public writes on products" ON public.products;
CREATE POLICY "Allow public writes on products"
  ON public.products FOR ALL
  USING (true)
  WITH CHECK (true);

-- 3. Create Orders Table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  customer_name text,
  product_list jsonb NOT NULL,
  total_price numeric NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security for Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Order Policies:
-- Users can insert their own orders
DROP POLICY IF EXISTS "Allow public insert on orders" ON public.orders;
CREATE POLICY "Allow public insert on orders"
  ON public.orders FOR INSERT
  WITH CHECK (true); -- Allowing guest checkout too

-- Allow public read access to orders (for demo admin panel)
DROP POLICY IF EXISTS "Allow public read on orders" ON public.orders;
CREATE POLICY "Allow public read on orders"
  ON public.orders FOR SELECT
  USING (true);

-- 4. Set up Storage for Product Images and Videos
-- Create bucket 'products'
-- Using DO block to avoid error if bucket exists
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public) 
  VALUES ('products', 'products', true);
EXCEPTION WHEN unique_violation THEN
  -- Do nothing if it exists
END $$;

DROP POLICY IF EXISTS "Give public access to products bucket" ON storage.objects;
CREATE POLICY "Give public access to products bucket" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'products');

DROP POLICY IF EXISTS "Give public access to upload for demo" ON storage.objects;
CREATE POLICY "Give public access to upload for demo" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'products');

DROP POLICY IF EXISTS "Give public access to update for demo" ON storage.objects;
CREATE POLICY "Give public access to update for demo" 
ON storage.objects FOR UPDATE 
WITH CHECK (bucket_id = 'products');

DROP POLICY IF EXISTS "Give public access to delete for demo" ON storage.objects;
CREATE POLICY "Give public access to delete for demo" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'products');
