'use client';

import { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm('xbdrkezp');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
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
            message: '',
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
    
    // Submit to Formspree
    await handleSubmit(e);
  };

  return (
    <div>
      {showSuccess && (
        <div className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center transition-opacity duration-300 ${showSuccess ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-green-800 font-semibold text-lg">Thanks for contacting us!</p>
          <p className="text-green-700 mt-2">We'll get back to you soon.</p>
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
          <textarea
            name="message"
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
          <ValidationError prefix="Message" field="message" errors={state.errors} />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={state.submitting}
            className="bg-[#0720ff] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0618dd] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
      )}
    </div>
  );
}

