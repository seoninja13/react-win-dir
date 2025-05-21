'use client';

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';

// Import the Vinyl Siding page components
import { Navbar10 } from '../../../vinyl-siding/components/Navbar10';
import { Header47 } from '../../../vinyl-siding/components/Header47';
import { Header15 } from '../../../vinyl-siding/components/Header15';
import { Layout10 } from '../../../vinyl-siding/components/Layout10';
import { Layout239 } from '../../../vinyl-siding/components/Layout239';
import { Layout237 } from '../../../vinyl-siding/components/Layout237';
import { Layout22 } from '../../../vinyl-siding/components/Layout22';
import { Gallery7 } from '../../../vinyl-siding/components/Gallery7';
import { Layout239_1 } from '../../../vinyl-siding/components/Layout239_1';
import { Footer4 } from '../../../vinyl-siding/components/Footer4';

export default function VinylSiding() {
  useEffect(() => {
    // Log that the vinyl siding page has been rendered
    logger.info('Vinyl Siding page rendered', {
      component: 'VinylSidingPage',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <div>
      <Navbar10 />
      <Header47 />
      <Header15 />
      <Layout10 />
      <Layout239 />
      <Layout237 />
      <Layout22 />
      <Gallery7 />
      <Layout239_1 />
      <Footer4 />
    </div>
  );
}
