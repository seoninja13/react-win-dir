/**
 * Form Validation Utilities
 * 
 * This file contains utilities for validating form inputs.
 * It provides functions for validating common form fields like email, phone, zip code, etc.
 */

/**
 * Validate an email address
 * 
 * @param email - The email address to validate
 * @returns Whether the email is valid
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate a phone number
 * 
 * @param phone - The phone number to validate
 * @returns Whether the phone number is valid
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
}

/**
 * Validate a ZIP code
 * 
 * @param zip - The ZIP code to validate
 * @returns Whether the ZIP code is valid
 */
export function validateZip(zip: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zip);
}

/**
 * Validate a name (first or last)
 * 
 * @param name - The name to validate
 * @returns Whether the name is valid
 */
export function validateName(name: string): boolean {
  return name.trim().length >= 2;
}

/**
 * Validate a message
 * 
 * @param message - The message to validate
 * @returns Whether the message is valid
 */
export function validateMessage(message: string): boolean {
  return message.trim().length >= 10;
}

/**
 * Validate a lead form
 * 
 * @param formData - The form data to validate
 * @returns An object with isValid and errors properties
 */
export function validateLeadForm(formData: {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  zip?: string;
  message?: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  if (!validateName(formData.first_name)) {
    errors.first_name = 'First name is required and must be at least 2 characters';
  }
  
  if (!validateName(formData.last_name)) {
    errors.last_name = 'Last name is required and must be at least 2 characters';
  }
  
  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  if (formData.zip && !validateZip(formData.zip)) {
    errors.zip = 'Please enter a valid ZIP code';
  }
  
  if (formData.message && !validateMessage(formData.message)) {
    errors.message = 'Message must be at least 10 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
