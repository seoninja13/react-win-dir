"use client";

import { Button } from "@relume_io/relume-ui";
import Link from "next/link";
import React, { useState } from "react";
import { RxHamburgerMenu, RxPlus } from "react-icons/rx";

export function Navbar10() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

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
              <div className="group relative">
                <button
                  className="flex items-center px-3 py-2 font-medium hover:text-text-secondary lg:px-4"
                  onClick={() => toggleDropdown("products")}
                >
                  Products
                  <RxPlus
                    className={`ml-1 size-4 transition-transform duration-300 ${
                      activeDropdown === "products" ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className={`absolute left-0 top-full z-50 mt-2 min-w-[240px] rounded-md bg-background-primary p-4 shadow-lg ${
                    activeDropdown === "products" ? "block" : "hidden"
                  }`}
                >
                  <div className="flex flex-col gap-y-2">
                    <Link
                      href="/windows"
                      className="rounded-md px-3 py-2 hover:bg-background-secondary"
                    >
                      Windows
                    </Link>
                    <Link
                      href="/doors"
                      className="rounded-md px-3 py-2 hover:bg-background-secondary"
                    >
                      Doors
                    </Link>
                    <Link
                      href="/vinyl-siding"
                      className="rounded-md px-3 py-2 hover:bg-background-secondary"
                    >
                      Vinyl Siding
                    </Link>
                    <Link
                      href="/roofing"
                      className="rounded-md px-3 py-2 hover:bg-background-secondary"
                    >
                      Roofing
                    </Link>
                  </div>
                </div>
              </div>
              <div className="group relative">
                <button
                  className="flex items-center px-3 py-2 font-medium hover:text-text-secondary lg:px-4"
                  onClick={() => toggleDropdown("about")}
                >
                  About
                  <RxPlus
                    className={`ml-1 size-4 transition-transform duration-300 ${
                      activeDropdown === "about" ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className={`absolute left-0 top-full z-50 mt-2 min-w-[240px] rounded-md bg-background-primary p-4 shadow-lg ${
                    activeDropdown === "about" ? "block" : "hidden"
                  }`}
                >
                  <div className="flex flex-col gap-y-2">
                    <Link
                      href="/about-us"
                      className="rounded-md px-3 py-2 hover:bg-background-secondary"
                    >
                      About Us
                    </Link>
                    <Link
                      href="/installation"
                      className="rounded-md px-3 py-2 hover:bg-background-secondary"
                    >
                      Installation
                    </Link>
                    <Link
                      href="/financing"
                      className="rounded-md px-3 py-2 hover:bg-background-secondary"
                    >
                      Financing
                    </Link>
                  </div>
                </div>
              </div>
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
                <Button title="Free Estimate" variant="primary">
                  Free Estimate
                </Button>
              </div>
            </div>
            <button
              className="flex items-center md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <RxHamburgerMenu className="size-6" />
            </button>
          </nav>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-40 flex flex-col overflow-hidden bg-background-primary transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-[5%] py-4">
          <Link href="/" className="flex items-center">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
              alt="Logo"
              className="mr-2 inline-block max-h-10 w-auto"
            />
          </Link>
          <button
            className="flex items-center"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <RxPlus className="size-6 rotate-45 transform" />
          </button>
        </div>
        <div className="flex flex-grow flex-col gap-y-6 overflow-auto px-[5%] py-8">
          <div className="flex flex-col">
            <button
              className="flex items-center justify-between py-4 text-xl font-medium"
              onClick={() => toggleDropdown("mobileProducts")}
            >
              Products
              <RxPlus
                className={`size-5 transition-transform duration-300 ${
                  activeDropdown === "mobileProducts" ? "rotate-45" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeDropdown === "mobileProducts"
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-col gap-y-4 pl-4 pt-4">
                <Link href="/windows" className="py-2">
                  Windows
                </Link>
                <Link href="/doors" className="py-2">
                  Doors
                </Link>
                <Link href="/vinyl-siding" className="py-2">
                  Vinyl Siding
                </Link>
                <Link href="/roofing" className="py-2">
                  Roofing
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <button
              className="flex items-center justify-between py-4 text-xl font-medium"
              onClick={() => toggleDropdown("mobileAbout")}
            >
              About
              <RxPlus
                className={`size-5 transition-transform duration-300 ${
                  activeDropdown === "mobileAbout" ? "rotate-45" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeDropdown === "mobileAbout"
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-col gap-y-4 pl-4 pt-4">
                <Link href="/about-us" className="py-2">
                  About Us
                </Link>
                <Link href="/installation" className="py-2">
                  Installation
                </Link>
                <Link href="/financing" className="py-2">
                  Financing
                </Link>
              </div>
            </div>
          </div>
          <Link href="/gallery" className="py-4 text-xl font-medium">
            Gallery
          </Link>
          <Link href="/blog" className="py-4 text-xl font-medium">
            Blog
          </Link>
          <Link href="/contact-us" className="py-4 text-xl font-medium">
            Contact
          </Link>
          <div className="pt-4">
            <Button title="Free Estimate" variant="primary" className="w-full">
              Free Estimate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
