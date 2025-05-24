/**
 * Example Test File
 * 
 * This is an example test file to demonstrate the automated testing setup.
 * It shows the basic structure and patterns for testing React components and utilities.
 */

// Example utility function test
describe('Example Utility Functions', () => {
  // Basic functionality test
  it('should add two numbers correctly', () => {
    const add = (a, b) => a + b;
    expect(add(2, 3)).toBe(5);
  });

  // Edge cases test
  it('should handle edge cases', () => {
    const add = (a, b) => a + b;
    expect(add(0, 0)).toBe(0);
    expect(add(-1, 1)).toBe(0);
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });

  // Type validation test
  it('should handle invalid inputs gracefully', () => {
    const safeAdd = (a, b) => {
      if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
      }
      return a + b;
    };

    expect(() => safeAdd('a', 1)).toThrow('Both arguments must be numbers');
    expect(() => safeAdd(1, null)).toThrow('Both arguments must be numbers');
  });
});

// Example React component test (commented out since we don't have React Testing Library installed yet)
/*
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock component for demonstration
const ExampleButton = ({ onClick, children, disabled = false }) => (
  <button onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

describe('ExampleButton', () => {
  // Basic rendering test
  it('renders without crashing', () => {
    render(<ExampleButton>Click me</ExampleButton>);
  });

  // Props test
  it('renders with correct text', () => {
    render(<ExampleButton>Test Button</ExampleButton>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  // Interaction test
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<ExampleButton onClick={handleClick}>Click me</ExampleButton>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // State test
  it('is disabled when disabled prop is true', () => {
    render(<ExampleButton disabled>Disabled Button</ExampleButton>);
    expect(screen.getByText('Disabled Button')).toBeDisabled();
  });

  // Accessibility test
  it('is accessible', () => {
    render(<ExampleButton>Accessible Button</ExampleButton>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAccessibleName('Accessible Button');
  });

  // Snapshot test
  it('matches snapshot', () => {
    const { container } = render(<ExampleButton>Snapshot Button</ExampleButton>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
*/

// Example async function test
describe('Example Async Functions', () => {
  it('should handle async operations', async () => {
    const fetchData = async () => {
      return new Promise(resolve => {
        setTimeout(() => resolve('data'), 100);
      });
    };

    const result = await fetchData();
    expect(result).toBe('data');
  });

  it('should handle async errors', async () => {
    const fetchDataWithError = async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Network error')), 100);
      });
    };

    await expect(fetchDataWithError()).rejects.toThrow('Network error');
  });
});

// Example mock test
describe('Example Mocking', () => {
  it('should mock external dependencies', () => {
    // Mock a module
    const mockFetch = jest.fn();
    global.fetch = mockFetch;

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: 'mocked data' })
    });

    // Test code that uses fetch
    const fetchUser = async (id) => {
      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    };

    return fetchUser(1).then(data => {
      expect(data).toEqual({ data: 'mocked data' });
      expect(mockFetch).toHaveBeenCalledWith('/api/users/1');
    });
  });

  it('should spy on functions', () => {
    const mathUtils = {
      add: (a, b) => a + b,
      multiply: (a, b) => a * b
    };

    const addSpy = jest.spyOn(mathUtils, 'add');
    
    mathUtils.add(2, 3);
    
    expect(addSpy).toHaveBeenCalledWith(2, 3);
    expect(addSpy).toHaveReturnedWith(5);
    
    addSpy.mockRestore();
  });
});

// Example performance test
describe('Example Performance Tests', () => {
  it('should complete within time limit', () => {
    const start = Date.now();
    
    // Simulate some work
    const heavyComputation = (n) => {
      let result = 0;
      for (let i = 0; i < n; i++) {
        result += i;
      }
      return result;
    };

    heavyComputation(10000);
    
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(100); // Should complete in less than 100ms
  });
});

// Example error handling test
describe('Example Error Handling', () => {
  it('should handle errors gracefully', () => {
    const riskyFunction = (input) => {
      if (!input) {
        throw new Error('Input is required');
      }
      return input.toUpperCase();
    };

    expect(() => riskyFunction()).toThrow('Input is required');
    expect(() => riskyFunction(null)).toThrow('Input is required');
    expect(riskyFunction('hello')).toBe('HELLO');
  });

  it('should catch and handle async errors', async () => {
    const asyncRiskyFunction = async (shouldFail) => {
      if (shouldFail) {
        throw new Error('Async operation failed');
      }
      return 'success';
    };

    await expect(asyncRiskyFunction(true)).rejects.toThrow('Async operation failed');
    await expect(asyncRiskyFunction(false)).resolves.toBe('success');
  });
});
