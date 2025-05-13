"use client";

import React, { useState } from "react";

export function CustomAccordion({
  children,
  type = "single",
  className = "",
  ...props
}) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function CustomAccordionItem({
  children,
  value,
  className = "",
  ...props
}) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function CustomAccordionTrigger({
  children,
  icon,
  className = "",
  ...props
}) {
  return (
    <div className={`flex w-full items-center justify-between py-4 ${className}`} {...props}>
      <span>{children}</span>
      {icon}
    </div>
  );
}

export function CustomAccordionContent({
  children,
  className = "",
  ...props
}) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function CustomAccordionItemWithContext({
  children,
  value,
  className = "",
  ...props
}) {
  return (
    <CustomAccordionItem value={value} className={className} {...props}>
      {children}
    </CustomAccordionItem>
  );
}
