# Extensive Logging System with Supabase

This document provides instructions for using the extensive logging system implemented with Supabase in the Windows Doors Website project.

## Overview

The logging system provides comprehensive logging capabilities with the following features:

- Multiple log levels (debug, info, warn, error, fatal)
- Structured data storage with JSON support
- Source tracking to identify which component generated the log
- Session tracking across page views
- Browser and environment information
- Automatic cleanup of old logs (30 days)
- Row-level security for log access

## Setup

### 1. Database Setup

The logging system requires a Supabase database with the appropriate tables and functions. To set up the database:

1. Go to the Supabase SQL Editor
2. Copy and paste the contents of `src/scripts/create-tables.js` into the SQL Editor
3. Run the SQL script to create the necessary tables and functions

Alternatively, you can run the setup script:

```bash
npm run setup-db
```

### 2. Environment Variables

Make sure your `.env.local` file contains the following Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://wzohdczffpgnpjehhfnb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6b2hkY3pmZnBnbnBqZWhoZm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MDAxNjUsImV4cCI6MjA2MjA3NjE2NX0.3ozVyuTi0JjX16sBQokvwME0p02BVdpd_uryznfvKxk
```

## Usage

### Basic Logging

Import the logger and use it to log messages:

```typescript
import { logger } from '@/lib/logger';

// Log a simple message
logger.info('User logged in');

// Log with additional details
logger.info('User action', { 
  userId: '123', 
  action: 'button_click', 
  component: 'LoginForm' 
});

// Log different levels
logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message');
logger.fatal('Fatal error message');
```

### Component-Specific Logging

Create a logger instance specific to a component:

```typescript
import { createLogger } from '@/lib/logger';

// Create a component-specific logger
const componentLogger = createLogger('MyComponent');

// Use the component logger
componentLogger.info('Component initialized');
```

### Logging with Tags

Add tags to categorize logs:

```typescript
logger.info('User action', { userId: '123' }, ['user', 'authentication']);
```

### Automatic Logging

The logging system automatically captures:

- Session ID (generated per browser session)
- URL being accessed
- User agent information
- Timestamp

## Viewing Logs

### Supabase Dashboard

To view logs in the Supabase dashboard:

1. Go to the Supabase dashboard
2. Navigate to the "Table Editor"
3. Select the "logs" table
4. Use filters to find specific logs

### Recent Errors View

A view called `recent_errors` is available to quickly see recent error and fatal logs:

```sql
SELECT * FROM recent_errors;
```

## Testing

A test page is available at `/logging-test` to test the logging functionality.

## Security

The logging system implements Row Level Security (RLS) to ensure that:

- Only authenticated users with specific roles can view logs
- Anyone can insert logs (to allow client-side logging)

## Maintenance

Logs older than 30 days are automatically deleted to prevent the database from growing too large.

## Troubleshooting

### Common Issues

1. **Logs not being saved**: Check that the Supabase credentials are correct and that the logs table exists.
2. **Permission errors**: Ensure that the RLS policies are correctly configured.
3. **Missing information**: Check that the logger is being used correctly with the appropriate parameters.

### Debugging

To debug the logging system itself, check the browser console for any errors related to the Supabase client or the logger.
