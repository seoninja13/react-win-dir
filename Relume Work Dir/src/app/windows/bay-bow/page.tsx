'use client';

import React, { useEffect } from 'react';
import BayBowPage from '../../../../website-pages/bay-bow/index.jsx';
import { logger } from '@/utils/logger';

export default function BayBow() {
  useEffect(() => {
    // Log that the bay-bow windows page has been rendered
    logger.info('Bay-Bow Windows page rendered', {
      component: 'BayBowPage',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return <BayBowPage />;
}
