"use client";

import React from "react";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

export function Footer4() {
  return (
    <footer id="relume" className="px-[5%] py-12 md:py-18 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 items-center justify-center justify-items-center gap-x-[4vw] gap-y-12 pb-12 md:pb-18 lg:grid-cols-[0.25fr_1fr_0.25fr] lg:justify-between lg:gap-y-4 lg:pb-20">
          <a href="/" className="lg:justify-self-start">
            <img
              src="/assets/images/logos/window-world-la-logo.png"
              alt="Window World Los Angeles Logo"
              className="inline-block"
            />
          </a>
          <ul className="grid grid-flow-row grid-cols-1 items-start justify-center justify-items-center gap-6 md:grid-flow-col md:grid-cols-[max-content] md:justify-center md:justify-items-start">
            <li className="font-semibold">
              <a href="/products">Products</a>
            </li>
            <li className="font-semibold">
              <a href="/services">Services</a>
            </li>
            <li className="font-semibold">
              <a href="/financing">Financing</a>
            </li>
            <li className="font-semibold">
              <a href="/gallery">Gallery</a>
            </li>
            <li className="font-semibold">
              <a href="/about">About Us</a>
            </li>
            <li className="font-semibold">
              <a href="/contact">Contact</a>
            </li>
          </ul>
          <div className="flex items-start justify-start justify-items-center gap-x-3 lg:justify-self-end">
            <a href="https://facebook.com/windowworldla" target="_blank" rel="noopener noreferrer">
              <BiLogoFacebookCircle className="size-6" />
            </a>
            <a href="https://instagram.com/windowworldla" target="_blank" rel="noopener noreferrer">
              <BiLogoInstagram className="size-6" />
            </a>
            <a href="https://twitter.com/windowworldla" target="_blank" rel="noopener noreferrer">
              <FaXTwitter className="size-6 p-0.5" />
            </a>
            <a href="https://linkedin.com/company/window-world-la" target="_blank" rel="noopener noreferrer">
              <BiLogoLinkedinSquare className="size-6" />
            </a>
            <a href="https://youtube.com/windowworldla" target="_blank" rel="noopener noreferrer">
              <BiLogoYoutube className="size-6" />
            </a>
          </div>
        </div>
        <div className="h-px w-full bg-black" />
        <div className="flex flex-col-reverse items-center justify-center justify-items-center pt-6 pb-4 text-sm md:flex-row md:gap-x-6 md:pt-8 md:pb-0">
          <ul className="grid grid-flow-row grid-cols-[max-content] items-center justify-center justify-items-center gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms-of-service">Terms of Service</a>
            </li>
            <li>
              <a href="/sitemap">Sitemap</a>
            </li>
            <p className="mt-8 md:mt-0">© 2024 Window World Los Angeles. All rights reserved.</p>
          </ul>
        </div>
      </div>
    </footer>
  );
}
