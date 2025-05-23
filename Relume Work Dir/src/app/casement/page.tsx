'use client';

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';

// Import components from the website-pages directory
import { Navbar10 } from '../../../website-pages/casement/components/Navbar10';
import { Header47 } from '../../../website-pages/casement/components/Header47';
import { Header5 } from '../../../website-pages/casement/components/Header5';
import { Layout1 } from '../../../website-pages/casement/components/Layout1';
import { Layout240 } from '../../../website-pages/casement/components/Layout240';
import { Layout27 } from '../../../website-pages/casement/components/Layout27';
import { Layout6 } from '../../../website-pages/casement/components/Layout6';
import { Layout90 } from '../../../website-pages/casement/components/Layout90';
import { Layout207 } from '../../../website-pages/casement/components/Layout207';
import { Gallery8 } from '../../../website-pages/casement/components/Gallery8';
import { Layout1_1 } from '../../../website-pages/casement/components/Layout1_1';
import { Faq1 } from '../../../website-pages/casement/components/Faq1';
import { Footer4 } from '../../../website-pages/casement/components/Footer4';

export default function Casement() {
  useEffect(() => {
    // Log that the casement windows page has been rendered
    logger.info('Casement Windows page rendered', {
      component: 'CasementPage',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <div>
      <Navbar10 />
      <Header47 />
      <Header5 />
      <Layout1 />
      <Layout240 />
      <Layout27 />
      <Layout6 />
      <Layout90 />
      <Layout207 />
      <Gallery8 />
      <Layout1_1 />
      <Faq1 />
      <Footer4 />
    </div>
  );
}
