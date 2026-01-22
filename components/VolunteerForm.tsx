'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm, ValidationError } from '@formspree/react';
import { track } from '@vercel/analytics';

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
      track('form_submission', { form_type: 'volunteer' });
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
    <section className="pt-8 pb-8 sm:pt-12 sm:pb-12 md:pt-16 md:pb-16 px-4 bg-[#f7f7f7]">
      <div className="container mx-auto max-w-6xl">
        {/* Mobile: Show info banner above form */}
        <div className="lg:hidden mb-6 bg-[#0720ff]/10 rounded-lg p-3 flex items-center gap-3">
          <div className="w-1 h-10 bg-[#0720ff] rounded-full flex-shrink-0"></div>
          <p className="text-gray-700 text-sm">
            <strong>Volunteer with us!</strong> Every other Sunday, 9:30am - 1:00pm in Central Jersey
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Form Section */}
          <div className="flex-1 w-full">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Volunteer Registration</h2>
            {showSuccess && (
              <div className={`bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 text-center transition-opacity duration-300 ${showSuccess ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-green-800 font-semibold text-base sm:text-lg">Thanks for joining!</p>
                <p className="text-green-700 mt-1 sm:mt-2 text-sm sm:text-base">We'll be in touch soon.</p>
              </div>
            )}
            {showForm && (
            <form onSubmit={onSubmit} className={`space-y-3 sm:space-y-4 transition-opacity duration-300 ${showForm ? 'opacity-100' : 'opacity-0'}`} noValidate>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="volunteer-firstName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="volunteer-firstName"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData({ ...formData, firstName: e.target.value });
                      if (errors.firstName) {
                        const newErrors = { ...errors };
                        delete newErrors.firstName;
                        setErrors(newErrors);
                      }
                    }}
                    className={`bg-[#e1e2f8] text-[#1a2df3] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-[#1a2df3] placeholder:text-[#1a2df3]/60 w-full text-base ${
                      errors.firstName ? 'ring-2 ring-red-500 bg-red-50' : ''
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
                  )}
                  <ValidationError prefix="First Name" field="firstName" errors={state.errors} />
                </div>
                <div>
                  <label htmlFor="volunteer-lastName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="volunteer-lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData({ ...formData, lastName: e.target.value });
                      if (errors.lastName) {
                        const newErrors = { ...errors };
                        delete newErrors.lastName;
                        setErrors(newErrors);
                      }
                    }}
                    className={`bg-[#e1e2f8] text-[#1a2df3] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-[#1a2df3] placeholder:text-[#1a2df3]/60 w-full text-base ${
                      errors.lastName ? 'ring-2 ring-red-500 bg-red-50' : ''
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
                  )}
                  <ValidationError prefix="Last Name" field="lastName" errors={state.errors} />
                </div>
              </div>
              <div>
                <label htmlFor="volunteer-email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="volunteer-email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleEmailChange}
                  className={`w-full bg-[#e1e2f8] text-[#1a2df3] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-[#1a2df3] placeholder:text-[#1a2df3]/60 text-base ${
                    errors.email ? 'ring-2 ring-red-500 bg-red-50' : ''
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>
              <div>
                <label htmlFor="volunteer-phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="volunteer-phone"
                  name="phone"
                  placeholder="(123) 456-7890"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  pattern="[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}"
                  className={`w-full bg-[#e1e2f8] text-[#1a2df3] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-[#1a2df3] placeholder:text-[#1a2df3]/60 text-base ${
                    errors.phone ? 'ring-2 ring-red-500 bg-red-50' : ''
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                )}
                <ValidationError prefix="Phone" field="phone" errors={state.errors} />
              </div>
              <div className="flex items-center justify-between pt-1">
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
                    className="w-5 h-5 cursor-pointer"
                  />
                  <label htmlFor="adult" className={`text-sm ${errors.isAdult ? 'text-red-600' : 'text-gray-700'}`}>
                    I am 14+ years old
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="bg-[#0720ff] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#0618dd] active:bg-[#0515b8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {state.submitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
              {errors.isAdult && (
                <p className="text-xs text-red-600">{errors.isAdult}</p>
              )}
            </form>
            )}
          </div>

          {/* Make a Difference Sidebar - Desktop only */}
          <div className="hidden lg:block lg:w-80">
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

