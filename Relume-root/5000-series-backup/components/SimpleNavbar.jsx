"use client";

import React from "react";
import Link from "next/link";
import { CustomButton } from "./CustomButton";

export function SimpleNavbar() {
  return (
    <header className="bg-white py-4 px-[5%]">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
              alt="Logo"
              className="h-10 w-auto"
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-gray-800 hover:text-gray-600">
              Products
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-gray-600">
              About
            </Link>
            <Link href="/gallery" className="text-gray-800 hover:text-gray-600">
              Gallery
            </Link>
            <Link href="/blog" className="text-gray-800 hover:text-gray-600">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-gray-600">
              Contact
            </Link>
            <CustomButton variant="primary">
              Design Consultation
            </CustomButton>
          </nav>
          
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
