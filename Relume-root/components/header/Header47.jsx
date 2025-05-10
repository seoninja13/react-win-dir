"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

/**
 * @typedef {Object} Props
 * @property {string} tagline
 * @property {string} heading
 * @property {string} description
 * @property {Array<import('@relume_io/relume-ui').ButtonProps>} buttons
 */

/**
 * @typedef {React.ComponentPropsWithoutRef<"section"> & Props} Header47Props
 */

/**
 * Header47 Component
 *
 * A split header component with a title on the left and description with buttons on the right.
 *
 * @component
 * @source Relume-DO-NOT-EDIT/www.windowworldla.com/home/components/Header47.jsx
 */
/**
 * @param {Header47Props} props
 */
export function Header47(props) {
  const { tagline, heading, description, buttons, ...rest } = {
    ...defaultProps,
    ...props,
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28" {...rest}>
      <div className="container">
        <div className="flex flex-col gap-5 md:flex-row md:gap-12 lg:gap-20">
          <div className="w-full max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h1 className="text-6xl font-bold md:text-9xl lg:text-10xl">
              {heading}
            </h1>
          </div>
          <div className="w-full max-w-lg">
            <p className="md:text-md">
              {description}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button
                  key={`${button.title}-${index}`}
                  variant={button.variant}
                  size={button.size}
                  iconRight={button.iconRight}
                  iconLeft={button.iconLeft}
                >
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const defaultProps = {
  tagline: "Quality",
  heading: "Windows & Doors",
  description: "Transform your home with our premium replacement windows and doors. Experience energy efficiency and style, all backed by a lifetime warranty.",
  buttons: [
    { title: "Estimate", variant: "primary" },
    { title: "Call", variant: "secondary" },
  ],
};
