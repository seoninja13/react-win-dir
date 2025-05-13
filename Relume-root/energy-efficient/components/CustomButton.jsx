"use client";

import React from "react";

export function CustomButton({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "", 
  onClick,
  ...props 
}) {
  const getButtonClasses = () => {
    let baseClasses = "inline-flex items-center justify-center";
    
    // Size variants
    if (size === "sm") {
      baseClasses += " h-10 px-4 text-sm";
    } else if (size === "md") {
      baseClasses += " h-12 px-6";
    } else if (size === "lg") {
      baseClasses += " h-14 px-8 text-lg";
    } else if (size === "link") {
      baseClasses += " p-0";
    }
    
    // Style variants
    if (variant === "primary") {
      baseClasses += " rounded-lg bg-gray-800 text-center font-medium text-white transition-colors hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    } else if (variant === "secondary") {
      baseClasses += " rounded-lg border border-gray-800 bg-transparent text-center font-medium text-gray-800 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    } else if (variant === "link") {
      baseClasses += " text-gray-800 hover:underline";
    }
    
    return `${baseClasses} ${className}`;
  };
  
  return (
    <button className={getButtonClasses()} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
