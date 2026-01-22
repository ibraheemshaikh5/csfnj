'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 z-10">
          <Image
            src="/logo.png"
            alt="Care & Share Foundation Logo"
            width={56}
            height={56}
            className="object-contain"
          />
          <span className="text-[#0720ff] font-semibold text-2xl hidden sm:inline tracking-tight" style={{ fontFamily: 'var(--font-poppins)' }}>Care & Share</span>
        </Link>

        {/* Mobile Centered Title */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-[#0720ff] font-semibold text-2xl tracking-tight md:hidden"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          Care & Share
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-gray-900 font-medium hover:text-[#0720ff] transition-colors hover:underline underline-offset-8">
            About
          </Link>
          <Link href="/events" className="text-gray-900 font-medium hover:text-[#0720ff] transition-colors hover:underline underline-offset-8">
            Events
          </Link>
          <Link href="/volunteer" className="text-gray-900 font-medium hover:text-[#0720ff] transition-colors hover:underline underline-offset-8">
            Volunteer
          </Link>
          <Link href="/contact" className="text-gray-900 font-medium hover:text-[#0720ff] transition-colors hover:underline underline-offset-8">
            Contact
          </Link>
          <Link 
            href="/donate"
            className="bg-[#0720ff] text-white px-8 py-2.5 rounded-full font-semibold hover:bg-[#0618dd] active:bg-[#0515b8] transition-colors shadow-md"
          >
            Donate
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900 p-2 -mr-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-gray-900 font-medium hover:text-[#0720ff] transition-colors hover:underline underline-offset-8">
              About
            </Link>
            <Link href="/events" onClick={() => setIsMenuOpen(false)} className="text-gray-900 font-medium hover:text-[#0720ff] transition-colors hover:underline underline-offset-8">
              Events
            </Link>
            <Link href="/volunteer" onClick={() => setIsMenuOpen(false)} className="text-gray-900 font-medium hover:text-[#0720ff] transition-colors hover:underline underline-offset-8">
              Volunteer
            </Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-gray-900 font-medium hover:text-[#0720ff] transition-colors hover:underline underline-offset-8">
              Contact
            </Link>
            <Link
              href="/donate"
              onClick={() => setIsMenuOpen(false)}
              className="block bg-[#0720ff] text-white px-8 py-2.5 rounded-full font-semibold hover:bg-[#0618dd] active:bg-[#0515b8] transition-colors w-full shadow-md text-center"
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

