# CSV Processing Plan for Image Generation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Image Generation](./index.md) > CSV Processing Plan

## Table of Contents

1. [Overview](#overview)
2. [CSV Structure](#csv-structure)
3. [Processing Steps](#processing-steps)
4. [URL Mapping Strategy](#url-mapping-strategy)
5. [Data Transformation](#data-transformation)
6. [Output Format](#output-format)
7. [Implementation Details](#implementation-details)
8. [Quality Assurance](#quality-assurance)

## Overview

This document outlines the plan for processing the CSV file containing Window World LA website URLs, images, and prompts. The goal is to transform this data into a structured format that can be used for generating images for the Windows Doors CA website.

## CSV Structure

### Expected Input Format

The CSV file is expected to have the following columns:

1. **Original URL**: The URL of the page on the Window World LA website
2. **Image Path/URL**: The path or URL of the image on the original site
3. **Prompt**: The prompt used or to be used for generating the image
4. **Additional Metadata**: Any additional information useful for image generation

### Sample CSV Data

```csv
Original URL,Image Path/URL,Prompt,Additional Metadata
https://windowworldla.com/windows/double-hung,/images/windows/double-hung-main.jpg,"Generate a professional image of a double-hung window with white frame against a blue sky background",windows;product;main
https://windowworldla.com/doors/entry,/images/doors/entry-door-main.jpg,"Generate a professional image of a modern entry door with decorative glass inserts",doors;product;main
https://windowworldla.com/about-us,/images/about/team-photo.jpg,"Generate a professional image of a home improvement team in front of a modern house",about;team;main
```

## Processing Steps

### 1. Initial Data Loading and Validation

1. Load the CSV file
2. Validate the structure (correct columns, data types)
3. Check for missing values
4. Normalize URLs (remove trailing slashes, convert to lowercase)
5. Generate a validation report

### 2. Data Categorization

1. Categorize entries by page type:
   - Home page
   - Product category pages (Windows, Doors, Vinyl Siding, Roofing)
   - Product detail pages
   - Informational pages (About, Contact, Financing)
   - Blog pages
   - Gallery pages
   - FAQ pages

2. Categorize entries by image type:
   - Hero images
   - Product images
   - Background images
   - Team/Staff images
   - Process/Installation images
   - Testimonial images

3. Assign priority levels:
   - P1: Home page and main category pages
   - P2: Product detail pages
   - P3: Informational pages
   - P4: Blog and gallery pages

### 3. URL Mapping Generation

1. Apply URL mapping rules (see [URL Mapping Strategy](#url-mapping-strategy))
2. Generate a mapping table
3. Validate mapped URLs
4. Identify any unmapped URLs that require manual mapping

### 4. Prompt Analysis and Enhancement

1. Analyze existing prompts for patterns and effectiveness
2. Identify prompts that need enhancement
3. Apply prompt templates based on page and image type
4. Generate enhanced prompts

### 5. Output Generation

1. Create a structured JSON file with all processed data
2. Generate a CSV export with the enhanced data
3. Create a summary report of the processing results

## URL Mapping Strategy

### Basic Mapping Rules

1. Replace domain: `windowworldla.com` → `windowsdoorsca.com`
2. Maintain path structure for matching page types
3. Apply specific transformations for non-matching pages

### Specific Mapping Rules

| Window World LA Pattern | Windows Doors CA Pattern | Notes |
|------------------------|--------------------------|-------|
| `/windows/[type]` | `/windows/[type]` | Direct mapping |
| `/doors/[type]` | `/doors/[type]` | Direct mapping |
| `/siding/[type]` | `/vinyl-siding/[type]` | Path segment change |
| `/about-us` | `/about-us` | Direct mapping |
| `/contact` | `/contact-us` | Path change |
| `/blog/[post]` | `/blog/[post]` | Direct mapping, content may differ |
| `/gallery` | `/gallery` | Direct mapping |
| `/faq` | `/faqs` | Plural form |
| `/financing` | `/financing` | Direct mapping |
| `/warranty` | `/warranty` | Direct mapping |
| `/locations/[location]` | `/service-areas/[area]` | Structure change, requires manual mapping |

### Special Cases

1. Location-specific pages will be mapped to corresponding service areas
2. Any Window World LA specific pages without a direct equivalent will be noted for manual review
3. Windows Doors CA specific pages without a Window World LA equivalent will be listed for separate prompt creation

## Data Transformation

### Prompt Transformation

1. Replace specific Window World LA references with Windows Doors CA
2. Update location references
3. Apply standardized prompt structure
4. Add style consistency elements

### Image Path Transformation

1. Generate new image paths based on Windows Doors CA structure
2. Create directory structure for Supabase storage
3. Map image types to appropriate directories

## Output Format

### JSON Structure

```json
{
  "pages": [
    {
      "originalUrl": "https://windowworldla.com/windows/double-hung",
      "mappedUrl": "https://windowsdoorsca.com/windows/double-hung",
      "category": "product",
      "subCategory": "windows",
      "pageType": "product-detail",
      "priority": "P2",
      "images": [
        {
          "originalPath": "/images/windows/double-hung-main.jpg",
          "newPath": "/images/pages/windows/double-hung/main.jpg",
          "imageType": "hero",
          "originalPrompt": "Generate a professional image of a double-hung window with white frame against a blue sky background",
          "enhancedPrompt": "Generate a professional, high-quality image of a modern double-hung window with white vinyl frame against a clear blue sky background. The window should be partially open showing the functionality. Style: Clean, professional, detailed. Mood: Bright, inviting. Lighting: Natural daylight. Perspective: Slight angle to show depth and dimension.",
          "status": "pending",
          "priority": "high"
        }
      ]
    }
  ],
  "stats": {
    "totalPages": 120,
    "totalImages": 350,
    "mappedPages": 118,
    "unmappedPages": 2,
    "enhancedPrompts": 350
  }
}
```

### CSV Output

The processed data will also be exported as a CSV file with the following columns:

1. Original URL
2. Mapped URL
3. Category
4. Sub-Category
5. Page Type
6. Priority
7. Original Image Path
8. New Image Path
9. Image Type
10. Original Prompt
11. Enhanced Prompt
12. Status
13. Priority

## Implementation Details

### Tools and Libraries

1. CSV parsing library
2. URL manipulation utilities
3. JSON processing utilities
4. Prompt enhancement algorithms

### Processing Workflow

1. Create a script to load and validate the CSV
2. Implement the categorization logic
3. Apply URL mapping rules
4. Enhance prompts using templates
5. Generate the output files
6. Create validation and summary reports

### Error Handling

1. Log all processing errors
2. Create a separate list of entries that couldn't be processed
3. Implement validation checks at each step
4. Generate warnings for potential issues

## Quality Assurance

### Validation Checks

1. Ensure all original URLs are valid
2. Verify all mapped URLs follow the correct pattern
3. Check that all prompts meet minimum quality standards
4. Validate image paths follow the correct structure

### Manual Review Process

1. Review a sample of mapped URLs to ensure accuracy
2. Check enhanced prompts for a subset of entries
3. Verify categorization for edge cases
4. Review unmapped URLs and create manual mappings

### Output Validation

1. Validate JSON structure
2. Check CSV output for completeness
3. Verify statistics in the summary report
4. Test loading the output files in the image generation system

Last Updated: May 14, 2025
