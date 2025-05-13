"use client";

import React from "react";

export function CustomCard({ children, className = "", ...props }) {
  return (
    <div 
      className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
