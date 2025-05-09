# Netlify Dev Testing Environment

## Overview

This document outlines the proper approach for testing the Water Damage CA application in a production-like environment using Netlify Dev.

## Why Netlify Dev?

Netlify Dev provides a local development environment that closely mirrors the production Netlify environment. It offers several advantages:

1. **Production Parity**: Netlify Dev simulates the exact production environment, including serverless functions, redirects, and headers.
2. **Edge Functions**: Tests edge functions and middleware exactly as they would run in production.
3. **Integrated Functions**: Tests the integration between the Next.js application and Netlify functions.
4. **Environment Variables**: Uses the same environment variables as the production environment.

## Important Requirement

**We should be testing using Netlify Dev on port 8888 as specified in project requirements, not directly with Next.js on port 3000.**

This is a critical requirement for ensuring that our testing accurately reflects the production environment. Testing directly with Next.js dev server may miss issues related to Netlify-specific configurations.

## Setting Up Netlify Dev

1. Install the Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```

2. Link your local project to your Netlify site:
   ```bash
   netlify link
   ```

3. Start the Netlify Dev server:
   ```bash
   netlify dev
   ```

4. Access the application at:
   ```
   http://localhost:8888
   ```

## Testing Admin Routes

When testing admin routes, always use Netlify Dev:

1. Start Netlify Dev:
   ```bash
   netlify dev
   ```

2. Access the admin dashboard at:
   ```
   http://localhost:8888/admin
   ```

3. Test all admin subroutes:
   - `/admin/batch-process`
   - `/admin/cities`
   - `/admin/businesses`
   - `/admin/enrich-businesses`

## Common Issues and Solutions

### Port Conflicts

If port 8888 is already in use, Netlify Dev will attempt to use another port. To specify a port:

```bash
netlify dev -p 9999
```

### Environment Variables

Ensure your `.env` file contains all necessary environment variables. Netlify Dev will use these variables when running the application.

### Build Issues

If you encounter build issues with Netlify Dev, try:

1. Clear the cache:
   ```bash
   netlify dev --clear
   ```

2. Rebuild the application:
   ```bash
   yarn build && netlify dev
   ```

## Continuous Integration

In CI environments, we should also use Netlify Dev for testing to ensure consistency between local development, testing, and production environments.

## Conclusion

Using Netlify Dev for testing is essential for ensuring that our application works correctly in the production environment. Always test with Netlify Dev on port 8888 rather than directly with Next.js on port 3000.
