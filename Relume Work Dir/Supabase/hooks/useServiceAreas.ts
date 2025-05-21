import { useState, useEffect } from 'react';
import { getAllServiceAreas, getServiceAreasByState, getServiceAreasByZip, isLocationServiceable } from '../api/service-areas';
import type { Database } from '../types/database.types';

/**
 * Service Areas Hooks
 * 
 * This file contains React hooks for working with service areas.
 * It provides hooks for retrieving all service areas, service areas by state, and checking if a location is serviceable.
 */

type ServiceArea = Database['public']['Tables']['service_areas']['Row'];

/**
 * Hook for retrieving all service areas
 * 
 * @returns An object with serviceAreas, loading, and error properties
 */
export function useServiceAreas() {
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchServiceAreas() {
      try {
        setLoading(true);
        const data = await getAllServiceAreas();
        setServiceAreas(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchServiceAreas();
  }, []);

  return { serviceAreas, loading, error };
}

/**
 * Hook for retrieving service areas by state
 * 
 * @param state - The state to filter by
 * @returns An object with serviceAreas, loading, and error properties
 */
export function useServiceAreasByState(state: string) {
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchServiceAreas() {
      try {
        setLoading(true);
        const data = await getServiceAreasByState(state);
        setServiceAreas(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    if (state) {
      fetchServiceAreas();
    }
  }, [state]);

  return { serviceAreas, loading, error };
}

/**
 * Hook for retrieving service areas by ZIP code
 * 
 * @param zip - The ZIP code to filter by
 * @returns An object with serviceAreas, loading, and error properties
 */
export function useServiceAreasByZip(zip: string) {
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchServiceAreas() {
      try {
        setLoading(true);
        const data = await getServiceAreasByZip(zip);
        setServiceAreas(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    if (zip) {
      fetchServiceAreas();
    }
  }, [zip]);

  return { serviceAreas, loading, error };
}

/**
 * Hook for checking if a location is serviceable
 * 
 * @param city - The city to check
 * @param state - The state to check
 * @param zip - The ZIP code to check (optional)
 * @returns An object with isServiceable, loading, and error properties
 */
export function useLocationServiceable(city: string, state: string, zip?: string) {
  const [isServiceable, setIsServiceable] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function checkServiceable() {
      try {
        setLoading(true);
        const data = await isLocationServiceable(city, state, zip);
        setIsServiceable(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    if (city && state) {
      checkServiceable();
    }
  }, [city, state, zip]);

  return { isServiceable, loading, error };
}
