'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export default function EventDetailClient({ slug }: { slug: string }) {
  useEffect(() => {
    track('event_view', { event_type: 'detail', event_slug: slug });
  }, [slug]);

  return null;
}
