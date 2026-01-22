'use client';

import { useState } from 'react';
import Image from 'next/image';

const videos = [
  { src: '/images/carousel-1.jpg', duration: '00:21' },
  { src: '/images/carousel-2.jpg', duration: '00:24' },
  { src: '/images/carousel-3.jpg', duration: '00:08' },
  { src: '/images/feed-homeless-bg.png', duration: '00:10' },
  { src: '/images/happy-family.jpg', duration: '00:40' },
  { src: '/images/carousel-1.jpg', duration: '00:15' },
];

export default function VideoGallery() {
  const [showAll, setShowAll] = useState(false);

  // On mobile, show 4 by default (2x2 grid); on desktop, show all
  const displayVideos = showAll ? videos : videos.slice(0, 4);

  return (
    <section className="pb-10 sm:pb-12 md:pb-16">
      {/* Section Titles */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Videos</h3>
      </div>

      {/* Video Grid - Mobile: 2 columns, Desktop: 3 columns */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
        {/* Mobile view - show limited videos in grid */}
        <div className="contents md:hidden">
          {displayVideos.map((video, index) => (
            <div key={index} className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-900">
              <Image
                src={video.src}
                alt={`Video ${index + 1} thumbnail`}
                fill
                className="object-cover"
              />
              {/* Duration Overlay */}
              <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-black/70 text-white text-xs sm:text-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                {video.duration}
              </div>
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                  <div className="w-0 h-0 border-l-[8px] sm:border-l-[12px] border-l-gray-900 border-t-[6px] sm:border-t-[8px] border-t-transparent border-b-[6px] sm:border-b-[8px] border-b-transparent ml-0.5 sm:ml-1"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop view - always show all videos */}
        <div className="hidden md:contents">
          {videos.map((video, index) => (
            <div key={index} className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-900">
              <Image
                src={video.src}
                alt={`Video ${index + 1} thumbnail`}
                fill
                className="object-cover"
              />
              {/* Duration Overlay */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
                {video.duration}
              </div>
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center cursor-pointer">
                  <div className="w-0 h-0 border-l-[14px] border-l-gray-900 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View More / Show Less Button - Mobile only */}
      {videos.length > 4 && (
        <div className="text-center mt-6 md:hidden">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 text-[#0720ff] font-semibold hover:underline active:text-[#0618dd] transition-colors"
          >
            {showAll ? (
              <>
                Show Less
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                View More ({videos.length - 4} more)
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
