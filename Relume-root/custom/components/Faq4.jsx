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
            Find answers to your questions about custom windows and their
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
                <span>What are custom shapes?</span>
                <RxPlus
                  className={`size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8 ${
                    openItems["item-0"] ? "rotate-45" : ""
                  }`}
                />
              </button>
              {openItems["item-0"] && (
                <div className="pb-4 md:pb-6">
                  Custom shapes are uniquely designed window styles tailored to
                  fit your home's architecture. They can enhance the aesthetic
                  appeal and functionality of your space. Choose from various
                  designs to match your vision.
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
                <span>Are they energy efficient?</span>
                <RxPlus
                  className={`size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8 ${
                    openItems["item-1"] ? "rotate-45" : ""
                  }`}
                />
              </button>
              {openItems["item-1"] && (
                <div className="pb-4 md:pb-6">
                  Yes, our custom windows are designed with energy efficiency in
                  mind. They feature insulated panes and Low-E glass to minimize
                  energy loss. This helps keep your home comfortable while
                  reducing utility bills.
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
                <span>How are they installed?</span>
                <RxPlus
                  className={`size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8 ${
                    openItems["item-2"] ? "rotate-45" : ""
                  }`}
                />
              </button>
              {openItems["item-2"] && (
                <div className="pb-4 md:pb-6">
                  Installation is performed by our skilled professionals who
                  ensure a precise fit. We follow best practices to maintain the
                  integrity of your home. Our team will guide you through the
                  entire process.
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
                <span>What materials are used?</span>
                <RxPlus
                  className={`size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8 ${
                    openItems["item-3"] ? "rotate-45" : ""
                  }`}
                />
              </button>
              {openItems["item-3"] && (
                <div className="pb-4 md:pb-6">
                  We use high-quality materials to ensure durability and
                  performance. Our frames are constructed to withstand the
                  elements while providing excellent insulation. You can choose
                  from a variety of finishes to match your style.
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
                <span>Can I see samples?</span>
                <RxPlus
                  className={`size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8 ${
                    openItems["item-4"] ? "rotate-45" : ""
                  }`}
                />
              </button>
              {openItems["item-4"] && (
                <div className="pb-4 md:pb-6">
                  Absolutely! We offer a visualizer tool that allows you to see
                  how different styles will look on your home. You can upload a
                  photo of your house or choose from our gallery. This helps you
                  make an informed decision.
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Still have questions?
          </h4>
          <p className="md:text-md">Reach out to our team for assistance.</p>
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
