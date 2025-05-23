# Relume Tailwind Configuration Guide

## Table of Contents

1. [Getting Started](#getting-started)
2. [CSS Configuration](#css-configuration)
3. [Tailwind Configuration](#tailwind-configuration)
4. [PostCSS Configuration](#postcss-configuration)
5. [Common Issues](#common-issues)

## Getting Started

To set up Tailwind CSS with Relume UI, you need to configure several files correctly:

### Required Files

1. `tailwind.config.js` - Tailwind configuration
2. `postcss.config.js` - PostCSS configuration
3. `styles/globals.css` - Global styles
4. `pages/_app.js` - Next.js app configuration

## CSS Configuration

### 1. Global CSS Setup

Create a `styles/globals.css` file with the following content:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 2. Next.js App Configuration

Create a `pages/_app.js` file to import global styles:

```javascript
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

## Tailwind Configuration

### Core Setup

Create a `tailwind.config.js` file:

```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './home/**/*.{js,ts,jsx,tsx}',
    './node_modules/@relume_io/relume-ui/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    require('@relume_io/relume-tailwind'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};
```

## PostCSS Configuration

### Main Setup

Create a `postcss.config.js` file:

```javascript
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## Common Issues

### Common CSS Issues

If your CSS is not loading, ensure:

First, ensure you have installed all required dependencies:

```bash
npm install postcss-import @tailwindcss/nesting --save-dev
```

Next, verify your Next.js version is compatible:

```json
{
  "dependencies": {
    "next": "13.4.19",
    "eslint-config-next": "13.4.19"
  }
}
```

Finally, check your project structure matches:

```text
├── pages/
│   ├── _app.js
│   └── index.js
├── styles/
│   └── globals.css
├── postcss.config.js
└── tailwind.config.js
```

## Configuration Steps

The basic Tailwind CSS configuration for Relume UI involves:

1. Installing the necessary packages
2. Setting up the Tailwind configuration file
3. Configuring PostCSS
4. Importing Tailwind directives in your CSS

### Installation

First, install the required packages:

```bash
npm install tailwindcss postcss autoprefixer postcss-import @tailwindcss/typography tailwindcss-animate
```

## Relume Tailwind Preset

The Relume Tailwind preset (`@relume_io/relume-tailwind`) provides a pre-configured Tailwind setup that matches the Relume design system. This preset includes:

- Color palette
- Typography scale
- Spacing scale
- Border radius values
- Shadow definitions
- And other design tokens

### Using the Preset

To use the Relume Tailwind preset, add it to the `presets` array in your `tailwind.config.ts` file:

```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@relume_io/relume-tailwind")],
  // ... rest of your configuration
};
```

### What the Preset Includes

The Relume Tailwind preset includes the following configurations:

- **Colors**: A comprehensive color palette including brand colors, neutral colors, and system colors
- **Typography**: Font sizes, line heights, and font weights
- **Spacing**: A consistent spacing scale
- **Shadows**: Pre-defined shadow values
- **Screens**: Breakpoint definitions for responsive design
- **Container**: Container width configurations

## Theme Customization

While the Relume Tailwind preset provides a solid foundation, you may need to customize the theme to match your specific design requirements.

### Extending the Theme

To extend the theme without overriding the preset, use the `extend` property:

```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    extend: {
      colors: {
        // Add custom colors or override existing ones
        primary: {
          DEFAULT: '#004b8d',
          50: '#e6f0f9',
          100: '#cce1f3',
          200: '#99c3e7',
          300: '#66a5db',
          400: '#3387cf',
          500: '#0069c3',
          600: '#004b8d',
          700: '#003d73',
          800: '#002e59',
          900: '#001f3f',
        },
      },
      // Add other customizations
    },
  },
};
```

### Overriding the Theme

If you need to completely override parts of the theme, define them directly in the `theme` object:

```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    // This will override the preset's screens configuration
    screens: {
      sm: "480px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      xxl: "1440px",
    },
    // Other overrides
    extend: {
      // Extensions
    },
  },
};
```

## Content Configuration

The `content` property in your Tailwind configuration specifies which files Tailwind should scan for class names. For Relume UI, you need to include both your project files and the Relume UI component files:

```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Relume UI components
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
    // Your project files
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Website pages directory
    "./website-pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // ... rest of your configuration
};
```

## Plugin Configuration

Relume UI requires several Tailwind plugins to function correctly:

### Required Plugins

```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ... rest of your configuration
  plugins: [
    // For animations
    require("tailwindcss-animate"),
    // For rich text content
    require("@tailwindcss/typography"),
    // Custom components
    ({ addComponents }) => {
      const newComponents = {
        ".animate-disable": {
          animationName: "none",
          animationDuration: "0s",
          "--tw-enter-opacity": "initial",
          "--tw-enter-scale": "initial",
          "--tw-enter-rotate": "initial",
          "--tw-enter-translate-x": "initial",
          "--tw-enter-translate-y": "initial",
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          scrollbarWidth: "none",
        },
      };
      addComponents(newComponents);
    },
  ],
};
```

## PostCSS Configuration

Relume UI requires a specific PostCSS configuration to work correctly. Create a `postcss.config.js` file in your project root with the following content:

```javascript
module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

The `postcss-import` plugin is particularly important as it allows importing CSS files in your PostCSS files.

## Handling Conflicts

When using Relume UI with other UI libraries or custom styles, you may encounter conflicts. Here are some strategies for handling these conflicts:

### 1. Layer Priority

Tailwind CSS uses a layering system with three layers: `base`, `components`, and `utilities`. You can control the order of these layers in your CSS:

```css
@tailwind base;
/* Custom base styles */
@tailwind components;
/* Custom component styles */
@tailwind utilities;
/* Custom utility styles */
```

### 2. Important Modifier

You can use the `!important` modifier to override conflicting styles:

```jsx
<div className="!text-red-500">This text will be red</div>
```

### 3. CSS Modules

If you're using CSS Modules, you can scope your styles to avoid conflicts:

```css
/* Button.module.css */
.button {
  @apply bg-blue-500 text-white;
}
```

```jsx
import styles from './Button.module.css';

<button className={styles.button}>Click Me</button>
```

## Best Practices

1. **Keep the Preset**: Always include the Relume Tailwind preset to ensure consistency with the Relume design system.
2. **Extend, Don't Override**: Whenever possible, extend the theme rather than overriding it to maintain compatibility with Relume components.
3. **Use the Right Content Paths**: Ensure your content configuration includes all necessary paths, especially the Relume UI components.
4. **Include Required Plugins**: Always include the required plugins for Relume UI.
5. **Test Thoroughly**: Test your configuration with various Relume components to ensure they render correctly.

## Resources

- [Official Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Relume React Documentation](https://react-docs.relume.io/)
- [Relume UI Integration Guide](./relume-ui-integration-guide.md)
- [Relume Component Usage Guide](./relume-component-usage-guide.md)

Last Updated: May 10, 2025
