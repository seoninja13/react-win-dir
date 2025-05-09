# Data Enrichment Strategy

This directory contains documentation related to the data enrichment strategy for the Water Damage CA project, including batch processing and integration with external data sources.

## Documentation Structure

```
Data Enrichment/
├── README.md (this file)
├── batch-processing.md
├── data-enrichment-instructions.md
└── places-api-integration.md
```

## Data Enrichment Documents

- [Batch Processing](./batch-processing.md) - Batch processing strategy and implementation
- [Data Enrichment Instructions](./data-enrichment-instructions.md) - Step-by-step instructions for data enrichment
- [Places API Integration](./places-api-integration.md) - Integration with Google Places API

## Key Concepts

- **Google Business Profile (GBP) Data**: Basic business information from Google Places API
- **Enriched Data**: Additional AI-generated content from OpenRouter web search

For a detailed explanation of the distinction between GBP data and enriched data, see [Data Enrichment Distinction](../../docs/data-enrichment-distinction.md).

## Related Documentation

For more detailed implementation documentation, please refer to:

- [Batch Processing Implementation](../../docs/batch-processing.md) - Technical implementation details
- [Data Enrichment Implementation](../../docs/enriched-data-implementation.md) - Implementation specifics
- [OpenRouter Web Search Integration](../../docs/openrouter-search-integration.md) - OpenRouter integration
- [Brave Search Integration](../../docs/brave-search-integration.md) - Brave Search integration
- [Perplexity Integration](../../docs/perplexity-mcp-server-guide.md) - Perplexity integration

## Updating Documentation

When adding new data enrichment documentation:

1. Create a new markdown file in this directory
2. Update this README.md to include a link to the new file
3. Ensure the new file follows the established documentation format
4. Add appropriate cross-references to related documentation
