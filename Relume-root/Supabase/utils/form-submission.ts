import { validateLeadForm } from './forms';
import { logError } from './logging';

/**
 * Form Submission Utilities
 * 
 * This file contains utilities for submitting forms to the API.
 * It provides functions for submitting lead forms and handling form submission errors.
 */

/**
 * Submit a lead form to the API
 * 
 * @param formData - The form data to submit
 * @returns The response data if successful
 * @throws Error if validation fails or submission fails
 */
export async function submitLeadForm(formData: {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  message?: string;
  services?: string[];
}) {
  // Validate form data
  const { isValid, errors } = validateLeadForm(formData);
  
  if (!isValid) {
    throw new Error(
      `Form validation failed: ${Object.values(errors).join(', ')}`
    );
  }
  
  try {
    // Submit form data to API
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    // Handle API errors
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to submit form');
    }
    
    // Return response data
    return response.json();
  } catch (error) {
    // Log error
    logError('Lead form submission failed', { error, formData });
    
    // Re-throw error
    throw error;
  }
}

/**
 * Handle form submission errors
 * 
 * @param error - The error to handle
 * @returns An object with error message and field errors
 */
export function handleFormSubmissionError(error: any): {
  message: string;
  fieldErrors?: Record<string, string>;
} {
  // Log error
  console.error('Form submission error:', error);
  
  // Extract error message
  const message = error.message || 'An error occurred while submitting the form';
  
  // Extract field errors if available
  const fieldErrors = error.fieldErrors || {};
  
  return {
    message,
    fieldErrors,
  };
}
