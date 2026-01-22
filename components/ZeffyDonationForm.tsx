'use client';

import { useRef, useEffect } from 'react';
import { track } from '@vercel/analytics';

export default function ZeffyDonationForm() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleInteraction = () => {
      if (!hasTracked.current) {
        track('donation_form_interaction', { form_type: 'zeffy' });
        hasTracked.current = true;
      }
    };

    // Track when user clicks on or focuses the iframe
    iframe.addEventListener('mouseenter', handleInteraction, { once: true });
    iframe.addEventListener('focus', handleInteraction, { once: true });
    
    // Also listen for clicks on the iframe container
    const container = iframe.parentElement;
    if (container) {
      container.addEventListener('click', handleInteraction, { once: true });
    }

    return () => {
      iframe.removeEventListener('mouseenter', handleInteraction);
      iframe.removeEventListener('focus', handleInteraction);
      if (container) {
        container.removeEventListener('click', handleInteraction);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div
        className="relative overflow-hidden w-full rounded-lg h-[550px] sm:h-[700px] md:h-[900px]"
      >
        <iframe
          ref={iframeRef}
          title="Donation form powered by Zeffy"
          src="https://www.zeffy.com/embed/donation-form/care-and-share-foundation-donations"
          className="absolute border-0 w-full h-full"
          style={{
            position: 'absolute',
            border: 0,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: '100%',
            height: '100%'
          }}
          {...({
            allowpaymentrequest: 'true',
            allowtransparency: 'true',
          } as React.HTMLAttributes<HTMLIFrameElement>)}
        />
      </div>
    </div>
  );
}

