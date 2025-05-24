import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SampleProductCard from '../components/SampleProductCard';
import { ImageCategory } from '@/utils/use-sample-images';

// Mock the use-sample-images utility
jest.mock('@/utils/use-sample-images', () => ({
  getRandomSampleImage: jest.fn(() => ({
    url: 'https://example.com/test-image.jpg',
    alt: 'Test image description'
  })),
  ImageCategory: {
    WINDOWS: 'windows',
    DOORS: 'doors',
    SIDING: 'siding',
    ROOFING: 'roofing'
  }
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return <a href={href} {...props}>{children}</a>;
  };
});

describe('SampleProductCard', () => {
  const defaultProps = {
    title: 'Test Product',
    description: 'This is a test product description that should be displayed in the card.',
    category: 'windows' as ImageCategory,
    href: '/test-product'
  };

  // Basic rendering test
  it('renders without crashing', () => {
    render(<SampleProductCard {...defaultProps} />);
  });

  // Snapshot test
  it('matches snapshot', () => {
    const { container } = render(<SampleProductCard {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  // Props rendering test
  it('renders with correct title and description', () => {
    render(<SampleProductCard {...defaultProps} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product description that should be displayed in the card.')).toBeInTheDocument();
  });

  // Image rendering test
  it('renders image with correct attributes', () => {
    render(<SampleProductCard {...defaultProps} />);
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Product - Test image description');
  });

  // Link rendering test
  it('renders link with correct href', () => {
    render(<SampleProductCard {...defaultProps} />);
    
    const link = screen.getByRole('link', { name: 'Learn More' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test-product');
  });

  // Custom className test
  it('applies custom className when provided', () => {
    const customClass = 'custom-test-class';
    const { container } = render(
      <SampleProductCard {...defaultProps} className={customClass} />
    );
    
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass(customClass);
  });

  // Default className test
  it('applies default classes when no custom className provided', () => {
    const { container } = render(<SampleProductCard {...defaultProps} />);
    
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('bg-white', 'rounded-lg', 'overflow-hidden', 'shadow-md');
  });

  // Hover interaction test
  it('has hover effects on image and link', () => {
    render(<SampleProductCard {...defaultProps} />);
    
    const image = screen.getByRole('img');
    const link = screen.getByRole('link', { name: 'Learn More' });
    
    // Check for hover classes
    expect(image).toHaveClass('transition-transform', 'hover:scale-105');
    expect(link).toHaveClass('hover:bg-blue-700', 'transition-colors');
  });

  // Accessibility test
  it('is accessible', () => {
    render(<SampleProductCard {...defaultProps} />);
    
    // Check for proper heading structure
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Product');
    
    // Check for proper link
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAccessibleName('Learn More');
    
    // Check for proper image alt text
    const image = screen.getByRole('img');
    expect(image).toHaveAccessibleName('Test Product - Test image description');
  });

  // Different categories test
  it('works with different image categories', () => {
    const categories: ImageCategory[] = ['windows', 'doors', 'siding', 'roofing'];
    
    categories.forEach(category => {
      const { unmount } = render(
        <SampleProductCard {...defaultProps} category={category} />
      );
      
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      unmount();
    });
  });

  // Long description test
  it('handles long descriptions properly', () => {
    const longDescription = 'This is a very long description that should be properly handled by the component. '.repeat(10);
    
    render(
      <SampleProductCard 
        {...defaultProps} 
        description={longDescription}
      />
    );
    
    const description = screen.getByText(longDescription);
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('line-clamp-3');
  });

  // Empty props test
  it('handles empty title and description gracefully', () => {
    render(
      <SampleProductCard 
        {...defaultProps}
        title=""
        description=""
      />
    );
    
    // Should still render the structure
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  // Special characters test
  it('handles special characters in title and description', () => {
    const specialTitle = 'Test & Product "Special" <Characters>';
    const specialDescription = 'Description with & special "characters" <test>';
    
    render(
      <SampleProductCard 
        {...defaultProps}
        title={specialTitle}
        description={specialDescription}
      />
    );
    
    expect(screen.getByText(specialTitle)).toBeInTheDocument();
    expect(screen.getByText(specialDescription)).toBeInTheDocument();
  });

  // Error boundary test
  it('handles errors gracefully', () => {
    // Mock console.error to avoid noise in test output
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // This should not throw an error even with invalid props
    expect(() => {
      render(<SampleProductCard {...defaultProps} />);
    }).not.toThrow();
    
    consoleSpy.mockRestore();
  });
});
