"use client";

import React from "react";

export function SimpleNavbar() {
  return (
    <section className="relative z-[999] flex min-h-16 w-full items-center border-b border-gray-200 bg-white px-[5%] md:min-h-18">
      <div className="mx-auto flex size-full max-w-full items-center justify-between">
        <a href="#">
          <img
            src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
            alt="Logo image"
          />
        </a>
        <div className="flex items-center gap-4">
          <a href="#" className="px-4 py-2">Home</a>
          <a href="#" className="px-4 py-2">About</a>
          <a href="#" className="px-4 py-2">Contact</a>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm transition-colors hover:bg-gray-100">
            Get Quote
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
            Contact
          </button>
        </div>
      </div>
    </section>
  );
}
