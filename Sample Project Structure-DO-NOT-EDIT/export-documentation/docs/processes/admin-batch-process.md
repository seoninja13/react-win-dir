# Admin Batch Process

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Processes](./index.md) > Admin Batch Process

## Overview

The Batch Processing Admin Dashboard is a powerful tool for administrators to manage and monitor the batch processing of city and business data. It provides a user-friendly interface to initiate, monitor, and control the batch processing operations.

The dashboard is accessible at `/admin/batch-process` and offers a comprehensive view of the batch processing status, progress, and statistics.

## Features

### 1. Batch Process Control

- **Start Batch Process**: Initiates the batch processing operation
- **Cancel Process**: Allows administrators to cancel an ongoing batch process
- **Refresh Status**: Updates the current status of the batch process

### 2. Progress Monitoring

- **Progress Bar**: Visual representation of the overall progress
- **Current Step**: Displays the current step being executed
- **Processing Time**: Shows the elapsed time since the batch process started

### 3. Two-Step Flow Visualization

The batch processing follows a two-step flow:

1. **Step 1: Retrieve Google Business Profile Data**
   - Processes cities in the target list
   - Checks if cities already exist in the database
   - Adds new cities to the database
   - Retrieves business data from Google Places API for each city-service combination

2. **Step 2: Enrich with OpenRouter Web Search**
   - Processes businesses that need enrichment
   - Uses OpenRouter Web Search to gather additional information
   - Updates businesses with enriched data
   - Marks businesses as enriched with "openrouter web search" as the source

### 4. Statistics

The dashboard provides real-time statistics on:

- **Cities Processed**: Number of cities processed out of the total
- **New Cities Added**: Number of new cities added to the database
- **Successful Cities**: Number of cities successfully processed
- **Businesses Found**: Total number of businesses found
- **New Businesses**: Number of new businesses added to the database
- **Enriched Businesses**: Number of businesses enriched with OpenRouter Web Search

### 5. Process Information

- **Process Overview**: Provides information about the batch process, including target cities, services per city, and estimated time
- **Important Notes**: Highlights key information about the batch process, such as caching, parallel processing, and error handling

## Technical Implementation

### Client-Side (React)

The client-side implementation uses React with the following components:

- **State Management**: Uses React's useState and useEffect hooks to manage the state and polling
- **UI Components**: Uses Tailwind CSS components for the user interface
- **API Integration**: Communicates with the server-side API to initiate, monitor, and control the batch process

### Server-Side (Next.js API Routes)

The server-side implementation uses Next.js API routes with the following endpoints:

- **GET /api/admin/batch-process**: Returns the current status of the batch process
- **POST /api/admin/batch-process**: Initiates a new batch process
- **DELETE /api/admin/batch-process**: Cancels an ongoing batch process

### Batch Processing Logic

The batch processing logic is implemented in the `batchProcessor.ts` file and includes:

- **City Processing**: Adds new cities to the database and skips existing ones
- **Business Search**: Uses Google Places API to search for businesses in each city
- **Data Enrichment**: Uses OpenRouter Web Search to enrich business data
- **State Management**: Tracks the state of the batch process and provides updates to the client

## Target Cities

The batch processor targets the following cities in California:

- Redding, CA
- Eureka, CA
- Chico, CA
- Merced, CA
- Visalia, CA
- San Luis Obispo, CA
- Santa Maria, CA
- El Centro, CA
- Ukiah, CA
- Truckee, CA

## Services

The batch processor searches for businesses in the following service categories:

- Water damage restoration
- Mold removal service

## Usage

1. Navigate to `/admin/batch-process`
2. Click the "Start Batch Process" button to initiate the batch process
3. Monitor the progress and statistics in real-time
4. If needed, click the "Cancel Process" button to stop the batch process
5. Use the "Refresh Status" button to manually update the status

## Troubleshooting

### Development Environment Setup

The batch processing admin dashboard is accessible in both development and production environments:

1. **Development Mode (Next.js)**
   ```bash
   # Start the Next.js development server
   yarn dev

   # Access the dashboard at
   http://localhost:3000/admin/batch-process
   ```

2. **Development Mode (Netlify Dev)**
   ```bash
   # Start with Netlify Dev
   netlify dev

   # Access the dashboard at
   http://localhost:8888/admin/batch-process
   ```

### Troubleshooting Common Issues

1. **Port Conflicts**
   ```bash
   # Kill all Node processes (Windows)
   taskkill /F /IM node.exe

   # Start the server on a specific port
   yarn dev -p 3000
   ```

2. **Database Connection Issues**
   - The application now includes fallbacks for database operations
   - Development mode skips database validation by default
   - Check .env file for proper Supabase credentials

3. **Error Handling**
   - Enhanced error handling with detailed error messages
   - Fallback logging when database is unavailable
   - Improved state management during errors

4. **Environment Variables**
   ```env
   # Required environment variables
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```

## Error Handling

The dashboard provides comprehensive error handling:

- **Process Errors**: Displays errors that occur during the batch process
- **API Errors**: Handles errors that occur during API communication
- **Cancellation**: Allows administrators to cancel the batch process if errors occur

## Performance Considerations

- The batch processor uses parallel processing for improved performance
- Rate limiting is implemented to avoid API quota exhaustion
- Results are cached for 6 months to reduce API calls
- The process can be safely interrupted and resumed

## Security

- The batch processing dashboard is only accessible to administrators
- API endpoints are protected to prevent unauthorized access
- Sensitive information is not exposed in the UI or logs

## Future Enhancements

- Add support for additional service categories
- Implement more detailed error reporting
- Add support for custom city lists
- Implement scheduling for automated batch processing

## Related Documentation

- [Admin Dashboard](../features/admin-dashboard.md)
- [Batch Processing](./batch-processing.md)
- [Google Places Integration](../integrations/google-places.md)
- [OpenRouter Integration](../integrations/openrouter.md)
- [Supabase Integration](../integrations/supabase.md)
- [Admin Cities Businesses](../features/admin-cities-businesses.md)

Last Updated: April 22, 2025
