'use client';

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';

// Import the Doors page components
import { Navbar10 } from '../../../doors/components/Navbar10';
import { Header44 } from '../../../doors/components/Header44';
import { Header9 } from '../../../doors/components/Header9';
import { Layout101 } from '../../../doors/components/Layout101';
import { Layout4 } from '../../../doors/components/Layout4';
import { Layout25 } from '../../../doors/components/Layout25';
import { Layout101_1 } from '../../../doors/components/Layout101_1';
import { Layout16 } from '../../../doors/components/Layout16';
import { Cta25 } from '../../../doors/components/Cta25';
import { Testimonial4 } from '../../../doors/components/Testimonial4';
import { Footer4 } from '../../../doors/components/Footer4';

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
      <Navbar10 />
      <Header44 />
      <Header9 />
      <Layout101 />
      <Layout4 />
      <Layout25 />
      <Layout101_1 />
      <Layout16 />
      <Cta25 />
      <Testimonial4 />
      <Footer4 />
    </div>
  );
}
