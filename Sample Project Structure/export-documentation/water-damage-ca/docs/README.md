# Water Damage CA - Technical Documentation

This directory contains detailed technical documentation for the Water Damage CA project. All documentation follows a pyramid structure with the main [README.md](../../README.md) as the single entry point.

## Documentation Structure

The documentation in this directory follows a hierarchical structure:

```
docs/
├── README.md (this file)
├── implementation/       # Implementation-specific documentation
├── testing/              # Testing documentation
├── admin-dashboard.md    # Admin dashboard documentation
├── admin-batch-process.md # Batch processing admin dashboard
├── admin-subroutes-testing.md # Testing admin routes
├── api-integration-guide.md
├── batch-processing.md
├── daily-logs.md # Index of daily development logs
├── 2025-04-21.md # Daily log for April 21, 2025
├── 2025-04-20-4.md # Daily log for April 20, 2025 (Late Afternoon)
├── 2025-04-20-3.md # Daily log for April 20, 2025 (Evening)
├── 2025-04-20-2.md # Daily log for April 20, 2025 (Afternoon)
├── 2025-04-20.md # Daily log for April 20, 2025 (Morning)
├── 2025-04-18.md # Daily log for April 18, 2025
├── netlify-dev-configuration-guide.md # Comprehensive Netlify Dev setup guide
├── nextjs-routing-guide.md # Guide to Next.js routing types and best practices
├── brave-search-developer-guide.md
├── brave-search-integration.md
├── brave-search-testing.md
├── business-data-flow.md
├── business-profile-implementation.md
├── city-management-implementation.md
├── code-changes.md
├── developer-onboarding.md
├── enriched-data-implementation.md
├── data-enrichment-distinction.md
├── enriched-data-integration-status.md
├── gbp-batch-plan.md
├── gbp-enrichment-plan.md
├── gbp-integration.md
├── google-integration.md
├── google-sheets-integration.md
├── immediate-next-steps.md
├── openrouter-search-integration.md
├── perplexity-mcp-server-guide.md
├── seo-images-developer-guide.md
├── seo-images-implementation.md
├── supabase-mcp-integration.md
├── supabase-mcp-setup.md
├── testing-guide.md
├── tracking-progress.md
├── typescript-interface-guide.md
└── database-operations-index.md # Searchable index of database operations
```

## Key Documentation Categories

### Core Implementation

- [Business Profile Implementation](./business-profile-implementation.md) - Business profile features
- [City Management Implementation](./city-management-implementation.md) - City page management
- [Batch Processing System](./batch-processing-system.md) - Two-step system for retrieving GBP data and enriching business profiles
- [Batch Processing](./batch-processing.md) - Batch processing system
- [Batch Processing Admin Dashboard](./admin-batch-process.md) - Batch processing admin interface
- [Admin Dashboard](./admin-dashboard.md) - Admin interface documentation
- [Data Enrichment Implementation](./enriched-data-implementation.md) - AI-powered content enrichment
- [Data Enrichment Distinction](./data-enrichment-distinction.md) - Distinction between GBP data and enriched data
- [Business Data Flow](./business-data-flow.md) - How data flows through the system
- [TypeScript Interface Guide](./typescript-interface-guide.md) - TypeScript interface documentation
- [Database Operations Index](./database-operations-index.md) - Searchable index of database operations

### Integration Documentation

- [API Integration Guide](./api-integration-guide.md) - General API integration guidelines
- [Supabase Integration](./supabase-mcp-integration.md) - Supabase database integration
- [Supabase Setup](./supabase-mcp-setup.md) - Setting up Supabase
- [Google Integration](./google-integration.md) - Google Places API integration

### AI & Search Services

- [OpenRouter Web Search Integration](./openrouter-search-integration.md) - OpenRouter integration
- [Brave Search Integration](./brave-search-integration.md) - Brave Search integration
- [Brave Search Developer Guide](./brave-search-developer-guide.md) - Guide for developers
- [Brave Search Testing](./brave-search-testing.md) - Testing Brave Search integration
- [Perplexity MCP Server Guide](./perplexity-mcp-server-guide.md) - Perplexity integration

### SEO Implementation

- [SEO Images Developer Guide](./seo-images-developer-guide.md) - SEO image optimization
- [SEO Images Implementation](./seo-images-implementation.md) - Implementing SEO for images

### Testing Documentation

- [Testing Guide](./testing-guide.md) - Detailed testing instructions
- [Netlify Dev Configuration Guide](./netlify-dev-configuration-guide.md) - Comprehensive guide for Netlify Dev setup
- [Admin Subroutes Testing](./admin-subroutes-testing.md) - Testing admin routes
- [Next.js Routing Guide](./nextjs-routing-guide.md) - Guide to Next.js routing types and best practices

## Related Documentation

For high-level project documentation, roadmaps, and planning documents, please refer to the [Roadmap](../Roadmap/) directory, which contains:

- [New Developer Guide](../Roadmap/new-dev-guide.md)
- [Development Workflow](../Roadmap/development-workflow.md)
- [Project Requirements](../Roadmap/updated-project-requirements.md)
- [Website Architecture](../Roadmap/website-architecture.md)
- [SEO Structure](../Roadmap/seo-structure.md)

## Updating Documentation

1. All technical implementation details should be documented in this directory
2. Keep documentation focused on specific implementation details
3. For high-level concepts, refer to the [Roadmap](../Roadmap/) directory
4. Always ensure links in the main [README.md](../../README.md) are updated
5. Follow the established documentation structure and format
