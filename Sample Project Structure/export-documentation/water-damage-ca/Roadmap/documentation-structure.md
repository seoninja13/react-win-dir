# Documentation Structure

This document provides a visual representation of how the project documentation is organized.

## Documentation Map

```mermaid
graph TB
    README[README.md] --> CORE[Core Documentation]
    README --> FEATURE[Feature Documentation]
    README --> INTEGRATION[Integration Documentation]
    README --> DATA[Data Processing Documentation]
    README --> TESTING[Testing Documentation]
    README --> STATUS[Current Status & Next Steps]

    %% Core Documentation
    CORE --> REQS[Project Requirements]
    CORE --> TECH[Technical Implementation]
    CORE --> ARCH[Architecture Overview]
    CORE --> DEV[Development Workflow]
    
    %% Feature Documentation
    FEATURE --> BUSINESS[Business Profile Implementation]
    FEATURE --> CITY[City Management]
    FEATURE --> SEO[SEO Implementation]
    FEATURE --> ENRICH[Data Enrichment]

    %% Integration Documentation
    INTEGRATION --> API[API Integration Guide]
    INTEGRATION --> PLACES[Google Places API]
    INTEGRATION --> SUPABASE[Supabase Integration]
    INTEGRATION --> BRAVE[Brave Search Integration]
    INTEGRATION --> PERPLEXITY[Perplexity Integration]

    %% Data Processing Documentation
    DATA --> BATCH[Batch Processing Guide]
    DATA --> PIPELINE[Data Pipeline Architecture]
    DATA --> QUALITY[Data Quality Management]

    %% Testing Documentation
    TESTING --> WORKFLOW[Testing Workflow]
    TESTING --> IMPL[Test Implementation]

    %% Current Status & Next Steps
    STATUS --> PROGRESS[Project Status]
    STATUS --> NEXT[Next Steps]
    STATUS --> TRACK[Development Progress]

    %% File Locations
    subgraph root[Root Directory]
        README
    end

    subgraph docs[/docs Directory]
        API
        BUSINESS
        CITY
        PLACES
        SUPABASE
        BRAVE
        PERPLEXITY
        PIPELINE
        QUALITY
    end

    subgraph roadmap[/Roadmap Directory]
        REQS
        TECH
        ARCH
        DEV
        SEO
        WORKFLOW
        IMPL
        PROGRESS
        NEXT
        TRACK
    end

    subgraph enrichment[/Roadmap/Data Enrichment]
        BATCH
        ENRICH
    end

    classDef default fill:#f9f9f9,stroke:#333,stroke-width:2px;
    classDef directory fill:#e1f3d8,stroke:#333,stroke-width:2px;
    classDef root fill:#fff7de,stroke:#333,stroke-width:2px;
    
    class root,docs,roadmap,enrichment directory;
    class README root;
```

## Directory Structure

```
water-damage-ca/
├── README.md
├── docs/
│   ├── api-integration-guide.md
│   ├── business-profile-implementation.md
│   ├── city-management-implementation.md
│   ├── google-integration.md
│   ├── business-data-flow.md
│   ├── brave-search-integration.md
│   ├── perplexity-mcp-server-guide.md
│   ├── data-pipeline.md
│   └── data-quality.md
├── Roadmap/
│   ├── project-requirements.md
│   ├── technical-implementation-plan.md
│   ├── website-architecture.md
│   ├── development-workflow.md
│   ├── seo-structure.md
│   ├── testing-workflow.md
│   ├── project-status.md
│   ├── next-steps.md
│   ├── tracking-progress.md
│   └── Data Enrichment/
│       ├── batch-processing.md
│       └── data-enrichment-instructions.md
└── ...
```

## Documentation Categories

1. **Core Documentation**
   - Foundation of the project
   - Technical architecture
   - Development standards

2. **Feature Documentation**
   - Individual feature implementations
   - Component specifications
   - Feature-specific workflows

3. **Integration Documentation**
   - External API integrations
   - Third-party service connections
   - Integration patterns and best practices

4. **Data Processing Documentation**
   - Data pipeline architecture
   - Batch processing workflows
   - Data quality management

5. **Testing Documentation**
   - Testing strategies
   - Test implementation guides
   - Quality assurance workflows

6. **Current Status & Next Steps**
   - Project progress tracking
   - Upcoming features
   - Development roadmap
