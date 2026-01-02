'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm, ValidationError } from '@formspree/react';

export default function VolunteerForm() {
  const [state, handleSubmit] = useForm('xdandver');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isAdult: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const validatePhone = (phone: string): boolean => {
    // Accepts formats: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890, +1 123 456 7890
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
      setShowForm(false);
      
      const timer = setTimeout(() => {
        // Fade out success message
        setShowSuccess(false);
        // Wait for fade transition, then reset form and fade in
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            isAdult: false,
          });
          setErrors({});
          setShowForm(true);
        }, 300); // Wait for fade out transition
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, phone: value });
    
    if (errors.phone) {
      const newErrors = { ...errors };
      delete newErrors.phone;
      setErrors(newErrors);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    
    if (value && !validateEmail(value)) {
      setErrors({ ...errors, email: 'Please enter a valid email address' });
    } else {
      const newErrors = { ...errors };
      delete newErrors.email;
      setErrors(newErrors);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (e.g., (123) 456-7890)';
    }
    
    // Validate checkbox
    if (!formData.isAdult) {
      newErrors.isAdult = 'All volunteers must be 14+';
    }
    
    setErrors(newErrors);
    
    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    // Submit to Formspree
    await handleSubmit(e);
  };

  return (
    <section className="py-16 px-4 bg-[#f7f7f7]">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Form Section */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-8">Volunteer Registration</h2>
            {showSuccess && (
              <div className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center transition-opacity duration-300 ${showSuccess ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-green-800 font-semibold text-lg">Thanks for joining!</p>
                <p className="text-green-700 mt-2">We'll be in touch soon.</p>
              </div>
            )}
            {showForm && (
            <form onSubmit={onSubmit} className={`space-y-4 transition-opacity duration-300 ${showForm ? 'opacity-100' : 'opacity-0'}`} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData({ ...formData, firstName: e.target.value });
                      if (errors.firstName) {
                        const newErrors = { ...errors };
                        delete newErrors.firstName;
                        setErrors(newErrors);
                      }
                    }}
                    className={`bg-[#e1e2f8] text-[#1a2df3] px-4 py-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-[#1a2df3] placeholder:text-[#1a2df3]/60 w-full ${
                      errors.firstName ? 'ring-2 ring-red-500 bg-red-50' : ''
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                  <ValidationError prefix="First Name" field="firstName" errors={state.errors} />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData({ ...formData, lastName: e.target.value });
                      if (errors.lastName) {
                        const newErrors = { ...errors };
                        delete newErrors.lastName;
                        setErrors(newErrors);
                      }
                    }}
                    className={`bg-[#e1e2f8] text-[#1a2df3] px-4 py-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-[#1a2df3] placeholder:text-[#1a2df3]/60 w-full ${
                      errors.lastName ? 'ring-2 ring-red-500 bg-red-50' : ''
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                  <ValidationError prefix="Last Name" field="lastName" errors={state.errors} />
                </div>
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  className={`w-full bg-[#e1e2f8] text-[#1a2df3] px-4 py-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-[#1a2df3] placeholder:text-[#1a2df3]/60 ${
                    errors.email ? 'ring-2 ring-red-500 bg-red-50' : ''
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (e.g., (123) 456-7890)"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  pattern="[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}"
                  className={`w-full bg-[#e1e2f8] text-[#1a2df3] px-4 py-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-[#1a2df3] placeholder:text-[#1a2df3]/60 ${
                    errors.phone ? 'ring-2 ring-red-500 bg-red-50' : ''
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
                <ValidationError prefix="Phone" field="phone" errors={state.errors} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="adult"
                    checked={formData.isAdult}
                    onChange={(e) => {
                      setFormData({ ...formData, isAdult: e.target.checked });
                      if (errors.isAdult) {
                        const newErrors = { ...errors };
                        delete newErrors.isAdult;
                        setErrors(newErrors);
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <label htmlFor="adult" className={errors.isAdult ? 'text-red-600' : 'text-gray-700'}>
                    I am 14+ years old
                  </label>
                </div>
                {errors.isAdult && (
                  <p className="mt-1 text-sm text-red-600">{errors.isAdult}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={state.submitting}
                className="bg-[#0720ff] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0618dd] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.submitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
            )}
          </div>

          {/* Make a Difference Sidebar */}
          <div className="lg:w-80">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-8 bg-[#0720ff]"></div>
              <h3 className="text-2xl font-bold">Make a Difference!</h3>
            </div>
            <p className="text-gray-700 mb-5">
              Care & Share Foundation bi-weekly volunteering is every other Sunday between 9:30am and 1:00pm in Central Jersey
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/p/Care-Share-Foundation-100083404179179/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[35px] h-[35px] flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <Image
                  src="/images/facebook-icon.png"
                  alt="Facebook"
                  width={35}
                  height={35}
                  className="object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

