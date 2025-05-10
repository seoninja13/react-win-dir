# Next.js Routing Guide

## Overview

This document provides a comprehensive guide to Next.js routing in the Water Damage CA project, including static and dynamic routes, route groups, and best practices.

## Table of Contents

1. [Routing Types](#routing-types)
2. [Static Routes](#static-routes)
3. [Dynamic Routes](#dynamic-routes)
4. [Route Groups](#route-groups)
5. [Admin Routes](#admin-routes)
6. [API Routes](#api-routes)
7. [Best Practices](#best-practices)

## Routing Types

Next.js 13+ introduced a new App Router with several rendering strategies:

1. **Static Rendering**: Pages are pre-rendered at build time
2. **Dynamic Rendering**: Pages are rendered at request time
3. **Incremental Static Regeneration (ISR)**: Static pages that revalidate after a specified time

## Static Routes

Static routes are pre-rendered during build time, resulting in HTML files that can be served directly from a CDN.

### Benefits of Static Routes

- **Performance**: Faster page loads as content is pre-rendered
- **SEO**: Better search engine optimization as content is immediately available
- **Reduced Server Load**: No server-side rendering at request time
- **Reliability**: Pages work even if the database is down

### Static Routes in Our Project

The following routes are configured as static routes:

- `/admin/cities`: Cities management page
  ```jsx
  // app/admin/cities/page.tsx
  export const dynamic = 'force-static';
  ```

Static routes are ideal for content that doesn't change frequently or doesn't depend on user-specific data.

### How Static Routes Work

1. During the build process, Next.js pre-renders these pages into HTML
2. The HTML is served directly to users without server-side rendering
3. JavaScript is loaded client-side to hydrate the page and make it interactive

## Dynamic Routes

Dynamic routes are rendered at request time, allowing for personalized or real-time content.

### Benefits of Dynamic Routes

- **Real-time Data**: Content reflects the latest data from the database
- **Personalization**: Content can be tailored to the specific user
- **Form Handling**: Better for pages with forms or user input
- **Authentication**: Can check user authentication status before rendering

### Dynamic Routes in Our Project

The following routes are configured as dynamic routes:

- `/admin/batch-process`: Batch processing dashboard
- `/admin/businesses`: Businesses management page
- `/admin/enrich-businesses`: Content enrichment page

Dynamic routes are ideal for content that changes frequently or depends on user-specific data.

### How Dynamic Routes Work

1. When a user requests the page, Next.js renders it on the server
2. The server sends the fully rendered HTML to the client
3. JavaScript is loaded client-side to hydrate the page and make it interactive

## Route Groups

Route groups allow organizing routes without affecting the URL structure.

### Route Groups in Our Project

```
app/
├── (public)/           # Public-facing routes
│   ├── page.tsx        # Home page (/)
│   └── [slug]/         # Dynamic public routes (/[service]-[city]-ca)
├── admin/              # Admin routes
│   ├── page.tsx        # Admin dashboard (/admin)
│   ├── batch-process/  # Batch processing (/admin/batch-process)
│   ├── cities/         # Cities management (/admin/cities)
│   └── ...
└── api/                # API routes
    ├── admin/          # Admin API routes
    └── ...
```

## Admin Routes

Admin routes are protected routes that require authentication.

### Admin Route Structure

```
app/admin/
├── layout.tsx          # Shared layout for all admin pages
├── page.tsx            # Admin dashboard
├── batch-process/      # Batch processing
│   └── page.tsx
├── cities/             # Cities management (Static)
│   └── page.tsx
├── businesses/         # Businesses management
│   └── page.tsx
├── enrich-businesses/  # Content enrichment
│   └── page.tsx
└── diagnostics/        # System diagnostics
    └── page.tsx
```

### Authentication for Admin Routes

Admin routes are protected using middleware that checks for authentication:

```jsx
// middleware.ts
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  if (path.startsWith('/admin')) {
    // Check authentication
    const isAuthenticated = /* authentication logic */;
    
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}
```

## API Routes

API routes are server-side endpoints that handle API requests.

### API Route Structure

```
app/api/
├── admin/
│   ├── batch-process/
│   │   └── route.ts    # /api/admin/batch-process
│   ├── cities/
│   │   └── route.ts    # /api/admin/cities
│   └── ...
├── logs/
│   └── route.ts        # /api/logs
└── ...
```

### API Route Types

- **GET**: Retrieve data
- **POST**: Create data
- **PUT**: Update data
- **DELETE**: Delete data

## Best Practices

### When to Use Static Routes

Use static routes when:
- Content doesn't change frequently
- Content is the same for all users
- SEO is important
- Performance is critical

Example: `/admin/cities`

### When to Use Dynamic Routes

Use dynamic routes when:
- Content changes frequently
- Content is personalized for each user
- Real-time data is required
- Forms or user input are involved

Example: `/admin/batch-process`

### Route Naming Conventions

- Use kebab-case for route names (e.g., `batch-process`)
- Use descriptive names that reflect the purpose of the route
- Group related routes together

### Performance Considerations

- Use static routes whenever possible for better performance
- Use dynamic routes only when necessary
- Consider using Incremental Static Regeneration (ISR) for semi-dynamic content

## Related Documentation

- [Netlify Dev Configuration Guide](./netlify-dev-configuration-guide.md)
- [Admin Subroutes Testing](./admin-subroutes-testing.md)
- [Next.js Documentation](https://nextjs.org/docs/app/building-your-application/routing)
