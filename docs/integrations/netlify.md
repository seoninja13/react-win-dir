# Netlify Integration

This document provides detailed documentation for the Netlify integration in the Window World LA website.

## Overview

The Window World LA website is deployed and hosted on Netlify. Netlify provides continuous deployment, serverless functions, and other features that enhance the website's functionality and performance.

## Netlify Configuration

The Netlify configuration is defined in the `netlify.toml` file at the root of the project:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[dev]
  command = "npm run dev"
  port = 8888
  targetPort = 4000
  framework = "next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Build Configuration

The build configuration specifies how Netlify should build and deploy the website:

- `command`: The command to build the website (`npm run build`)
- `publish`: The directory to publish after the build (`.next`)

### Development Configuration

The development configuration specifies how Netlify Dev should run the website locally:

- `command`: The command to start the development server (`npm run dev`)
- `port`: The port on which Netlify Dev should run (`8888`)
- `targetPort`: The port on which the development server runs (`4000`)
- `framework`: The framework used by the website (`next`)

### Plugins

The plugins section specifies the Netlify plugins to use:

- `@netlify/plugin-nextjs`: A plugin for optimizing Next.js deployments on Netlify

## Netlify Dev

Netlify Dev is a local development environment that mimics the Netlify production environment. It allows developers to test Netlify features locally before deploying to production.

### Installation

To install Netlify CLI, which includes Netlify Dev, run the following command:

```bash
npm install -g netlify-cli
```

### Usage

To start Netlify Dev, run the following command:

```bash
netlify dev
```

This will start a local development server on port 8888 that proxies requests to the Next.js development server on port 4000.

### Features

Netlify Dev provides the following features:

1. **Local Development**: Run the website locally with Netlify features
2. **Serverless Functions**: Test serverless functions locally
3. **Environment Variables**: Use environment variables from Netlify
4. **Redirects and Headers**: Test redirects and headers locally
5. **Live Share**: Share the local development environment with others

## Deployment

The Window World LA website is deployed to Netlify using continuous deployment. When changes are pushed to the main branch, Netlify automatically builds and deploys the website.

### Deployment Process

1. Push changes to the main branch
2. Netlify detects the changes and starts a new build
3. Netlify runs the build command (`npm run build`)
4. Netlify deploys the built website to the Netlify CDN
5. The website is available at the Netlify URL

### Environment Variables

The following environment variables are set in the Netlify dashboard:

- `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY`: The Unsplash API access key
- `UNSPLASH_SECRET_KEY`: The Unsplash API secret key
- `UNSPLASH_APPLICATION_ID`: The Unsplash API application ID
- `NEXT_PUBLIC_SITE_URL`: The URL of the website

### Build Settings

The following build settings are configured in the Netlify dashboard:

- **Base Directory**: The root directory of the project
- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Node Version**: 18.x

## Netlify Forms

Netlify Forms is used to handle form submissions on the website. The contact form on the Contact page is configured to use Netlify Forms.

### Form Configuration

The contact form is configured with the following attributes:

```html
<form
  name="contact"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
>
  <input type="hidden" name="form-name" value="contact" />
  <div className="hidden">
    <label>
      Don't fill this out if you're human: <input name="bot-field" />
    </label>
  </div>
  <!-- Form fields -->
</form>
```

### Form Handling

When a user submits the form, the following happens:

1. The form data is submitted to Netlify
2. Netlify processes the form submission
3. Netlify sends a notification email to the site owner
4. The user is redirected to a thank-you page

## Netlify Functions

Netlify Functions is used to create serverless functions for the website. These functions are used for tasks that require server-side processing, such as sending emails or interacting with APIs.

### Function Configuration

Netlify Functions are configured in the `netlify.toml` file:

```toml
[functions]
  directory = "netlify/functions"
```

### Example Function

Here's an example of a Netlify Function for sending emails:

```javascript
// netlify/functions/send-email.js

const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_EMAIL,
      subject: 'New Contact Form Submission',
      text: message,
      html: `<p>${message}</p>`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
```

## Netlify Redirects

Netlify Redirects is used to configure redirects for the website. These redirects are defined in the `netlify.toml` file:

```toml
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = false
```

## Netlify Headers

Netlify Headers is used to configure HTTP headers for the website. These headers are defined in the `netlify.toml` file:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; img-src 'self' https://images.unsplash.com data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https://api.unsplash.com; font-src 'self'; frame-src 'self'; object-src 'none'"
```

## Troubleshooting

### Common Issues

1. **Port Conflicts**: If you encounter port conflicts when running Netlify Dev, you can specify a different port:

```bash
netlify dev --port 9000
```

2. **Build Failures**: If the build fails on Netlify, check the build logs for errors. Common issues include:

   - Missing dependencies
   - Environment variables not set
   - Build command errors

3. **Form Submission Errors**: If form submissions are not working, check the following:

   - The form has the `data-netlify="true"` attribute
   - The form has a hidden input with `name="form-name"` and the correct value
   - The form fields have the correct `name` attributes

## Related Documentation

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/overview/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Netlify Forms](https://docs.netlify.com/forms/setup/)
- [Netlify Redirects](https://docs.netlify.com/routing/redirects/)
- [Netlify Headers](https://docs.netlify.com/routing/headers/)
