# Supabase Implementation Plan

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Planning](./index.md) > Supabase Implementation Plan

## Table of Contents

1. [Introduction](#introduction)
2. [Current Status Assessment](#current-status-assessment)
3. [Implementation Plan](#implementation-plan)
   - [Set Up Supabase Client Configuration](#1-set-up-supabase-client-configuration)
   - [Design and Create Database Schema](#2-design-and-create-database-schema)
   - [Create Data Access Layer](#3-create-data-access-layer)
   - [Implement Form Submission](#4-implement-form-submission)
   - [Implement Logging and Error Tracking](#5-implement-logging-and-error-tracking)
   - [Testing and Documentation](#6-testing-and-documentation)
4. [Detailed Implementation Steps](#detailed-implementation-steps)
5. [Timeline](#timeline)
6. [Related Documentation](#related-documentation)

## Introduction

This document outlines the implementation plan for integrating Supabase as the database and backend service for the Windows Doors CA website. Supabase will be used for storing product information, content, leads, testimonials, gallery items, and service areas.

## Current Status Assessment

1. **Supabase Project**: 
   - We have an active Supabase project named "Window Doors Website Dir" (ID: wzohdczffpgnpjehhfnb)
   - The project is in the us-west-1 region
   - Currently has only two tables: `logs` and `recent_errors` for error tracking

2. **Dependencies**:
   - The project already has `@supabase/supabase-js` v2.49.4 installed in both the root and Relume-root package.json files

3. **Environment Variables**:
   - No Supabase environment variables are currently set up in the .env.local file
   - Only Unsplash API credentials are present

## Implementation Plan

### 1. Set Up Supabase Client Configuration

**Action Items:**
- Create a Supabase client utility file
- Set up environment variables for Supabase connection
- Create TypeScript types for database schema

**Files to Create/Modify:**

1. **Create Supabase Environment Variables**
   - Add Supabase URL and anon key to .env.local file

2. **Create Supabase Client Utility**
   - Create `Relume-root/src/utils/supabase.ts` for client initialization

3. **Generate TypeScript Types**
   - Set up Supabase CLI
   - Generate TypeScript types for database schema

### 2. Design and Create Database Schema

**Action Items:**
- Create tables based on the architecture documentation requirements
- Set up relationships between tables
- Implement Row Level Security (RLS) policies
- Create indexes for frequently queried columns

**Tables to Create:**

1. **products**
   - Categories, types, features, specifications, images
   - For windows, doors, siding, roofing products

2. **content**
   - Page content, sections, images
   - For informational pages

3. **leads**
   - Customer information, requested services, timestamps
   - For Request Free Estimate (RFE) forms

4. **testimonials**
   - Customer name, location, testimonial text, rating

5. **gallery**
   - Project type, location, images, descriptions

6. **service_areas**
   - Cities, counties, zip codes, service availability

### 3. Create Data Access Layer

**Action Items:**
- Create utility functions for common database operations
- Implement error handling for database operations
- Create hooks for data fetching

**Files to Create:**

1. **Create Data Access Utilities**
   - Create `Relume-root/src/utils/db/products.ts` for product-related operations
   - Create `Relume-root/src/utils/db/content.ts` for content-related operations
   - Create `Relume-root/src/utils/db/leads.ts` for lead-related operations
   - Create `Relume-root/src/utils/db/testimonials.ts` for testimonial-related operations
   - Create `Relume-root/src/utils/db/gallery.ts` for gallery-related operations
   - Create `Relume-root/src/utils/db/service-areas.ts` for service area operations

2. **Create React Hooks**
   - Create `Relume-root/src/hooks/useProducts.ts` for product data fetching
   - Create `Relume-root/src/hooks/useContent.ts` for content data fetching
   - Create `Relume-root/src/hooks/useTestimonials.ts` for testimonial data fetching
   - Create `Relume-root/src/hooks/useGallery.ts` for gallery data fetching
   - Create `Relume-root/src/hooks/useServiceAreas.ts` for service area data fetching

### 4. Implement Form Submission

**Action Items:**
- Create form submission utilities
- Implement validation for form inputs
- Create API routes for form submission

**Files to Create:**

1. **Create Form Submission Utilities**
   - Create `Relume-root/src/utils/forms.ts` for form validation and submission

2. **Create API Routes**
   - Create `Relume-root/src/app/api/leads/route.ts` for lead form submission

### 5. Implement Logging and Error Tracking

**Action Items:**
- Create logging utilities
- Implement error tracking
- Set up error boundaries

**Files to Create:**

1. **Create Logging Utilities**
   - Create `Relume-root/src/utils/logging.ts` for logging operations

2. **Create Error Tracking**
   - Create `Relume-root/src/utils/error-tracking.ts` for error tracking

### 6. Testing and Documentation

**Action Items:**
- Create test cases for database operations
- Document database schema and operations
- Create examples for common operations

**Files to Create:**

1. **Create Test Cases**
   - Create `Relume-root/src/__tests__/db/products.test.ts` for product operations testing
   - Create similar test files for other database operations

2. **Update Documentation**
   - Update `docs/architecture/database-schema.md` with database schema details
   - Update `docs/integrations/supabase.md` with Supabase integration details

## Detailed Implementation Steps

### Step 1: Set Up Supabase Client Configuration

1. **Add Supabase Environment Variables to .env.local**

```
# Existing variables
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=vGwz6K4oB14ArpL-1Bm3FjFX-Bp2rFM5GM6a_cvM8VQ
UNSPLASH_SECRET_KEY=n76HBdN-t-iG7t4BeGNjCIy-ynPCpUQ0VxfE82T9qCc
UNSPLASH_APPLICATION_ID=749207
NEXT_PUBLIC_SITE_URL=http://localhost:4000

# Supabase variables
NEXT_PUBLIC_SUPABASE_URL=https://wzohdczffpgnpjehhfnb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

2. **Create Supabase Client Utility**

Create `Relume-root/src/utils/supabase.ts`:

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

3. **Generate TypeScript Types**

Install Supabase CLI and generate types:

```bash
npm install -g supabase
supabase login
supabase init
supabase link --project-ref wzohdczffpgnpjehhfnb
supabase gen types typescript --linked > Relume-root/src/types/supabase.ts
```

### Step 2: Design and Create Database Schema

1. **Create SQL Script for Database Schema**

Create `database/schema.sql` with the schema defined in the [Database Schema Documentation](../architecture/database-schema.md).

2. **Execute SQL Script**

Execute the SQL script using Supabase:

```bash
supabase db push
```

## Timeline

| Task | Estimated Duration | Dependencies |
|------|-------------------|--------------|
| Set Up Supabase Client Configuration | 1 day | None |
| Design and Create Database Schema | 2 days | Supabase Client Configuration |
| Create Data Access Layer | 3 days | Database Schema |
| Implement Form Submission | 2 days | Data Access Layer |
| Implement Logging and Error Tracking | 1 day | Supabase Client Configuration |
| Testing and Documentation | 2 days | All previous tasks |
| **Total** | **11 days** | |

## Related Documentation

- [Database Schema Documentation](../architecture/database-schema.md)
- [Supabase Integration Documentation](../integrations/supabase.md)
- [API Routes Documentation](../architecture/api-routes.md)
- [Data Flow Documentation](../architecture/data-flow.md)

Last Updated: May 16, 2025 (Initial documentation)
