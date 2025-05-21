'use client';

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';
import SeriesPage from '../../../../3000-series/index.jsx';

export default function Series3000() {
  useEffect(() => {
    // Log that the 3000-series page has been rendered
    logger.info('3000-Series Vinyl Siding page rendered', {
      component: 'Series3000Page',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return <SeriesPage />;
}
