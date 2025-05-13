import React from "react";
import { Navbar10 } from "./components/Navbar10";
import { Footer4 } from "./components/Footer4";

export default function Page() {
  return (
    <div>
      <Navbar10 />
      <div className="p-10">
        <h1 className="text-3xl font-bold">Warranty Page</h1>
        <p className="mt-4">This is a minimal version of the warranty page.</p>
      </div>
      <Footer4 />
    </div>
  );
}
