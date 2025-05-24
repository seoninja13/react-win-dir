/**
 * String Helper Utilities
 * 
 * A collection of utility functions for string manipulation and validation.
 * These functions are commonly used throughout the application.
 */

/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns The string with the first letter capitalized
 */
export function capitalize(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts a string to kebab-case
 * @param str - The string to convert
 * @returns The string in kebab-case format
 */
export function toKebabCase(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Converts a string to camelCase
 * @param str - The string to convert
 * @returns The string in camelCase format
 */
export function toCamelCase(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '')
    .replace(/^[A-Z]/, char => char.toLowerCase());
}

/**
 * Truncates a string to a specified length and adds ellipsis
 * @param str - The string to truncate
 * @param maxLength - Maximum length before truncation
 * @param suffix - Suffix to add when truncated (default: '...')
 * @returns The truncated string
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (!str || typeof str !== 'string') {
    return '';
  }
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Removes HTML tags from a string
 * @param str - The string containing HTML
 * @returns The string with HTML tags removed
 */
export function stripHtml(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.replace(/<[^>]*>/g, '');
}

/**
 * Validates if a string is a valid email address
 * @param email - The email string to validate
 * @returns True if valid email, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generates a random string of specified length
 * @param length - Length of the random string
 * @param charset - Character set to use (default: alphanumeric)
 * @returns Random string
 */
export function generateRandomString(
  length: number, 
  charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  if (length <= 0) {
    return '';
  }
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

/**
 * Counts the number of words in a string
 * @param str - The string to count words in
 * @returns Number of words
 */
export function wordCount(str: string): number {
  if (!str || typeof str !== 'string') {
    return 0;
  }
  return str.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Extracts URLs from a string
 * @param str - The string to extract URLs from
 * @returns Array of URLs found in the string
 */
export function extractUrls(str: string): string[] {
  if (!str || typeof str !== 'string') {
    return [];
  }
  const urlRegex = /https?:\/\/[^\s]+/g;
  return str.match(urlRegex) || [];
}

/**
 * Formats a string as a phone number
 * @param str - The string containing digits
 * @returns Formatted phone number or empty string if invalid
 */
export function formatPhoneNumber(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }
  const digits = str.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits[0] === '1') {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return str; // Return original if can't format
}
