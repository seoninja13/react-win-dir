"use client";

import React, { useState } from "react";
import { RxPlus } from "react-icons/rx";

export function Faq4() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (itemId) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg">
        <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            FAQs
          </h2>
          <p className="md:text-md">
            Discover answers to your questions about Bay & Bow windows and their
            benefits.
          </p>
        </div>
        <div className="grid items-start justify-stretch gap-4">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-none px-5 md:px-6">
              <button
                className="flex w-full items-center justify-between py-4 text-left font-medium md:py-5 md:text-md"
                onClick={() => toggleItem("item-0")}
              >
                <span>What are Bay windows?</span>
                <RxPlus
                  className={`size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8 ${
                    openItems["item-0"] ? "rotate-45" : ""
                  }`}
                />
              </button>
              {openItems["item-0"] && (
                <div className="pb-4 md:pb-6">
                  Bay windows are a combination of three or more windows that
                  project outward from your home. They create a beautiful nook and
                  enhance the curb appeal. This design allows for more natural
                  light and a wider view of your surroundings.
                </div>
              )}
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-none px-5 md:px-6">
              <button
                className="flex w-full items-center justify-between py-4 text-left font-medium md:py-5 md:text-md"
                onClick={() => toggleItem("item-1")}
              >
                <span>What are Bow windows?</span>
                <RxPlus
                  className={`size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8 ${
                    openItems["item-1"] ? "rotate-45" : ""
                  }`}
                />
              </button>
              {openItems["item-1"] && (
                <div className="pb-4 md:pb-6">
                  Bow windows consist of four or more windows that form a gentle
                  curve. They provide a more rounded appearance and can create a
                  spacious feel inside your home. Like Bay windows, they also
                  increase natural light and enhance aesthetics.
                </div>
              )}
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-none px-5 md:px-6">
              <button
                className="flex w-full items-center justify-between py-4 text-left font-medium md:py-5 md:text-md"
                onClick={() => toggleItem("item-2")}
              >
                <span>Are they energy efficient?</span>
                <RxPlus
                  className={`size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8 ${
                    openItems["item-2"] ? "rotate-45" : ""
                  }`}
                />
              </button>
              {openItems["item-2"] && (
                <div className="pb-4 md:pb-6">
                  Yes, Bay and Bow windows are designed with energy efficiency in
                  mind. They feature insulated glass and durable frames that help
                  maintain your home's temperature. This can lead to lower energy
                  bills and a more comfortable living space.
                </div>
              )}
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-none px-5 md:px-6">
              <button
                className="flex w-full items-center justify-between py-4 text-left font-medium md:py-5 md:text-md"
                onClick={() => toggleItem("item-3")}
              >
                <span>How do I clean them?</span>
                <RxPlus
                  className={`size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8 ${
                    openItems["item-3"] ? "rotate-45" : ""
                  }`}
                />
              </button>
              {openItems["item-3"] && (
                <div className="pb-4 md:pb-6">
                  Cleaning Bay and Bow windows is straightforward. Simply use a
                  soft cloth and a mild cleaning solution to wipe down the glass
                  and frames. Ensure you follow the manufacturer's guidelines for
                  any specific care instructions.
                </div>
              )}
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-none px-5 md:px-6">
              <button
                className="flex w-full items-center justify-between py-4 text-left font-medium md:py-5 md:text-md"
                onClick={() => toggleItem("item-4")}
              >
                <span>Can I customize them?</span>
                <RxPlus
                  className={`size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8 ${
                    openItems["item-4"] ? "rotate-45" : ""
                  }`}
                />
              </button>
              {openItems["item-4"] && (
                <div className="pb-4 md:pb-6">
                  Absolutely! Our Bay and Bow windows come in various styles,
                  colors, and configurations. You can choose the perfect
                  combination to match your home's aesthetic and personal
                  preferences.
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Still have questions?
          </h4>
          <p className="md:text-md">Our team is here to help you!</p>
          <div className="mt-6 md:mt-8">
            <button className="inline-flex h-12 items-center justify-center rounded-lg bg-gray-800 px-6 text-center font-medium text-white transition-colors hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              Contact
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
