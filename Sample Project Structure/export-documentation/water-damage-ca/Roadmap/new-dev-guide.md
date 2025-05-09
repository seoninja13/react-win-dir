# New Developer Guide
## Water Damage CA Website Project

Welcome to the Water Damage CA website project! This guide will help you understand where to find important information and how to get started with development.

## Key Documentation

All project documentation is located in the `Roadmap` folder:

1. **project-requirements.md** - Contains the detailed requirements and specifications for the project
2. **technical-implementation-plan.md** - Outlines the technical architecture and implementation strategy
3. **tracking-progress.md** - Tracks the progress of development tasks and features
4. **Data Enrichment** - Folder containing documentation for data enrichment features

## Project Structure

```
water-damage-ca/
├── app/                  # Next.js app router pages and API routes
├── components/           # Reusable UI components
├── lib/                  # Utility functions and API integrations
│   ├── api/              # API integration code
│   └── types/            # TypeScript type definitions
│       ├── business.ts   # Business data types
│       ├── city.ts       # City data types
│       └── service.ts    # Service data types
├── public/               # Static assets
├── Roadmap/              # Project documentation and tracking
├── scripts/              # Utility scripts
├── tests/                # Test scripts
└── .env.local            # Local environment variables
```

## Getting Started

### 1. Environment Setup

1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Copy `.env.template` to `.env.local` and fill in the required values:
   - `NEXT_PUBLIC_SUPABASE_URL`: The URL of your Supabase project
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The anonymous key for your Supabase project
   - `GOOGLE_PLACES_API_KEY`: API key for Google Places API
   - `GOOGLE_GEMINI_API_KEY`: API key for Google Gemini
   - `PERPLEXITY_API_KEY`: API key for Perplexity

### 2. Testing Supabase Integration

Verify your Supabase connection by running the development server and checking the API routes.

### 3. Running the Development Server

```bash
npm run dev
# or
yarn dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

## Current Project Status

Check `Roadmap/tracking-progress.md` for the current status of the project and upcoming tasks. As of February 27, 2025:

- Supabase database integration is complete
- Type definitions for business, service, and city data are implemented
- Next steps include implementing dynamic routing and page templates

## API Integrations

### Supabase Database

The project uses Supabase as the primary data source for business and service information:

- **Integration**: Implemented in `lib/database.ts`
- **API Routes**: Various routes in `app/api/supabase/` handle database operations

### Google Places API

We use the Google Places API to fetch business data for specific cities:

- **Integration**: Implemented in `lib/api/googlePlaces.ts` with caching mechanism
- **API Route**: `app/api/business/by-city/route.ts` handles city-specific business data requests
- **Environment Variables**:
  - `GOOGLE_PLACES_API_KEY`: API key for Google Places API

#### Places API Workflow

1. User searches for businesses in a specific city
2. System checks Supabase for cached data
3. If data is not cached or outdated, it fetches from Places API
4. Results are cached in Supabase for future use
5. Up to 10 businesses are returned per location

#### Testing Places API

To test the Places API integration:

```powershell
# Direct API test
$apiKey = (Get-Content .env.local | Select-String "GOOGLE_MAPS_API_KEY").Line.Split('=')[1].Trim()
curl "https://maps.googleapis.com/maps/api/place/textsearch/json?query=water%20damage%20Los%20Angeles%20CA&key=$apiKey"

# API route test
curl "http://localhost:3000/api/business/by-city?city=Sacramento"
```

## Supabase Database Structure

The project uses Supabase as the primary data source with the following structure:

### services Table
Contains information about water damage and mold removal services:
- id: Unique identifier
- name: Service name
- slug: URL-friendly name
- category: Service category
- description: Brief service description
- priority: Ranking priority
- isEmergency: Emergency service flag
- featuredImageAlt: Alt text for featured image
- featuredImageTitle: Title attribute for featured image
- featuredImageDescription: Description for featured image

### businesses Table
Contains information about businesses offering water damage and mold removal services:
- id: Unique identifier
- name: Business name
- slug: URL-friendly name
- description: Brief business description
- city_id: Foreign key to cities table
- address: Business address
- phone: Business phone number
- website: Business website URL
- rating: Business rating
- reviewCount: Number of reviews
- services: Array of service IDs
- isEmergency: Whether the business offers emergency services
- featuredImageAlt: Alt text for featured image
- featuredImageTitle: Title attribute for featured image
- featuredImageDescription: Description for featured image

## Development Workflow

1. Check `Roadmap/tracking-progress.md` for current tasks
2. Create a feature branch for your work
3. Implement your changes following the existing patterns
4. Test your changes with the provided test scripts
5. Update documentation as needed
6. Submit a pull request for review

## Key Technologies

- **Next.js 15.3.1**: React framework with App Router
- **TypeScript**: For type safety
- **Supabase**: PostgreSQL database for data storage
- **Google Places API**: For fetching business data by location
- **Google Gemini API**: For content enrichment
- **Perplexity API**: For deep research and content enrichment
- **Netlify**: For deployment and hosting

## Need Help?

If you have any questions or need help, please contact the project administrator.

Happy coding! 🚀
