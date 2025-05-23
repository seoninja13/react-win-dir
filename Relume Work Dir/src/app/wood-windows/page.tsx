'use client';

import React, { useEffect } from 'react';
import WoodWindowsPage from '../../../website-pages/wood-windows/index.jsx';
import { logger } from '@/utils/logger';

export default function WoodWindows() {
  useEffect(() => {
    // Log that the wood-windows page has been rendered
    logger.info('Wood Windows page rendered', {
      component: 'WoodWindowsPage',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return <WoodWindowsPage />;
}
