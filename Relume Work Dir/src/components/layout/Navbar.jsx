"use client";

import React, { Fragment, useState } from "react";
import { Button } from "@relume_io/relume-ui";
import { RxChevronDown } from "react-icons/rx";

/**
 * Shared Site-Wide Navigation Component
 *
 * This is the single source of truth for navigation across all pages.
 * Contains the working navigation dropdown with images that was previously
 * only available on the home page.
 *
 * Features:
 * - Responsive design with mobile menu
 * - Services dropdown with 6 images
 * - Consistent branding and navigation links
 * - Site-wide consistency
 */
export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <section
      id="relume"
      className="relative z-[999] flex min-h-16 w-full items-center border-b border-border-primary bg-background-primary px-[5%] md:min-h-18"
    >
      <div className="mx-auto flex size-full max-w-full items-center justify-between">
        <a href="/">
          <img
            src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
            alt="Windows Doors CA Logo"
          />
        </a>
        <div className="flex h-auto flex-1 items-center justify-between lg:ml-6">
          <div className="flex flex-col items-center lg:flex-row">
            <a
              href="/"
              className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
            >
              Home
            </a>
            <div
              className="relative static lg:relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                className="flex w-full items-center justify-between gap-2 py-3 text-left text-md lg:flex-none lg:justify-start lg:px-4 lg:py-2 lg:text-base"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>Services</span>
                <RxChevronDown className={`size-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="fixed top-16 left-0 right-0 z-50 w-screen border border-border-primary bg-background-primary p-6 shadow-md">
                  <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <a
                    href="/windows"
                    className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                  >
                    <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                      <img
                        src="/images/home/home-nav-dropdown-5.png"
                        alt="Premium vinyl siding installation"
                        className="absolute inset-0 size-full object-cover"
                      />
                    </div>
                    <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                      <h5 className="mb-1 font-semibold">
                        Latest Trends
                      </h5>
                      <p className="text-sm">
                        Explore the latest in window and door designs.
                      </p>
                      <Button
                        title="Read More"
                        variant="link"
                        size="link"
                        className="mt-2 w-fit text-sm underline"
                      >
                        Read More
                      </Button>
                    </div>
                  </a>
                  <a
                    href="/windows"
                    className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                  >
                    <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                      <img
                        src="/images/home/home-nav-dropdown-7.png"
                        alt="Energy-efficient window technology"
                        className="absolute inset-0 size-full object-cover"
                      />
                    </div>
                    <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                      <h5 className="mb-1 font-semibold">
                        Energy Efficiency
                      </h5>
                      <p className="text-sm">
                        Discover how to save on energy bills today.
                      </p>
                      <Button
                        title="Read More"
                        variant="link"
                        size="link"
                        className="mt-2 w-fit text-sm underline"
                      >
                        Read More
                      </Button>
                    </div>
                  </a>
                  <a
                    href="/windows"
                    className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                  >
                    <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                      <img
                        src="/images/home/home-nav-dropdown-3.png"
                        alt="Professional window installation service"
                        className="absolute inset-0 size-full object-cover"
                      />
                    </div>
                    <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                      <h5 className="mb-1 font-semibold">
                        Installation Guide
                      </h5>
                      <p className="text-sm">
                        Learn the steps for a successful installation.
                      </p>
                      <Button
                        title="Read More"
                        variant="link"
                        size="link"
                        className="mt-2 w-fit text-sm underline"
                      >
                        Read More
                      </Button>
                    </div>
                  </a>
                  <a
                    href="/windows"
                    className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                  >
                    <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                      <img
                        src="/images/home/home-nav-dropdown-6.png"
                        alt="Satisfied customer with home renovation"
                        className="absolute inset-0 size-full object-cover"
                      />
                    </div>
                    <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                      <h5 className="mb-1 font-semibold">
                        Customer Stories
                      </h5>
                      <p className="text-sm">
                        See how we've transformed homes across Los
                        Angeles.
                      </p>
                      <Button
                        title="Read More"
                        variant="link"
                        size="link"
                        className="mt-2 w-fit text-sm underline"
                      >
                        Read More
                      </Button>
                    </div>
                  </a>
                  <a
                    href="/windows"
                    className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                  >
                    <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                      <img
                        src="/images/home/home-nav-dropdown-4.png"
                        alt="Expert door installation service"
                        className="absolute inset-0 size-full object-cover"
                      />
                    </div>
                    <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                      <h5 className="mb-1 font-semibold">
                        Maintenance Tips
                      </h5>
                      <p className="text-sm">
                        Keep your windows and doors in top shape.
                      </p>
                      <Button
                        title="Read More"
                        variant="link"
                        size="link"
                        className="mt-2 w-fit text-sm underline"
                      >
                        Read More
                      </Button>
                    </div>
                  </a>
                  <a
                    href="/windows"
                    className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                  >
                    <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                      <img
                        src="/images/home/home-nav-dropdown-8.png"
                        alt="Professional warranty and service guarantee"
                        className="absolute inset-0 size-full object-cover"
                      />
                    </div>
                    <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                      <h5 className="mb-1 font-semibold">
                        Warranty Information
                      </h5>
                      <p className="text-sm">
                        Understand our lifetime warranty and what it
                        covers.
                      </p>
                      <Button
                        title="Read More"
                        variant="link"
                        size="link"
                        className="mt-2 w-fit text-sm underline"
                      >
                        Read More
                      </Button>
                    </div>
                  </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <a
              href="/doors"
              className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
            >
              Doors
            </a>
            <a
              href="/about"
              className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
            >
              About
            </a>
            <a
              href="/contact"
              className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
            >
              Contact
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Button title="Get Estimate" variant="secondary">
              Get Estimate
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
