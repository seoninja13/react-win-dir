# TypeScript Interface Guide

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Guides](./index.md) > TypeScript Interface Guide

This guide provides detailed information about the key TypeScript interfaces used throughout the Water Damage CA project, with examples of proper usage and common pitfalls to avoid.

## Core Interfaces

### BusinessDetails Interface

The `BusinessDetails` interface is a core type used throughout the application for representing business data.

```typescript
interface BusinessDetails {
  // Basic Information
  name: string;
  description: string;
  address: string;
  rating: number;
  phone: string;
  website: string;

  // Location Information
  location: {
    lat: number;
    lng: number;
  };
  city: {
    name: string;    // Only name and state allowed
    state: string;   // No id or slug properties
  };

  // Operating Hours - Record format
  hours: Record<string, string>;  // e.g., { "Monday": "08:00-18:00" }

  // Media
  photos: Array<{
    reference: string;
    width: number;     // Required
    height: number;    // Required
  }>;

  // Emergency Services
  emergency: {
    available: boolean;
    responseTime: string;
  };

  // Services Offered
  services: string[];

  // Optional Enriched Data
  enriched_data?: {
    reviewInsights?: {
      summary?: string;
      strengths?: string[];
      testimonialHighlights?: string[];
    };
    serviceDetails?: {
      certifications?: string[];
      primaryServices?: Array<{
        name: string;
        description: string;
      }>;
    };
    remediationProcess?: {
      steps?: string[];
      description?: string;
    };
    restorationTechniques?: {
      dryingTechniques?: string[];
      specializedEquipment?: string[];
    };
  };
}
```

#### Required Properties

- `name`: Business name (string)
- `description`: Business description (string)
- `address`: Business address (string)
- `rating`: Business rating (number)
- `phone`: Business phone number (string)
- `website`: Business website URL (string)
- `location`: Object containing `lat` and `lng` coordinates
- `city`: Object containing only `name` and `state`
- `hours`: Object mapping days to hours (e.g., { Monday: "9:00-17:00" })
- `photos`: Array of objects with `reference`, `width`, and `height`
- `emergency`: Object with `available` and `responseTime`
- `services`: Array of service names

#### Common Type Issues and Solutions

1. **Removed Properties**
   - The following properties have been removed from the interface:
     ```typescript
     id: string;           // Removed
     slug: string;         // Removed
     place_id: string;     // Removed
     review_count: number; // Removed
     reviews: any[];       // Removed
     ```

2. **City Object Structure**
   - Correct: Only name and state properties
     ```typescript
     city: {
       name: "Los Angeles",
       state: "CA"
     }
     ```
   - Incorrect: Including additional properties
     ```typescript
     city: {
       id: 1,              // Not allowed
       slug: "los-angeles", // Not allowed
       name: "Los Angeles",
       state: "CA"
     }
     ```

3. **Hours Format**
   - Changed from array to Record type
   - Correct: Record with day keys mapping to time strings
     ```typescript
     hours: {
       Monday: "08:00-18:00",
       Tuesday: "08:00-18:00",
       // ...
     }
     ```
   - Incorrect: Array format (old style)
     ```typescript
     hours: [
       { day: "Monday", open: "08:00", close: "18:00" }
     ]
     ```

4. **Photos Structure**
   - Width and height are now required
   - Correct: All properties must be present
     ```typescript
     photos: [
       {
         reference: "photo_reference_string",
         width: 800,   // Required
         height: 600   // Required
       }
     ]
     ```
   - Incorrect: Missing required properties
     ```typescript
     photos: [
       { reference: "photo_reference_string" }  // Missing width/height
     ]
     ```

5. **Null Safety**
   - Use optional chaining for all nested properties
   - Use nullish coalescing for default values
   ```typescript
   // Safe property access
   const lat = business?.location?.lat ?? 0;
   const mondayHours = business?.hours?.Monday ?? "Closed";
   const certifications = business?.enriched_data?.serviceDetails?.certifications ?? [];
   
   // Safe iteration
   const services = business?.services?.map(service => service.toLowerCase()) ?? [];
   const photos = business?.photos?.filter(photo => photo.width > 0) ?? [];
   ```

## Example Usage

### Creating a Business Object

```typescript
const business: BusinessDetails = {
  // Basic Information
  name: "Water Damage Experts",
  description: "Professional water damage restoration services in Los Angeles.",
  address: "123 Main St, Los Angeles, CA 90001",
  rating: 4.8,
  phone: "(213) 555-1234",
  website: "https://example.com",

  // Location
  location: {
    lat: 34.0522,
    lng: -118.2437
  },
  city: {
    name: "Los Angeles",
    state: "CA"
  },

  // Operating Hours
  hours: {
    Monday: "08:00-18:00",
    Tuesday: "08:00-18:00",
    Wednesday: "08:00-18:00",
    Thursday: "08:00-18:00",
    Friday: "08:00-18:00",
    Saturday: "09:00-17:00",
    Sunday: "Closed"
  },

  // Media
  photos: [
    {
      reference: "photo_reference_1",
      width: 800,
      height: 600
    }
  ],

  // Emergency Services
  emergency: {
    available: true,
    responseTime: "30 minutes"
  },

  // Services
  services: [
    "Water Extraction",
    "Flood Cleanup",
    "Mold Remediation",
    "Structural Drying"
  ],

  // Enriched Data
  enriched_data: {
    reviewInsights: {
      summary: "Highly rated for emergency response and professional service",
      strengths: [
        "Fast emergency response",
        "Professional staff",
        "Quality equipment"
      ],
      testimonialHighlights: [
        "Arrived within 30 minutes",
        "Very thorough cleanup process"
      ]
    },
    serviceDetails: {
      certifications: [
        "IICRC Certified",
        "EPA Lead-Safe Certified"
      ],
      primaryServices: [
        {
          name: "Water Extraction",
          description: "Professional grade water removal and drying"
        }
      ]
    },
    remediationProcess: {
      steps: [
        "Initial assessment",
        "Water extraction",
        "Structural drying",
        "Sanitization"
      ],
      description: "Comprehensive water damage restoration process"
    },
    restorationTechniques: {
      dryingTechniques: [
        "Industrial air movers",
        "Dehumidification"
      ],
      specializedEquipment: [
        "Moisture meters",
        "Thermal imaging cameras"
      ]
    }
  }
};
```

### Accessing Business Properties

```typescript
// Safe property access
function displayBusinessInfo(business: BusinessDetails) {
  // Basic information
  console.log(`Name: ${business.name}`);
  console.log(`Rating: ${business.rating} stars`);
  
  // Location information
  console.log(`Address: ${business.address}`);
  console.log(`City: ${business.city.name}, ${business.city.state}`);
  
  // Contact information
  console.log(`Phone: ${business.phone}`);
  console.log(`Website: ${business.website}`);
  
  // Hours of operation
  console.log("Hours of Operation:");
  Object.entries(business.hours).forEach(([day, hours]) => {
    console.log(`  ${day}: ${hours}`);
  });
  
  // Services
  console.log("Services Offered:");
  business.services.forEach(service => {
    console.log(`  - ${service}`);
  });
  
  // Emergency availability
  console.log(`Emergency Services: ${business.emergency.available ? 'Yes' : 'No'}`);
  if (business.emergency.available) {
    console.log(`Response Time: ${business.emergency.responseTime}`);
  }
}
```

## Best Practices

1. **Type Checking**
   - Always use proper type annotations when working with business data
   - Use TypeScript's strict mode for better type safety
   - Consider using type guards for runtime type checking

2. **Null Safety**
   - Always use optional chaining (`?.`) for nested property access
   - Use nullish coalescing (`??`) for default values
   - Consider using the `NonNullable<T>` utility type when you've validated data

3. **Validation**
   - Validate data before using it, especially from external sources
   - Consider using a schema validation library like Zod or Yup
   - Add runtime type checks for critical operations

4. **Default Values**
   - Provide sensible defaults for optional properties
   - Use the nullish coalescing operator for clean default assignments
   - Consider creating a helper function for default value initialization

5. **Documentation**
   - Document complex type structures with JSDoc comments
   - Include examples of correct and incorrect usage
   - Keep documentation updated when interfaces change

6. **Error Handling**
   - Add proper error handling for missing or invalid data
   - Use type guards to narrow types when necessary
   - Log type-related errors for debugging

## Related Interfaces

- `City`: Represents city information
- `Service`: Represents service information
- `BusinessEnrichment`: Represents enriched business data
- `BusinessReview`: Represents business review data

## Related Documentation

- [Business Profile Implementation](../features/business-profile-implementation.md)
- [Data Enrichment](../features/data-enrichment.md)
- [New Developer Guide](./new-developer-guide.md)

Last Updated: April 22, 2025
