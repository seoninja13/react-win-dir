"use client";

import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { RxChevronDown } from "react-icons/rx";

const useRelume = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const openOnMobileDropdownMenu = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const openOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(true);
  };
  const closeOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(false);
  };
  const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
  const animateMobileMenuButtonSpan = isMobileMenuOpen
    ? ["open", "rotatePhase"]
    : "closed";
  const animateDropdownMenu = isDropdownOpen ? "open" : "close";
  const animateDropdownMenuIcon = isDropdownOpen ? "rotated" : "initial";
  return {
    toggleMobileMenu,
    openOnDesktopDropdownMenu,
    closeOnDesktopDropdownMenu,
    openOnMobileDropdownMenu,
    animateMobileMenu,
    animateMobileMenuButtonSpan,
    animateDropdownMenu,
    animateDropdownMenuIcon,
  };
};

export function Navbar10() {
  const useActive = useRelume();
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
              Windows
            </a>
            <a
              href="#"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              Doors
            </a>
            <a
              href="#"
              className="relative block w-auto py-3 text-md lg:inline-block lg:px-4 lg:py-6 lg:text-base"
            >
              About Us
            </a>
            <div
              onMouseEnter={useActive.openOnDesktopDropdownMenu}
              onMouseLeave={useActive.closeOnDesktopDropdownMenu}
            >
              <button
                className="relative flex w-full items-center justify-between py-3 text-md whitespace-nowrap lg:w-auto lg:justify-start lg:gap-2 lg:px-4 lg:py-6 lg:text-base"
                onClick={useActive.openOnMobileDropdownMenu}
              >
                <span>Services</span>
                <motion.span
                  animate={useActive.animateDropdownMenuIcon}
                  variants={{
                    rotated: { rotate: 180 },
                    initial: { rotate: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <RxChevronDown />
                </motion.span>
              </button>
              <AnimatePresence>
                <motion.nav
                  variants={{
                    open: {
                      opacity: 1,
                      height: "var(--height-open, auto)",
                      display: "block",
                    },
                    close: {
                      opacity: 0,
                      height: "var(--height-close, 0)",
                      display: "none",
                    },
                  }}
                  animate={useActive.animateDropdownMenu}
                  initial="close"
                  exit="close"
                  transition={{ duration: 0.2 }}
                  className="top-full bottom-auto left-0 w-full max-w-full min-w-full overflow-hidden bg-background-primary lg:absolute lg:w-screen lg:border-b lg:border-border-primary lg:px-[5%] lg:[--height-close:auto]"
                >
                  <div className="mx-auto flex size-full max-w-full items-center justify-between">
                    <div className="flex w-full flex-col lg:flex-row">
                      <div className="w-full content-start py-4 sm:py-8 lg:max-w-[15rem] lg:pr-8">
                        <div className="grid auto-cols-fr auto-rows-max grid-cols-1 grid-rows-[max-content_max-content_max-content_max-content_max-content] gap-y-4">
                          <h4 className="text-sm leading-[1.4] font-semibold md:leading-[1.3]">
                            Our Services
                          </h4>
                          <a href="#">Window Installation</a>
                          <a href="#">Door Installation</a>
                          <a href="#">Window Repair</a>
                          <a href="#">Door Repair</a>
                          <a href="#">Energy Efficiency Upgrades</a>
                        </div>
                      </div>
                      <div className="relative flex w-full flex-wrap items-start justify-center pb-6 lg:items-stretch lg:pt-6">
                        <div className="grid w-full auto-cols-max auto-rows-max grid-cols-1 grid-rows-[max-content] gap-x-12 gap-y-8 sm:grid-cols-2 lg:gap-y-2">
                          <a
                            href="#"
                            className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                          >
                            <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                alt="Window Installation"
                                className="absolute inset-0 size-full object-cover"
                              />
                            </div>
                            <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                              <h5 className="mb-1 font-semibold">
                                Professional Installation
                              </h5>
                              <p className="text-sm">
                                Expert window and door installation services
                              </p>
                              <Button
                                title="Learn More"
                                variant="link"
                                size="link"
                                className="mt-2 w-fit text-sm underline"
                              >
                                Learn More
                              </Button>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                          >
                            <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                alt="Window Repair"
                                className="absolute inset-0 size-full object-cover"
                              />
                            </div>
                            <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                              <h5 className="mb-1 font-semibold">
                                Window Repair
                              </h5>
                              <p className="text-sm">
                                Fast and reliable window repair services
                              </p>
                              <Button
                                title="Learn More"
                                variant="link"
                                size="link"
                                className="mt-2 w-fit text-sm underline"
                              >
                                Learn More
                              </Button>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                          >
                            <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                alt="Door Installation"
                                className="absolute inset-0 size-full object-cover"
                              />
                            </div>
                            <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                              <h5 className="mb-1 font-semibold">
                                Door Installation
                              </h5>
                              <p className="text-sm">
                                Professional door installation services
                              </p>
                              <Button
                                title="Learn More"
                                variant="link"
                                size="link"
                                className="mt-2 w-fit text-sm underline"
                              >
                                Learn More
                              </Button>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                          >
                            <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                alt="Door Repair"
                                className="absolute inset-0 size-full object-cover"
                              />
                            </div>
                            <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                              <h5 className="mb-1 font-semibold">
                                Door Repair
                              </h5>
                              <p className="text-sm">
                                Expert door repair and maintenance
                              </p>
                              <Button
                                title="Learn More"
                                variant="link"
                                size="link"
                                className="mt-2 w-fit text-sm underline"
                              >
                                Learn More
                              </Button>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                          >
                            <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                alt="Energy Efficiency"
                                className="absolute inset-0 size-full object-cover"
                              />
                            </div>
                            <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                              <h5 className="mb-1 font-semibold">
                                Energy Efficiency
                              </h5>
                              <p className="text-sm">
                                Upgrade to energy-efficient windows and doors
                              </p>
                              <Button
                                title="Learn More"
                                variant="link"
                                size="link"
                                className="mt-2 w-fit text-sm underline"
                              >
                                Learn More
                              </Button>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="grid max-w-full auto-cols-fr grid-cols-1 items-start gap-x-6 gap-y-4 py-2 lg:grid-cols-[0.5fr_1fr] lg:gap-y-0"
                          >
                            <div className="relative flex w-full flex-col pt-[66.6%] lg:flex-row">
                              <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                alt="Custom Solutions"
                                className="absolute inset-0 size-full object-cover"
                              />
                            </div>
                            <div className="flex w-full flex-col justify-center self-center lg:w-auto">
                              <h5 className="mb-1 font-semibold">
                                Custom Solutions
                              </h5>
                              <p className="text-sm">
                                Tailored window and door solutions for your home
                              </p>
                              <Button
                                title="Learn More"
                                variant="link"
                                size="link"
                                className="mt-2 w-fit text-sm underline"
                              >
                                Learn More
                              </Button>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.nav>
              </AnimatePresence>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 lg:flex-row">
            <Button variant="outline">Get a Quote</Button>
            <Button>Contact Us</Button>
          </div>
        </div>
        <button
          className="relative z-[1] flex size-12 items-center justify-center lg:hidden"
          onClick={useActive.toggleMobileMenu}
        >
          <motion.span
            animate={useActive.animateMobileMenuButtonSpan}
            variants={{
              open: { rotate: 45, y: 6 },
              rotatePhase: { rotate: 45, y: 6 },
              closed: { rotate: 0, y: 0 },
            }}
            transition={{ duration: 0.2 }}
            className="absolute block h-0.5 w-6 bg-foreground-primary"
          ></motion.span>
          <motion.span
            animate={useActive.animateMobileMenu}
            variants={{
              open: { opacity: 0 },
              close: { opacity: 1 },
            }}
            transition={{ duration: 0.2 }}
            className="absolute block h-0.5 w-6 bg-foreground-primary"
          ></motion.span>
          <motion.span
            animate={useActive.animateMobileMenuButtonSpan}
            variants={{
              open: { rotate: -45, y: -6 },
              rotatePhase: { rotate: -45, y: -6 },
              closed: { rotate: 0, y: 0 },
            }}
            transition={{ duration: 0.2 }}
            className="absolute block h-0.5 w-6 bg-foreground-primary"
          ></motion.span>
        </button>
      </div>
    </section>
  );
}
