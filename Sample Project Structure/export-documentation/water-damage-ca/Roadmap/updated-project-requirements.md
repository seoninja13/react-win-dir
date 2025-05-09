# Water Damage CA - Updated Project Requirements

## Business Objectives
1. Generate high-quality leads for water damage and mold removal businesses in California
2. Establish authority in the water damage restoration niche
3. Capture organic search traffic through hyperlocal targeting
4. Provide valuable information to users experiencing water damage emergencies

## Technical Requirements

### Platform & Infrastructure
- **Framework**: Next.js 14.2.23 with App Router
- **Deployment**: Netlify
- **Caching Strategy**: 6-month ISR (Incremental Static Regeneration) with 15,552,000 seconds revalidation
- **Database**: Supabase for backend data storage
- **Image Storage**: Netlify (initial), Supabase (future)
- **Analytics**: Google Analytics 4

### URL Structure
The website follows a city-specific, service-oriented pattern for hyperlocal targeting:
```
domain.com/[service-slug]-[city]-ca
domain.com/[business-name]-[city]-ca
```

### MCP Server Integration
- ~~Implement Google Sheets MCP server for data management~~ (DEPRECATED - Now using Supabase)
- Implement Google Gemini Pro 2.5 MCP server for AI-powered content enrichment (primary choice due to being free)
- Implement Perplexity MCP server as a secondary option for deep research capabilities
- Create enrichment system to enhance listings with all possible information found online
- Prioritize cost-effective MVP servers for initial implementation

### Database Integration
- Implement Supabase for backend data storage
- Create separate test components for each CRUD operation
- Implement proper error handling for all database operations
- Set up data validation for all user inputs

### Performance Requirements
- Optimize page load times to under 3 seconds
- Implement code splitting for improved performance
- Optimize image loading with lazy loading and proper sizing
- Implement caching strategies for frequently accessed data
- Ensure smooth scrolling and transitions

### SEO Requirements
- Implement meta tags for all pages
- Optimize for city-specific, service-oriented URLs
- Create XML sitemap for search engine indexing
- Implement schema markup for rich snippets
- Ensure proper heading structure across all pages

### Deployment Requirements
- Configure environment variables for production deployment
- Set up continuous integration and deployment pipeline
- Implement proper error logging and monitoring
- Create backup and recovery procedures
- Document deployment process and requirements

### Data Sources
- ~~Google Sheets for content management~~ (DEPRECATED)
- Google Places API for business listings
- Google Gemini Pro 2.5 for AI-powered content enrichment (primary)
- Perplexity for deep research capabilities (secondary)
- Supabase for data storage and management (primary database)

### API Requirements

#### Google Places API
The API is used to fetch:
- Business name, address, phone number
- Ratings and reviews
- Business hours
- Photos (if available)

#### Google Gemini Pro 2.5
Used for:
- Content enrichment
- Generating descriptive text for businesses
- Creating FAQ sections
- Enhancing service descriptions

#### Perplexity
Used as a secondary option for:
- Deep research on businesses
- Finding additional information not available through Places API
- Enhancing content with industry-specific details

#### Supabase
Used as the primary database for:
- Storing service information
- Storing city information
- Storing business information
- Managing relationships between data entities
- User authentication (future)

## Development Phases

### Phase 1: MVP with Core Functionality (4-6 weeks)
- Dynamic page generation for 5-10 cities and 5-10 services
- Basic templates and components
- Google Places API integration
- Supabase database integration
- Google Gemini Pro 2.5 integration for content enrichment
- 10 generic images with SEO optimization
- Basic schema markup
- Initial deployment to Netlify

### Phase 2: Enhanced Functionality & Content (4-6 weeks after Phase 1)
- Expansion to 25+ cities and 20+ services
- Advanced components (lead forms, calculators)
- Perplexity integration for deep research
- Improved SEO features
- Performance optimization
- Advanced error handling and data validation

### Phase 3: Scaling & Advanced Features (4-6 weeks after Phase 2)
- Full coverage of 100+ California cities
- Advanced SEO and personalization features
- Business intelligence dashboard
- Monetization features
- Technical enhancements
- Comprehensive analytics and reporting

## Challenges to Address
- API rate limits (especially Google Places)
- Content quality and uniqueness
- Scalability for 1000+ pages
- Maintenance and data freshness
- Compliance with Google's guidelines
- Cost management for AI services

## Important Notes
- **ARCHITECTURAL UPDATE (April 13, 2025)**: This project now exclusively uses Supabase for data storage. All references to Google Sheets integration should be considered inactive or deprecated.
- Google Gemini 2.5 Pro is the preferred AI service for enriching listings due to being free
- Perplexity is the secondary choice for enriching listings with online information
- The application will be deployed to a website (domain TBD)
- The project adapts existing files and structures rather than creating new ones
