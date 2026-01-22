import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoGallery from '@/components/VideoGallery';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Care & Share Foundation',
  description: 'Learn about Care & Share Foundation and our mission to serve the community.',
};

export default function About() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col">
      <Header />
      <main className="pt-8 pb-8 sm:pt-12 sm:pb-12 md:pt-16 md:pb-16 px-4 flex-grow">
        <div className="container mx-auto max-w-6xl">
          {/* Page Heading */}
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 pb-2 border-b-4 border-[#0720ff] inline-block">
            About
          </h1>

          {/* Top Section - Two Images */}
          <section className="relative pt-0 pb-8">
            <div className="grid grid-cols-2 gap-2 sm:gap-6">
              {/* Left Image */}
              <div className="relative w-full h-[160px] sm:h-[300px] md:h-[400px] rounded-md sm:rounded-lg overflow-hidden">
                <Image
                  src="/images/carousel-1.jpg"
                  alt="Car trunk filled with food boxes"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right Image */}
              <div className="relative w-full h-[160px] sm:h-[300px] md:h-[400px] rounded-md sm:rounded-lg overflow-hidden">
                <Image
                  src="/images/carousel-2.jpg"
                  alt="Stacks of packaged goods on sidewalk"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Blue Card Section with Video and Text/Button - Overlaying the images */}
            <div className="relative z-20 -mt-6 sm:-mt-20 md:-mt-24 px-2 sm:px-4 flex justify-center">
              <div className="bg-[#0720ff] rounded-lg sm:rounded-[3rem] p-2.5 sm:p-6 md:p-8 shadow-xl w-full max-w-[95%] sm:max-w-[90%]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6 items-center">
                {/* Video Placeholder (Left) */}
                <div className="relative w-full h-[120px] sm:h-auto sm:aspect-[16/7] rounded-md sm:rounded-lg overflow-hidden bg-gray-900">
                  <Image
                    src="/images/carousel-3.jpg"
                    alt="Video thumbnail"
                    fill
                    className="object-cover"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 sm:w-16 sm:h-16 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                      <div className="w-0 h-0 border-l-[8px] sm:border-l-[12px] border-l-gray-900 border-t-[6px] sm:border-t-[9px] border-t-transparent border-b-[6px] sm:border-b-[9px] border-b-transparent ml-0.5 sm:ml-1"></div>
                    </div>
                  </div>
                </div>

                {/* Text and Button (Right) */}
                <div className="text-white space-y-1.5 sm:space-y-4">
                  <p className="text-sm sm:text-lg md:text-xl leading-relaxed">
                    Putting food on someone&apos;s plate gives them the <strong>CHANCE</strong> for better.
                  </p>
                  <div className="flex justify-center mt-2 sm:mt-8">
                    <Link
                      href="/donate"
                      className="inline-block bg-black text-white font-bold px-5 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-gray-800 active:bg-gray-700 transition-colors text-xs sm:text-sm"
                    >
                      DONATE
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            </div>
            {/* Grey background fills the space below the card */}
            <div className="absolute inset-x-0 bottom-0 top-24 bg-[#f7f7f7] -z-10"></div>
          </section>

          {/* Our Impact Section */}
          <section className="pt-7 sm:pt-12 md:pt-16 pb-10 sm:pb-12 md:pb-16">
            <div className="max-w-4xl mx-auto">
              {/* Heading with Blue Bar */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="w-1.5 sm:w-2 h-10 sm:h-12 bg-[#0720ff]"></div>
                <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900">Our Impact</h2>
              </div>

              {/* Body Text - spans from blue bar, centered */}
              <div className="flex">
                <div className="w-1.5 sm:w-2 mr-3 sm:mr-4"></div>
                <div className="flex-1">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 text-center">
                    Our volunteers donate hundreds of hours of their time to create meals in a chain of steps. Putting stickers on a bag, putting cheese on bread, cutting the meat, or placing necessities including masks, water, and utensils in the bag, all of our volunteers care deeply about the program and change lives! Please check out the videos below and the events page to see everything we have done!
                  </p>

                  {/* View Events Link - Left aligned to O in Our Impact */}
                  <Link
                    href="/events"
                    className="text-[#0720ff] font-semibold hover:underline inline-flex items-center gap-1 text-sm sm:text-base"
                  >
                    View Events <span>&gt;</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Video Gallery Section */}
          <VideoGallery />
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}

