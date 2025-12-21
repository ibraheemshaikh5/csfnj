'use client';

import { useState } from 'react';

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isAdult: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form Section */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-8">Volunteer Registration</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-[#e9d5ff] px-4 py-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-[#6b21a8]"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-[#e9d5ff] px-4 py-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-[#6b21a8]"
                  required
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#e9d5ff] px-4 py-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-[#6b21a8]"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#e9d5ff] px-4 py-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-[#6b21a8]"
                required
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="adult"
                  checked={formData.isAdult}
                  onChange={(e) => setFormData({ ...formData, isAdult: e.target.checked })}
                  className="w-4 h-4"
                  required
                />
                <label htmlFor="adult" className="text-gray-700">
                  I am 14+ years old
                </label>
              </div>
              <p className="text-sm text-gray-600">
                Volunteers meet every other Sunday between 9:30am - 1:00pm.
              </p>
              <button
                type="submit"
                className="bg-[#1e3a8a] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1e40af] transition-colors"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Join Us Sidebar */}
          <div className="lg:w-80">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-8 bg-[#1e3a8a]"></div>
              <h3 className="text-2xl font-bold">Join Us</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Extra hands are always appreciated! Donate your time and become a part of the foundation!
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#1e3a8a] flex items-center justify-center hover:bg-[#1e40af] transition-colors"
                aria-label="Facebook"
              >
                <span className="text-white font-bold">f</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

