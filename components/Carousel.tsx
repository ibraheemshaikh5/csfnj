'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  '/images/carousel-1.jpg',
  '/images/carousel-2.jpg',
  '/images/carousel-3.jpg',
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsTransitioning(false);
    }, 500);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-900">
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Carousel slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Left hover area for Previous Button */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-20 flex items-center justify-start pl-6"
        onMouseEnter={() => setShowLeftButton(true)}
        onMouseLeave={() => setShowLeftButton(false)}
      >
        <button
          onClick={handlePrev}
          className={`transition-all ${
            showLeftButton ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Previous slide"
        >
          <svg
            className="w-10 h-10 text-white drop-shadow-lg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Right hover area for Next Button */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-20 flex items-center justify-end pr-6"
        onMouseEnter={() => setShowRightButton(true)}
        onMouseLeave={() => setShowRightButton(false)}
      >
        <button
          onClick={handleNext}
          className={`transition-all ${
            showRightButton ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Next slide"
        >
          <svg
            className="w-10 h-10 text-white drop-shadow-lg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

