# Technical Overview

> **Breadcrumb Navigation**: [README.md](../README.md) > [Documentation](./index.md) > Technical Overview

## Project Architecture

The Water Damage CA project is a Next.js application that uses the App Router for routing and server-side rendering. It integrates with Supabase for database management and various AI services for content enrichment.

## Key Components

### Frontend

- **Next.js 14+ with App Router**: For routing and server-side rendering
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling
- **React 18**: For UI components

### Backend

- **Supabase**: For database management and authentication
- **Google Places API**: For retrieving business data
- **OpenRouter Web Search**: For web search enrichment
- **Perplexity**: For deep research and content enrichment
- **Gemini AI**: For content generation

### Deployment

- **Netlify**: For hosting and deployment
- **Incremental Static Regeneration (ISR)**: For optimized performance with 6-month cache

## Data Flow

1. **City and Service Data**: Stored in Supabase database
2. **Business Data**: Retrieved from Google Places API and stored in Supabase
3. **Enriched Content**: Generated using AI services and stored in Supabase
4. **Dynamic Pages**: Generated using Next.js App Router with ISR

## URL Structure

- **Service Pages**: `domain.com/[service-slug]-[city]-ca`
- **Business Pages**: `domain.com/[business-name]-[city]-ca`

## Development Environment

- **Local Development**: Next.js development server on port 3000
- **Production-like Environment**: Netlify Dev on port 8888
- **Database**: Supabase with PostgreSQL

## Testing

- **Unit Tests**: Jest and React Testing Library
- **Integration Tests**: Testing API routes and components together
- **End-to-End Tests**: Testing the complete application flow

## Related Documentation

- [Website Architecture](./architecture/website-architecture.md)
- [SEO Structure](./architecture/seo-structure.md)
- [Technical Implementation Plan](./architecture/technical-implementation-plan.md)
- [Data Flow](./architecture/data-flow.md)

Last Updated: April 22, 2025
