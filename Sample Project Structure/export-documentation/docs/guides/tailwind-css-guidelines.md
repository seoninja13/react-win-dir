# Tailwind CSS Guidelines

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Guides](./index.md) > Tailwind CSS Guidelines

## Overview

This document outlines the guidelines for using Tailwind CSS in the Water Damage CA project. Tailwind CSS is our primary styling solution, chosen for its utility-first approach that allows for rapid UI development without the need for additional UI frameworks.

## Setup

Tailwind CSS is already configured in the project with the following files:

- `tailwind.config.js` - Configuration file for Tailwind CSS
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS
- `app/globals.css` - Global CSS file with Tailwind directives

## Core Principles

1. **Utility-First Approach**
   - Use Tailwind's utility classes directly in your JSX/TSX
   - Avoid writing custom CSS when possible
   - Leverage Tailwind's responsive utilities for different screen sizes

2. **Consistency**
   - Use the project's color palette defined in `tailwind.config.js`
   - Maintain consistent spacing using Tailwind's spacing scale
   - Follow the established component patterns

3. **Minimalism**
   - Avoid using additional UI frameworks (like Ant Design)
   - Use native HTML elements styled with Tailwind when possible
   - Keep the tech stack lean to reduce bundle size and complexity

## Color Palette

The project uses a custom color palette defined in `tailwind.config.js`:

```js
colors: {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  secondary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#042f2e',
  },
}
```

Use these color classes consistently throughout the application:
- `text-primary-600` for primary text color
- `bg-primary-500` for primary button backgrounds
- `border-secondary-300` for subtle borders

## Common UI Patterns

### Buttons

```jsx
// Primary button
<button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
  Primary Button
</button>

// Secondary button
<button className="px-4 py-2 bg-white text-primary-600 border border-primary-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
  Secondary Button
</button>
```

### Cards

```jsx
<div className="bg-white rounded-lg shadow p-6">
  <h2 className="text-xl font-semibold mb-4">Card Title</h2>
  <p className="text-gray-600">Card content goes here</p>
</div>
```

### Form Inputs

```jsx
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Input Label
  </label>
  <input
    type="text"
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
  />
</div>
```

### Tables

```jsx
<table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Name
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Status
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        Example Name
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        Active
      </td>
    </tr>
  </tbody>
</table>
```

### Alerts

```jsx
// Success alert
<div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
  <div className="flex">
    <div className="flex-shrink-0">
      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    </div>
    <div className="ml-3">
      <p className="text-sm text-green-700">
        Success message goes here
      </p>
    </div>
  </div>
</div>

// Error alert
<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
  <div className="flex">
    <div className="flex-shrink-0">
      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    </div>
    <div className="ml-3">
      <p className="text-sm text-red-700">
        Error message goes here
      </p>
    </div>
  </div>
</div>
```

## Responsive Design

Use Tailwind's responsive prefixes to create responsive layouts:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Content */}
</div>
```

Common breakpoints:
- `sm:` - Small screens (640px and up)
- `md:` - Medium screens (768px and up)
- `lg:` - Large screens (1024px and up)
- `xl:` - Extra large screens (1280px and up)
- `2xl:` - 2X large screens (1536px and up)

## Custom Tailwind Components

We have created custom Tailwind-based components to replace Ant Design components. These components are located in the `components/ui` directory.

### Available Components

- **Form**: A form component with validation and form state management
- **Input**: An input component with support for prefixes, suffixes, and addons
- **Button**: A button component with various styles and sizes
- **Table**: A table component with sorting and pagination
- **Modal**: A modal dialog component
- **Select**: A select dropdown component
- **Tag**: A tag component for displaying labels
- **Toast**: A toast notification system

### Using Custom Components

```jsx
import { Form, Input, Button, Table, Modal, Select, Tag } from '@/components/ui';

// Form with validation
const MyForm = () => {
  const formRef = useRef(null);

  const handleSubmit = () => {
    formRef.current.validateFields().then(values => {
      console.log('Form values:', values);
    });
  };

  return (
    <Form ref={formRef} layout="vertical">
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: 'Please enter username' }]}
      >
        <Input
          prefix={<UserIcon />}
          placeholder="Enter username"
          onPressEnter={() => handleSubmit()}
        />
      </Form.Item>

      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};
```

## Migrating from Ant Design

When replacing Ant Design components, use our custom Tailwind-based components or these Tailwind-based alternatives:

### Ant Design Button → Tailwind Button

```jsx
// Ant Design
<Button type="primary">Submit</Button>

// Tailwind CSS
<button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
  Submit
</button>
```

### Ant Design Table → Tailwind Table

```jsx
// Ant Design
<Table columns={columns} dataSource={data} />

// Tailwind CSS
<table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    {/* Table headers */}
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {/* Table rows */}
  </tbody>
</table>
```

### Ant Design Form → Tailwind Form

```jsx
// Ant Design
<Form.Item label="Username" name="username">
  <Input />
</Form.Item>

// Tailwind CSS
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Username
  </label>
  <input
    type="text"
    name="username"
    className="w-full px-3 py-2 border border-gray-300 rounded-md"
  />
</div>
```

## Best Practices

1. **Group related utilities**
   - Keep related utilities together (e.g., all padding utilities, then all margin utilities)
   - Use consistent ordering of utilities across components

2. **Extract components for reusability**
   - If you find yourself repeating the same set of utilities, consider creating a component

3. **Use meaningful class names**
   - When extracting components, use class names that describe the component's purpose

4. **Avoid excessive nesting**
   - Keep your HTML structure as flat as possible
   - Use grid and flexbox for layout instead of deep nesting

5. **Optimize for readability**
   - Break long class strings into multiple lines for readability
   - Use comments to explain complex utility combinations

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Tailwind UI Components](https://tailwindui.com/) (for inspiration)

## Related Documentation

- [Tailwind Components](./tailwind-components.md)
- [Admin Dashboard](../features/admin-dashboard.md)
- [Admin Cities Businesses](../features/admin-cities-businesses.md)
- [Admin Batch Process](../processes/admin-batch-process.md)

Last Updated: April 22, 2025
