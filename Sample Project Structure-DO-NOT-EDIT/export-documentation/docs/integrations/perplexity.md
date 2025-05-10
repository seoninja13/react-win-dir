# Perplexity Integration

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Integrations](./index.md) > Perplexity Integration

## Overview

The Perplexity integration provides advanced AI-powered deep research capabilities for the Water Damage CA project. It allows for enriching business profiles and service pages with comprehensive, factual information gathered from the web.

The integration is implemented as an MCP server that provides three main models:

1. **perplexity-online-mistral**: Perplexity Online Mistral model with web search capabilities
2. **perplexity-online-llama**: Perplexity Online Llama model with web search capabilities
3. **perplexity-deep-research**: Perplexity deep research with comprehensive web search and analysis

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Perplexity API key (obtain from [Perplexity AI](https://www.perplexity.ai/))

### Installation

The Perplexity MCP server can be installed using the Smithery CLI:

```bash
npx -y @smithery/cli@latest install @arjunkmrm/perplexity-deep-research --client claude --config
```

When prompted, enter your Perplexity API key:

```
API key: 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
```

### Configuration

The server is configured in the `.mcp.json` file:

```json
{
  "mcpServers": {
    "perplexity": {
      "command": "npx",
      "args": [
        "-y",
        "@arjunkmrm/perplexity-deep-research"
      ],
      "env": {
        "PERPLEXITY_API_KEY": "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"
      }
    }
  }
}
```

## Usage

### Basic Query

The `perplexity_online_mistral` model can be used for basic queries with web search:

```typescript
// Example usage in an MCP-enabled environment
const result = await perplexity_online_mistral({
  prompt: "What are the best techniques for water damage restoration?"
});

console.log(result.result); // The generated text
console.log(result.metadata.sources); // Sources used for the response
```

### Deep Research

The `perplexity_deep_research` model can be used for comprehensive research on a topic:

```typescript
// Example usage in an MCP-enabled environment
const research = await perplexity_deep_research({
  topic: "Water damage prevention in residential buildings",
  depth: "comprehensive" // Options: "basic", "standard", "comprehensive"
});

console.log(research.result); // The complete research report
console.log(research.metadata.sections.executiveSummary); // Executive summary section
console.log(research.metadata.sections.keyFindings); // Key findings section
console.log(research.metadata.sources); // Sources used for the research
```

## Integration with Content Enrichment

The Perplexity integration is used for enriching business profiles and service pages with comprehensive, factual information. The implementation includes:

1. **Business Profile Enrichment**:
   - Researches business-specific information
   - Analyzes customer reviews and testimonials
   - Gathers information about services, certifications, and specializations
   - Structures the information according to the BusinessDetails interface

2. **Service Page Enrichment**:
   - Researches service-specific information
   - Gathers information about techniques, equipment, and best practices
   - Provides comprehensive guides and FAQs
   - Structures the information for display on service pages

## Example Implementation

Here's an example of how to use the Perplexity integration for business profile enrichment:

```typescript
// Example: Enrich a business profile
async function enrichBusinessProfile(business) {
  try {
    // Research the business
    const businessResearch = await perplexity_deep_research({
      topic: `${business.name} water damage restoration company in ${business.city.name}, ${business.city.state}`,
      depth: "comprehensive"
    });
    
    // Extract relevant information
    const enrichedData = {
      reviewInsights: {
        summary: extractReviewSummary(businessResearch.result),
        strengths: extractStrengths(businessResearch.result),
        testimonialHighlights: extractTestimonials(businessResearch.result)
      },
      serviceDetails: {
        certifications: extractCertifications(businessResearch.result),
        primaryServices: extractServices(businessResearch.result)
      },
      remediationProcess: {
        steps: extractRemediationSteps(businessResearch.result),
        description: extractRemediationDescription(businessResearch.result)
      },
      restorationTechniques: {
        dryingTechniques: extractDryingTechniques(businessResearch.result),
        specializedEquipment: extractEquipment(businessResearch.result)
      }
    };
    
    // Update the business profile
    await updateBusinessProfile(business.id, enrichedData);
    
    return enrichedData;
  } catch (error) {
    console.error('Error enriching business profile:', error);
    throw error;
  }
}
```

## Testing

The Perplexity integration can be tested using the provided test tools:

### Test Script

```bash
# From the project root
node tests/perplexity-test.js
```

### Test Endpoint

You can also test the Perplexity integration using the test endpoint:

```
http://localhost:8888/test/perplexity
```

## Rate Limits and Quotas

The Perplexity API has the following rate limits:

- 10 requests per minute
- 1,000 requests per day
- 10,000 requests per month

The MCP server implementation includes rate limiting to prevent exceeding these limits.

## Troubleshooting

### Common Issues

1. **API Key Invalid**: Ensure your Perplexity API key is correct and has not expired
2. **Rate Limit Exceeded**: Wait a moment before making another request
3. **Server Not Starting**: Check that the environment variable is properly set
4. **Model Not Found**: Ensure you're using one of the supported models

### Logs

The Perplexity MCP server logs errors to the console. Check the logs for any error messages if you encounter issues.

## Related Documentation

- [OpenRouter Integration](./openrouter.md)
- [Brave Search Integration](./brave-search.md)
- [Supabase Integration](./supabase.md)
- [Data Enrichment](../features/data-enrichment.md)
- [Batch Processing](../processes/batch-processing.md)

## References

- [Perplexity API Documentation](https://docs.perplexity.ai/)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Perplexity Deep Research MCP Server](https://github.com/arjunkmrm/perplexity-deep-research)

Last Updated: April 22, 2025
