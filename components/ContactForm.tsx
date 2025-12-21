'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePhone = (phone: string): boolean => {
    // Accepts formats: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890, +1 123 456 7890
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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

  const handleSubmit = (e: React.FormEvent) => {
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
    
    // Validate email (only if provided)
    if (formData.email.trim() && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (e.g., (123) 456-7890)';
    }
    
    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    
    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
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
          </div>
          <div>
            <input
              type="text"
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
          </div>
        </div>
        <div>
          <input
            type="email"
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
        </div>
        <div>
          <input
            type="tel"
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
        </div>
        <div>
          <textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              if (errors.message) {
                const newErrors = { ...errors };
                delete newErrors.message;
                setErrors(newErrors);
              }
            }}
            rows={6}
            className={`w-full bg-[#e1e2f8] text-[#1a2df3] px-4 py-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-[#1a2df3] placeholder:text-[#1a2df3]/60 resize-none ${
              errors.message ? 'ring-2 ring-red-500 bg-red-50' : ''
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#0720ff] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0618dd] transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
