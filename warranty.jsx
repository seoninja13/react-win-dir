'use client';

import React from 'react';

export default function Warranty() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Lifetime Warranty Promise</h1>
      <p className="mb-4">
        Discover the peace of mind that comes with our limited lifetime warranty on all products.
      </p>
      
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">Understanding Your Warranty Registration Process</h2>
        <p className="mb-4">
          Registering your warranty is a simple and essential step to ensure your investment is protected. 
          Follow our easy process to secure your limited lifetime warranty today.
        </p>
      </div>
      
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">Comprehensive Warranty Coverage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border p-4 rounded">
            <h3 className="text-xl font-bold mb-2">Lifetime Protection</h3>
            <p>Our warranty ensures peace of mind with extensive coverage on all products.</p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-xl font-bold mb-2">What Our Warranty Covers</h3>
            <p>Our warranty covers defects in materials and workmanship under normal use.</p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-xl font-bold mb-2">What Your Warranty Does Not Cover</h3>
            <p>Damage caused by improper installation or misuse is not covered.</p>
          </div>
        </div>
      </div>
      
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="border p-4 rounded mb-4">
          <h3 className="text-xl font-bold mb-2">What does the warranty cover?</h3>
          <p>
            Our warranty covers defects in materials and workmanship for the lifetime of the product. 
            This includes issues like peeling, cracking, or warping. If you experience any of these problems, 
            we will repair or replace your windows or doors at no cost.
          </p>
        </div>
        <div className="border p-4 rounded mb-4">
          <h3 className="text-xl font-bold mb-2">How do I file a warranty claim?</h3>
          <p>
            To initiate a claim, please reach out to our customer service team.
          </p>
        </div>
      </div>
      
      <div className="my-8 bg-blue-100 p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">Have Questions About Your Warranty?</h2>
        <p className="mb-4">
          Our team is here to assist you with any warranty inquiries you may have.
        </p>
        <div className="flex gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Contact</button>
          <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded">Learn More</button>
        </div>
      </div>
    </div>
  );
}
