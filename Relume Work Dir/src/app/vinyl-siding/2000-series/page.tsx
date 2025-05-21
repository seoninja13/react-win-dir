'use client';

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';
import SeriesPage from '../../../../2000-series/index.jsx';

export default function Series2000() {
  useEffect(() => {
    // Log that the 2000-series page has been rendered
    logger.info('2000-Series Vinyl Siding page rendered', {
      component: 'Series2000Page',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return <SeriesPage />;
}
