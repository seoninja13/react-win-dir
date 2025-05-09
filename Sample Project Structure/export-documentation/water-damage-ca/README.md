# Water Damage CA Website

A Next.js-based website for water damage restoration services in California cities.

## Quick Start

1. **Installation**

   ```bash
   yarn install
   ```

2. **Development**

   ```bash
   yarn dev
   ```

3. **Production Build**

   ```bash
   yarn build
   yarn start
   ```

4. **Testing**

   ```bash
   yarn test
   ```

## Documentation Structure

This project follows a pyramid documentation structure with the main [README.md](../README.md) as the single entry point. The documentation is organized as follows:

```markdown
water-damage-ca/
├── README.md (this file)
├── Roadmap/       # High-level project documentation
└── docs/          # Technical implementation documentation
```

- [Project Roadmap](./Roadmap/README.md) - High-level project documentation
- [Technical Documentation](./docs/README.md) - Detailed technical documentation

## Project Documentation

### 1. Core Documentation

- [New Developer Guide](./Roadmap/new-dev-guide.md) - Start here for new developers
- [Project Requirements](./Roadmap/updated-project-requirements.md) - Current requirements
- [Technical Implementation](./Roadmap/technical-implementation-plan.md) - Implementation details
- [Architecture Overview](./Roadmap/website-architecture.md) - System architecture
- [Development Workflow](./Roadmap/development-workflow.md) - How to contribute
- [Admin Batch Process Troubleshooting](./docs/admin-batch-process-troubleshooting.md) - Fixing the admin batch process page

### 2. Feature Documentation

- [Business Profile Implementation](./docs/business-profile-implementation.md) - Business profiles
- [City Management](./docs/city-management-implementation.md) - City pages
- [SEO Implementation](./Roadmap/seo-structure.md) - SEO strategy
- [Data Enrichment](./docs/enriched-data-implementation.md) - Content enrichment
- [Batch Processing](./docs/batch-processing.md) - Batch operations (Updated 04/18/2025)
- [Admin Dashboard](./docs/admin-batch-process.md) - Complete admin interface (Updated 04/20/2025)
- [Cities & Businesses Management](./docs/admin-cities-businesses.md) - Admin interface for cities and businesses (Added 04/20/2025)
- [Tailwind CSS Guidelines](./docs/tailwind-css-guidelines.md) - Styling guidelines using Tailwind CSS (Added 04/20/2025)

### 3. Integration Documentation

- [API Integration Guide](./docs/api-integration-guide.md) - API guidelines
- [Supabase Integration](./docs/supabase-mcp-integration.md) - Database integration
- [OpenRouter Integration](./docs/openrouter-search-integration.md) - Web search
- [Brave Search Integration](./docs/brave-search-integration.md) - Search integration
- [Perplexity Integration](./docs/perplexity-mcp-server-guide.md) - Deep research

### 4. Testing Documentation

- [Testing Workflow](./Roadmap/testing-workflow.md) - Testing processes
- [Testing Guide](./docs/testing-guide.md) - Detailed testing instructions
- [Admin Subroutes Testing](./docs/admin-subroutes-testing.md) - Comprehensive testing plan for admin routes (Added 04/20/2025)
- [TypeScript Interface Guide](./docs/typescript-interface-guide.md) - Type system

### 5. Current Status & Next Steps

- [Project Status](./Roadmap/project-status.md) - Current status
- [Next Steps](./Roadmap/next-steps.md) - Upcoming priorities
- [Immediate Next Steps (04/21/2025)](./docs/immediate-next-steps.md) - Current implementation plan
- [Development Progress](./Roadmap/updated-tracking-progress.md) - Completed features
- [Daily Development Logs](./docs/daily-logs.md) - Daily updates
- [Latest Update (04/23/2025)](./docs/daily-logs.md) - Most recent changes

## Tech Stack

- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- Supabase
- Various AI services (OpenRouter, Gemini, Perplexity)
- Netlify for deployment

## Key Features

1. **Dynamic City-Service Pages**

   - Automatically generated pages for each city-service combination
   - SEO-optimized URLs and content (`domain.com/[service-slug]-[city]-ca`)
   - Rich business data from Google Places API

2. **Business Profiles**

   - Detailed business information
   - Reviews and ratings
   - Contact information and services
   - SEO-optimized URLs (`domain.com/[business-name]-[city]-ca`)

3. **Data Enrichment**

   - Automated data collection from Google Places API
   - Content enhancement with AI (OpenRouter, Gemini, Perplexity)
   - Regular data updates via batch processing

4. **Performance Optimization**

   - 6-month caching with ISR
   - API cost optimization
   - Image optimization

## Contributing

1. Create a feature branch from `main`
2. Follow the [development workflow](./Roadmap/development-workflow.md)
3. Submit a PR for review

## License

Proprietary - All rights reserved
