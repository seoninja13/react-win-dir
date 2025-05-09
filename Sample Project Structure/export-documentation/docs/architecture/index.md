# Architecture Documentation

This directory contains documentation related to the system architecture of the Water Damage CA project.

## Overview

The Water Damage CA project uses a modern web architecture based on Next.js with the App Router, Supabase for database management, and various AI services for content enrichment. The architecture is designed to be scalable, maintainable, and optimized for SEO.

## Documentation

- [Website Architecture](./website-architecture.md) - System architecture and component diagrams
- [SEO Structure](./seo-structure.md) - SEO optimization strategy
- [Technical Implementation Plan](./technical-implementation-plan.md) - Implementation details
- [Data Flow](./data-flow.md) - How data flows through the system

## Key Architectural Decisions

1. **Next.js App Router**: We use the Next.js App Router for routing and server-side rendering.
2. **Incremental Static Regeneration (ISR)**: We use ISR with a 6-month cache to optimize performance and reduce API costs.
3. **Supabase Database**: We use Supabase for database management and authentication.
4. **AI Content Enrichment**: We use various AI services (OpenRouter, Gemini, Perplexity) for content enrichment.
5. **SOLID Principles**: We follow SOLID principles for code organization and maintainability.

## Related Documentation

- [Features Documentation](../features/index.md)
- [Integrations Documentation](../integrations/index.md)
- [Processes Documentation](../processes/index.md)

## Contributing

When contributing to the architecture documentation, please follow these guidelines:

1. Use mermaid.js diagrams to visualize complex concepts
2. Include code examples where appropriate
3. Document architectural decisions and their rationales
4. Keep diagrams and documentation in sync with the actual implementation

Last Updated: April 22, 2025
