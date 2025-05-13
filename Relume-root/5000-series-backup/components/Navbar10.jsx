"use client";

import { CustomButton } from "./CustomButton";
import Link from "next/link";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export function Navbar10() {
  return (
    <div id="relume" className="relative z-50">
      <div className="px-[5%] py-4 md:py-5">
        <div className="container">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
                alt="Logo"
                className="mr-2 inline-block max-h-10 w-auto md:max-h-12"
              />
            </Link>
            <div className="hidden items-center gap-x-1 md:flex lg:gap-x-2">
              <Link
                href="/products"
                className="px-3 py-2 font-medium hover:text-text-secondary lg:px-4"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 font-medium hover:text-text-secondary lg:px-4"
              >
                About
              </Link>
              <Link
                href="/gallery"
                className="px-3 py-2 font-medium hover:text-text-secondary lg:px-4"
              >
                Gallery
              </Link>
              <Link
                href="/blog"
                className="px-3 py-2 font-medium hover:text-text-secondary lg:px-4"
              >
                Blog
              </Link>
              <Link
                href="/contact-us"
                className="px-3 py-2 font-medium hover:text-text-secondary lg:px-4"
              >
                Contact
              </Link>
              <div className="ml-4">
                <CustomButton variant="primary">
                  Design Consultation
                </CustomButton>
              </div>
            </div>
            <button
              className="flex items-center md:hidden"
              aria-label="Toggle menu"
            >
              <RxHamburgerMenu className="size-6" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
