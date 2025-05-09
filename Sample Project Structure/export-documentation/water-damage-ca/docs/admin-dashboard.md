# Admin Dashboard Documentation

## Overview

The Admin Dashboard provides a centralized interface for managing and monitoring various aspects of the Water Damage CA website. It includes tools for batch processing, business enrichment, and data management.

## Accessing the Admin Dashboard

The Admin Dashboard can be accessed through the following URLs:

- **Local Development**: http://localhost:3000/admin
- **Netlify Dev**: http://localhost:8888/admin

## Dashboard Components

The Admin Dashboard consists of several key components:

### 1. Main Dashboard

- **URL**: `/admin`
- **Description**: The main entry point for the admin interface, providing an overview of the system status and quick links to other sections.
- **Features**:
  - System status indicators
  - Recent activity logs
  - Quick navigation links

### 2. Batch Processing

- **URL**: `/admin/batch-process`
- **Description**: Interface for managing and monitoring batch processing jobs for city and business data.
- **Features**:
  - Start/stop batch processing jobs
  - Real-time progress monitoring
  - Detailed logs and statistics
  - Configuration options

### 3. Business Enrichment

- **URL**: `/admin/enrich-businesses`
- **Description**: Interface for enriching business profiles with additional information from web searches using the OpenRouter Web Search MCP server.
- **Features**:
  - Select specific businesses for enrichment
  - Batch enrichment of multiple businesses
  - Real-time progress monitoring
  - Enrichment status indicators

### 4. City Management

- **URL**: `/admin/cities`
- **Description**: Interface for managing city data and related information.
- **Features**:
  - View and edit city information
  - Add new cities
  - View businesses in each city

### 5. Business Management

- **URL**: `/admin/businesses`
- **Description**: Interface for managing business data and related information.
- **Features**:
  - View and edit business information
  - Add new businesses
  - View enriched data for each business

## Batch Processing Interface

The Batch Processing interface at `/admin/batch-process` is a key component of the Admin Dashboard, providing tools for managing and monitoring batch processing jobs.

### Features

1. **Batch Process Control**
   - Start Button: Initiates a new batch processing job
   - Cancel Button: Stops the currently running batch process
   - Refresh Button: Updates the current status display

2. **Status Display**
   - Current Status: Shows the current state of the batch process (idle, running, completed, failed)
   - Progress Bar: Visual indicator of the batch process progress
   - Statistics: Shows the number of processed items, success rate, and other metrics

3. **Detailed Logs**
   - Real-time log display
   - Error highlighting
   - Timestamp information

### Usage Instructions

1. **Starting a Batch Process**
   - Navigate to `/admin/batch-process`
   - Review the current status to ensure no process is already running
   - Click the "Start Batch Process" button
   - The system will begin processing cities and businesses in batches

2. **Monitoring Progress**
   - The progress bar shows the overall completion percentage
   - The status display updates in real-time
   - Detailed logs provide information about each step of the process

3. **Cancelling a Process**
   - If needed, click the "Cancel" button to stop the current process
   - The system will complete the current batch before stopping
   - The status will update to "cancelled"

4. **Viewing Results**
   - After completion, the status display shows the final results
   - The logs provide detailed information about what was processed
   - Statistics show the number of items processed, success rate, etc.

### Implementation Details

The Batch Processing interface is implemented using the following components:

1. **Frontend**
   - React components for the user interface
   - Real-time updates using polling
   - Progress visualization with Tailwind CSS

2. **Backend**
   - API routes for starting, stopping, and monitoring batch processes
   - State management for tracking process status
   - Database integration for storing results

3. **Integration**
   - Google Places API for fetching business data
   - OpenRouter Web Search MCP for enriching business profiles
   - Supabase for storing processed data

## Business Enrichment Interface

The Business Enrichment interface at `/admin/enrich-businesses` provides tools for enriching business profiles with additional information from web searches.

### Features

1. **Business Selection**
   - Checkbox selection for individual businesses
   - Select all/none options
   - Filtering by enrichment status

2. **Enrichment Control**
   - Enrich Selected: Processes only the selected businesses
   - Enrich All: Processes all businesses that need enrichment
   - Cancel: Stops the current enrichment process

3. **Status Display**
   - Current Status: Shows the current state of the enrichment process
   - Progress Bar: Visual indicator of the enrichment progress
   - Statistics: Shows the number of processed businesses, success rate, etc.

### Usage Instructions

1. **Selecting Businesses**
   - Navigate to `/admin/enrich-businesses`
   - Browse the list of businesses
   - Use the checkboxes to select specific businesses
   - Alternatively, leave all unselected to process all businesses that need enrichment

2. **Starting Enrichment**
   - Click "Enrich Selected" to process only the selected businesses
   - Click "Enrich All" to process all businesses that need enrichment
   - The system will begin enriching the selected businesses in batches

3. **Monitoring Progress**
   - The progress bar shows the overall completion percentage
   - The status display updates in real-time
   - Statistics show the number of businesses processed, enriched, and failed

4. **Viewing Results**
   - After completion, the status display shows the final results
   - The business list updates to show the new enrichment status
   - Click "Refresh" to update the list with the latest data

## Technical Implementation

The Admin Dashboard is implemented using the following technologies:

1. **Frontend**
   - Next.js App Router for page routing
   - React components for the user interface
   - Tailwind CSS for styling
   - Client-side state management with React hooks

2. **Backend**
   - Next.js API routes for server-side logic
   - Supabase for database operations
   - MCP servers for external API integrations

3. **Authentication**
   - Currently uses basic authentication
   - Future plans include integration with Supabase Auth

## Best Practices

When using the Admin Dashboard, follow these best practices:

1. **Batch Processing**
   - Run batch processes during off-peak hours
   - Monitor the process to ensure it completes successfully
   - Check the logs for any errors or warnings

2. **Business Enrichment**
   - Enrich businesses in small batches to avoid API rate limits
   - Verify the enriched data for quality before publishing
   - Use the filtering options to focus on businesses that need attention

3. **Data Management**
   - Regularly back up the database before making significant changes
   - Use the preview features to verify changes before saving
   - Document any manual data adjustments

## Troubleshooting

Common issues and their solutions:

1. **Batch Process Stalls**
   - Check the logs for error messages
   - Cancel the current process and restart
   - Verify API keys and rate limits

2. **Enrichment Failures**
   - Check the OpenRouter API key and rate limits
   - Verify the business data is complete and valid
   - Try enriching individual businesses to isolate the issue

3. **UI Not Updating**
   - Refresh the page to get the latest data
   - Check browser console for JavaScript errors
   - Clear browser cache if necessary

## Future Enhancements

Planned improvements for the Admin Dashboard:

1. **User Management**
   - Role-based access control
   - User activity logging
   - Customizable user preferences

2. **Advanced Analytics**
   - Data visualization dashboards
   - Performance metrics
   - Usage statistics

3. **Workflow Automation**
   - Scheduled batch processes
   - Automated data validation
   - Email notifications for important events

## Related Documentation

- [Batch Processing](./batch-processing.md)
- [Business Data Flow](./business-data-flow.md)
- [OpenRouter Search Integration](./openrouter-search-integration.md)
- [Immediate Next Steps](./immediate-next-steps.md)
