# Page Folders Inventory

This document provides an inventory of all page-specific folders in the Relume-root directory that need to be moved to the Website Pages directory.

## Table of Contents
1. [Window Pages](#window-pages)
2. [Door Pages](#door-pages)
3. [Vinyl Siding Pages](#vinyl-siding-pages)
4. [Roofing Pages](#roofing-pages)
5. [Information Pages](#information-pages)
6. [Other Pages](#other-pages)

## Window Pages
- windows
- awning
- bay-bow
- casement
- double-hung
- double-hung-new
- energy-efficient
- picture-window
- sliding
- wood-windows

## Door Pages
- doors
- entry
- garage
- garden
- hinged-patio-doors
- patio

## Vinyl Siding Pages
- vinyl-siding
- 1000-series
- 1500-series
- 2000-series
- 3000-series
- 4000-series
- 5000-series
- 5000-series-backup

## Roofing Pages
- roofing

## Information Pages
- about
- blog
- blog-post
- contact
- faqs
- financing
- free-estimate-request
- gallery
- giving-back
- installation
- press
- recognition
- referral-program
- reviews
- satisfaction-survey
- service-areas
- shutters
- styles
- virtual-repair-center
- warranty
- warranty-new
- why-window-world
- window-style-finder

## Other Pages
- custom
- home

## Import Path Mapping

This section documents the current import paths in src/app pages and the changes needed after moving the folders to the Website Pages directory.

| Page | Current Import Path | New Import Path |
|------|-------------------|-----------------|
| src/app/windows/page.tsx | `import { Windows } from '../../../windows';` | `import { Windows } from '../../../Website Pages/windows';` |
| src/app/doors/page.tsx | `import { Doors } from '../../../doors';` | `import { Doors } from '../../../Website Pages/doors';` |
| src/app/about/page.tsx | `import { About } from '../../../about';` | `import { About } from '../../../Website Pages/about';` |
| ... | ... | ... |

*Note: This table will be completed during the implementation phase as each import path is analyzed and updated.*
