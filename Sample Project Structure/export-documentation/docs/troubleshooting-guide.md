# Troubleshooting Guide

This guide provides solutions for common issues encountered in the Water Damage CA project.

## Table of Contents
- [Admin Routes Issues](#admin-routes-issues)
- [API Routes Issues](#api-routes-issues)
- [Supabase Connection Issues](#supabase-connection-issues)
- [Netlify Dev Issues](#netlify-dev-issues)
- [Environment Variable Issues](#environment-variable-issues)
- [Performance Issues](#performance-issues)
- [Using Diagnostic Tools](#using-diagnostic-tools)

## Admin Routes Issues

### Admin Routes Not Loading in Netlify Dev

**Symptoms**: Admin routes return 404 or blank page when accessed through Netlify Dev (port 8888).

**Possible Causes**:
1. Environment variables not loaded correctly
2. API routes not responding
3. Client-side rendering issues
4. Netlify Dev configuration issues

**Solutions**:

1. **Check Environment Variables**:
   - Verify that all required environment variables are set in `.env.local`
   - Check if environment variables are being loaded by Netlify Dev
   - Use the diagnostics page to verify environment variables

2. **Check API Routes**:
   - Access API routes directly to check if they're responding
   - Check for errors in the terminal output
   - Use the diagnostics API to check API route status

3. **Check Client-Side Rendering**:
   - Check for errors in the browser console
   - Try accessing the routes in the Next.js development server (port 3000)
   - Use the enhanced logger to track component lifecycle events

4. **Check Netlify Dev Configuration**:
   - Verify that the `netlify.toml` file is correctly configured
   - Try running Netlify Dev with the explicit command: `netlify dev --command "npx next dev"`
   - Check for errors in the terminal output

### Admin Routes Working in Next.js but Not in Netlify Dev

**Symptoms**: Admin routes work in Next.js development server (port 3000) but not in Netlify Dev (port 8888).

**Possible Causes**:
1. Netlify Dev configuration issues
2. Edge functions not working correctly
3. Environment variables not loaded correctly in Netlify Dev

**Solutions**:

1. **Check Netlify Dev Configuration**:
   - Verify that the `netlify.toml` file is correctly configured
   - Try running Netlify Dev with the explicit command: `netlify dev --command "npx next dev"`
   - Check for errors in the terminal output

2. **Check Edge Functions**:
   - Verify that edge functions are correctly implemented
   - Check for errors in the terminal output
   - Try accessing edge functions directly

3. **Check Environment Variables**:
   - Verify that all required environment variables are set in `.env.local`
   - Check if environment variables are being loaded by Netlify Dev
   - Use the diagnostics page to verify environment variables

## API Routes Issues

### API Routes Not Responding

**Symptoms**: API routes return 404 or error responses.

**Possible Causes**:
1. Route implementation issues
2. Environment variables not set correctly
3. Supabase connection issues
4. Edge function issues

**Solutions**:

1. **Check Route Implementation**:
   - Verify that the route is correctly implemented
   - Check for syntax errors or missing imports
   - Use the enhanced logger to track API requests and responses

2. **Check Environment Variables**:
   - Verify that all required environment variables are set
   - Check if environment variables are being loaded correctly
   - Use the diagnostics page to verify environment variables

3. **Check Supabase Connection**:
   - Verify that Supabase is correctly configured and accessible
   - Check for errors in the terminal output
   - Use the diagnostics page to check Supabase connection status

4. **Check Edge Functions**:
   - Verify that edge functions are correctly implemented
   - Check for errors in the terminal output
   - Try accessing edge functions directly

### API Routes Returning Errors

**Symptoms**: API routes return error responses (4xx or 5xx status codes).

**Possible Causes**:
1. Invalid request parameters
2. Database connection issues
3. External API issues
4. Server-side errors

**Solutions**:

1. **Check Request Parameters**:
   - Verify that the request parameters are valid
   - Check for missing or invalid parameters
   - Use the enhanced logger to track API requests and responses

2. **Check Database Connection**:
   - Verify that the database is correctly configured and accessible
   - Check for errors in the terminal output
   - Use the diagnostics page to check database connection status

3. **Check External APIs**:
   - Verify that external APIs are correctly configured and accessible
   - Check for errors in the terminal output
   - Use the enhanced logger to track external API requests and responses

4. **Check Server-Side Errors**:
   - Check for errors in the terminal output
   - Use the enhanced logger to track server-side errors
   - Use the diagnostics page to check server status

## Supabase Connection Issues

### Supabase Connection Failing

**Symptoms**: Supabase operations fail with connection errors.

**Possible Causes**:
1. Environment variables not set correctly
2. Network access issues
3. Supabase instance issues
4. Database schema issues

**Solutions**:

1. **Check Environment Variables**:
   - Verify that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correctly set
   - Check if environment variables are being loaded correctly
   - Use the diagnostics page to verify environment variables

2. **Check Network Access**:
   - Verify that the Supabase instance is accessible from the development environment
   - Check for network connectivity issues
   - Try accessing the Supabase instance directly

3. **Check Supabase Instance**:
   - Verify that the Supabase instance is running correctly
   - Check for errors in the Supabase dashboard
   - Try restarting the Supabase instance

4. **Check Database Schema**:
   - Verify that the required tables and columns exist in the database
   - Check for schema changes that might affect the application
   - Use the diagnostics page to check database schema

### Supabase Operations Failing

**Symptoms**: Supabase operations (select, insert, update, delete) fail with errors.

**Possible Causes**:
1. Invalid query parameters
2. Permission issues
3. Database constraints
4. Database schema issues

**Solutions**:

1. **Check Query Parameters**:
   - Verify that the query parameters are valid
   - Check for missing or invalid parameters
   - Use the enhanced logger to track Supabase operations

2. **Check Permissions**:
   - Verify that the Supabase user has the required permissions
   - Check for permission issues in the Supabase dashboard
   - Try using a different Supabase user

3. **Check Database Constraints**:
   - Verify that the operation doesn't violate any database constraints
   - Check for foreign key constraints, unique constraints, etc.
   - Use the enhanced logger to track database errors

4. **Check Database Schema**:
   - Verify that the required tables and columns exist in the database
   - Check for schema changes that might affect the application
   - Use the diagnostics page to check database schema

## Netlify Dev Issues

### Netlify Dev Not Starting

**Symptoms**: Netlify Dev fails to start or crashes immediately.

**Possible Causes**:
1. Netlify CLI not installed correctly
2. `netlify.toml` file issues
3. Next.js not installed correctly
4. Port conflicts

**Solutions**:

1. **Check Netlify CLI**:
   - Verify that the Netlify CLI is installed correctly
   - Try reinstalling the Netlify CLI: `npm install -g netlify-cli`
   - Check for errors in the terminal output

2. **Check `netlify.toml` File**:
   - Verify that the `netlify.toml` file exists and is correctly configured
   - Check for syntax errors in the `netlify.toml` file
   - Try using a minimal `netlify.toml` file

3. **Check Next.js Installation**:
   - Verify that Next.js is installed correctly
   - Try reinstalling Next.js: `npm install next`
   - Check for errors in the terminal output

4. **Check Port Conflicts**:
   - Verify that ports 3000 and 8888 are not in use
   - Try killing processes using these ports: `npx kill-port 3000 8888`
   - Try using different ports: `netlify dev --targetPort 3001 --port 8889`

### Netlify Dev Running but Not Serving Content

**Symptoms**: Netlify Dev starts successfully but returns 404 or blank pages.

**Possible Causes**:
1. Next.js server not starting correctly
2. Netlify Dev configuration issues
3. Port conflicts
4. Environment variable issues

**Solutions**:

1. **Check Next.js Server**:
   - Verify that the Next.js server is starting correctly
   - Check for errors in the terminal output
   - Try starting the Next.js server directly: `npx next dev`

2. **Check Netlify Dev Configuration**:
   - Verify that the `netlify.toml` file is correctly configured
   - Try running Netlify Dev with the explicit command: `netlify dev --command "npx next dev"`
   - Check for errors in the terminal output

3. **Check Port Conflicts**:
   - Verify that ports 3000 and 8888 are not in use
   - Try killing processes using these ports: `npx kill-port 3000 8888`
   - Try using different ports: `netlify dev --targetPort 3001 --port 8889`

4. **Check Environment Variables**:
   - Verify that all required environment variables are set
   - Check if environment variables are being loaded correctly
   - Use the diagnostics page to verify environment variables

## Environment Variable Issues

### Environment Variables Not Loaded

**Symptoms**: Environment variables are undefined or have incorrect values.

**Possible Causes**:
1. `.env.local` file not found
2. Environment variables not set correctly
3. Environment variables not loaded by the application
4. Environment variables not loaded by Netlify Dev

**Solutions**:

1. **Check `.env.local` File**:
   - Verify that the `.env.local` file exists in the project root
   - Check for syntax errors in the `.env.local` file
   - Try creating a new `.env.local` file with the required variables

2. **Check Environment Variable Values**:
   - Verify that the environment variables have the correct values
   - Check for typos or missing values
   - Use the diagnostics page to verify environment variables

3. **Check Application Loading**:
   - Verify that the application is loading environment variables correctly
   - Check for errors in the terminal output
   - Use the enhanced logger to track environment variable loading

4. **Check Netlify Dev Loading**:
   - Verify that Netlify Dev is loading environment variables correctly
   - Check for errors in the terminal output
   - Try running Netlify Dev with the `--debug` flag: `netlify dev --debug`

### Environment Variables Loaded but Not Working

**Symptoms**: Environment variables are loaded but not working as expected.

**Possible Causes**:
1. Environment variables have incorrect values
2. Environment variables not used correctly in the application
3. Environment variables not accessible in the current context
4. Environment variables not loaded in the correct scope

**Solutions**:

1. **Check Environment Variable Values**:
   - Verify that the environment variables have the correct values
   - Check for typos or missing values
   - Use the diagnostics page to verify environment variables

2. **Check Application Usage**:
   - Verify that the application is using environment variables correctly
   - Check for errors in the terminal output
   - Use the enhanced logger to track environment variable usage

3. **Check Context Accessibility**:
   - Verify that environment variables are accessible in the current context
   - Check if environment variables are client-side or server-side
   - Use the diagnostics page to check environment variable accessibility

4. **Check Scope Loading**:
   - Verify that environment variables are loaded in the correct scope
   - Check if environment variables are prefixed with `NEXT_PUBLIC_` for client-side access
   - Use the diagnostics page to check environment variable scope

## Performance Issues

### Slow Page Loading

**Symptoms**: Pages take a long time to load or render.

**Possible Causes**:
1. Large bundle size
2. Slow API responses
3. Inefficient database queries
4. Client-side rendering issues

**Solutions**:

1. **Check Bundle Size**:
   - Analyze the bundle size using tools like `next/bundle-analyzer`
   - Identify large dependencies and optimize them
   - Use code splitting and dynamic imports to reduce bundle size

2. **Check API Responses**:
   - Measure API response times using the enhanced logger
   - Identify slow API endpoints and optimize them
   - Use caching to improve API performance

3. **Check Database Queries**:
   - Analyze database query performance using the enhanced logger
   - Identify slow queries and optimize them
   - Use indexes and query optimization techniques

4. **Check Rendering**:
   - Analyze component rendering performance using the enhanced logger
   - Identify slow components and optimize them
   - Use memoization and other optimization techniques

### Memory Leaks

**Symptoms**: Memory usage increases over time, leading to performance degradation or crashes.

**Possible Causes**:
1. Uncleared event listeners
2. Uncleared intervals or timeouts
3. Circular references
4. Large data structures in memory

**Solutions**:

1. **Check Event Listeners**:
   - Verify that event listeners are properly removed when components unmount
   - Use the enhanced logger to track event listener creation and removal
   - Use tools like Chrome DevTools Memory panel to identify memory leaks

2. **Check Intervals and Timeouts**:
   - Verify that intervals and timeouts are properly cleared when components unmount
   - Use the enhanced logger to track interval and timeout creation and clearing
   - Use tools like Chrome DevTools Memory panel to identify memory leaks

3. **Check References**:
   - Identify circular references and break them
   - Use tools like Chrome DevTools Memory panel to identify circular references
   - Use the enhanced logger to track object creation and disposal

4. **Check Data Structures**:
   - Identify large data structures in memory and optimize them
   - Use pagination, virtualization, and other techniques to reduce memory usage
   - Use the enhanced logger to track memory usage

## Using Diagnostic Tools

### Diagnostics Page

The diagnostics page provides comprehensive information about the system and can help identify issues:

1. Access the diagnostics page at `/admin/diagnostics`
2. Check the system status and environment information
3. Verify that all required environment variables are set
4. Check the Supabase connection status
5. Verify that all API routes are responding correctly

### Diagnostics API

The diagnostics API provides the same information as the diagnostics page but in JSON format:

1. Access the diagnostics API at `/api/diagnostics`
2. Check the `status` field for overall system health
3. Review the `checks` object for specific issues
4. Look for `error` fields in the response for error details

### Enhanced Logger

The enhanced logger provides detailed information about the system and can be used to track issues:

1. Import the enhanced logger in your components and functions:
   ```typescript
   import { adminLogger } from '@/lib/utils/enhanced-logger';
   ```

2. Use the logger to track component lifecycle events:
   ```typescript
   adminLogger.logLifecycle('MyComponent', 'mounted', { props });
   ```

3. Use the logger to measure performance:
   ```typescript
   adminLogger.startTimer('myOperation');
   // ... perform operation
   const duration = await adminLogger.endTimer('myOperation', 'info', 'Operation completed');
   ```

4. Use the logger to track API requests and responses:
   ```typescript
   adminLogger.logApiRequest('GET', '/api/data');
   // ... make request
   adminLogger.logApiResponse('GET', '/api/data', 200, responseData, duration);
   ```

5. Use the logger to track errors:
   ```typescript
   try {
     // ... code that might throw
   } catch (error) {
     adminLogger.logError(error, 'Operation failed');
   }
   ```

### Browser Developer Tools

Browser developer tools can be used to identify client-side issues:

1. Open the browser console (F12 or Ctrl+Shift+I)
2. Check for JavaScript errors
3. Use the Network tab to monitor API requests and responses
4. Use the Application tab to check local storage and session storage
5. Use the Performance tab to identify performance bottlenecks
6. Use the Memory tab to identify memory leaks
