# Root Layout

This document provides detailed documentation for the root layout component in the Window World LA website.

## Overview

The root layout component (`src/app/layout.tsx`) is a crucial part of the Next.js App Router architecture. It defines the overall layout structure that wraps all pages in the application, including HTML document structure, metadata, and global styles.

## Component Structure

The root layout component is structured as follows:

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Window World - Windows, Doors & Siding in Los Angeles",
  description: "Window World of Los Angeles is the go-to choice for quality replacement windows, doors, siding and roofing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

## Features

### 1. Font Configuration

The root layout configures two fonts from Google Fonts:

1. **Geist Sans**: A sans-serif font used for general text
2. **Geist Mono**: A monospace font used for code and technical content

These fonts are loaded using Next.js's built-in font optimization and are made available as CSS variables:

```tsx
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
```

### 2. Metadata

The root layout defines metadata for the website, including the title and description:

```tsx
export const metadata: Metadata = {
  title: "Window World - Windows, Doors & Siding in Los Angeles",
  description: "Window World of Los Angeles is the go-to choice for quality replacement windows, doors, siding and roofing.",
};
```

This metadata is used by search engines and social media platforms when indexing or sharing the website.

### 3. Global Styles

The root layout imports global styles from two CSS files:

```tsx
import "./globals.css";
import "./styles.css";
```

These files contain global styles that apply to the entire website, including:

- CSS reset
- Base styles
- Utility classes
- Theme variables

### 4. HTML Structure

The root layout defines the basic HTML structure for all pages:

```tsx
return (
  <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {children}
    </body>
  </html>
);
```

This structure includes:

- The `<html>` element with the language set to English
- The `<body>` element with font variables and antialiasing applied
- The `{children}` placeholder where page content will be rendered

## Global CSS

The global CSS files imported by the root layout define the following:

### globals.css

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
```

### styles.css

This file contains additional styles specific to the Window World LA website.

## Usage

The root layout is automatically applied to all pages in the application. It does not need to be imported or referenced in individual pages.

## Customization

### Adding Meta Tags

To add additional meta tags to the website, modify the `metadata` object in the root layout:

```tsx
export const metadata: Metadata = {
  title: "Window World - Windows, Doors & Siding in Los Angeles",
  description: "Window World of Los Angeles is the go-to choice for quality replacement windows, doors, siding and roofing.",
  keywords: "windows, doors, siding, roofing, Los Angeles, replacement windows",
  openGraph: {
    title: "Window World - Windows, Doors & Siding in Los Angeles",
    description: "Window World of Los Angeles is the go-to choice for quality replacement windows, doors, siding and roofing.",
    images: [
      {
        url: "https://www.windowworldla.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Window World LA",
      },
    ],
  },
};
```

### Adding Global Scripts

To add global scripts to the website, modify the root layout to include script tags:

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

### Adding Global Components

To add global components that should appear on all pages, modify the root layout to include those components:

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

## Related Documentation

- [Page Structure](./page-structure.md)
- [Component Structure](./component-structure.md)
- [API Routes](./api-routes.md)
