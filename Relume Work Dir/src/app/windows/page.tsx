'use client';

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';

// Import components from the website-pages directory
import { Navbar10 } from '../../../website-pages/windows/components/Navbar10';
import { Header46 } from '../../../website-pages/windows/components/Header46';
import { Header36 } from '../../../website-pages/windows/components/Header36';
import { Layout6 } from '../../../website-pages/windows/components/Layout6';
import { Layout254 } from '../../../website-pages/windows/components/Layout254';
import { Layout10 } from '../../../website-pages/windows/components/Layout10';
import { Layout254_1 } from '../../../website-pages/windows/components/Layout254_1';
import { Layout90 } from '../../../website-pages/windows/components/Layout90';
import { Layout246 } from '../../../website-pages/windows/components/Layout246';
import { Layout101 } from '../../../website-pages/windows/components/Layout101';
import { Testimonial32 } from '../../../website-pages/windows/components/Testimonial32';
import { Cta3 } from '../../../website-pages/windows/components/Cta3';
import { Footer4 } from '../../../website-pages/windows/components/Footer4';

export default function Windows() {
  useEffect(() => {
    // Log that the windows page has been rendered
    logger.info('Windows page rendered', {
      component: 'WindowsPage',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <div>
      <Navbar10 />
      <Header46 />
      <Header36 />
      <Layout6 />
      <Layout254 />
      <Layout10 />
      <Layout254_1 />
      <Layout90 />
      <Layout246 />
      <Layout101 />
      <Testimonial32 />
      <Cta3 />
      <Footer4 />
    </div>
  );
}
