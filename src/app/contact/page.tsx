'use client';

import React, { useState } from 'react';
import { Button } from '@relume_io/relume-ui';
import Header from '@/components/Header';
import Footer4 from '@/components/Footer4';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    message: '',
    projectType: '',
    howDidYouHear: '',
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({
      submitted: true,
      success: false,
      message: 'Submitting your request...',
    });

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for contacting us! We will get back to you shortly.',
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        message: '',
        projectType: '',
        howDidYouHear: '',
      });
    }, 1500);
  };

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Contact Us</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            We&apos;re here to help with all your window, door, siding, and roofing needs. Contact us today for a free estimate or to learn more about our products and services.
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4 text-4xl">📞</div>
              <h3 className="mb-2 text-xl font-bold">Phone</h3>
              <p className="mb-2 text-gray-600">Call us for immediate assistance</p>
              <a href="tel:(310) 919-2352" className="text-xl font-bold text-blue-600 hover:underline">
                (310) 919-2352
              </a>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4 text-4xl">✉️</div>
              <h3 className="mb-2 text-xl font-bold">Email</h3>
              <p className="mb-2 text-gray-600">Send us an email anytime</p>
              <a href="mailto:info@windowworldla.com" className="text-xl font-bold text-blue-600 hover:underline">
                info@windowworldla.com
              </a>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4 text-4xl">📍</div>
              <h3 className="mb-2 text-xl font-bold">Visit Us</h3>
              <p className="mb-2 text-gray-600">Come to our showroom</p>
              <address className="not-italic text-gray-600">
                12345 Main Street<br />
                Los Angeles, CA 90001
              </address>
              <p className="mt-2 text-gray-600">
                <strong>Hours:</strong> Mon-Fri 8am-5pm, Sat 9am-3pm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-center text-3xl font-bold">Request a Free Estimate</h2>
            {formStatus.submitted && formStatus.success ? (
              <div className="rounded-lg bg-green-100 p-4 text-center text-green-700">
                <p className="text-lg font-semibold">{formStatus.message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-700">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-700">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-700">
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-700">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="state" className="mb-2 block text-sm font-medium text-gray-700">
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="mb-2 block text-sm font-medium text-gray-700">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="projectType" className="mb-2 block text-sm font-medium text-gray-700">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="">Select a project type</option>
                      <option value="Windows">Windows</option>
                      <option value="Doors">Doors</option>
                      <option value="Siding">Vinyl Siding</option>
                      <option value="Roofing">Roofing</option>
                      <option value="Multiple">Multiple Projects</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="howDidYouHear" className="mb-2 block text-sm font-medium text-gray-700">
                      How did you hear about us?
                    </label>
                    <select
                      id="howDidYouHear"
                      name="howDidYouHear"
                      value={formData.howDidYouHear}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="">Select an option</option>
                      <option value="Internet Search">Internet Search</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Friend/Family">Friend/Family Referral</option>
                      <option value="TV/Radio">TV/Radio</option>
                      <option value="Print Ad">Print Ad</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="text-center">
                  <Button
                    title="Submit Request"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    type="submit"
                    disabled={formStatus.submitted && !formStatus.success}
                  >
                    {formStatus.submitted && !formStatus.success ? 'Submitting...' : 'Submit Request'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Location</h2>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-lg shadow-lg">
            <div className="aspect-w-16 aspect-h-9 h-[400px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27405770525!2d-118.69192047471653!3d34.02016130653294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1651234567890!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Window World LA Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer4 />
    </div>
  );
}
