# Admin UI Guide

This document provides an overview of the admin UI and how to use it to manage the Windows Doors CA website.

## Table of Contents

1. [Overview](#overview)
2. [Accessing the Admin UI](#accessing-the-admin-ui)
3. [Dashboard](#dashboard)
4. [Database Management](#database-management)
5. [Content Management](#content-management)
6. [Content Engine](#content-engine)
7. [Sample Images](#sample-images)
8. [Next Steps](#next-steps)

## Overview

The admin UI provides a centralized interface for managing all aspects of the Windows Doors CA website, including:

- Database management (products, content, leads, testimonials)
- Content management (images)
- Content generation (text and images)
- User management
- Settings

The UI is designed to be intuitive and easy to use, with a clean, modern interface that follows best practices for web application design.

## Accessing the Admin UI

To access the admin UI, navigate to the `/admin` route of the website. For example, if the website is running at `http://localhost:3000`, the admin UI would be at `http://localhost:3000/admin`.

## Dashboard

The dashboard is the main landing page of the admin UI. It provides an overview of the website's status and quick access to key features:

- **Statistics**: View counts of products, content pages, and leads
- **Sample Page**: Access the sample page that demonstrates how to use sample images in components
- **Documentation**: Access documentation for using sample images in components

### Sample Page

The sample page demonstrates how to use the sample image components in your pages. It includes examples of:

- SampleHeroImage: A hero image with title and subtitle
- SampleImageGallery: A grid of sample images
- SampleProductCard: A product card with image, title, description, and link

To view the sample page, click the "View Sample Page" button on the dashboard.

## Database Management

The Database Management tab provides interfaces for managing the website's data:

### Products

The Products section allows you to manage product information:

- View a list of all products
- Add new products
- Edit existing products
- Delete products

Note: This is currently a placeholder UI that simulates database operations. Actual database operations will be implemented in the future.

### Content

The Content section allows you to manage content for pages:

- View a list of all content items
- Add new content
- Edit existing content
- Delete content

Note: This is currently a placeholder UI that simulates database operations. Actual database operations will be implemented in the future.

### Leads

The Leads section will allow you to manage leads from the website's contact forms. This feature is coming soon.

### Testimonials

The Testimonials section will allow you to manage customer testimonials. This feature is coming soon.

## Content Management

The Content Management tab provides an interface for managing images:

- View a grid of images
- Filter images by category
- Search for images by name
- Upload new images
- Delete images

Note: This is currently a placeholder UI that simulates image management operations. Actual image management operations will be implemented in the future.

## Content Engine

The Content Engine tab provides interfaces for generating text and images:

- **Text Generation**: Generate text content for pages
- **Image Generation**: Generate images for products and pages

Note: This is currently a placeholder UI that simulates content generation. Actual content generation will be implemented in the future using Google Cloud services.

## Sample Images

The website includes a system for using sample images in components until real images are available. This system provides several components:

- **SampleHeroImage**: Displays a hero image with title and subtitle
- **SampleImageGallery**: Displays a grid of sample images
- **SampleProductCard**: Displays a product card with image, title, description, and link

For more information on using these components, see the [Sample Images Usage Guide](../sample-images/sample-images-usage.md).

## Next Steps

The admin UI is currently in development, with many features implemented as placeholders. The next steps for development include:

1. **Implement Database Operations**: Connect the UI to Supabase for real database operations
2. **Implement Image Management**: Connect the UI to Supabase Storage for real image management
3. **Implement Content Engine**: Connect the UI to Google Cloud services for real content generation
4. **Implement User Management**: Add user authentication and authorization
5. **Implement Settings**: Add configuration options for the website

These features will be implemented incrementally, with a focus on providing a solid foundation for managing the Windows Doors CA website.
