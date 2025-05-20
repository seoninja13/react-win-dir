import { useState, useEffect } from 'react';
import { getApprovedTestimonials, getTestimonialsByService, getAllTestimonials } from '../api/testimonials';
import type { Database } from '../types/database.types';

/**
 * Testimonials Hooks
 * 
 * This file contains React hooks for working with testimonials.
 * It provides hooks for retrieving approved testimonials, testimonials by service, and all testimonials.
 */

type Testimonial = Database['public']['Tables']['testimonials']['Row'];

/**
 * Hook for retrieving approved testimonials
 * 
 * @returns An object with testimonials, loading, and error properties
 */
export function useApprovedTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true);
        const data = await getApprovedTestimonials();
        setTestimonials(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
}

/**
 * Hook for retrieving testimonials by service
 * 
 * @param service - The service to filter by
 * @returns An object with testimonials, loading, and error properties
 */
export function useTestimonialsByService(service: string) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true);
        const data = await getTestimonialsByService(service);
        setTestimonials(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    if (service) {
      fetchTestimonials();
    }
  }, [service]);

  return { testimonials, loading, error };
}

/**
 * Hook for retrieving all testimonials (including unapproved ones)
 * 
 * @returns An object with testimonials, loading, and error properties
 */
export function useAllTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true);
        const data = await getAllTestimonials();
        setTestimonials(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
}
