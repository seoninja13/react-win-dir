# Data Enrichment Distinction

## Overview

This document clarifies the important distinction between Google Business Profile (GBP) data and enriched data in the Water Damage CA project.

## Data Types

### Google Business Profile (GBP) Data

**Definition**: Basic business information retrieved from the Google Places API.

**Source**: Google Places API

**Content**:
- Business name
- Address
- Phone number
- Website URL
- Rating (stars)
- Review count
- Business hours
- Place ID
- Coordinates (latitude/longitude)
- Photos (references)

**Purpose**: Provides foundational business information for display on business profile pages.

**Storage**: Stored in the `metadata` field of the businesses table, specifically in the `google_places` object.

**Example**:
```json
{
  "metadata": {
    "google_places": {
      "place_id": "ChIJN1t_tDeuEmsRUsoyG83frY4",
      "displayName": {
        "text": "ABC Water Damage Restoration"
      },
      "formattedAddress": "123 Main St, Los Angeles, CA 90001",
      "rating": 4.7,
      "userRatingsTotal": 231,
      "websiteUri": "https://www.abcwaterdamage.com"
    }
  }
}
```

### Enriched Data

**Definition**: Additional AI-generated content from OpenRouter web search that enhances business profiles with detailed information.

**Source**: OpenRouter web search

**Content**:
- Review insights (summary, strengths, areas for improvement)
- Service details (certifications, specializations)
- Restoration techniques (drying methods, equipment)
- Remediation process (assessment, containment, removal)

**Purpose**: Provides in-depth information about the business's services, reviews, and processes to help users make informed decisions.

**Storage**: Stored in the `enriched_data` field of the businesses table.

**Enrichment Source**: Stored in the `enrichment_source` field, with the value "openrouter web search" indicating true enrichment.

**Example**:
```json
{
  "enriched_data": {
    "source": "openrouter_web_search",
    "timestamp": "2025-04-18T16:38:49.677Z",
    "search_query": "ABC Water Damage Los Angeles reviews services",
    "business_summary": "ABC Water Damage is a highly rated service provider in Los Angeles with 231 reviews and an average rating of 4.7/5.",
    "customer_reviews": {
      "overall_sentiment": "Very positive",
      "negative_highlights": ["Occasional scheduling delays"],
      "positive_highlights": ["Great service", "Professional staff", "Quick response time"]
    },
    "services_offered": [
      "Emergency services",
      "Free estimates",
      "24/7 availability"
    ]
  },
  "enrichment_source": "openrouter web search"
}
```

## Important Distinction

A business is only considered truly enriched if:

1. The `enriched_data` field is not null, AND
2. The `enrichment_source` field equals "openrouter web search"

### Business Rules

1. **Google Places Data Rule**: If a business has `enrichment_source = "google_places"`, then `enriched_data` MUST be `null`.

2. **Enrichment Source Values**:
   - `"google_places"`: Indicates the business data comes from Google Places API only
   - `"openrouter web search"`: Indicates the business has been enriched with AI-generated content from OpenRouter web search
   - `"gemini"`: Indicates the business has been enriched with AI-generated content from Gemini
   - `"perplexity"`: Indicates the business has been enriched with AI-generated content from Perplexity

3. **Enrichment Process**:
   - When a business is first added to the database from Google Places API, it has `enrichment_source = "google_places"` and `enriched_data = null`
   - When a business is enriched with OpenRouter web search, it has `enrichment_source = "openrouter web search"` and `enriched_data` contains the enriched content
   - If a business with `enrichment_source = "google_places"` is found to have non-null `enriched_data`, the `enriched_data` should be set to `null`

**Rationale**: This ensures that only businesses with high-quality AI-generated content from OpenRouter web search are considered enriched. Basic Google Places data is not sufficient for a business to be considered enriched.

## Implementation Details

### Checking for Enriched Businesses

```typescript
// Correct way to count truly enriched businesses
const { count: enrichedCount, error: enrichedError } = await supabase
  .from("businesses")
  .select("*", { count: "exact", head: true })
  .not("enriched_data", "is", null)
  .eq("enrichment_source", "openrouter web search");
```

### Batch Process Statistics

The batch process dashboard displays:
- Total Cities: All cities in the database
- Cities with Businesses: Cities that have at least one business
- Enriched Businesses: Businesses with OpenRouter web search enrichment
- Cities to Process: Cities that don't have GBP data yet

## Related Documentation

- [GBP Enrichment Plan](./gbp-enrichment-plan.md)
- [Enriched Data Implementation](./implementation/enriched-data.md)
- [Batch Processing Implementation](../Roadmap/batch-processing-implementation.md)

## Status: ✅ Implemented

Last Updated: April 23, 2025
