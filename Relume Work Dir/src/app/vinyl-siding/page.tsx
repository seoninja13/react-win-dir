'use client';

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';

// Import the Vinyl Siding page components from website-pages directory
import { Navbar10 } from '../../../website-pages/vinyl-siding/components/Navbar10';
import { Header47 } from '../../../website-pages/vinyl-siding/components/Header47';
import { Header15 } from '../../../website-pages/vinyl-siding/components/Header15';
import { Layout10 } from '../../../website-pages/vinyl-siding/components/Layout10';
import { Layout239 } from '../../../website-pages/vinyl-siding/components/Layout239';
import { Layout237 } from '../../../website-pages/vinyl-siding/components/Layout237';
import { Layout22 } from '../../../website-pages/vinyl-siding/components/Layout22';
import { Gallery7 } from '../../../website-pages/vinyl-siding/components/Gallery7';
import { Layout239_1 } from '../../../website-pages/vinyl-siding/components/Layout239_1';
import { Footer4 } from '../../../website-pages/vinyl-siding/components/Footer4';

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
