'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export default function EventsPageClient() {
  useEffect(() => {
    track('event_view', { event_type: 'listing' });
  }, []);

  return null;
}
