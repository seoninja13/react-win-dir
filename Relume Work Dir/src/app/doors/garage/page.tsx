'use client';

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';
import { Navbar10 } from '../../../../website-pages/garage/components/Navbar10';
import { Header47 } from '../../../../website-pages/garage/components/Header47';
import { Header1 } from '../../../../website-pages/garage/components/Header1';
import { Layout10 } from '../../../../website-pages/garage/components/Layout10';
import { Layout239 } from '../../../../website-pages/garage/components/Layout239';
import { Layout194 } from '../../../../website-pages/garage/components/Layout194';
import { Layout238 } from '../../../../website-pages/garage/components/Layout238';
import { Gallery8 } from '../../../../website-pages/garage/components/Gallery8';
import { Layout101 } from '../../../../website-pages/garage/components/Layout101';
import { Testimonial5 } from '../../../../website-pages/garage/components/Testimonial5';
import { Layout240 } from '../../../../website-pages/garage/components/Layout240';
import { Faq1 } from '../../../../website-pages/garage/components/Faq1';
import { Footer4 } from '../../../../website-pages/garage/components/Footer4';

export default function Garage() {
  useEffect(() => {
    // Log that the garage doors page has been rendered
    logger.info('Garage Doors page rendered', {
      component: 'GaragePage',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <div>
      <Navbar10 />
      <Header47 />
      <Header1 />
      <Layout10 />
      <Layout239 />
      <Layout194 />
      <Layout238 />
      <Gallery8 />
      <Layout101 />
      <Testimonial5 />
      <Layout240 />
      <Faq1 />
      <Footer4 />
    </div>
  );
}
