'use client';

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';
import SeriesPage from '../../../../1500-series/index.jsx';

export default function Series1500() {
  useEffect(() => {
    // Log that the 1500-series page has been rendered
    logger.info('1500-Series Vinyl Siding page rendered', {
      component: 'Series1500Page',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return <SeriesPage />;
}
