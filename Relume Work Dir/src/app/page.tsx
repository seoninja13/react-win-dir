'use client';

import React, { useEffect } from 'react';
import { useLogger } from '@/utils/logger';

// Import Relume components from the Website Pages directory
import { Navbar10 } from '../../../Website Pages/home/components/Navbar10';
import { Header47 } from '../../../Website Pages/home/components/Header47';
import { Header15 } from '../../../Website Pages/home/components/Header15';
import { Layout6 } from '../../../Website Pages/home/components/Layout6';
import { Layout250 } from '../../../Website Pages/home/components/Layout250';
import { Layout4 } from '../../../Website Pages/home/components/Layout4';
import { Testimonial14 } from '../../../Website Pages/home/components/Testimonial14';
import { Layout251 } from '../../../Website Pages/home/components/Layout251';
import { Layout4_1 } from '../../../Website Pages/home/components/Layout4_1';
import { Gallery4 } from '../../../Website Pages/home/components/Gallery4';
import { Cta1 } from '../../../Website Pages/home/components/Cta1';
import { Footer4 } from '../../../Website Pages/home/components/Footer4';

export default function Home() {
  const logger = useLogger('HomePage');

  useEffect(() => {
    // Log that the home page has been rendered
    logger.info('Home page rendered', {
      timestamp: new Date().toISOString(),
    });

    // Log migration status
    logger.logPageMigration('Home', 'completed', {
      timestamp: new Date().toISOString(),
      route: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
    });
  }, [logger]);

  return (
    <div>
      <Navbar10 />
      <Header47 />
      <Header15 />
      <Layout6 />
      <Layout250 />
      <Layout4 />
      <Testimonial14 />
      <Layout251 />
      <Layout4_1 />
      <Gallery4 />
      <Cta1 />
      <Footer4 />
    </div>
  );
}
