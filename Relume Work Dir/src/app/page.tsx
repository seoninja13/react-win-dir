'use client';

import React, { useEffect } from 'react';
import { useLogger } from '@/utils/logger';

// Import Relume components using index file to work around path resolution issues
import {
  Navbar10,
  Header47,
  Header15,
  Layout6,
  Layout250,
  Layout4,
  Testimonial14,
  Layout251,
  Layout4_1,
  Gallery4,
  Cta1,
  Footer4
} from '@/components/home';

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
