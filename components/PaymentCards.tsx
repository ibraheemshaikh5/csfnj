'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function PaymentCards() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const itemWidth = scrollContainer.offsetWidth * 0.85; // 85vw per card
      const gap = 16; // gap-4
      const index = Math.round(scrollLeft / (itemWidth + gap));
      setActiveCard(Math.min(Math.max(index, 0), 1));
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  return (
    <div className="mt-8 sm:mt-12 mb-6 sm:mb-8">
      {/* Section Header */}
      <div className="text-center mb-4 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">Other Ways to Donate</h2>
        <p className="text-gray-600 text-sm sm:text-base">Choose your preferred payment method</p>
      </div>

      {/* Mobile: Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-4 px-4 md:hidden scrollbar-hide"
      >
        {/* Venmo Card - Mobile */}
        <div className="min-w-[85vw] snap-center flex-shrink-0 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header with brand color */}
          <div className="bg-[#008CFF] px-3 sm:px-6 py-2 sm:py-4 flex items-center gap-2 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="#008CFF">
                <path d="M19.5 3c.9 1.5 1.3 3 1.3 5 0 3.9-3.4 9-6.1 12.6H7.5L5 3.6l6.3-.6.9 7.3c1-1.6 2.2-4 2.2-5.7 0-1-.2-1.7-.4-2.3L19.5 3z"/>
              </svg>
            </div>
            <div className="text-white">
              <p className="text-xs sm:text-sm font-medium uppercase tracking-wide opacity-90">Pay with</p>
              <p className="text-lg sm:text-xl font-bold">Venmo</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-3 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Account Details */}
              <div className="flex-1 space-y-2 sm:space-y-3">
                <button
                  onClick={() => copyToClipboard('@careshare', 'venmo-username')}
                  className="w-full bg-[#f7f7f7] rounded-lg sm:rounded-xl p-2.5 sm:p-4 text-left hover:bg-gray-200 active:bg-gray-300 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Username</p>
                      <p className="text-base sm:text-xl font-bold text-gray-900">@careshare</p>
                    </div>
                    <div className="text-gray-400 group-hover:text-gray-600">
                      {copiedField === 'venmo-username' ? (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {copiedField === 'venmo-username' ? 'Copied!' : 'Tap to copy'}
                  </p>
                </button>
                <div className="bg-[#f7f7f7] rounded-lg sm:rounded-xl p-2.5 sm:p-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Phone</p>
                  <p className="text-sm sm:text-lg font-semibold text-gray-900">(732) 809-2595</p>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex-shrink-0">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden w-[100px] h-[100px] sm:w-[180px] sm:h-[180px] flex items-center justify-center">
                  <Image
                    src="/images/venmo_qr.png"
                    alt="Venmo QR Code"
                    width={280}
                    height={280}
                    className="object-contain"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center mt-1">Scan to pay</p>
              </div>
            </div>
          </div>
        </div>

        {/* Zelle Card - Mobile */}
        <div className="min-w-[85vw] snap-center flex-shrink-0 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header with brand color */}
          <div className="bg-[#6D1ED4] px-3 py-2 flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden p-0.5">
              <Image
                src="/images/zelle_logo.png"
                alt="Zelle logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div className="text-white">
              <p className="text-xs font-medium uppercase tracking-wide opacity-90">Pay with</p>
              <p className="text-lg font-bold">Zelle</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-3">
            <div className="flex items-center gap-3">
              {/* Account Details */}
              <div className="flex-1">
                <button
                  onClick={() => copyToClipboard('mail.csfnj@gmail.com', 'zelle-email')}
                  className="w-full bg-[#f7f7f7] rounded-lg p-2.5 text-left hover:bg-gray-200 active:bg-gray-300 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</p>
                      <p className="text-sm font-bold text-gray-900 break-all">mail.csfnj@gmail.com</p>
                    </div>
                    <div className="text-gray-400 group-hover:text-gray-600 ml-2 flex-shrink-0">
                      {copiedField === 'zelle-email' ? (
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {copiedField === 'zelle-email' ? 'Copied!' : 'Tap to copy'}
                  </p>
                </button>
              </div>

              {/* QR Code */}
              <div className="flex-shrink-0">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden w-[100px] h-[100px] flex items-center justify-center">
                  <Image
                    src="/images/zelle_qr.png"
                    alt="Zelle QR Code"
                    width={280}
                    height={280}
                    className="object-contain"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center mt-1">Scan to pay</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Scroll indicator dots */}
      <div className="flex justify-center gap-2 mt-2 md:hidden">
        <div className={`w-2 h-2 rounded-full transition-colors ${activeCard === 0 ? 'bg-[#0720ff]' : 'bg-gray-300'}`} />
        <div className={`w-2 h-2 rounded-full transition-colors ${activeCard === 1 ? 'bg-[#0720ff]' : 'bg-gray-300'}`} />
      </div>

      {/* Desktop: Grid layout */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        {/* Venmo Card - Desktop */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="bg-[#008CFF] px-6 py-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#008CFF">
                <path d="M19.5 3c.9 1.5 1.3 3 1.3 5 0 3.9-3.4 9-6.1 12.6H7.5L5 3.6l6.3-.6.9 7.3c1-1.6 2.2-4 2.2-5.7 0-1-.2-1.7-.4-2.3L19.5 3z"/>
              </svg>
            </div>
            <div className="text-white">
              <p className="text-sm font-medium uppercase tracking-wide opacity-90">Pay with</p>
              <p className="text-xl font-bold">Venmo</p>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-6">
              <div className="flex-1 space-y-3">
                <button
                  onClick={() => copyToClipboard('@careshare', 'venmo-username')}
                  className="w-full bg-[#f7f7f7] rounded-xl p-4 text-left hover:bg-gray-200 active:bg-gray-300 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Username</p>
                      <p className="text-xl font-bold text-gray-900">@careshare</p>
                    </div>
                    <div className="text-gray-400 group-hover:text-gray-600">
                      {copiedField === 'venmo-username' ? (
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {copiedField === 'venmo-username' ? 'Copied!' : 'Click to copy'}
                  </p>
                </button>
                <div className="bg-[#f7f7f7] rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Phone</p>
                  <p className="text-lg font-semibold text-gray-900">(732) 809-2595</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden w-[180px] h-[180px] flex items-center justify-center">
                  <Image
                    src="/images/venmo_qr.png"
                    alt="Venmo QR Code"
                    width={280}
                    height={280}
                    className="object-contain"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center mt-1">Scan to pay</p>
              </div>
            </div>
          </div>
        </div>

        {/* Zelle Card - Desktop */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="bg-[#6D1ED4] px-6 py-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
              <Image
                src="/images/zelle_logo.png"
                alt="Zelle logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div className="text-white">
              <p className="text-sm font-medium uppercase tracking-wide opacity-90">Pay with</p>
              <p className="text-xl font-bold">Zelle</p>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <button
                  onClick={() => copyToClipboard('mail.csfnj@gmail.com', 'zelle-email')}
                  className="w-full bg-[#f7f7f7] rounded-xl p-4 text-left hover:bg-gray-200 active:bg-gray-300 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email</p>
                      <p className="text-lg font-bold text-gray-900 break-all">mail.csfnj@gmail.com</p>
                    </div>
                    <div className="text-gray-400 group-hover:text-gray-600 ml-2 flex-shrink-0">
                      {copiedField === 'zelle-email' ? (
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {copiedField === 'zelle-email' ? 'Copied!' : 'Click to copy'}
                  </p>
                </button>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden w-[180px] h-[180px] flex items-center justify-center">
                  <Image
                    src="/images/zelle_qr.png"
                    alt="Zelle QR Code"
                    width={280}
                    height={280}
                    className="object-contain"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center mt-1">Scan to pay</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Check Payment Card */}
      <div className="mt-4 sm:mt-6">
        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 flex items-center gap-3 sm:gap-4">
          <div className="w-11 h-11 sm:w-14 sm:h-14 bg-[#0720ff] rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 sm:w-7 sm:h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">Pay by Check</p>
            <p className="text-sm sm:text-lg font-semibold text-gray-900">Make checks payable to Care & Share Foundation</p>
          </div>
        </div>
      </div>

      {/* Additional Text */}
      <div className="text-center mt-4 sm:mt-8">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 sm:px-6 py-2 sm:py-3 rounded-full">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p className="font-medium text-xs sm:text-base">We accept Zakat & Sadaqah — 100% of Donations go to the cause!</p>
        </div>
      </div>
    </div>
  );
}
