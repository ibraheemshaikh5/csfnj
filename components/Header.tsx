'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Care & Share Foundation Logo"
            width={56}
            height={56}
            className="object-contain"
          />
          <span className="text-[#0620ff] font-semibold text-2xl hidden sm:inline tracking-tight" style={{ fontFamily: 'var(--font-poppins)' }}>Care & Share</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-gray-900 font-medium hover:text-[#0620ff] transition-colors hover:underline underline-offset-8">
            About
          </Link>
          <Link href="/events" className="text-gray-900 font-medium hover:text-[#0620ff] transition-colors hover:underline underline-offset-8">
            Events
          </Link>
          <Link href="/volunteer" className="text-gray-900 font-medium hover:text-[#0620ff] transition-colors hover:underline underline-offset-8">
            Volunteer
          </Link>
          <Link href="/contact" className="text-gray-900 font-medium hover:text-[#0620ff] transition-colors hover:underline underline-offset-8">
            Contact
          </Link>
          <button className="bg-[#0620ff] text-white px-8 py-2.5 rounded-full font-semibold hover:bg-[#0518dd] transition-colors shadow-md">
            Donate
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900"
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
            <Link href="/about" className="text-gray-900 font-medium hover:text-[#0620ff] transition-colors hover:underline underline-offset-8">
              About
            </Link>
            <Link href="/events" className="text-gray-900 font-medium hover:text-[#0620ff] transition-colors hover:underline underline-offset-8">
              Events
            </Link>
            <Link href="/volunteer" className="text-gray-900 font-medium hover:text-[#0620ff] transition-colors hover:underline underline-offset-8">
              Volunteer
            </Link>
            <Link href="/contact" className="text-gray-900 font-medium hover:text-[#0620ff] transition-colors hover:underline underline-offset-8">
              Contact
            </Link>
            <button className="bg-[#0620ff] text-white px-8 py-2.5 rounded-full font-semibold hover:bg-[#0518dd] transition-colors w-full shadow-md">
              Donate
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

