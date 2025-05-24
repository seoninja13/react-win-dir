'use client';

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';

// Import the Doors page components from website-pages directory
import { Header44 } from '../../../website-pages/doors/components/Header44';
import { Header9 } from '../../../website-pages/doors/components/Header9';
import { Layout101 } from '../../../website-pages/doors/components/Layout101';
import { Layout4 } from '../../../website-pages/doors/components/Layout4';
import { Layout25 } from '../../../website-pages/doors/components/Layout25';
import { Layout101_1 } from '../../../website-pages/doors/components/Layout101_1';
import { Layout16 } from '../../../website-pages/doors/components/Layout16';
import { Cta25 } from '../../../website-pages/doors/components/Cta25';
import { Testimonial4 } from '../../../website-pages/doors/components/Testimonial4';

export default function Doors() {
  useEffect(() => {
    // Log that the doors page has been rendered
    logger.info('Doors page rendered', {
      component: 'DoorsPage',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <div>
      <Header44 />
      <Header9 />
      <Layout101 />
      <Layout4 />
      <Layout25 />
      <Layout101_1 />
      <Layout16 />
      <Cta25 />
      <Testimonial4 />
    </div>
  );
}
