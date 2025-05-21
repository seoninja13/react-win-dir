# Routing Solution for Windows Doors CA Website

## Problem

The website was experiencing 404 errors due to routing conflicts between the Pages Router and App Router in Next.js.

## Solution

### 1. Dual Router Configuration

The project is currently using both the Pages Router (`/pages` directory) and the App Router (`/src/app` directory). This can cause conflicts if not properly managed.

#### Current Setup:

- **Pages Router**: Used for the homepage (`/pages/index.js`) and some legacy pages
- **App Router**: Used for newer pages in `/src/app`

### 2. Routing Priority

Next.js prioritizes routes in the following order:

1. `/pages` directory (Pages Router)
2. `/src/app` directory (App Router)

This means that if a route exists in both directories, the Pages Router version will be used.

### 3. Implemented Fixes

1. **Added a homepage in the Pages Router**: Created `/pages/index.js` to ensure the root URL works
2. **Simplified page components**: Replaced complex components with simpler versions for debugging
3. **Added error logging**: Implemented comprehensive error logging to track routing issues
4. **Created a debug page**: Added a `/debug` page to help diagnose routing issues

### 4. Long-term Solution

For a more maintainable codebase, we should eventually migrate all pages to use a single routing system. The App Router is the recommended approach for new Next.js applications.

Steps for migration:

1. Identify all pages in the Pages Router
2. Create equivalent pages in the App Router
3. Test thoroughly to ensure functionality is preserved
4. Remove the Pages Router pages once the App Router versions are confirmed working

## Debugging Tools

1. **Debug Page**: Visit `/debug` to see information about available routes
2. **Error Logging**: All errors are logged to the console and can be sent to a server endpoint
3. **Custom Error Pages**: Added custom 404 and error pages with detailed information

## Common Issues

1. **404 Errors**: Usually caused by missing routes or conflicts between routing systems
2. **Component Import Errors**: Check import paths, especially when referencing components across routing systems
3. **Fast Refresh Warnings**: These can indicate issues with component structure or imports

## Testing Routes

When adding new pages, test them in the following order:

1. Root URL (`/`)
2. Direct page URL (e.g., `/windows`)
3. Navigation between pages using links

This ensures that both direct access and navigation work correctly.
