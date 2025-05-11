"use client";

import { Button } from "@relume_io/relume-ui";
import React, { useState } from "react";

export function Navbar10() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <section
      id="relume"
      className="relative z-[999] flex min-h-16 w-full items-center border-b border-border-primary bg-background-primary px-[5%] md:min-h-18"
    >
      <div className="mx-auto flex size-full max-w-full items-center justify-between">
        <a href="#">
          <img
            src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
            alt="Logo image"
          />
        </a>
        <div className="absolute hidden h-screen overflow-auto border-b border-border-primary bg-background-primary px-[5%] pt-4 pb-24 md:pb-0 lg:static lg:ml-6 lg:flex lg:h-auto lg:flex-1 lg:items-center lg:justify-between lg:border-none lg:bg-none lg:px-0 lg:pt-0">
          <div className="flex flex-col items-center lg:flex-row">
            <a
              href="#"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Home Page
            </a>
            <a
              href="#"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              About Us
            </a>
            <a
              href="#"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Contact Us
            </a>
            <div>
              <button
                className="relative flex w-full items-center justify-between py-3 text-md whitespace-nowrap lg:w-auto lg:justify-start lg:gap-2 lg:px-4 lg:py-6 lg:text-base"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <span>Services</span>
                <span className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              <nav
                className={`top-full bottom-auto left-0 w-full max-w-full min-w-full overflow-hidden bg-background-primary lg:absolute lg:w-screen lg:border-b lg:border-border-primary lg:px-[5%] ${isDropdownOpen ? 'block' : 'hidden'}`}
              >
                <div className="mx-auto flex size-full max-w-full items-center justify-between">
                  <div className="flex w-full flex-col lg:flex-row">
                    <div className="w-full content-start py-4 sm:py-8 lg:max-w-[15rem] lg:pr-8">
                      <div className="grid auto-cols-fr auto-rows-max grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content_max-content] gap-y-4">
                        <h4 className="text-sm leading-[1.4] font-semibold md:leading-[1.3]">
                          Blog Topics
                        </h4>
                        <a href="#">Window Styles</a>
                        <a href="#">Door Options</a>
                        <a href="#">Energy Savings</a>
                        <a href="#">Installation Tips</a>
                        <a href="#">Customer Reviews</a>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button title="Get Quote" variant="secondary" size="sm">
              Get Quote
            </Button>
            <Button title="Contact" size="sm">
              Contact
            </Button>
          </div>
        </div>
        <button
          className="-mr-2 flex size-12 cursor-pointer flex-col items-center justify-center lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`my-[3px] h-0.5 w-6 bg-black transition-transform duration-300 ${isMobileMenuOpen ? 'translate-y-2 -rotate-45' : ''}`} />
          <span className={`my-[3px] h-0.5 w-6 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`my-[3px] h-0.5 w-6 bg-black transition-transform duration-300 ${isMobileMenuOpen ? '-translate-y-2 rotate-45' : ''}`} />
        </button>
      </div>
      <div className={`absolute top-full right-0 left-0 w-full overflow-hidden bg-background-primary lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="mx-auto flex size-full max-w-full items-center justify-between">
          <div className="flex w-full flex-col">
            <a href="#" className="py-3 text-md">Home Page</a>
            <a href="#" className="py-3 text-md">About Us</a>
            <a href="#" className="py-3 text-md">Contact Us</a>
            <a href="#" className="py-3 text-md">Services</a>
          </div>
        </div>
      </div>
    </section>
  );
}
