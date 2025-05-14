# Supabase Integration

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Integrations](./index.md) > Supabase Integration

## Table of Contents

1. [Overview](#overview)
2. [Supabase Project Information](#supabase-project-information)
3. [Environment Setup](#environment-setup)
4. [Client Configuration](#client-configuration)
5. [Database Schema](#database-schema)
6. [Data Access Layer](#data-access-layer)
7. [Form Submission](#form-submission)
8. [Logging and Error Tracking](#logging-and-error-tracking)
9. [Testing and Validation](#testing-and-validation)
10. [Best Practices](#best-practices)
11. [Related Documentation](#related-documentation)

## Overview

The Windows Doors CA website uses Supabase as its database and backend service. Supabase provides a PostgreSQL database, authentication, storage, and other features that power the website's dynamic content and functionality.

This document provides detailed information about the Supabase integration, including setup instructions, database schema, data access patterns, and best practices.

## Supabase Project Information

The Windows Doors CA website uses the following Supabase project:

- **Project Name**: Window Doors Website Dir
- **Project ID**: wzohdczffpgnpjehhfnb
- **Region**: us-west-1
- **Status**: ACTIVE_HEALTHY
- **Database Host**: db.wzohdczffpgnpjehhfnb.supabase.co

## Environment Setup

### Environment Variables

The Supabase connection requires the following environment variables in the `.env.local` file:

```
# Supabase variables
NEXT_PUBLIC_SUPABASE_URL=https://wzohdczffpgnpjehhfnb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

### Supabase CLI Setup

For local development and type generation, install and configure the Supabase CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Initialize Supabase in the project
supabase init

# Link to the project
supabase link --project-ref wzohdczffpgnpjehhfnb

# Generate TypeScript types
supabase gen types typescript --linked > Relume-root/src/types/supabase.ts
```

## Client Configuration

### Supabase Client Initialization

The Supabase client is initialized in the `Relume-root/src/utils/supabase.ts` file:

```typescript
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

### Usage in Components

To use the Supabase client in components:

```typescript
import { supabase } from '@/utils/supabase';

// Example: Fetch products
async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data || [];
}
```

## Database Schema

The Windows Doors CA website uses the following database tables:

### Products Table

Stores information about all products (windows, doors, siding, roofing):

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

### Content Table

Stores content for informational pages:

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

### Leads Table

Stores customer leads from the Request Free Estimate (RFE) forms:

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

For the complete database schema, see the [Database Schema Documentation](../architecture/database-schema.md).

## Data Access Layer

The data access layer provides utility functions for interacting with the database. These functions are organized by entity type:

### Base Database Utility

The base database utility provides common functionality for all database operations:

```typescript
// Relume-root/src/utils/db/index.ts
import { supabase } from '@/utils/supabase';
import { logError } from '@/utils/logging';

export async function handleDatabaseError(error: any, operation: string, details?: any) {
  const errorDetails = {
    operation,
    details,
    error: error.message,
    code: error.code,
  };
  
  logError('Database operation failed', errorDetails);
  throw new Error(`Database operation failed: ${operation}`);
}

export { supabase };
```

### Entity-Specific Utilities

Each entity type has its own utility file:

- `Relume-root/src/utils/db/products.ts` - Product-related operations
- `Relume-root/src/utils/db/content.ts` - Content-related operations
- `Relume-root/src/utils/db/leads.ts` - Lead-related operations
- `Relume-root/src/utils/db/testimonials.ts` - Testimonial-related operations
- `Relume-root/src/utils/db/gallery.ts` - Gallery-related operations
- `Relume-root/src/utils/db/service-areas.ts` - Service area operations

## Form Submission

### API Routes

Form submissions are handled by API routes that insert data into the Supabase database:

```typescript
// Relume-root/src/app/api/leads/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';
import { logError } from '@/utils/logging';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['first_name', 'last_name', 'email'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Insert lead into database
    const { data, error } = await supabase
      .from('leads')
      .insert([body])
      .select();
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    logError('Lead submission failed', { error });
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}
```

## Logging and Error Tracking

Supabase is also used for logging and error tracking. The following tables are used:

- `logs` - General logging table
- `recent_errors` - Recent errors table for quick access to error information

### Logging Utility

The logging utility provides functions for logging messages and errors:

```typescript
// Relume-root/src/utils/logging.ts
import { supabase } from './supabase';

type LogLevel = 'info' | 'warning' | 'error' | 'debug';

export async function log(
  level: LogLevel,
  message: string,
  details?: any,
  tags?: string[]
) {
  try {
    const { error } = await supabase.from('logs').insert([
      {
        level,
        message,
        details,
        tags,
        source: 'client',
        url: typeof window !== 'undefined' ? window.location.href : '',
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      },
    ]);
    
    if (error) {
      console.error('Failed to log message:', error);
    }
  } catch (err) {
    console.error('Logging failed:', err);
  }
}
```

## Testing and Validation

### Testing Database Operations

Database operations should be tested using Jest and the Supabase JavaScript client:

```typescript
// Relume-root/src/__tests__/db/products.test.ts
import { getProducts, getProductBySlug } from '@/utils/db/products';

describe('Product Database Operations', () => {
  test('getProducts returns an array of products', async () => {
    const products = await getProducts();
    expect(Array.isArray(products)).toBe(true);
  });

  test('getProductBySlug returns a product when given a valid slug', async () => {
    const product = await getProductBySlug('double-hung-windows');
    expect(product).not.toBeNull();
    expect(product?.slug).toBe('double-hung-windows');
  });
});
```

## Best Practices

1. **Use TypeScript Types**: Always use the generated TypeScript types for type safety.
2. **Handle Errors**: Always handle errors from Supabase operations.
3. **Use RLS Policies**: Implement Row Level Security (RLS) policies for data protection.
4. **Create Indexes**: Create indexes for frequently queried columns.
5. **Batch Operations**: Use batch operations for better performance.
6. **Use Transactions**: Use transactions for operations that need to be atomic.
7. **Validate Input**: Always validate user input before inserting into the database.
8. **Log Errors**: Log all errors for debugging and monitoring.

## Related Documentation

- [Database Schema Documentation](../architecture/database-schema.md)
- [API Routes Documentation](../architecture/api-routes.md)
- [Form Submission Documentation](../features/form-submission.md)
- [Logging and Error Tracking Documentation](../features/logging-error-tracking.md)

Last Updated: May 16, 2025 (Initial documentation)
