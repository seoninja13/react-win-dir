# Page Route Mapping for Project Structure Consolidation

This document maps the current page routes in the `/src/app/` directory to their corresponding component imports and planned migration paths to the `Relume-root/src/app/` directory.

## Table of Contents
1. [Root Pages](#root-pages)
2. [Top-Level Pages](#top-level-pages)
3. [Windows Pages](#windows-pages)
4. [Doors Pages](#doors-pages)
5. [About Pages](#about-pages)
6. [Other Pages](#other-pages)

## Root Pages

| Current Path | Component Import | Target Path | Status |
|--------------|------------------|-------------|--------|
| `/src/app/page.tsx` | `../../home/index.jsx` | `/Relume-root/src/app/page.tsx` | Completed |
| `/src/app/layout.tsx` | N/A (Layout file) | `/Relume-root/src/app/layout.tsx` | Completed |

## Top-Level Pages

| Current Path | Component Import | Target Path | Status |
|--------------|------------------|-------------|--------|
| `/src/app/windows/page.tsx` | `../../../windows/index.jsx` | `/Relume-root/src/app/windows/page.tsx` | Completed |
| `/src/app/doors/page.tsx` | `../../../doors/index.jsx` | `/Relume-root/src/app/doors/page.tsx` | Completed |
| `/src/app/about/page.tsx` | `../../../about/index.jsx` | `/Relume-root/src/app/about/page.tsx` | Completed |
| `/src/app/contact/page.tsx` | `../../../contact/index.jsx` | `/Relume-root/src/app/contact/page.tsx` | Completed |
| `/src/app/gallery/page.tsx` | `../../../gallery/index.jsx` | `/Relume-root/src/app/gallery/page.tsx` | Completed |
| `/src/app/faqs/page.tsx` | `../../../faqs/index.jsx` | `/Relume-root/src/app/faqs/page.tsx` | Completed |
| `/src/app/financing/page.tsx` | `../../../financing/index.jsx` | `/Relume-root/src/app/financing/page.tsx` | Completed |
| `/src/app/garden/page.tsx` | `../../../garden/index.jsx` | `/Relume-root/src/app/garden/page.tsx` | Completed |
| `/src/app/roofing/page.tsx` | `../../../roofing/index.jsx` | `/Relume-root/src/app/roofing/page.tsx` | Completed |
| `/src/app/service-areas/page.tsx` | `../../../service-areas/index.jsx` | `/Relume-root/src/app/service-areas/page.tsx` | Completed |
| `/src/app/warranty/page.tsx` | `../../../warranty/index.jsx` | `/Relume-root/src/app/warranty/page.tsx` | Completed |

## Windows Pages

| Current Path | Component Import | Target Path | Status |
|--------------|------------------|-------------|--------|
| `/src/app/windows/awning/page.tsx` | `../../../../awning/index.jsx` | `/Relume-root/src/app/windows/awning/page.tsx` | Completed |
| `/src/app/windows/casement/page.tsx` | `../../../../casement/index.jsx` | `/Relume-root/src/app/windows/casement/page.tsx` | Completed |
| `/src/app/windows/custom/page.tsx` | `../../../../custom/index.jsx` | `/Relume-root/src/app/windows/custom/page.tsx` | Completed |
| `/src/app/windows/shutters/page.tsx` | `../../../../shutters/index.jsx` | `/Relume-root/src/app/windows/shutters/page.tsx` | Completed |
| `/src/app/windows/picture-window/page.tsx` | `../../../../picture-window/index.jsx` | `/Relume-root/src/app/windows/picture-window/page.tsx` | Completed |
| `/src/app/windows/energy-efficient/page.tsx` | `../../../../energy-efficient/index.jsx` | `/Relume-root/src/app/windows/energy-efficient/page.tsx` | Completed |
| `/src/app/windows/bay-bow/page.tsx` | `../../../../bay-bow/index.jsx` | `/Relume-root/src/app/windows/bay-bow/page.tsx` | Completed |
| `/src/app/windows/garden/page.tsx` | `../../../../garden/index.jsx` | `/Relume-root/src/app/windows/garden/page.tsx` | Completed |
| `/src/app/windows/sliding/page.tsx` | `../../../../sliding/index.jsx` | `/Relume-root/src/app/windows/sliding/page.tsx` | Completed |

## Doors Pages

| Current Path | Component Import | Target Path | Status |
|--------------|------------------|-------------|--------|
| `/src/app/doors/entry/page.tsx` | `../../../../entry/index.jsx` | `/Relume-root/src/app/doors/entry/page.tsx` | Completed |
| `/src/app/doors/patio/page.tsx` | `../../../../patio/index.jsx` | `/Relume-root/src/app/doors/patio/page.tsx` | Completed |

## About Pages

| Current Path | Component Import | Target Path | Status |
|--------------|------------------|-------------|--------|
| `/src/app/about/recognition/page.tsx` | `../../../../recognition/index.jsx` | `/Relume-root/src/app/about/recognition/page.tsx` | Completed |

## Other Pages

| Current Path | Component Import | Target Path | Status |
|--------------|------------------|-------------|--------|
| `/src/app/window-style-finder/page.tsx` | `../../../window-style-finder/index.jsx` | `/Relume-root/src/app/window-style-finder/page.tsx` | Completed |
| `/src/app/1000-series/page.tsx` | `../../../1000-series-simple.jsx` | `/Relume-root/src/app/1000-series/page.tsx` | Not Started |

## Import Path Adjustments

When migrating pages from `/src/app/` to `/Relume-root/src/app/`, the import paths need to be adjusted as follows:

1. For top-level pages:
   - From: `../../../[component-dir]/index.jsx`
   - To: `../../[component-dir]/index.jsx`

2. For nested pages:
   - From: `../../../../[component-dir]/index.jsx`
   - To: `../../../[component-dir]/index.jsx`

## Migration Progress

- Total Pages to Migrate: 25
- Pages Completed: 25
- Pages Remaining: 0
- Progress: 100%

Last Updated: 2025-05-14
