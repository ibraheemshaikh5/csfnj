'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import IconCard from './IconCard';

const carouselItems = [
  {
    image: '/images/cooking-stickfigure.png',
    imageAlt: 'Chef cooking illustration',
    description: 'Our food is freshly prepared and packed right before delivery.',
  },
  {
    image: '/images/delivery-truck.png',
    imageAlt: 'Delivery truck illustration',
    description: 'Our volunteers deliver hundreds of meals across the state.',
  },
  {
    image: '/images/happy-family.png',
    imageAlt: 'Happy family illustration',
    description: 'Across New Jersey, many in need now have food on their plates.',
  },
];

export default function ChangingLivesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isUserScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Scroll to a specific index
  const scrollToIndex = useCallback((index: number) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const itemWidth = scrollContainer.offsetWidth * 0.8; // 80vw per item
    const gap = 16; // gap-4 = 16px
    const scrollPosition = index * (itemWidth + gap);

    scrollContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  }, []);

  // Handle manual scroll detection
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const itemWidth = scrollContainer.offsetWidth * 0.8;
      const gap = 16;
      const index = Math.round(scrollLeft / (itemWidth + gap));
      setActiveIndex(Math.min(Math.max(index, 0), carouselItems.length - 1));

      // Mark as user scrolling and reset after scroll ends
      isUserScrolling.current = true;
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        isUserScrolling.current = false;
      }, 150);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  // Auto-scroll every 6 seconds (mobile only)
  useEffect(() => {
    // Only run on mobile (check if carousel is visible)
    const checkIfMobile = () => {
      return window.innerWidth < 768; // md breakpoint
    };

    const autoScroll = () => {
      if (!checkIfMobile() || isUserScrolling.current) return;

      const nextIndex = (activeIndex + 1) % carouselItems.length;
      scrollToIndex(nextIndex);
    };

    const interval = setInterval(autoScroll, 6000);

    return () => clearInterval(interval);
  }, [activeIndex, scrollToIndex]);

  return (
    <>
      {/* Mobile: Horizontal scroll carousel */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:hidden scrollbar-hide"
      >
        {carouselItems.map((item, index) => (
          <div key={index} className="min-w-[80vw] snap-center flex-shrink-0">
            <IconCard
              image={item.image}
              imageAlt={item.imageAlt}
              description={item.description}
            />
          </div>
        ))}
      </div>
      {/* Scroll indicator dots - mobile only */}
      <div className="flex justify-center gap-2 mt-2 md:hidden">
        {carouselItems.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === activeIndex ? 'bg-[#0720ff]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      {/* Desktop: Grid layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-8">
        {carouselItems.map((item, index) => (
          <IconCard
            key={index}
            image={item.image}
            imageAlt={item.imageAlt}
            description={item.description}
          />
        ))}
      </div>
    </>
  );
}
