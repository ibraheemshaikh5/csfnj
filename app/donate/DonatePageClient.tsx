'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export default function DonatePageClient() {
  useEffect(() => {
    track('donation_page_view');
  }, []);

  return null;
}
