"use client";

import React from "react";

export function Header46() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex flex-wrap items-center justify-start gap-4 md:mb-12">
            <div className="flex items-center justify-start gap-2">
              <div className="text-sm font-medium">Blog</div>
              <div className="text-sm font-medium">/</div>
              <div className="text-sm font-medium">Category</div>
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
            Blog Post Title: How to Choose the Right Windows for Your Home
          </h1>
          <div className="mb-8 flex flex-wrap items-center justify-start gap-4 md:mb-12">
            <div className="flex items-center justify-start gap-2">
              <div className="text-sm font-medium">May 11, 2025</div>
              <div className="text-sm font-medium">•</div>
              <div className="text-sm font-medium">5 min read</div>
            </div>
            <div className="flex items-center justify-start gap-2">
              <div className="text-sm font-medium">By John Doe</div>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Modern home with large windows"
            className="h-auto w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}
