'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Care & Share Foundation Logo"
            width={48}
            height={48}
            className="object-contain"
          />
          <span className="text-[#1e3a8a] font-semibold text-xl hidden sm:inline">Care & Share</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-gray-700 hover:text-[#1e3a8a] transition-colors">
            About
          </Link>
          <Link href="/events" className="text-gray-700 hover:text-[#1e3a8a] transition-colors">
            Events
          </Link>
          <Link href="/volunteer" className="text-gray-700 hover:text-[#1e3a8a] transition-colors">
            Volunteer
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-[#1e3a8a] transition-colors">
            Contact
          </Link>
          <button className="bg-[#1e3a8a] text-white px-6 py-2 rounded-md hover:bg-[#1e40af] transition-colors">
            Donate
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
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
            <Link href="/about" className="text-gray-700 hover:text-[#1e3a8a] transition-colors">
              About
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-[#1e3a8a] transition-colors">
              Events
            </Link>
            <Link href="/volunteer" className="text-gray-700 hover:text-[#1e3a8a] transition-colors">
              Volunteer
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#1e3a8a] transition-colors">
              Contact
            </Link>
            <button className="bg-[#1e3a8a] text-white px-6 py-2 rounded-md hover:bg-[#1e40af] transition-colors w-full">
              Donate
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

