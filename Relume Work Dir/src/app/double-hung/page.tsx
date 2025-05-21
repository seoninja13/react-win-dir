'use client';

import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';

// Import components from the Pages Router version
import { Navbar10 } from '../../../double-hung/components/Navbar10';
import { Header44 } from '../../../double-hung/components/Header44';
import { Header30 } from '../../../double-hung/components/Header30';
import { Layout10 } from '../../../double-hung/components/Layout10';
import { Layout246 } from '../../../double-hung/components/Layout246';
import { Layout22 } from '../../../double-hung/components/Layout22';
import { Layout4 } from '../../../double-hung/components/Layout4';
import { Layout237 } from '../../../double-hung/components/Layout237';
import { Layout22_1 } from '../../../double-hung/components/Layout22_1';
import { Layout241 } from '../../../double-hung/components/Layout241';
import { Layout12 } from '../../../double-hung/components/Layout12';
import { Testimonial19 } from '../../../double-hung/components/Testimonial19';
import { Cta7 } from '../../../double-hung/components/Cta7';
import { Footer4 } from '../../../double-hung/components/Footer4';

export default function DoubleHung() {
  useEffect(() => {
    // Log that the double-hung windows page has been rendered
    logger.info('Double-Hung Windows page rendered', {
      component: 'DoubleHungPage',
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <div>
      <Navbar10 />
      <Header44 />
      <Header30 />
      <Layout10 />
      <Layout246 />
      <Layout22 />
      <Layout4 />
      <Layout237 />
      <Layout22_1 />
      <Layout241 />
      <Layout12 />
      <Testimonial19 />
      <Cta7 />
      <Footer4 />
    </div>
  );
}
