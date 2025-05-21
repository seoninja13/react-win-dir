'use client';

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';
import SeriesPage from '../../../../4000-series/index.jsx';

export default function Series4000() {
  useEffect(() => {
    // Log that the 4000-series page has been rendered
    logger.info('4000-Series Vinyl Siding page rendered', {
      component: 'Series4000Page',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return <SeriesPage />;
}
