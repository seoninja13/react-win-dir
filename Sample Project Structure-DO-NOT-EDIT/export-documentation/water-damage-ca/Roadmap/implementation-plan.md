# Water Damage CA Implementation Plan

## Overview
This document outlines the implementation plan for the Water Damage CA project, focusing on connecting the service-city pages to real data from Supabase and implementing the remaining features needed for a production-ready application.

## Current Status
- Project architecture has been updated to use Supabase exclusively for data storage
- Google Sheets integration has been deprecated
- Supabase database schema is already established with tables for:
  - `cities`: City information across California
  - `services`: Service information (water damage repair, mold removal, etc.)
  - `businesses`: Business listings with relationships to services and cities
  - `leads`: Lead capture information
  - `content`: Content for city-service combinations
  - `city_service`: Junction table for many-to-many relationships

## Phase 1: Connect Service-City Page to Supabase Data (Week 1)

### 1. Update Data Fetching in Service-City Page
- Replace mock data with real Supabase data
- Implement server-side data fetching using the existing database functions
- Add proper error handling and loading states
- Create utility functions for fetching combined service-city data

### 2. Implement Dynamic Routing with ISR
- Update `generateStaticParams` to fetch data from Supabase
- Configure ISR with 6-month cache (15,552,000 seconds)
- Create fallback pages for non-prerendered paths
- Implement on-demand revalidation for updated content

### 3. Enhance Business Listings Component
- Create a reusable BusinessCard component
- Connect to real business data from Supabase
- Add pagination for multiple business results
- Implement sorting and filtering options

## Phase 2: Lead Capture Implementation (Week 1-2)

### 4. Create Lead Capture Form
- Design and implement a lead form component
- Connect form to Supabase lead table
- Add form validation using Zod schemas
- Implement success/error handling

### 5. Lead Management System
- Create a lead notification system
- Implement lead status tracking
- Add lead assignment functionality
- Create lead analytics dashboard

## Phase 3: Content Enrichment (Week 2)

### 6. Implement AI Content Enhancement
- Connect to existing Gemini Pro/Perplexity integration
- Create city-specific content generation
- Implement service-specific content templates
- Store enriched content in Supabase content table

### 7. Dynamic Content Components
- Create CityInfo component with local data
- Implement ServiceInfo component with dynamic content
- Build FAQ generator based on service and city
- Create testimonial component with real reviews

## Phase 4: SEO and Performance Optimization (Week 3)

### 8. Enhance SEO Components
- Finalize schema.org markup implementation
- Generate dynamic meta tags based on Supabase data
- Create XML sitemap from Supabase data
- Implement canonical URLs and other SEO elements

### 9. Performance Optimization
- Implement code splitting and lazy loading
- Optimize image loading with Next.js Image component
- Configure proper caching headers
- Set up performance monitoring

## Phase 5: Testing and Deployment (Week 3-4)

### 10. Comprehensive Testing
- Create unit tests for critical components
- Implement integration tests for API routes
- Set up end-to-end tests for user flows
- Perform cross-browser and mobile testing

### 11. Production Deployment
- Configure Netlify environment variables
- Set up CI/CD pipeline
- Implement monitoring and error tracking
- Create backup and recovery procedures

## Implementation Timeline

| Week | Focus Areas | Key Deliverables |
|------|-------------|------------------|
| 1    | Service-City Page & Lead Capture | Connect page to Supabase, Implement ISR, Create lead form |
| 2    | Content Enrichment | AI content enhancement, Dynamic content components |
| 3    | SEO & Performance | Schema markup, Meta tags, Performance optimization |
| 4    | Testing & Deployment | Testing suite, Production deployment |

## Next Immediate Steps

1. **Update the Service-City Page**:
   - Modify the page.tsx file to fetch real data from Supabase
   - Replace mockBusinesses with actual business data
   - Implement proper error handling for data fetching

2. **Implement generateStaticParams**:
   - Update the function to fetch service-city combinations from Supabase
   - Configure ISR with appropriate revalidation period
   - Add fallback handling for dynamic routes

3. **Create a Lead Capture Form Component**:
   - Design a form UI that matches the site's aesthetic
   - Connect form submission to Supabase lead table
   - Implement form validation and success/error states
