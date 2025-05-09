# Water Damage CA - Website Architecture & Flowchart

## System Architecture

```mermaid
graph TD
    subgraph "Frontend (Next.js)"
        A[Next.js App Router] --> B[Dynamic Routes]
        B --> C1[City-Service Pages]
        B --> C2[Business Profile Pages]
        B --> C3[Landing Pages]

        D[Components] --> D1[BusinessList]
        D --> D2[ServiceCards]
        D --> D3[CitySelector]
        D --> D4[LeadForm]
        D --> D5[ContentBlocks]
    end

    subgraph "Data Sources"
        F[Google Places API] --> F1[Business Listings]
        F --> F2[Reviews]
        F --> F3[Photos]

        G[Supabase Database] --> G1[User Data]
        G --> G2[Lead Data]
        G --> G3[Analytics]
        G --> G4[Cached API Data]
        G --> G5[Service Data]
        G --> G6[City Data]
        G --> G7[Content Templates]
    end

    subgraph "AI Content Enrichment"
        H[Google Gemini Pro 2.5 MCP] --> H1[Content Generation]
        H --> H2[FAQ Creation]
        H --> H3[Business Descriptions]

        I[Perplexity MCP Server] --> I1[Deep Research]
        I --> I2[Additional Business Info]
    end

    subgraph "Backend Services"
        J[API Routes] --> J1[/api/places]
        J --> J3[/api/supabase]
        J --> J4[/api/ai-enrichment]

        K[Serverless Functions] --> K1[Lead Processing]
        K --> K2[Data Enrichment]
        K --> K3[Scheduled Updates]
    end

    A --> J
    J --> F
    J --> G
    J --> H
    J --> I
    K --> F
    K --> G
    K --> H
    K --> I
```

## User Flow

```mermaid
flowchart TD
    A[User Enters Site] --> B{Landing Page}
    B --> C[Select City]
    B --> D[Select Service]

    C --> E[City Landing Page]
    D --> F[Service Landing Page]

    E --> G[City-Service Page]
    F --> G

    G --> H[View Business Listings]
    G --> I[Read Service Information]

    H --> J[View Business Profile]
    H --> K[Contact Business Directly]

    I --> L[Fill Lead Form]

    J --> M[Read Reviews]
    J --> N[View Photos]
    J --> O[See Business Hours]
    J --> P[Contact Business]

    L --> Q[Lead Processed]
    K --> Q
    P --> Q

    Q --> R[Lead Distributed to Business]
    Q --> S[User Receives Confirmation]
```

## Data Flow

```mermaid
flowchart LR
    subgraph "Data Sources"
        A2[Google Places API]
        A3[Supabase DB]
    end

    subgraph "MCP Servers"
        B2[Google Gemini Pro 2.5 MCP]
        B3[Perplexity MCP]
    end

    subgraph "Data Processing"
        C1[Data Fetching]
        C2[Data Enrichment]
        C3[Data Caching]
    end

    subgraph "Page Generation"
        D1[Static Pages]
        D2[ISR Pages]
        D3[Dynamic Pages]
    end

    subgraph "User Interaction"
        E1[Page View]
        E2[Form Submission]
        E3[Business Contact]
    end

    A2 --> C1
    A3 <--> C1

    C1 --> C2

    C2 --> B2
    C2 --> B3
    B2 --> C2
    B3 --> C2

    C2 --> C3
    C3 --> A3

    C3 --> D1
    C3 --> D2
    C3 --> D3

    D1 --> E1
    D2 --> E1
    D3 --> E1

    E1 --> E2
    E1 --> E3

    E2 --> A3
    E3 --> A3
```

## Component Architecture

```mermaid
classDiagram
    class Page {
        +metadata: Object
        +generateMetadata()
        +generateStaticParams()
    }

    class CityServicePage {
        +city: String
        +service: String
        +businesses: Array
        +content: Object
        +render()
    }

    class BusinessProfilePage {
        +businessId: String
        +businessData: Object
        +reviews: Array
        +enrichedContent: Object
        +render()
    }

    class BusinessList {
        +businesses: Array
        +city: String
        +service: String
        +render()
    }

    class BusinessCard {
        +business: Object
        +handleClick()
        +render()
    }

    class LeadForm {
        +formData: Object
        +validation: Object
        +handleSubmit()
        +render()
    }

    class ContentBlock {
        +content: Object
        +enriched: Boolean
        +render()
    }

    class ServiceSelector {
        +services: Array
        +selectedService: String
        +handleChange()
        +render()
    }

    class CitySelector {
        +cities: Array
        +selectedCity: String
        +handleChange()
        +render()
    }

    Page <|-- CityServicePage
    Page <|-- BusinessProfilePage
    CityServicePage --> BusinessList
    CityServicePage --> ContentBlock
    CityServicePage --> LeadForm
    BusinessProfilePage --> ContentBlock
    BusinessProfilePage --> LeadForm
    BusinessList --> BusinessCard
    CityServicePage --> ServiceSelector
    CityServicePage --> CitySelector
```

## Database Schema

```mermaid
erDiagram
    CITY {
        string id PK
        string name
        string state
        string slug
        float latitude
        float longitude
        int population
        string description
    }

    SERVICE {
        string id PK
        string name
        string slug
        string description
        string category
        boolean emergency
    }

    BUSINESS {
        string id PK
        string place_id
        string name
        string address
        string phone
        float rating
        int review_count
        string website
        json hours
        json photos
        timestamp last_updated
    }

    LEAD {
        string id PK
        string name
        string email
        string phone
        string message
        string city_id FK
        string service_id FK
        string business_id FK
        timestamp created_at
        string status
    }

    CONTENT {
        string id PK
        string city_id FK
        string service_id FK
        string title
        text content
        text enriched_content
        json meta
        timestamp last_updated
    }

    CITY_SERVICE {
        string city_id FK
        string service_id FK
        text custom_content
        json meta
    }

    CITY ||--o{ CITY_SERVICE : has
    SERVICE ||--o{ CITY_SERVICE : has
    CITY ||--o{ BUSINESS : located_in
    CITY ||--o{ LEAD : from
    SERVICE ||--o{ LEAD : for
    BUSINESS ||--o{ LEAD : to
    CITY ||--o{ CONTENT : about
    SERVICE ||--o{ CONTENT : about
```

## Deployment Architecture

```mermaid
flowchart TD
    subgraph "Development Environment"
        A1[Local Next.js Dev]
        A2[Local MCP Servers]
        A3[Local Supabase]
    end

    subgraph "CI/CD Pipeline"
        B1[GitHub Repository]
        B2[GitHub Actions]
        B3[Netlify Build]
    end

    subgraph "Production Environment"
        C1[Netlify Edge Functions]
        C2[Netlify CDN]
        C3[Production Supabase]
    end

    subgraph "External Services"
        D1[Google Places API]
        D3[Google Gemini API]
        D4[Perplexity API]
    end

    A1 --> B1
    B1 --> B2
    B2 --> B3
    B3 --> C1
    B3 --> C2

    A2 --> B1
    A3 --> C3

    C1 --> D1
    C1 --> D3
    C1 --> D4
    C1 --> C3

    C2 --> C1
```

This architecture document provides a comprehensive overview of the Water Damage CA website structure, data flow, component relationships, and deployment strategy. The diagrams illustrate how different parts of the system interact and how data flows through the application.
