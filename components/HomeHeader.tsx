'use client';

import { useState, useEffect, useRef } from 'react';
import Header from './Header';

export default function HomeHeader() {
  const [showFixedHeader, setShowFixedHeader] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set the header height once on mount
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Calculate the threshold: header height + carousel (500-700px) + first section (300-400px)
      // Let's use about 1000px after the header
      const threshold = headerHeight + 1000;
      
      if (scrollPosition > threshold) {
        // Past the threshold - show fixed header overlay
        setShowFixedHeader(true);
      } else {
        // Before threshold - hide fixed header overlay
        setShowFixedHeader(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerHeight]);

  return (
    <>
      {/* Static header that always maintains its space */}
      <div ref={headerRef} className="relative z-40">
        <Header />
      </div>
      
      {/* Fixed header overlay that only appears after scrolling past the donate section */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${
          showFixedHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Header />
      </div>
    </>
  );
}

