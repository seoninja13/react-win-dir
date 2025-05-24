"use client";

import React from "react";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

/**
 * Shared Site-Wide Footer Component
 * 
 * This is the single source of truth for the footer across all pages.
 * Provides consistent branding, navigation links, and social media links.
 * 
 * Features:
 * - Responsive design
 * - Social media links
 * - Navigation links
 * - Copyright information
 * - Site-wide consistency
 */
export function Footer() {
  return (
    <footer id="relume" className="px-[5%] py-12 md:py-18 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 items-center justify-center justify-items-center gap-x-[4vw] gap-y-12 pb-12 md:pb-18 lg:grid-cols-[0.25fr_1fr_0.25fr] lg:justify-between lg:gap-y-4 lg:pb-20">
          <a href="/" className="lg:justify-self-start">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
              alt="Windows Doors CA Logo"
              className="inline-block"
            />
          </a>
          <ul className="grid grid-flow-row grid-cols-1 items-start justify-center justify-items-center gap-6 md:grid-flow-col md:grid-cols-[max-content] md:justify-center md:justify-items-start">
            <li className="font-semibold">
              <a href="/contact">Get Started</a>
            </li>
            <li className="font-semibold">
              <a href="/windows">Our Services</a>
            </li>
            <li className="font-semibold">
              <a href="/contact">Free Estimate</a>
            </li>
            <li className="font-semibold">
              <a href="/contact">Contact Us</a>
            </li>
            <li className="font-semibold">
              <a href="/reviews">Customer Reviews</a>
            </li>
          </ul>
          <div className="flex items-start justify-start justify-items-center gap-x-3 lg:justify-self-end">
            <a href="#" aria-label="Facebook">
              <BiLogoFacebookCircle className="size-6" />
            </a>
            <a href="#" aria-label="Instagram">
              <BiLogoInstagram className="size-6" />
            </a>
            <a href="#" aria-label="Twitter">
              <FaXTwitter className="size-6 p-0.5" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <BiLogoLinkedinSquare className="size-6" />
            </a>
            <a href="#" aria-label="YouTube">
              <BiLogoYoutube className="size-6" />
            </a>
          </div>
        </div>
        <div className="h-px w-full bg-black" />
        <div className="flex flex-col-reverse items-center justify-center justify-items-center pt-6 pb-4 text-sm md:flex-row md:gap-x-6 md:pt-8 md:pb-0">
          <ul className="grid grid-flow-row grid-cols-[max-content] items-center justify-center justify-items-center gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
            <p className="mt-8 md:mt-0">© 2024 Windows Doors CA. All rights reserved.</p>
          </ul>
        </div>
      </div>
    </footer>
  );
}
