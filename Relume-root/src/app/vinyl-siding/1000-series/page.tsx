'use client';

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';
import SeriesPage from '../../../../1000-series/index.jsx';

export default function Series1000() {
  useEffect(() => {
    // Log that the 1000-series page has been rendered
    logger.info('1000-Series Vinyl Siding page rendered', {
      component: 'Series1000Page',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return <SeriesPage />;
}
