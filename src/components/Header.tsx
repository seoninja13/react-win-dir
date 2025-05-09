'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { brandImages } from '@/utils/imageUrls';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-50 w-full bg-white shadow-md">
      {/* Alert Banner */}
      <div className="bg-blue-600 py-2 text-center text-sm text-white">
        <div className="container mx-auto px-4">
          Voted as the #1 Home Remodeler in the U.S. by Remodeler Magazine.
          <a href="#" className="ml-2 underline hover:text-blue-200">Learn More!</a>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="border-b border-gray-200 bg-gray-50 py-1">
        <div className="container mx-auto flex justify-end px-4">
          <nav>
            <ul className="flex space-x-6 text-sm">
              <li><Link href="/reviews" className="text-gray-600 hover:text-blue-600">Reviews</Link></li>
              <li><Link href="/financing" className="text-gray-600 hover:text-blue-600">Financing</Link></li>
              <li><Link href="/service-areas" className="text-gray-600 hover:text-blue-600">Service Areas</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={brandImages.logo}
              alt="Window World Logo"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
          </Link>

          {/* Contact Info & CTA (Desktop) */}
          <div className="hidden md:block">
            <div className="flex items-center">
              <div className="mr-6 text-right">
                <div className="font-bold text-gray-800">Los Angeles</div>
                <a href="tel:(310) 919-2352" className="text-lg font-bold text-blue-600">(310) 919-2352</a>
              </div>
              <Link
                href="/contact"
                className="rounded-md bg-green-600 px-6 py-2 font-bold text-white transition hover:bg-green-700"
              >
                Request Free Estimate
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="flex items-center md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Main Navigation (Desktop) */}
        <nav className="mt-4 hidden md:block">
          <ul className="flex space-x-8 font-medium">
            <li><Link href="/windows" className="text-gray-800 hover:text-blue-600">Windows</Link></li>
            <li><Link href="/doors" className="text-gray-800 hover:text-blue-600">Doors</Link></li>
            <li><Link href="/vinyl-siding" className="text-gray-800 hover:text-blue-600">Siding</Link></li>
            <li><Link href="/roofing" className="text-gray-800 hover:text-blue-600">Roofing</Link></li>
            <li><Link href="/about" className="text-gray-800 hover:text-blue-600">About</Link></li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <nav className="border-t border-gray-200 bg-white py-4">
          <div className="container mx-auto px-4">
            <ul className="space-y-4">
              <li><Link href="/windows" className="block py-2 text-gray-800 hover:text-blue-600">Windows</Link></li>
              <li><Link href="/doors" className="block py-2 text-gray-800 hover:text-blue-600">Doors</Link></li>
              <li><Link href="/vinyl-siding" className="block py-2 text-gray-800 hover:text-blue-600">Siding</Link></li>
              <li><Link href="/roofing" className="block py-2 text-gray-800 hover:text-blue-600">Roofing</Link></li>
              <li><Link href="/about" className="block py-2 text-gray-800 hover:text-blue-600">About</Link></li>
              <li className="pt-4">
                <Link
                  href="/contact"
                  className="block rounded-md bg-green-600 px-4 py-2 text-center font-bold text-white"
                >
                  Request Free Estimate
                </Link>
              </li>
              <li className="pt-2">
                <a href="tel:(310) 919-2352" className="block text-center text-lg font-bold text-blue-600">
                  (310) 919-2352
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
