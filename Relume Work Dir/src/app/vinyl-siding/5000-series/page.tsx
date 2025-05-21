'use client';

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';
import SeriesPage from '../../../../5000-series/index.jsx';

export default function Series5000() {
  useEffect(() => {
    // Log that the 5000-series page has been rendered
    logger.info('5000-Series Vinyl Siding page rendered', {
      component: 'Series5000Page',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return <SeriesPage />;
}
