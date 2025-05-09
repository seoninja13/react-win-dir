# Developer Onboarding Guide

## Water Damage CA Website Project

Welcome to the Water Damage CA website project! This guide will help you get set up and understand the project structure, technologies, and development workflow.

## Project Structure

```plaintext
mold-removal-lead-gen-peo/
└── water-damage-ca/         # Main project directory
    ├── docs/               # Technical documentation
    ├── Roadmap/           # Project planning & progress
    ├── app/               # Next.js application code
    ├── components/        # React components
    ├── lib/              # Utility functions
    └── ...
```

## Documentation Structure

All project documentation is organized in the following directories:

### `/docs` - Technical Documentation

1. **Developer Onboarding (You Are Here)**
   - Project overview
   - Setup instructions
   - Development workflow

1. **Implementation Guides**
   - [Business Profile Implementation](./business-profile-implementation.md)
   - [SEO Images Implementation](./seo-images-implementation.md)
   - [Enriched Data Integration](./enriched-data-integration-status.md)

1. **Integration Documentation**
   - [Supabase Integration](./supabase-mcp-integration.md)
   - [Google Places Integration](./google-integration.md)
   - [Search Integration](./perplexity-mcp-server-guide.md)

1. **Testing Documentation**
   - [Testing Guide](./testing-guide.md)
   - [Integration Testing](./brave-search-testing.md)

### `/Roadmap` - Project Planning & Progress

1. **Project Planning**
   - [Project Requirements](../Roadmap/project-requirements.md)
   - [Implementation Plan](../Roadmap/implementation-plan.md)
   - [Website Architecture](../Roadmap/website-architecture.md)

1. **Development Tracking**
   - [Development Workflow](../Roadmap/development-workflow.md)
   - [Testing Workflow](../Roadmap/testing-workflow.md)
   - [Progress Tracking](../Roadmap/tracking-progress.md)

1. **Feature Documentation**
   - [Feature Priorities](../Roadmap/feature-priorities.md)
   - [SEO Structure](../Roadmap/seo-structure.md)
   - [Data Enrichment](../Roadmap/Data%20Enrichment/README.md)

1. **Daily Updates**
   - [Project Status](../Roadmap/project-status.md)
   - [Daily Logs](../Roadmap/Daily%20Logs/)

## Project Overview

The Water Damage CA website is a programmatic SEO project focused on water damage and mold removal services across California. The site dynamically generates thousands of pages based on service and location combinations, powered by Next.js and Supabase.

### Key Features

1. **Dynamic Page Generation**
   - Service-city combinations
   - Business profile pages
   - Location-aware content

1. **Data Integration**
   - Supabase database
   - Google Places API
   - Enriched business data

1. **SEO Optimization**
   - Dynamic meta tags
   - Structured data
   - Image optimization

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd water-damage-ca
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

1. Copy the template file:

```bash
cp .env.template .env.local
```

1. Fill in required variables in `.env.local`:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `GOOGLE_PLACES_API_KEY`

### 4. Start Development Server

```bash
yarn dev
```

## Development Workflow

### 1. Branch Strategy

- `main` - Production branch
- `develop` - Development branch
- Feature branches: `feature/description`
- Bug fixes: `fix/description`

### 2. Code Standards

- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Jest for testing

### 3. Testing Requirements

- Unit tests for utilities
- Integration tests for API
- E2E tests for critical paths

### 4. Deployment

- Automated via Netlify
- Preview deployments for PRs
- Production deploys from `main`

## Need Help?

1. Check the relevant documentation in `/docs`
1. Search the codebase for examples
1. Review related pull requests
1. Contact the team lead

## Contributing

1. Create a feature branch
1. Write tests
1. Update documentation
1. Submit a pull request

See [Testing Guide](./testing-guide.md) for testing requirements and [Business Profile Implementation](./business-profile-implementation.md) for code organization guidelines.
