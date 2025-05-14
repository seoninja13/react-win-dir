/**
 * Validate an email address
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate a phone number
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
}

/**
 * Validate a ZIP code
 */
export function validateZip(zip: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zip);
}

/**
 * Validate a name (first or last)
 */
export function validateName(name: string): boolean {
  return name.trim().length >= 2;
}

/**
 * Validate a message
 */
export function validateMessage(message: string): boolean {
  return message.trim().length >= 10;
}

/**
 * Validate a lead form
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

/**
 * Submit a lead form to the API
 */
export async function submitLeadForm(formData: any) {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to submit form');
  }
  
  return response.json();
}
