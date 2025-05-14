# Database Schema

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Architecture](./index.md) > Database Schema

## Table of Contents

1. [Overview](#overview)
2. [Database Tables](#database-tables)
   - [Products Table](#products-table)
   - [Content Table](#content-table)
   - [Leads Table](#leads-table)
   - [Testimonials Table](#testimonials-table)
   - [Gallery Table](#gallery-table)
   - [Service Areas Table](#service-areas-table)
   - [Logs Table](#logs-table)
   - [Recent Errors Table](#recent-errors-table)
3. [Indexes](#indexes)
4. [Row Level Security (RLS) Policies](#row-level-security-rls-policies)
5. [Database Relationships](#database-relationships)
6. [Schema Creation Script](#schema-creation-script)
7. [Related Documentation](#related-documentation)

## Overview

The Windows Doors CA website uses Supabase as its database and backend service. This document provides a detailed description of the database schema, including tables, indexes, and Row Level Security (RLS) policies.

## Database Tables

### Products Table

The `products` table stores information about all products (windows, doors, siding, roofing):

```sql
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
```

#### Fields

- `id`: Unique identifier for the product
- `name`: Product name
- `slug`: URL-friendly identifier for the product
- `category`: Product category (windows, doors, siding, roofing)
- `subcategory`: Product subcategory (e.g., double-hung, casement)
- `description`: Product description
- `features`: JSON object containing product features
- `specifications`: JSON object containing product specifications
- `images`: JSON object containing product images
- `created_at`: Timestamp when the product was created
- `updated_at`: Timestamp when the product was last updated

### Content Table

The `content` table stores content for informational pages:

```sql
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
```

#### Fields

- `id`: Unique identifier for the content
- `page_slug`: URL-friendly identifier for the page
- `title`: Page title
- `meta_description`: Meta description for SEO
- `content`: JSON object containing page content
- `sections`: JSON object containing page sections
- `images`: JSON object containing page images
- `created_at`: Timestamp when the content was created
- `updated_at`: Timestamp when the content was last updated

### Leads Table

The `leads` table stores customer leads from the Request Free Estimate (RFE) forms:

```sql
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
```

#### Fields

- `id`: Unique identifier for the lead
- `first_name`: Customer's first name
- `last_name`: Customer's last name
- `email`: Customer's email address
- `phone`: Customer's phone number
- `address`: Customer's address
- `city`: Customer's city
- `state`: Customer's state
- `zip`: Customer's ZIP code
- `message`: Customer's message
- `services`: Array of services the customer is interested in
- `source`: Source of the lead (e.g., contact form, RFE form)
- `status`: Status of the lead (new, contacted, qualified, etc.)
- `created_at`: Timestamp when the lead was created
- `updated_at`: Timestamp when the lead was last updated

### Testimonials Table

The `testimonials` table stores customer testimonials:

```sql
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
```

#### Fields

- `id`: Unique identifier for the testimonial
- `customer_name`: Customer's name
- `location`: Customer's location
- `testimonial`: Testimonial text
- `rating`: Customer's rating (1-5)
- `services`: Array of services the customer used
- `approved`: Whether the testimonial is approved for display
- `created_at`: Timestamp when the testimonial was created

### Gallery Table

The `gallery` table stores project images for the gallery page:

```sql
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_type TEXT NOT NULL,
  location TEXT,
  description TEXT,
  images JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Fields

- `id`: Unique identifier for the gallery item
- `project_type`: Type of project (windows, doors, siding, roofing)
- `location`: Project location
- `description`: Project description
- `images`: JSON object containing project images
- `created_at`: Timestamp when the gallery item was created

### Service Areas Table

The `service_areas` table stores information about service areas:

```sql
CREATE TABLE IF NOT EXISTS service_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city TEXT NOT NULL,
  county TEXT,
  state TEXT NOT NULL,
  zip TEXT,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Fields

- `id`: Unique identifier for the service area
- `city`: City name
- `county`: County name
- `state`: State name
- `zip`: ZIP code
- `available`: Whether service is available in this area
- `created_at`: Timestamp when the service area was created

### Logs Table

The `logs` table stores application logs:

```sql
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
```

### Recent Errors Table

The `recent_errors` table stores recent errors for quick access:

```sql
CREATE TABLE IF NOT EXISTS recent_errors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message TEXT NOT NULL,
  details JSONB,
  source TEXT,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Indexes

The following indexes are created for better query performance:

```sql
CREATE INDEX IF NOT EXISTS products_category_idx ON products (category);
CREATE INDEX IF NOT EXISTS products_slug_idx ON products (slug);
CREATE INDEX IF NOT EXISTS content_page_slug_idx ON content (page_slug);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);
CREATE INDEX IF NOT EXISTS service_areas_city_idx ON service_areas (city);
CREATE INDEX IF NOT EXISTS service_areas_zip_idx ON service_areas (zip);
```

## Row Level Security (RLS) Policies

The following RLS policies are implemented for data security:

```sql
-- Enable RLS on all tables
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
```

## Database Relationships

The database schema includes the following relationships:

1. **Products and Gallery**: Gallery items reference product types through the `project_type` field.
2. **Leads and Service Areas**: Leads include location information that can be validated against service areas.
3. **Testimonials and Products**: Testimonials reference services through the `services` array.

## Schema Creation Script

The complete schema creation script is available in the `database/schema.sql` file. This script can be executed using the Supabase CLI:

```bash
supabase db push
```

## Related Documentation

- [Supabase Integration](../integrations/supabase.md)
- [API Routes Documentation](./api-routes.md)
- [Data Flow Documentation](./data-flow.md)

Last Updated: May 16, 2025 (Initial documentation)
