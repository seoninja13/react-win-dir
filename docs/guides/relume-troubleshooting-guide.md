# Relume Troubleshooting Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Installation Issues](#installation-issues)
3. [Tailwind CSS Issues](#tailwind-css-issues)
4. [Component Rendering Issues](#component-rendering-issues)
5. [Next.js App Router Issues](#nextjs-app-router-issues)
6. [TypeScript Issues](#typescript-issues)
7. [Performance Issues](#performance-issues)
8. [Compatibility Issues](#compatibility-issues)
9. [Common Error Messages](#common-error-messages)
10. [Resources](#resources)

## Introduction

This guide provides solutions to common issues encountered when working with the Relume UI library in the Windows Doors CA project. It covers installation problems, Tailwind CSS configuration issues, component rendering problems, and more.

## Installation Issues

### Issue: Package Installation Fails

**Symptoms:**
- npm or yarn install command fails with errors
- Dependency conflicts

**Solutions:**

1. **Clear npm cache and retry:**
   ```bash
   npm cache clean --force
   npm install @relume_io/relume-ui @relume_io/relume-tailwind
   ```

2. **Check for version conflicts:**
   Ensure your package.json has compatible versions of React, Next.js, and Tailwind CSS:
   ```json
   {
     "dependencies": {
       "react": "^18.2.0",
       "next": "^15.3.1",
       "tailwindcss": "^3.3.0",
       "@relume_io/relume-ui": "latest",
       "@relume_io/relume-tailwind": "latest"
     }
   }
   ```

3. **Install peer dependencies:**
   ```bash
   npm install framer-motion react-icons tailwindcss-animate @tailwindcss/typography
   ```

### Issue: Missing Dependencies

**Symptoms:**
- Runtime errors about missing modules
- Components fail to render with dependency errors

**Solution:**
Install all required peer dependencies:
```bash
npm install framer-motion react-icons tailwindcss-animate @tailwindcss/typography
```

## Tailwind CSS Issues

### Issue: Cannot read properties of undefined (reading '__isOptionsFunction')

**Symptoms:**
- CSS fails to load
- Error in webpack build about '__isOptionsFunction'
- Tailwind classes not applying

**Solutions:**

1. **Use correct PostCSS configuration:**
   ```javascript
   // postcss.config.js
   module.exports = {
     plugins: {
       'postcss-import': {},
       'tailwindcss/nesting': {},
       tailwindcss: {},
       autoprefixer: {},
     },
   };
   ```

2. **Ensure compatible Next.js version:**
   ```json
   {
     "dependencies": {
       "next": "13.4.19",
       "eslint-config-next": "13.4.19"
     }
   }
   ```

3. **Use correct CSS imports:**
   ```css
   /* styles/globals.css */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Configure Tailwind properly:**
   ```javascript
   // tailwind.config.js
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

5. **Set up _app.js correctly:**
   ```javascript
   // pages/_app.js
   import '../styles/globals.css';

   export default function MyApp({ Component, pageProps }) {
     return <Component {...pageProps} />;
   }
   ```

6. **Install required dependencies:**
   ```bash
   npm install postcss-import @tailwindcss/nesting --save-dev
   ```

### Issue: Styles Not Applied to Relume Components

**Symptoms:**
- Relume components appear unstyled
- Missing colors, spacing, or other design elements

**Solutions:**

1. **Check Tailwind configuration:**
   Ensure your `tailwind.config.ts` includes the Relume preset and content paths:
   ```typescript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
       "./src/**/*.{js,ts,jsx,tsx,mdx}",
       "./app/**/*.{js,ts,jsx,tsx,mdx}",
       "./Relume-root/**/*.{js,ts,jsx,tsx,mdx}",
     ],
     presets: [require("@relume_io/relume-tailwind")],
     // ... rest of your configuration
   };
   ```

2. **Check PostCSS configuration:**
   Ensure your `postcss.config.js` includes the necessary plugins:
   ```javascript
   module.exports = {
     plugins: {
       'postcss-import': {},
       tailwindcss: {},
       autoprefixer: {},
     },
   };
   ```

3. **Check CSS imports:**
   Ensure your global CSS file includes Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Rebuild Tailwind:**
   Try rebuilding your Tailwind CSS:
   ```bash
   npx tailwindcss -i ./src/app/globals.css -o ./src/app/output.css
   ```

### Issue: Conflicting Styles

**Symptoms:**
- Components look different than expected
- Custom styles override Relume styles or vice versa

**Solutions:**

1. **Use the `!important` modifier:**
   ```jsx
   <div className="!text-red-500">This text will be red</div>
   ```

2. **Check style order:**
   Ensure your custom styles are loaded after Tailwind styles.

3. **Use more specific selectors:**
   ```css
   .my-component .button {
     /* More specific styles */
   }
   ```

## Component Rendering Issues

### Issue: Components Not Rendering

**Symptoms:**
- Blank spaces where components should be
- React errors in console

**Solutions:**

1. **Add 'use client' directive:**
   Ensure client components have the 'use client' directive:
   ```jsx
   'use client';
   
   import { Button } from '@relume_io/relume-ui';
   
   export default function MyComponent() {
     return <Button>Click Me</Button>;
   }
   ```

2. **Check import paths:**
   Ensure you're importing from the correct path:
   ```jsx
   // Correct
   import { Button } from '@relume_io/relume-ui';
   
   // Incorrect
   import Button from '@relume_io/relume-ui/Button';
   ```

3. **Check for missing props:**
   Some components require specific props to render correctly.

### Issue: Incorrect Component Styling

**Symptoms:**
- Components render but look different than expected
- Missing styles or incorrect colors

**Solutions:**

1. **Check theme customization:**
   Ensure your theme customizations don't override essential Relume styles.

2. **Use component variants correctly:**
   ```jsx
   // Correct
   <Button variant="primary">Click Me</Button>
   
   // Incorrect or missing variant
   <Button>Click Me</Button>
   ```

3. **Check for conflicting class names:**
   ```jsx
   // Potential conflict
   <Button className="bg-red-500">Click Me</Button>
   ```

## Next.js App Router Issues

### Issue: Client Component Errors

**Symptoms:**
- "Error: Event handlers cannot be passed to Client Component props"
- "Error: Functions cannot be passed directly to Client Components"

**Solutions:**

1. **Use 'use client' directive:**
   ```jsx
   'use client';
   
   import { Button } from '@relume_io/relume-ui';
   
   export default function ClientComponent() {
     const handleClick = () => {
       console.log('Button clicked');
     };
     
     return <Button onClick={handleClick}>Click Me</Button>;
   }
   ```

2. **Create wrapper components:**
   ```jsx
   // ClientButton.jsx
   'use client';
   
   import { Button } from '@relume_io/relume-ui';
   
   export default function ClientButton({ onClick, children, ...props }) {
     return <Button onClick={onClick} {...props}>{children}</Button>;
   }
   
   // ServerComponent.jsx (server component)
   import ClientButton from './ClientButton';
   
   export default function ServerComponent() {
     return (
       <div>
         <ClientButton onClick={() => console.log('Clicked')}>Click Me</ClientButton>
       </div>
     );
   }
   ```

### Issue: Hydration Errors

**Symptoms:**
- "Text content does not match server-rendered HTML"
- "Hydration failed because the initial UI does not match what was rendered on the server"

**Solutions:**

1. **Ensure consistent rendering:**
   Make sure your components render the same content on the server and client.

2. **Use dynamic imports:**
   ```jsx
   import dynamic from 'next/dynamic';
   
   const DynamicComponent = dynamic(() => import('./ClientComponent'), {
     ssr: false,
   });
   ```

3. **Use useEffect for client-side-only code:**
   ```jsx
   'use client';
   
   import { useEffect, useState } from 'react';
   import { Button } from '@relume_io/relume-ui';
   
   export default function MyComponent() {
     const [mounted, setMounted] = useState(false);
     
     useEffect(() => {
       setMounted(true);
     }, []);
     
     if (!mounted) return null;
     
     return <Button>Client-side only</Button>;
   }
   ```

## TypeScript Issues

### Issue: Type Errors with Relume Components

**Symptoms:**
- TypeScript errors about missing types
- "Property does not exist on type" errors

**Solutions:**

1. **Check TypeScript version:**
   Ensure you're using a compatible TypeScript version (4.5+).

2. **Add type declarations:**
   If necessary, create a `types.d.ts` file:
   ```typescript
   declare module '@relume_io/relume-ui' {
     // Add missing type declarations here
   }
   ```

3. **Use correct prop types:**
   ```typescript
   import { Button, ButtonProps } from '@relume_io/relume-ui';
   
   interface MyButtonProps extends ButtonProps {
     customProp?: string;
   }
   
   export default function MyButton({ customProp, ...props }: MyButtonProps) {
     return <Button {...props}>{customProp}</Button>;
   }
   ```

## Performance Issues

### Issue: Slow Initial Load

**Symptoms:**
- Long loading times on initial page load
- High bundle size

**Solutions:**

1. **Use dynamic imports:**
   ```jsx
   import dynamic from 'next/dynamic';
   
   const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <p>Loading...</p>,
   });
   ```

2. **Optimize images:**
   Use Next.js Image component for optimized images.

3. **Implement code splitting:**
   Split your code into smaller chunks that can be loaded on demand.

### Issue: Slow Component Rendering

**Symptoms:**
- UI feels sluggish
- Animations are choppy

**Solutions:**

1. **Memoize components:**
   ```jsx
   import { memo } from 'react';
   import { Button } from '@relume_io/relume-ui';
   
   const MemoizedButton = memo(Button);
   ```

2. **Use React.lazy for code splitting:**
   ```jsx
   const LazyComponent = React.lazy(() => import('./HeavyComponent'));
   ```

3. **Optimize re-renders:**
   Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders.

## Compatibility Issues

### Issue: Conflicts with Other Libraries

**Symptoms:**
- Unexpected behavior when using Relume with other UI libraries
- Style conflicts

**Solutions:**

1. **Isolate components:**
   Use different components in different parts of your application.

2. **Use CSS modules:**
   Scope your styles to avoid conflicts.

3. **Override conflicting styles:**
   Use more specific selectors or the `!important` modifier.

## Common Error Messages

### "Cannot find module '@relume_io/relume-ui'"

**Solution:**
```bash
npm install @relume_io/relume-ui @relume_io/relume-tailwind
```

### "Error: Cannot find module 'framer-motion'"

**Solution:**
```bash
npm install framer-motion
```

### "Error: Cannot find module 'tailwindcss-animate'"

**Solution:**
```bash
npm install tailwindcss-animate
```

### "Warning: Function components cannot be given refs"

**Solution:**
Use the `forwardRef` function:
```jsx
import { forwardRef } from 'react';
import { Button } from '@relume_io/relume-ui';

const ForwardedButton = forwardRef((props, ref) => (
  <Button ref={ref} {...props} />
));
```

## Resources

- [Official Relume React Documentation](https://react-docs.relume.io/)
- [Relume UI Integration Guide](./relume-ui-integration-guide.md)
- [Relume Component Usage Guide](./relume-component-usage-guide.md)
- [Relume Tailwind Configuration Guide](./relume-tailwind-configuration-guide.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

Last Updated: May 10, 2025
