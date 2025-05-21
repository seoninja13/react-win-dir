'use client';

import React, { useEffect } from 'react';
import HingedPatioDoorsPage from '../../../../../hinged-patio-doors/index.jsx';
import { logger } from '@/utils/logger';

export default function HingedPatioDoors() {
  useEffect(() => {
    // Log that the hinged patio doors page has been rendered
    logger.info('Hinged Patio Doors page rendered', {
      component: 'HingedPatioDoorsPage',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return <HingedPatioDoorsPage />;
}
