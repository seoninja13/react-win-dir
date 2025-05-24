/**
 * String Helpers Test Suite
 * 
 * Comprehensive tests for string utility functions demonstrating Phase II
 * automated testing capabilities with enhanced test generation patterns.
 */

import {
  capitalize,
  toKebabCase,
  toCamelCase,
  truncate,
  stripHtml,
  isValidEmail,
  generateRandomString,
  wordCount,
  extractUrls,
  formatPhoneNumber
} from '../utils/string-helpers';

describe('String Helpers', () => {
  
  describe('capitalize', () => {
    // Basic functionality tests
    it('capitalizes the first letter of a string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
      expect(capitalize('tEST')).toBe('Test');
    });

    // Edge cases
    it('handles edge cases', () => {
      expect(capitalize('')).toBe('');
      expect(capitalize('a')).toBe('A');
      expect(capitalize('A')).toBe('A');
    });

    // Type validation
    it('handles invalid inputs gracefully', () => {
      expect(capitalize(null as any)).toBe('');
      expect(capitalize(undefined as any)).toBe('');
      expect(capitalize(123 as any)).toBe('');
    });

    // Special characters
    it('handles special characters', () => {
      expect(capitalize('123abc')).toBe('123abc');
      expect(capitalize('!hello')).toBe('!hello');
      expect(capitalize(' hello')).toBe(' hello');
    });
  });

  describe('toKebabCase', () => {
    // Basic functionality
    it('converts strings to kebab-case', () => {
      expect(toKebabCase('HelloWorld')).toBe('hello-world');
      expect(toKebabCase('hello world')).toBe('hello-world');
      expect(toKebabCase('hello_world')).toBe('hello-world');
    });

    // Complex cases
    it('handles complex transformations', () => {
      expect(toKebabCase('XMLHttpRequest')).toBe('x-m-l-http-request');
      expect(toKebabCase('iPhone')).toBe('i-phone');
      expect(toKebabCase('HTML5Parser')).toBe('h-t-m-l5-parser');
    });

    // Edge cases
    it('handles edge cases', () => {
      expect(toKebabCase('')).toBe('');
      expect(toKebabCase('a')).toBe('a');
      expect(toKebabCase('A')).toBe('a');
    });
  });

  describe('toCamelCase', () => {
    // Basic functionality
    it('converts strings to camelCase', () => {
      expect(toCamelCase('hello-world')).toBe('helloWorld');
      expect(toCamelCase('hello_world')).toBe('helloWorld');
      expect(toCamelCase('hello world')).toBe('helloWorld');
    });

    // Edge cases
    it('handles edge cases', () => {
      expect(toCamelCase('')).toBe('');
      expect(toCamelCase('hello')).toBe('hello');
      expect(toCamelCase('Hello')).toBe('hello');
    });
  });

  describe('truncate', () => {
    const longString = 'This is a very long string that should be truncated';

    // Basic functionality
    it('truncates strings correctly', () => {
      expect(truncate(longString, 10)).toBe('This is...');
      expect(truncate(longString, 20)).toBe('This is a very lo...');
    });

    // Custom suffix
    it('uses custom suffix', () => {
      expect(truncate(longString, 10, '…')).toBe('This is a…');
      expect(truncate(longString, 15, ' [more]')).toBe('This is[more]');
    });

    // Edge cases
    it('handles edge cases', () => {
      expect(truncate('short', 10)).toBe('short');
      expect(truncate('', 10)).toBe('');
      expect(truncate(longString, 0)).toBe('...');
    });
  });

  describe('stripHtml', () => {
    // Basic functionality
    it('removes HTML tags', () => {
      expect(stripHtml('<p>Hello</p>')).toBe('Hello');
      expect(stripHtml('<div><span>Test</span></div>')).toBe('Test');
    });

    // Complex HTML
    it('handles complex HTML', () => {
      const html = '<div class="test"><p>Hello <strong>world</strong>!</p></div>';
      expect(stripHtml(html)).toBe('Hello world!');
    });

    // Edge cases
    it('handles edge cases', () => {
      expect(stripHtml('')).toBe('');
      expect(stripHtml('No HTML here')).toBe('No HTML here');
      expect(stripHtml('<>')).toBe('');
    });
  });

  describe('isValidEmail', () => {
    // Valid emails
    it('validates correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('test+tag@example.org')).toBe(true);
    });

    // Invalid emails
    it('rejects invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test..test@example.com')).toBe(false);
    });

    // Edge cases
    it('handles edge cases', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail(null as any)).toBe(false);
      expect(isValidEmail(undefined as any)).toBe(false);
    });
  });

  describe('generateRandomString', () => {
    // Basic functionality
    it('generates random strings of correct length', () => {
      expect(generateRandomString(10)).toHaveLength(10);
      expect(generateRandomString(5)).toHaveLength(5);
      expect(generateRandomString(0)).toBe('');
    });

    // Custom charset
    it('uses custom character sets', () => {
      const result = generateRandomString(10, 'ABC');
      expect(result).toHaveLength(10);
      expect(/^[ABC]+$/.test(result)).toBe(true);
    });

    // Randomness test
    it('generates different strings', () => {
      const str1 = generateRandomString(20);
      const str2 = generateRandomString(20);
      expect(str1).not.toBe(str2);
    });
  });

  describe('wordCount', () => {
    // Basic functionality
    it('counts words correctly', () => {
      expect(wordCount('hello world')).toBe(2);
      expect(wordCount('one two three four')).toBe(4);
    });

    // Edge cases
    it('handles edge cases', () => {
      expect(wordCount('')).toBe(0);
      expect(wordCount('   ')).toBe(0);
      expect(wordCount('single')).toBe(1);
      expect(wordCount('  multiple   spaces  ')).toBe(2);
    });

    // Special characters
    it('handles special characters', () => {
      expect(wordCount('hello, world!')).toBe(2);
      expect(wordCount('test-word')).toBe(1);
    });
  });

  describe('extractUrls', () => {
    // Basic functionality
    it('extracts URLs from text', () => {
      const text = 'Visit https://example.com and http://test.org';
      const urls = extractUrls(text);
      expect(urls).toEqual(['https://example.com', 'http://test.org']);
    });

    // No URLs
    it('returns empty array when no URLs found', () => {
      expect(extractUrls('No URLs here')).toEqual([]);
      expect(extractUrls('')).toEqual([]);
    });

    // Complex URLs
    it('handles complex URLs', () => {
      const text = 'Check https://example.com/path?param=value#section';
      const urls = extractUrls(text);
      expect(urls).toEqual(['https://example.com/path?param=value#section']);
    });
  });

  describe('formatPhoneNumber', () => {
    // 10-digit numbers
    it('formats 10-digit phone numbers', () => {
      expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890');
      expect(formatPhoneNumber('123-456-7890')).toBe('(123) 456-7890');
      expect(formatPhoneNumber('(123) 456-7890')).toBe('(123) 456-7890');
    });

    // 11-digit numbers with country code
    it('formats 11-digit numbers with country code', () => {
      expect(formatPhoneNumber('11234567890')).toBe('+1 (123) 456-7890');
      expect(formatPhoneNumber('1-123-456-7890')).toBe('+1 (123) 456-7890');
    });

    // Invalid numbers
    it('handles invalid phone numbers', () => {
      expect(formatPhoneNumber('123')).toBe('123');
      expect(formatPhoneNumber('12345678901234')).toBe('12345678901234');
      expect(formatPhoneNumber('')).toBe('');
    });

    // Edge cases
    it('handles edge cases', () => {
      expect(formatPhoneNumber(null as any)).toBe('');
      expect(formatPhoneNumber(undefined as any)).toBe('');
    });
  });

  // Performance tests for critical functions
  describe('Performance Tests', () => {
    it('capitalize performs within acceptable limits', () => {
      const start = Date.now();
      for (let i = 0; i < 10000; i++) {
        capitalize('test string');
      }
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(100); // Should complete in less than 100ms
    });

    it('generateRandomString performs efficiently', () => {
      const start = Date.now();
      for (let i = 0; i < 1000; i++) {
        generateRandomString(50);
      }
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(200); // Should complete in less than 200ms
    });
  });

  // Integration tests
  describe('Integration Tests', () => {
    it('combines multiple string operations', () => {
      const input = 'Hello World Test';
      const kebab = toKebabCase(input);
      const camel = toCamelCase(kebab);
      const capitalized = capitalize(camel);
      
      expect(kebab).toBe('hello-world-test');
      expect(camel).toBe('helloWorldTest');
      expect(capitalized).toBe('Helloworldtest');
    });

    it('handles complex text processing pipeline', () => {
      const html = '<p>Visit <a href="https://example.com">our site</a> or call (123) 456-7890</p>';
      const text = stripHtml(html);
      const urls = extractUrls(text);
      const words = wordCount(text);
      
      expect(text).toBe('Visit our site or call (123) 456-7890');
      expect(urls).toEqual(['https://example.com']);
      expect(words).toBe(7);
    });
  });
});
