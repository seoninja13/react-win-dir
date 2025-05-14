# URL Mapping Reference for Image Generation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Image Generation](./index.md) > URL Mapping Reference

## Table of Contents

1. [Overview](#overview)
2. [Mapping Principles](#mapping-principles)
3. [URL Structure Analysis](#url-structure-analysis)
4. [Standard Mapping Patterns](#standard-mapping-patterns)
5. [Special Case Mappings](#special-case-mappings)
6. [Service Area Mappings](#service-area-mappings)
7. [Content-Specific Mappings](#content-specific-mappings)
8. [Implementation Process](#implementation-process)
9. [Validation and Testing](#validation-and-testing)
10. [Maintenance and Updates](#maintenance-and-updates)

## Overview

This document provides a comprehensive reference for mapping URLs between the Window World LA website and the Windows Doors CA website. This mapping is essential for the image generation process, as it allows us to associate the appropriate images with the correct pages on our website.

The URL mapping process ensures that:
1. All pages on the Windows Doors CA website have corresponding image prompts
2. The structure and organization of content is consistent
3. Special cases and exceptions are properly handled
4. The mapping can be programmatically applied during the image generation process

## Mapping Principles

### Core Principles

1. **Consistency**: Maintain consistent URL patterns where possible
2. **Semantic Equivalence**: Map URLs based on content similarity and function
3. **Structural Integrity**: Preserve the hierarchical structure of the original site
4. **Adaptability**: Accommodate differences in site organization and content
5. **Maintainability**: Create mappings that can be easily updated and extended

### Mapping Approach

1. **Direct Mapping**: Use 1:1 mapping for equivalent pages
2. **Pattern Mapping**: Apply transformation rules for consistent patterns
3. **Content Mapping**: Map based on content similarity for non-equivalent pages
4. **Function Mapping**: Map based on page function when content differs
5. **New Mappings**: Create new mappings for Windows Doors CA specific pages

## URL Structure Analysis

### Window World LA URL Structure

The Window World LA website uses the following URL structure:

1. **Home Page**: `https://windowworldla.com/`
2. **Product Category Pages**: `https://windowworldla.com/[category]/`
   - Examples: `/windows/`, `/doors/`, `/siding/`
3. **Product Detail Pages**: `https://windowworldla.com/[category]/[product]/`
   - Examples: `/windows/double-hung/`, `/doors/entry/`
4. **Information Pages**: `https://windowworldla.com/[page]/`
   - Examples: `/about-us/`, `/financing/`, `/warranty/`
5. **Location Pages**: `https://windowworldla.com/locations/[location]/`
   - Examples: `/locations/los-angeles/`, `/locations/orange-county/`
6. **Blog Pages**: `https://windowworldla.com/blog/` and `https://windowworldla.com/blog/[post]/`

### Windows Doors CA URL Structure

The Windows Doors CA website uses a similar but not identical URL structure:

1. **Home Page**: `https://windowsdoorsca.com/`
2. **Product Category Pages**: `https://windowsdoorsca.com/[category]/`
   - Examples: `/windows/`, `/doors/`, `/vinyl-siding/`
3. **Product Detail Pages**: `https://windowsdoorsca.com/[category]/[product]/`
   - Examples: `/windows/double-hung/`, `/doors/entry/`
4. **Information Pages**: `https://windowsdoorsca.com/[page]/`
   - Examples: `/about-us/`, `/financing/`, `/warranty/`
5. **Service Area Pages**: `https://windowsdoorsca.com/service-areas/[area]/`
   - Examples: `/service-areas/san-francisco/`, `/service-areas/oakland/`
6. **Blog Pages**: `https://windowsdoorsca.com/blog/` and `https://windowsdoorsca.com/blog/[post]/`

## Standard Mapping Patterns

The following table provides the standard mapping patterns for common URL structures:

| Content Type | Window World LA Pattern | Windows Doors CA Pattern | Transformation Rule |
|--------------|-------------------------|--------------------------|---------------------|
| Home Page | `/` | `/` | Direct mapping |
| Windows Category | `/windows/` | `/windows/` | Direct mapping |
| Windows Product | `/windows/[product]/` | `/windows/[product]/` | Direct mapping |
| Doors Category | `/doors/` | `/doors/` | Direct mapping |
| Doors Product | `/doors/[product]/` | `/doors/[product]/` | Direct mapping |
| Siding Category | `/siding/` | `/vinyl-siding/` | Replace segment |
| Siding Product | `/siding/[product]/` | `/vinyl-siding/[product]/` | Replace segment |
| Roofing Category | `/roofing/` | `/roofing/` | Direct mapping |
| Roofing Product | `/roofing/[product]/` | `/roofing/[product]/` | Direct mapping |
| About Us | `/about-us/` | `/about-us/` | Direct mapping |
| Contact | `/contact/` | `/contact-us/` | Replace segment |
| Financing | `/financing/` | `/financing/` | Direct mapping |
| Warranty | `/warranty/` | `/warranty/` | Direct mapping |
| FAQ | `/faq/` | `/faqs/` | Replace segment |
| Blog Index | `/blog/` | `/blog/` | Direct mapping |
| Blog Post | `/blog/[post]/` | `/blog/[post]/` | Content mapping |
| Gallery | `/gallery/` | `/gallery/` | Direct mapping |

## Special Case Mappings

Some pages require special handling due to differences in content organization or naming:

### Product Line Differences

| Window World LA | Windows Doors CA | Notes |
|-----------------|------------------|-------|
| `/windows/garden/` | `/windows/garden/` | Direct mapping |
| `/windows/bay-bow/` | `/windows/bay-and-bow/` | Adjusted naming |
| `/windows/casement-awning/` | `/windows/casement/` and `/windows/awning/` | Split into separate pages |
| `/siding/vinyl-siding/` | `/vinyl-siding/` | Simplified hierarchy |
| `/siding/insulated-siding/` | `/vinyl-siding/insulated/` | Adjusted hierarchy |

### Content Organization Differences

| Window World LA | Windows Doors CA | Notes |
|-----------------|------------------|-------|
| `/our-process/` | `/installation/` | Function mapping |
| `/energy-efficiency/` | `/windows/energy-efficient/` | Moved to product category |
| `/reviews/` | `/testimonials/` | Function mapping |
| `/careers/` | `/about-us/careers/` | Hierarchical adjustment |
| `/press/` | `/about-us/press/` | Hierarchical adjustment |

## Service Area Mappings

Location pages require special mapping due to different service areas:

### Approach for Service Area Mapping

1. Map based on geographical equivalence where possible
2. Create new mappings for Windows Doors CA specific service areas
3. Use content mapping for location-specific content

### Service Area Mapping Table

| Window World LA Location | Windows Doors CA Service Area | Mapping Type |
|--------------------------|-------------------------------|--------------|
| `/locations/los-angeles/` | `/service-areas/san-francisco/` | Geographic equivalent |
| `/locations/orange-county/` | `/service-areas/oakland/` | Geographic equivalent |
| `/locations/san-bernardino/` | `/service-areas/berkeley/` | Geographic equivalent |
| `/locations/ventura-county/` | `/service-areas/san-jose/` | Geographic equivalent |
| N/A | `/service-areas/palo-alto/` | New mapping |
| N/A | `/service-areas/mountain-view/` | New mapping |

## Content-Specific Mappings

For blog posts and other content-specific pages, we use a content mapping approach:

### Blog Post Mapping Strategy

1. Map based on topic similarity
2. Create new mappings for Windows Doors CA specific content
3. Use default templates for unmapped content

### Content Mapping Examples

| Window World LA Content | Windows Doors CA Content | Mapping Basis |
|-------------------------|--------------------------|---------------|
| `/blog/energy-efficient-windows/` | `/blog/energy-efficient-windows/` | Topic similarity |
| `/blog/vinyl-vs-wood-windows/` | `/blog/vinyl-vs-wood-windows/` | Topic similarity |
| `/blog/la-window-trends/` | `/blog/california-window-trends/` | Regional adaptation |
| `/blog/summer-cooling-tips/` | `/blog/summer-cooling-tips/` | Topic similarity |

## Implementation Process

The URL mapping implementation follows these steps:

1. **Initial Mapping Creation**:
   - Parse the CSV file to extract Window World LA URLs
   - Apply standard mapping patterns
   - Identify special cases requiring manual mapping
   - Create a comprehensive mapping table

2. **Mapping Validation**:
   - Verify all Window World LA URLs have a corresponding mapping
   - Check for duplicate mappings
   - Validate URL format and structure
   - Ensure all Windows Doors CA pages are covered

3. **Mapping Application**:
   - Apply the mapping during CSV processing
   - Generate a structured JSON representation
   - Associate image prompts with mapped URLs
   - Create a reference for the image generation process

4. **Mapping Maintenance**:
   - Update mappings as new content is added
   - Adjust mappings based on site structure changes
   - Document mapping changes and rationale

## Validation and Testing

To ensure the accuracy and completeness of the URL mapping:

1. **Automated Validation**:
   - Check for valid URL formats
   - Verify domain consistency
   - Ensure all required pages are mapped
   - Check for orphaned mappings

2. **Manual Review**:
   - Review a sample of mappings for accuracy
   - Verify special case handling
   - Check content consistency between mapped pages
   - Validate service area mappings

3. **Integration Testing**:
   - Test the mapping in the CSV processing workflow
   - Verify image prompt association
   - Check for any processing errors
   - Validate the output format

## Maintenance and Updates

The URL mapping reference will be maintained as follows:

1. **Regular Updates**:
   - Review and update mappings monthly
   - Add new mappings as content is added
   - Adjust mappings based on site structure changes
   - Document all changes in the version history

2. **Version Control**:
   - Maintain a version history of the mapping reference
   - Document the rationale for mapping changes
   - Track mapping effectiveness metrics
   - Coordinate updates with the image generation process

3. **Performance Monitoring**:
   - Track mapping coverage metrics
   - Monitor for unmapped URLs
   - Identify patterns requiring adjustment
   - Optimize mapping rules for efficiency

Last Updated: May 14, 2025
