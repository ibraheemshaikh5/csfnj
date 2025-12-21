'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const slides = [
  {
    image: '/images/carousel-1.jpg',
    title: 'Care & Share Foundation',
    subtitle: 'Serving To Make A DIFFERENCE Where It Matters The Most',
  },
  {
    image: '/images/carousel-2.jpg',
    title: 'Care & Share Foundation',
    subtitle: '"No Soul Will Face A Burden Greater Than It Can Bear" - The Quran',
  },
  {
    image: '/images/carousel-3.jpg',
    title: 'Care & Share Foundation',
    subtitle: '"No Soul Will Face A Burden Greater Than It Can Bear" - The Quran',
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      setIsTransitioning(false);
    }, 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 12000);

    return () => clearInterval(interval);
  }, [handleNext]);

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
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
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={`Carousel slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Light overlay for text visibility without darkening too much */}
      <div className="absolute inset-0 bg-black/10 z-10" />

      {/* Persistent haze behind text - sized to cover the text area */}
      <div className="absolute top-16 left-8 md:top-24 md:left-12 lg:top-32 lg:left-16 z-15 w-[90%] max-w-3xl h-auto">
        <div className="backdrop-blur-[2px] bg-gradient-to-r from-black/20 via-black/15 to-transparent p-8 rounded-lg">
          <div className="bg-gradient-to-b from-black/10 via-black/5 to-transparent rounded-lg">
            <div className="h-[120px] md:h-[150px] lg:h-[180px]"></div>
          </div>
        </div>
      </div>

      {/* Text Overlays */}
      {slides.map((slide, index) => (
        <div
          key={`text-${index}`}
          className={`absolute inset-0 z-20 transition-opacity duration-1000 ease-in-out flex flex-col items-start justify-start pt-16 pl-8 md:pt-24 md:pl-12 lg:pt-32 lg:pl-16 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="px-8 py-6 max-w-3xl">
            <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4 drop-shadow-2xl text-left">
              {slide.title}
            </h1>
            <p className="text-white text-lg md:text-xl lg:text-2xl drop-shadow-xl font-light max-w-2xl text-left">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Left hover area for Previous Button */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-40 flex items-center justify-start pl-6"
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
        className="absolute right-0 top-0 bottom-0 w-24 z-40 flex items-center justify-end pr-6"
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
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

