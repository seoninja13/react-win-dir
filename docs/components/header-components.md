# Header Components

This document provides documentation for the header components used in the Windows Doors CA website.

## Table of Contents

1. [Header47](#header47)
2. [Header15](#header15)

## Header47

### Purpose

A header component with a tagline, heading, description, and buttons in a centered layout.

### Props

- `tagline`: string - The tagline displayed above the heading
- `heading`: string - The main heading
- `description`: string - The description text
- `buttons`: Array<ButtonProps> - An array of button objects with the following properties:
  - `title`: string - The button text
  - `variant`: string - 'primary' | 'secondary' (default: 'primary')
  - `size`: string - 'sm' | 'md' | 'lg' (default: 'md')
  - `iconRight`: ReactNode - Icon to display on the right side of the button
  - `iconLeft`: ReactNode - Icon to display on the left side of the button

### Default Props

```javascript
const defaultProps = {
  tagline: "Quality",
  heading: "Windows & Doors",
  description: "Transform your home with our premium replacement windows and doors. Experience energy efficiency and style, all backed by a lifetime warranty.",
  buttons: [
    { title: "Estimate", variant: "primary" },
    { title: "Call", variant: "secondary" },
  ],
};
```

### Usage Example

```jsx
<Header47 
  tagline="Quality"
  heading="Windows & Doors"
  description="Transform your home with our premium replacement windows and doors. Experience energy efficiency and style, all backed by a lifetime warranty."
  buttons={[
    { title: "Estimate", variant: "primary" },
    { title: "Call", variant: "secondary" },
  ]}
/>
```

### Dependencies

- @relume_io/relume-ui: Button component

### Source

- Original component: @Relume-DO-NOT-EDIT/www.windowworldla.com/home/components/Header47.jsx

## Header15

### Purpose

A header component with a title and description in a two-column layout, followed by a full-width image.

### Props

- `heading`: string - The main heading
- `description`: string - The description text
- `buttons`: Array<ButtonProps> - An array of button objects with the following properties:
  - `title`: string - The button text
  - `variant`: string - 'primary' | 'secondary' (default: 'primary')
  - `size`: string - 'sm' | 'md' | 'lg' (default: 'md')
  - `iconRight`: ReactNode - Icon to display on the right side of the button
  - `iconLeft`: ReactNode - Icon to display on the left side of the button
- `image`: ImageProps - An object with the following properties:
  - `src`: string - The image source URL
  - `alt`: string - The image alt text

### Default Props

```javascript
const defaultProps = {
  heading: "Premium Replacement Windows & Doors for Your Home",
  description: "Transform your living space with our energy-efficient windows and doors. Experience quality craftsmanship and exceptional service that you can trust.",
  buttons: [
    { title: "Get a Free Estimate", variant: "primary" },
    { title: "Explore", variant: "secondary" },
  ],
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
    alt: "Relume placeholder image",
  },
};
```

### Usage Example

```jsx
<Header15 
  heading="Premium Replacement Windows & Doors for Your Home"
  description="Transform your living space with our energy-efficient windows and doors. Experience quality craftsmanship and exceptional service that you can trust."
  buttons={[
    { title: "Get a Free Estimate", variant: "primary" },
    { title: "Explore", variant: "secondary" },
  ]}
  image={{
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
    alt: "Relume placeholder image",
  }}
/>
```

### Dependencies

- @relume_io/relume-ui: Button component

### Source

- Original component: @Relume-DO-NOT-EDIT/www.windowworldla.com/home/components/Header15.jsx

## Implementation Notes

Both Header47 and Header15 components have been updated to use JavaScript JSDoc syntax instead of TypeScript. The components follow the Relume Section component pattern, which includes:

1. Proper JSDoc type annotations
2. Default props
3. Props destructuring with defaults
4. Component implementation using the props

The components are used in the Home page component (Relume-root/pages-components/home/index.jsx) with explicit props.

## Last Updated

2023-11-16
