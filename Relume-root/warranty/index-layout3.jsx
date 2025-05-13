import React from "react";
import { Navbar10 } from "./components/Navbar10";
import { Header44 } from "./components/Header44";
import { Layout3 } from "./components/Layout3";

export default function Page() {
  return (
    <div>
      <Navbar10 />
      <Header44 />
      <Layout3 />
      <div className="p-10">
        <h1 className="text-3xl font-bold">Warranty Page</h1>
        <p className="mt-4">This is a version with Navbar, Header, and Layout3 components.</p>
      </div>
    </div>
  );
}
