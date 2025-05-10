"use client";

import React from "react";
import { Navbar10 } from "../../components/navigation/Navbar10";
import { Header47 } from "../../components/header/Header47";
import { Header15 } from "../../components/header/Header15";
import { Layout6 } from "../../components/layout/Layout6";
import { Layout250 } from "../../components/layout/Layout250";
import { Layout4 } from "../../components/layout/Layout4";
import { Testimonial14 } from "../../components/testimonial/Testimonial14";
import { Layout251 } from "../../components/layout/Layout251";
import { Layout4_1 } from "../../components/layout/Layout4_1";
import { Gallery4 } from "../../components/gallery/Gallery4";
import { Cta1 } from "../../components/cta/Cta1";
import { Footer4 } from "../../components/footer/Footer4";

export default function HomePage() {
  return (
    <div>
      <Navbar10 />
      <Header47
        tagline="Quality"
        heading="Windows & Doors"
        description="Transform your home with our premium replacement windows and doors. Experience energy efficiency and style, all backed by a lifetime warranty."
        buttons={[
          { title: "Estimate", variant: "primary" },
          { title: "Call", variant: "secondary" },
        ]}
      />
      <Header15
        heading="Premium Replacement Windows & Doors for Your Home"
        description="Transform your living space with our energy-efficient windows and doors. Experience quality craftsmanship and exceptional service that you can trust."
        buttons={[
          { title: "Get a Free Estimate", variant: "primary" },
          { title: "Explore", variant: "secondary" },
        ]}
        image={{
          src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
          alt: "Relume placeholder image",
        }}
      />
      <Layout6 />
      <Layout250 />
      <Layout4 />
      <Testimonial14 />
      <Layout251 />
      <Layout4_1 />
      <Gallery4 />
      <Cta1 />
      <Footer4 />
    </div>
  );
}
