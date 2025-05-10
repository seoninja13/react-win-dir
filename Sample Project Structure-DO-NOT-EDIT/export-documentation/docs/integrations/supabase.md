# Supabase Integration

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Integrations](./index.md) > Supabase Integration

This document provides instructions for setting up and using the Supabase integration in the Water Damage CA project.

## Overview

The Supabase integration allows our application to interact with the Supabase database for storing and retrieving data. This includes both direct client access and MCP server integration for AI tools to interact with our database using natural language commands.

## Setup Instructions

### 1. Environment Variables

Add the following environment variables to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_CONNECTION_STRING=postgresql://postgres:your_password@db.your-project-ref.supabase.co:6543/postgres?pgbouncer=true
```

### 2. Update MCP Configuration

Run the following command to update the MCP configuration with your Supabase connection string:

```bash
npm run update-mcp
```

This will create or update the `.mcp.json` file in the project root with the correct configuration.

### 3. Install Dependencies

Install the required dependencies:

```bash
npm install
```

## Database Schema

The Supabase database includes the following tables:

1. **cities** - Information about cities in California
2. **services** - Water damage and mold removal services
3. **businesses** - Business listings from Google Places API
4. **leads** - Lead information from form submissions
5. **content** - Content for city-service pages
6. **city_service** - Junction table for city-service relationships

## Usage

### Using the Supabase Client

```typescript
import { supabase } from '../lib/supabase';

// Example: Fetch all cities
const { data, error } = await supabase
  .from('cities')
  .select('*')
  .order('name');
```

### Using the Database Helper Functions

```typescript
import { getCities, createLead } from '../lib/database';

// Example: Fetch all cities
const { data, error } = await getCities();

// Example: Create a new lead
const leadData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  message: 'I need help with water damage',
  city_id: 'city-uuid',
  service_id: 'service-uuid'
};

const { data, error } = await createLead(leadData);
```

### Using the API Routes

```typescript
// Example: Fetch cities
const response = await fetch('/api/supabase?operation=getCities');
const { data } = await response.json();

// Example: Create a lead
const response = await fetch('/api/supabase', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    operation: 'createLead',
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      message: 'I need help with water damage',
      city_id: 'city-uuid',
      service_id: 'service-uuid'
    }
  })
});
const { data } = await response.json();
```

### Testing the Integration

Visit the Supabase test page at `/test/supabase` to test the integration. This page provides a UI for testing read and write operations.

## Security Considerations

- The MCP server runs all queries as read-only transactions for security
- The Supabase client uses the anon key which has limited permissions
- All user inputs are validated using Zod schemas
- Error handling is implemented for all database operations

## Troubleshooting

### Connection Issues

If you encounter connection issues:

1. Verify that your Supabase project is running
2. Check that your connection string is correct
3. Ensure that your database password is correct
4. Verify that your IP address is allowed in Supabase

### Permission Issues

If you encounter permission issues:

1. Check the Row Level Security (RLS) policies in Supabase
2. Verify that the anon key has the necessary permissions
3. Check that the tables exist in the database

## Next Steps

1. Create additional test components for specific database operations
2. Implement more sophisticated error handling
3. Add data validation for all user inputs
4. Create a dashboard for monitoring database operations

## Related Documentation

- [Business Profile Implementation](../features/business-profile-implementation.md)
- [City Management](../features/city-management.md)
- [Data Enrichment](../features/data-enrichment.md)
- [Batch Processing](../processes/batch-processing.md)
- [OpenRouter Integration](./openrouter.md)

Last Updated: April 22, 2025
