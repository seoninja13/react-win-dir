# Netlify Dev Configuration Guide

## Overview

This document provides a comprehensive guide to configuring and running the Netlify Dev server for the Water Damage CA project. It includes detailed instructions, common issues, troubleshooting steps, and the exact configuration that works.

## Table of Contents

1. [Configuration Files](#configuration-files)
2. [Port Configuration](#port-configuration)
3. [Starting the Server](#starting-the-server)
4. [Common Issues and Solutions](#common-issues-and-solutions)
5. [Troubleshooting Steps](#troubleshooting-steps)
6. [Testing Admin Subroutes](#testing-admin-subroutes)
7. [Known Non-Critical Issues](#known-non-critical-issues)

## Configuration Files

### netlify.toml

The `netlify.toml` file is the primary configuration file for Netlify Dev. Here is the working configuration:

```toml
# netlify.toml
[build]
  command = "yarn build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NEXT_USE_NETLIFY_EDGE = "true"

# Development settings
[dev]
  command = "npx next dev -p 8080"
  port = 8888
  targetPort = 8080 # Explicitly set the target port for Next.js

# Cache control for static assets
[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/_next/image/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**Critical Settings:**
- `command = "npx next dev -p 8080"` - Explicitly starts Next.js on port 8080
- `port = 8888` - Sets Netlify Dev to run on port 8888
- `targetPort = 8080` - Tells Netlify Dev that Next.js is running on port 8080

### start-dev.bat

A batch file for easily starting the Netlify Dev server:

```batch
@echo off
echo Starting Netlify dev server...
echo Access the main app at: http://localhost:8888
echo Access the batch processor at: http://localhost:8888/admin/batch-process
cd water-damage-ca
netlify dev
```

**Important Notes:**
- The `cd water-damage-ca` command ensures the server starts in the correct directory
- This script should be run from the project root directory

## Port Configuration

### Port Selection

The project uses the following ports:
- **8888**: Netlify Dev server (the one you access in the browser)
- **8080**: Next.js framework (internal, proxied by Netlify Dev)

This configuration avoids conflicts with the commonly used port 3000, which is often occupied by other services.

### Why This Configuration Works

1. Next.js runs on port 8080 instead of the default 3000, avoiding common port conflicts
2. Netlify Dev runs on port 8888 and proxies requests to the Next.js server
3. The explicit port configuration in `netlify.toml` ensures consistency

## Starting the Server

### Prerequisites

1. Ensure all dependencies are installed:
   ```bash
   yarn install
   ```

2. Ensure the Netlify CLI is installed:
   ```bash
   npm install -g netlify-cli
   ```

### Method 1: Using the Batch File

1. From the project root directory, run:
   ```bash
   .\start-dev.bat
   ```

### Method 2: Manual Command

1. Navigate to the water-damage-ca directory:
   ```bash
   cd water-damage-ca
   ```

2. Start Netlify Dev:
   ```bash
   netlify dev
   ```

### Method 3: PowerShell Command

1. From the project root directory, run:
   ```powershell
   cd water-damage-ca; netlify dev
   ```

### Verification

The server is successfully started when you see:

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   ◈ Server now ready on http://localhost:8888   │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Common Issues and Solutions

### 1. Port Already in Use

**Symptoms:**
- Error message: `Could not acquire required 'port': '8888'`
- Error message: `Port 8080 is already in use`

**Solution:**
1. Kill processes using the required ports:
   ```bash
   npx kill-port 8888 8080
   ```
2. Restart the Netlify Dev server

### 2. Next.js Not Starting

**Symptoms:**
- Netlify Dev starts but shows: `Waiting for framework port 8080`
- No indication that Next.js has started

**Solution:**
1. Check if Next.js dependencies are installed:
   ```bash
   yarn add next react react-dom
   ```
2. Verify the `netlify.toml` configuration
3. Try starting Next.js manually to check for errors:
   ```bash
   npx next dev -p 8080
   ```

### 3. Directory Context Issues

**Symptoms:**
- Error about missing files or configurations
- Server starts but can't find the Next.js application

**Solution:**
1. Ensure you're in the correct directory:
   ```bash
   cd water-damage-ca
   ```
2. Use the start-dev.bat script which handles directory navigation

### 4. Environment Variables Not Loading

**Symptoms:**
- API calls failing
- Authentication issues
- Database connection errors

**Solution:**
1. Verify that `.env.local` exists and contains the required variables
2. Check that Netlify Dev is loading the environment variables:
   ```bash
   netlify dev --debug
   ```
3. Restart the server after making changes to environment variables

## Troubleshooting Steps

If the server isn't starting or working correctly, follow these steps in order:

### Step 1: Kill Existing Processes

```bash
npx kill-port 8888 8080 3000
```

### Step 2: Check Configuration Files

1. Verify `netlify.toml` has the correct configuration
2. Ensure `.env.local` exists with required variables

### Step 3: Start with Debug Mode

```bash
cd water-damage-ca
netlify dev --debug
```

### Step 4: Check for Errors

Look for specific error messages in the console output:
- Port conflicts
- Missing dependencies
- Configuration issues
- File not found errors

### Step 5: Test Next.js Directly

```bash
cd water-damage-ca
npx next dev -p 8080
```

If Next.js starts successfully, the issue is with Netlify Dev configuration.

## Testing Admin Subroutes

Once the server is running, test all admin subroutes to ensure they're working correctly:

1. **Main Admin Dashboard**: http://localhost:8888/admin
2. **Batch Process**: http://localhost:8888/admin/batch-process
3. **Cities Management**: http://localhost:8888/admin/cities (Static Route)
4. **Businesses Management**: http://localhost:8888/admin/businesses
5. **Enrich Businesses**: http://localhost:8888/admin/enrich-businesses
6. **Diagnostics**: http://localhost:8888/admin/diagnostics

All routes should return a 200 status code and display the correct page content.

### Route Rendering Types

#### Static Routes

The `/admin/cities` route is marked as a **static route**, which means it's prerendered during build time. With Static Rendering, routes are rendered at build time or in the background after data revalidation.

Static rendering is useful when a route has data that is not personalized to the user and can be known at build time, such as a static blog post or a product page. In our case, the cities list is relatively stable and can be prerendered.

Benefits of static rendering for the cities route:
- Faster page loads (no server-side rendering at request time)
- Reduced server load
- Better SEO as content is immediately available

#### Dynamic Routes

Other admin routes like `/admin/batch-process` may use dynamic rendering, where the content is generated at request time. This is useful for routes that display real-time data or user-specific information.

When testing, be aware of these differences:
- Static routes should load very quickly as they're pre-rendered
- Dynamic routes may take slightly longer to load as they generate content at request time
- Changes to data displayed on static routes may require a rebuild to be visible

## Known Non-Critical Issues

These issues don't affect functionality but appear in the console:

### 1. Viewport Metadata Warnings

```
⚠ Unsupported metadata viewport is configured in metadata export in /. Please move it to viewport export instead.
Read more: https://nextjs.org/docs/app/api-reference/functions/generate-viewport
```

**Impact**: None, purely a warning about Next.js best practices.

### 2. Favicon Conflicts

```
⨯ A conflicting public file and page file was found for path /favicon.ico
https://nextjs.org/docs/messages/conflicting-public-file-page
```

**Impact**: 500 errors when requesting favicon.ico, but doesn't affect application functionality.

### 3. Next.js Configuration Warnings

```
⚠ Invalid next.config.js options detected:
⚠     Unrecognized key(s) in object: 'swcMinify'
```

**Impact**: None, warning about deprecated or unrecognized configuration options.

## Conclusion

Following this guide should ensure consistent and reliable operation of the Netlify Dev server for the Water Damage CA project. If issues persist after following all troubleshooting steps, consider checking for system-specific issues or conflicts with other software.

## Related Documentation

- [Netlify Dev Testing Guide](./netlify-dev-testing.md)
- [Admin Subroutes Testing](./admin-subroutes-testing.md)
- [Troubleshooting Guide](./troubleshooting-guide.md)
