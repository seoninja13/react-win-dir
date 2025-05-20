-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  subcategory TEXT,
  description TEXT,
  features JSONB,
  specifications JSONB,
  images JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content Table
CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  meta_description TEXT,
  content JSONB,
  sections JSONB,
  images JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads Table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  message TEXT,
  services TEXT[],
  source TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  location TEXT,
  testimonial TEXT NOT NULL,
  rating INTEGER,
  services TEXT[],
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_type TEXT NOT NULL,
  location TEXT,
  description TEXT,
  images JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Areas Table
CREATE TABLE IF NOT EXISTS service_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city TEXT NOT NULL,
  county TEXT,
  state TEXT NOT NULL,
  zip TEXT,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Logs Table
CREATE TABLE IF NOT EXISTS logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  level TEXT NOT NULL,
  message TEXT NOT NULL,
  details JSONB,
  source TEXT,
  user_id UUID,
  session_id TEXT,
  request_id TEXT,
  url TEXT,
  method TEXT,
  status_code INTEGER,
  user_agent TEXT,
  ip_address TEXT,
  duration INTEGER,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recent Errors Table
CREATE TABLE IF NOT EXISTS recent_errors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message TEXT NOT NULL,
  details JSONB,
  source TEXT,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS products_category_idx ON products (category);
CREATE INDEX IF NOT EXISTS products_slug_idx ON products (slug);
CREATE INDEX IF NOT EXISTS content_page_slug_idx ON content (page_slug);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);
CREATE INDEX IF NOT EXISTS service_areas_city_idx ON service_areas (city);
CREATE INDEX IF NOT EXISTS service_areas_zip_idx ON service_areas (zip);

-- Set up RLS policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to content" ON content
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to approved testimonials" ON testimonials
  FOR SELECT USING (approved = true);

CREATE POLICY "Allow public read access to gallery" ON gallery
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to service areas" ON service_areas
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to leads" ON leads
  FOR INSERT WITH CHECK (true);
