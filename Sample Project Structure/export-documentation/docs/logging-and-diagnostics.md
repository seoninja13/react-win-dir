# Logging and Diagnostics

This document provides an overview of the logging and diagnostic tools available in the Water Damage CA project.

## Table of Contents
- [Overview](#overview)
- [Logging System](#logging-system)
  - [Basic Logger](#basic-logger)
  - [Enhanced Logger](#enhanced-logger)
  - [Logging API](#logging-api)
- [Diagnostic Tools](#diagnostic-tools)
  - [Diagnostics API](#diagnostics-api)
  - [Diagnostics Page](#diagnostics-page)
- [Troubleshooting](#troubleshooting)
  - [Common Issues](#common-issues)
  - [Debugging Strategies](#debugging-strategies)
- [Best Practices](#best-practices)

## Overview

The Water Damage CA project includes comprehensive logging and diagnostic tools to help identify and resolve issues. These tools are particularly useful for debugging problems in the admin routes and API endpoints.

## Logging System

### Basic Logger

The basic logger is implemented in `lib/utils/logger.ts` and provides the following features:

- Log levels: debug, info, warn, error
- Component-based logging
- Metadata support
- Console output
- Supabase storage (if configured)

Example usage:

```typescript
import { Logger } from '@/lib/utils/logger';

// Create a logger for a specific component
const logger = new Logger('MyComponent');

// Log messages with different levels
logger.debug('Debug message');
logger.info('Info message', { key: 'value' });
logger.warn('Warning message');
logger.error('Error message', { error: 'details' });
```

### Enhanced Logger

The enhanced logger extends the basic logger with additional features and is implemented in `lib/utils/enhanced-logger.ts`:

- Browser environment detection
- Performance timing
- Error stack traces
- Network request logging
- Component lifecycle logging
- Specialized loggers for different admin components

Example usage:

```typescript
import { adminLogger } from '@/lib/utils/enhanced-logger';

// Log component lifecycle
adminLogger.logLifecycle('MyComponent', 'mounted', { props });

// Time an operation
adminLogger.startTimer('myOperation');
// ... perform operation
const duration = await adminLogger.endTimer('myOperation', 'info', 'Operation completed');

// Log API requests and responses
adminLogger.logApiRequest('GET', '/api/data');
// ... make request
adminLogger.logApiResponse('GET', '/api/data', 200, responseData, duration);

// Log errors with stack traces
try {
  // ... code that might throw
} catch (error) {
  adminLogger.logError(error, 'Operation failed');
}
```

### Logging API

The logging API is implemented in `app/api/logs/route.ts` and provides the following features:

- HTTP endpoint for client-side logging
- Server-side timestamp addition
- Request information capture
- Supabase storage (if configured)

The API can be accessed at `/api/logs` and accepts POST requests with log entries.

## Diagnostic Tools

### Diagnostics API

The diagnostics API is implemented in `app/api/diagnostics/route.ts` and provides comprehensive information about the system:

- Environment information
- Environment variable checks
- Supabase connection status
- API route availability
- Memory usage
- Request information

The API can be accessed at `/api/diagnostics` and returns a JSON object with diagnostic information.

Example response:

```json
{
  "timestamp": "2025-04-20T12:34:56.789Z",
  "environment": "development",
  "status": "healthy",
  "checks": {
    "supabase": {
      "status": "ok",
      "responseTime": "123.45ms",
      "data": { "count": 42 }
    },
    "environmentVariables": {
      "NEXT_PUBLIC_SUPABASE_URL": "set",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY": "set",
      "GOOGLE_PLACES_API_KEY": "set"
    },
    "apiRoutes": {
      "/api/admin/batch-process": {
        "status": 200,
        "ok": true,
        "responseTime": "45.67ms"
      }
    },
    "memory": {
      "rss": 123456789,
      "heapTotal": 98765432,
      "heapUsed": 87654321
    },
    "request": {
      "url": "http://localhost:8888/api/diagnostics",
      "method": "GET",
      "userAgent": "Mozilla/5.0 ..."
    }
  }
}
```

### Diagnostics Page

The diagnostics page is implemented in `app/admin/diagnostics/page.tsx` and provides a user-friendly interface for viewing diagnostic information:

- System status overview
- Environment variable checks
- Supabase connection status
- API route availability
- Memory usage
- Request information
- Browser environment information
- Raw diagnostic data

The page can be accessed at `/admin/diagnostics` and is available in the admin dashboard.

## Troubleshooting

### Common Issues

#### Admin Routes Not Loading in Netlify Dev

If admin routes are not loading properly in Netlify Dev (port 8888), check the following:

1. **Environment Variables**: Ensure all required environment variables are set in `.env.local`
2. **API Routes**: Verify API routes are correctly implemented and responding
3. **Client-Side Components**: Check for issues with client-side rendering
4. **Netlify Dev Configuration**: Review `netlify.toml` for correct configuration
5. **Next.js Configuration**: Ensure Next.js is correctly configured for Netlify Dev

#### API Routes Not Responding

If API routes are not responding properly, check the following:

1. **Route Implementation**: Verify the route is correctly implemented
2. **Environment Variables**: Ensure all required environment variables are set
3. **Supabase Connection**: Check if Supabase is correctly configured and accessible
4. **Error Handling**: Review error handling in the route implementation

#### Supabase Connection Issues

If there are issues with the Supabase connection, check the following:

1. **Environment Variables**: Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correctly set
2. **Network Access**: Verify the Supabase instance is accessible from the development environment
3. **Database Schema**: Check if the required tables and columns exist in the database

### Debugging Strategies

#### Using the Diagnostics API

The diagnostics API provides comprehensive information about the system and can be used to identify issues:

1. Access `/api/diagnostics` to get diagnostic information
2. Check the `status` field for overall system health
3. Review the `checks` object for specific issues
4. Look for `error` fields in the response for error details

#### Using the Enhanced Logger

The enhanced logger provides detailed information about the system and can be used to track issues:

1. Add logging statements to relevant components and functions
2. Use `logLifecycle` to track component mounting and unmounting
3. Use `startTimer` and `endTimer` to measure performance
4. Use `logError` to capture detailed error information

#### Browser Developer Tools

Browser developer tools can be used to identify client-side issues:

1. Open the browser console to view log messages and errors
2. Use the Network tab to monitor API requests and responses
3. Use the Application tab to check local storage and session storage
4. Use the Performance tab to identify performance bottlenecks

## Best Practices

### Logging Best Practices

1. **Use Appropriate Log Levels**: Use debug for detailed information, info for general information, warn for potential issues, and error for actual errors
2. **Include Context**: Always include relevant context in log messages, such as component name, operation being performed, and relevant data
3. **Avoid Sensitive Information**: Never log sensitive information such as API keys, passwords, or personal data
4. **Log Lifecycle Events**: Log component mounting, unmounting, and significant state changes
5. **Log Performance Metrics**: Use timers to measure and log performance of critical operations

### Diagnostic Best Practices

1. **Regular Health Checks**: Regularly check the diagnostics page to ensure the system is healthy
2. **Monitor API Routes**: Verify all API routes are responding correctly
3. **Check Environment Variables**: Ensure all required environment variables are set
4. **Review Supabase Connection**: Verify the Supabase connection is working correctly
5. **Monitor Memory Usage**: Keep an eye on memory usage to identify potential memory leaks
