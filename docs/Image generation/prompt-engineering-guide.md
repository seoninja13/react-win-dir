# Prompt Engineering Guide for Image Generation

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Image Generation](./index.md) > Prompt Engineering Guide

## Table of Contents

1. [Overview](#overview)
2. [Prompt Structure](#prompt-structure)
3. [Style Guidelines](#style-guidelines)
4. [Page-Specific Templates](#page-specific-templates)
5. [Prompt Enhancement Techniques](#prompt-enhancement-techniques)
6. [Common Issues and Solutions](#common-issues-and-solutions)
7. [Testing and Iteration](#testing-and-iteration)
8. [Examples](#examples)

## Overview

This guide outlines the approach to engineering effective prompts for generating images using Google Cloud's Vertex AI Gemini model. Well-crafted prompts are essential for producing high-quality, consistent images that match the Windows Doors CA website's branding and style.

## Prompt Structure

### Basic Structure

Each prompt should follow this general structure:

```
Generate a [style] image of [subject] for a windows and doors website. 
The image should feature [specific elements] with [specific attributes].
Style: [detailed style description]
Mood: [mood description]
Lighting: [lighting description]
Perspective: [perspective description]
```

### Key Components

1. **Subject Definition**: Clearly define what the image should show
2. **Style Specification**: Define the visual style (professional, modern, etc.)
3. **Element Details**: Specify important elements that must be included
4. **Attribute Details**: Define attributes of those elements (colors, materials, etc.)
5. **Context Information**: Provide context for how the image will be used
6. **Technical Parameters**: Include any technical requirements (aspect ratio, composition)

### Example Basic Prompt

```
Generate a professional image of a double-hung window with white vinyl frame installed in a modern home. 
The window should be partially open showing the functionality.
Style: Clean, professional, detailed
Mood: Bright, inviting
Lighting: Natural daylight
Perspective: Slight angle to show depth and dimension
```

## Style Guidelines

### Brand Consistency

To maintain visual consistency with the Windows Doors CA brand:

1. **Color Palette**:
   - Primary: #1a365d (dark blue), #2a6496 (medium blue), #3498db (light blue)
   - Secondary: #ffffff (white), #f8f9fa (light gray), #e9ecef (medium gray)
   - Accent: #ffc107 (yellow), #28a745 (green)

2. **Visual Style**:
   - Clean and professional
   - Modern but timeless
   - High-quality and premium feel
   - Bright and inviting

3. **Composition Elements**:
   - Clear focus on the product
   - Uncluttered backgrounds
   - Balanced composition
   - Natural settings

### Mood and Atmosphere

Different page types require different moods:

1. **Product Pages**: Professional, informative, detailed
2. **Home Page**: Welcoming, aspirational, impressive
3. **About Us**: Trustworthy, personal, approachable
4. **Service Pages**: Competent, reliable, action-oriented

### Technical Specifications

1. **Resolution**: Optimize prompts for 1024x1024 generation
2. **Aspect Ratios**: Specify when needed (16:9 for hero images, 1:1 for thumbnails)
3. **Composition**: Specify foreground/background balance and focal points
4. **Detail Level**: Indicate where fine details are important

## Page-Specific Templates

### Home Page Hero Image

```
Generate a professional, aspirational image of a beautiful modern home with [product] prominently featured.
The home should have [architectural style] architecture with [specific features].
Include [natural elements] in the foreground and a [background description].
Style: Premium, polished, architectural
Mood: Welcoming, aspirational, impressive
Lighting: [time of day] light with [lighting quality]
Perspective: [viewing angle] showing both the home and the [product] clearly
```

### Product Category Page (Windows, Doors, etc.)

```
Generate a professional image showcasing a variety of [product category] installed in a modern home.
Include [number] different [product types] with [specific features].
The setting should be [interior/exterior] of a [home style] home.
Style: Clean, informative, product-focused
Mood: Practical, high-quality
Lighting: Even, clear, highlighting product details
Perspective: [viewing angle] to show the range of products
```

### Product Detail Page

```
Generate a detailed image of a [specific product] [product type].
The [product] should be [color/material] with [specific features] and installed in a [setting].
Show [specific detail] clearly to highlight the [benefit/feature].
Style: Detailed, informative, focused
Mood: Professional, educational
Lighting: Even, highlighting product details
Perspective: [specific angle] to showcase key features
```

### About Us Page

```
Generate a professional image of a [number]-person window installation team in front of a [home style] home.
The team should be wearing [uniform description] and appear [mood].
Include [tools/equipment] and a [completed installation] visible in the background.
Style: Personal, trustworthy, professional
Mood: Friendly, competent, approachable
Lighting: Natural daylight, flattering
Perspective: Front view, team-focused
```

### Service/Installation Page

```
Generate an image showing [service] being performed on a [home style] home.
Show [number] professional installers wearing [uniform description] working on [specific task].
Include visible [tools/equipment] and [progress indicators].
Style: Action-oriented, professional, informative
Mood: Competent, reliable, in-progress
Lighting: Natural, work-appropriate
Perspective: Close enough to see details of the work
```

## Prompt Enhancement Techniques

### Detail Amplification

Add specific details to improve image quality:

1. **Material Specifications**: "vinyl frame with woodgrain texture" instead of just "frame"
2. **Color Descriptions**: "warm oak brown" instead of just "brown"
3. **Texture Details**: "smooth matte finish" or "textured surface"
4. **Lighting Specifics**: "soft morning light casting gentle shadows" instead of just "daylight"

### Negative Prompting

Specify what should NOT be in the image:

1. **Avoid Distortions**: "The window should have proper proportions without distortion"
2. **Avoid Unrealistic Elements**: "No unrealistic reflections or impossible shadows"
3. **Avoid Branding Issues**: "No visible logos or brand names"
4. **Avoid Quality Issues**: "No blurriness, pixelation, or artifacts"

### Contextual Enrichment

Add context to improve relevance:

1. **Seasonal Context**: "summer scene with lush green landscaping"
2. **Regional Context**: "typical Southern California architectural style"
3. **Functional Context**: "showing how the window provides ventilation"
4. **Benefit Context**: "demonstrating energy efficiency with visible comfort"

### Technical Guidance

Include technical parameters:

1. **Composition Guidance**: "Rule of thirds composition with the window on the right third"
2. **Depth Guidance**: "Shallow depth of field focusing on the window hardware"
3. **Perspective Guidance**: "Slight low angle to create an impressive appearance"
4. **Lighting Guidance**: "Backlighting to highlight the window's profile"

## Common Issues and Solutions

### Issue: Generic or Stock-Looking Images

**Solution**: 
- Add unique, specific details
- Include environmental context
- Specify distinctive features
- Request natural imperfections

### Issue: Unrealistic Product Representations

**Solution**:
- Reference actual product specifications
- Include accurate proportions
- Specify realistic materials
- Request physically accurate lighting

### Issue: Inconsistent Style Across Images

**Solution**:
- Use consistent style descriptors
- Maintain the same lighting approach
- Use a standard color palette
- Apply consistent mood descriptors

### Issue: Poor Composition

**Solution**:
- Specify composition explicitly
- Include foreground/background balance
- Define focal points
- Request specific perspectives

## Testing and Iteration

### Initial Testing Process

1. Generate 3-5 variations of each prompt
2. Evaluate results against quality criteria
3. Identify patterns in successful generations
4. Note specific issues to address

### Iteration Strategy

1. Refine prompts based on initial results
2. Add more specific details where needed
3. Remove elements that cause confusion
4. Test revised prompts with 2-3 variations

### Evaluation Criteria

1. **Accuracy**: Does the image show what was requested?
2. **Quality**: Is the image visually appealing and professional?
3. **Consistency**: Does it match the style of other images?
4. **Usability**: Will it work well in the intended context?

## Examples

### Example 1: Double-Hung Window

**Basic Prompt**:
```
Generate an image of a double-hung window.
```

**Enhanced Prompt**:
```
Generate a professional, detailed image of a modern double-hung window with a white vinyl frame installed in a contemporary living room. The window should be partially open from the bottom panel, showing the tilt-in cleaning feature. The room should have neutral-colored walls with subtle decor and natural light streaming through the window, creating a warm atmosphere.

Style: Clean, professional, architectural
Mood: Bright, inviting, comfortable
Lighting: Mid-morning natural light with soft shadows
Perspective: Slight angle from inside the room to show both the window's operation and the view outside

Avoid: Unrealistic proportions, excessive reflections, visible brands, or stock photo appearance.
```

### Example 2: Entry Door

**Basic Prompt**:
```
Generate an image of a front door.
```

**Enhanced Prompt**:
```
Generate a professional image of a modern fiberglass entry door with decorative glass inserts installed in a craftsman-style home. The door should be painted in a deep navy blue (#1a365d) with satin nickel hardware and surrounded by white trim. Include a partial view of a covered porch with potted plants and a welcome mat. The scene should convey a welcoming entrance to a well-maintained home.

Style: Elegant, detailed, welcoming
Mood: Inviting, secure, premium
Lighting: Late afternoon golden hour light casting warm highlights
Perspective: Slight angle from the walkway approaching the door

Avoid: Unrealistic door proportions, incorrect hardware placement, floating elements, or cartoon-like appearance.
```

### Example 3: Vinyl Siding

**Basic Prompt**:
```
Generate an image of house siding.
```

**Enhanced Prompt**:
```
Generate a professional image of a two-story colonial home with premium vinyl siding in a light gray color with white trim. The siding should have a woodgrain texture and horizontal orientation. Show the corner detail where two walls meet to highlight the finishing work. Include landscaping with green shrubs at the foundation and a partial view of a neatly maintained lawn. The image should emphasize the clean lines and low-maintenance appeal of vinyl siding.

Style: Professional, residential, architectural
Mood: Polished, high-quality, established
Lighting: Clear midday light with defined shadows
Perspective: Corner view at a slight elevation to show both walls and the roofline

Avoid: Unrealistic textures, warping effects, improper installation details, or overly perfect appearance.
```

Last Updated: May 14, 2025
