# Tailwind Components Technical Details

> **Breadcrumb Navigation**: [README.md](../../README.md) > [Documentation](../index.md) > [Guides](./index.md) > Tailwind Components

## Overview

This document provides technical details about the implementation of custom Tailwind components to replace Ant Design components in the Water Damage CA project.

## Form Component

### Form Context

```typescript
// Form context
interface FormContextType {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setFieldValue: (name: string, value: any) => void;
  setFieldError: (name: string, error: string) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  validateField: (name: string) => boolean;
  validateForm: () => boolean;
  resetForm: () => void;
  resetFields?: () => void; // Alias for resetForm for compatibility
  validateFields?: () => boolean; // Alias for validateForm for compatibility
  setFieldsValue?: (values: Record<string, any>) => void; // For compatibility
}
```

### Form Component Implementation

```typescript
/**
 * Form component that replaces Ant Design's Form
 */
const FormComponent: React.FC<FormProps> = React.forwardRef((
  {
  initialValues = {},
  onFinish,
  onFinishFailed,
  layout = 'horizontal',
  className = '',
  children,
  form: externalForm,
}, ref) => {
  // Form state
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Set field value
  const setFieldValue = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Set field error
  const setFieldError = (name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Set field touched
  const setFieldTouched = (name: string, isTouched: boolean) => {
    setTouched((prev) => ({ ...prev, [name]: isTouched }));
  };

  // Validate field
  const validateField = (name: string): boolean => {
    // Get the field component
    const field = React.Children.toArray(children).find((child) => {
      if (React.isValidElement(child) && child.type === FormItem) {
        return child.props.name === name;
      }
      return false;
    }) as React.ReactElement | undefined;

    if (!field) {
      return true;
    }

    // Get the field rules
    const rules = field.props.rules || [];

    // Get the field value
    const value = values[name];

    // Check if the field is required
    const requiredRule = rules.find((rule: any) => rule.required);
    if (requiredRule && (!value || (typeof value === 'string' && value.trim() === ''))) {
      setFieldError(name, requiredRule.message || 'This field is required');
      return false;
    }

    // Check if the field matches the pattern
    const patternRule = rules.find((rule: any) => rule.pattern);
    if (patternRule && value && !patternRule.pattern.test(value)) {
      setFieldError(name, patternRule.message || 'Invalid format');
      return false;
    }

    // Clear error if field is valid
    setFieldError(name, '');
    return true;
  };

  // Validate form
  const validateForm = (): boolean => {
    // Get all field names
    const fieldNames = React.Children.toArray(children)
      .filter((child) => React.isValidElement(child) && child.type === FormItem)
      .map((child) => (child as React.ReactElement).props.name)
      .filter(Boolean);

    // Validate all fields
    const isValid = fieldNames.every((name) => validateField(name));

    return isValid;
  };

  // Reset form
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const isValid = validateForm();

    if (isValid) {
      onFinish?.(values);
    } else {
      onFinishFailed?.({ values, errors });
    }
  };

  // Form context value
  const formContextValue: FormContextType = {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    validateField,
    validateForm,
    resetFields: resetForm, // Alias for compatibility
    resetForm,
  };

  // Expose methods via ref
  React.useImperativeHandle(ref, () => ({
    ...formContextValue,
    validateFields: validateForm,
    setFieldsValue: (values: Record<string, any>) => {
      Object.entries(values).forEach(([name, value]) => {
        setFieldValue(name, value);
      });
    },
  }));

  // Layout classes
  const layoutClasses = {
    horizontal: '',
    vertical: 'flex flex-col space-y-4',
    inline: 'flex items-center space-x-4',
  };

  // Use external form if provided
  const contextValue = externalForm || formContextValue;

  return (
    <FormContext.Provider value={contextValue}>
      <form
        onSubmit={handleSubmit}
        className={`${layoutClasses[layout]} ${className}`}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
});
```

### Form.Provider Implementation

```typescript
// Form.Provider component
const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Create a form instance
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  // Set field value
  const setFieldValue = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  
  // Set field error
  const setFieldError = (name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  };
  
  // Set field touched
  const setFieldTouched = (name: string, isTouched: boolean) => {
    setTouched((prev) => ({ ...prev, [name]: isTouched }));
  };
  
  // Validate field (simplified for Provider)
  const validateField = (name: string): boolean => {
    return true;
  };
  
  // Validate form (simplified for Provider)
  const validateForm = (): boolean => {
    return true;
  };
  
  // Reset form
  const resetForm = () => {
    setValues({});
    setErrors({});
    setTouched({});
  };
  
  // Form context value
  const form: FormContextType = {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    validateField,
    validateForm,
    resetForm,
  };
  
  return (
    <FormInstanceContext.Provider value={{ form }}>
      {children}
    </FormInstanceContext.Provider>
  );
};
```

## Input Component

### Input Props Interface

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: 'large' | 'middle' | 'small';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  allowClear?: boolean;
  className?: string;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
```

### Input Component Implementation

```typescript
const Input: React.FC<InputProps> & {
  TextArea: React.FC<TextAreaProps>;
  Search: React.FC<SearchProps>;
} = ({
  size = 'middle',
  prefix,
  suffix,
  addonBefore,
  addonAfter,
  allowClear = false,
  className = '',
  onPressEnter,
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    middle: 'px-3 py-2 text-sm',
    large: 'px-4 py-3 text-base',
  };
  
  // Base classes
  const baseClasses = 'w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500';
  
  // Handle key press for onPressEnter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onPressEnter) {
      onPressEnter(e);
    }
    
    // Call the original onKeyDown if it exists
    if (props.onKeyDown) {
      props.onKeyDown(e);
    }
  };
  
  // Handle clear
  const handleClear = () => {
    const event = {
      target: {
        value: '',
      },
    } as React.ChangeEvent<HTMLInputElement>;
    
    if (props.onChange) {
      props.onChange(event);
    }
  };
  
  // If has addons, wrap in a group
  if (addonBefore || addonAfter) {
    return (
      <div className="flex rounded-md shadow-sm">
        {addonBefore && (
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
            {addonBefore}
          </span>
        )}
        <div className={`relative flex-1 ${!addonBefore ? 'rounded-l-md' : ''} ${!addonAfter ? 'rounded-r-md' : ''}`}>
          <input
            className={`${baseClasses} ${sizeClasses[size]} ${className} ${addonBefore ? 'rounded-l-none' : ''} ${addonAfter ? 'rounded-r-none' : ''}`}
            onKeyDown={handleKeyDown}
            {...props}
          />
          {(prefix || suffix || allowClear) && (
            <div className="absolute inset-y-0 flex items-center">
              {prefix && <div className="absolute left-3">{prefix}</div>}
              {(suffix || allowClear) && (
                <div className="absolute right-3 flex items-center">
                  {allowClear && props.value && (
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={handleClear}
                    >
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  {suffix}
                </div>
              )}
            </div>
          )}
        </div>
        {addonAfter && (
          <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
            {addonAfter}
          </span>
        )}
      </div>
    );
  }
  
  // If has prefix or suffix, wrap in a relative div
  if (prefix || suffix || allowClear) {
    const paddingLeft = prefix ? 'pl-10' : '';
    const paddingRight = (suffix || allowClear) ? 'pr-10' : '';
    
    return (
      <div className="relative">
        <input
          className={`${baseClasses} ${sizeClasses[size]} ${paddingLeft} ${paddingRight} ${className}`}
          onKeyDown={handleKeyDown}
          {...props}
        />
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {prefix}
          </div>
        )}
        {(suffix || allowClear) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {allowClear && props.value && (
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={handleClear}
              >
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            {suffix}
          </div>
        )}
      </div>
    );
  }
  
  // Basic input
  return (
    <input
      className={`${baseClasses} ${sizeClasses[size]} ${className}`}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};
```

## Admin Pages Updates

### Cities Page

```typescript
// Before
const [form] = Form.useForm();

// After
import { useState, useEffect, useRef } from "react";
const formRef = useRef<any>(null);

// Before
const handleAddEdit = (city: City | null = null) => {
  setEditingCity(city);
  form.resetFields();
  if (city) {
    form.setFieldsValue({
      name: city.name,
      state: city.state,
      slug: city.slug,
    });
  }
  setIsModalVisible(true);
};

// After
const handleAddEdit = (city: City | null = null) => {
  setEditingCity(city);
  if (!formRef.current) return;
  
  formRef.current.resetFields();
  if (city) {
    formRef.current.setFieldsValue({
      name: city.name,
      state: city.state,
      slug: city.slug,
    });
  }
  setIsModalVisible(true);
};

// Before
<Form form={form} layout="vertical">

// After
<Form ref={formRef} layout="vertical">
```

### Businesses Page

```typescript
// Before
const [form] = Form.useForm();

// After
import { useState, useEffect, useRef } from "react";
const formRef = useRef<any>(null);

// Before
const handleAddEdit = (business: Business | null = null) => {
  setEditingBusiness(business);
  form.resetFields();
  if (business) {
    form.setFieldsValue({
      name: business.name,
      address: business.address,
      phone: business.phone,
      website: business.website,
      rating: business.rating,
      review_count: business.review_count,
      city_id: business.city_id,
      slug: business.slug,
    });
  }
  setIsModalVisible(true);
};

// After
const handleAddEdit = (business: Business | null = null) => {
  setEditingBusiness(business);
  if (!formRef.current) return;
  
  formRef.current.resetFields();
  if (business) {
    formRef.current.setFieldsValue({
      name: business.name,
      address: business.address,
      phone: business.phone,
      website: business.website,
      rating: business.rating,
      review_count: business.review_count,
      city_id: business.city_id,
      slug: business.slug,
    });
  }
  setIsModalVisible(true);
};
```

## Related Documentation

- [Tailwind CSS Guidelines](./tailwind-css-guidelines.md)
- [Admin Dashboard](../features/admin-dashboard.md)
- [Admin Cities Businesses](../features/admin-cities-businesses.md)
- [Admin Batch Process](../processes/admin-batch-process.md)

Last Updated: April 22, 2025
