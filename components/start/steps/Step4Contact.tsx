'use client';

import { useState, useEffect } from 'react';
import MapView from '../MapView';

interface Step4Props {
  data: {
    fullName: string;
    email: string;
    phone: string;
    consent: boolean;
  };
  address: string;
  googleMapsLoaded: boolean;
  onComplete: (data: { fullName: string; email: string; phone: string; consent: boolean }) => void;
  onBack: () => void;
}

export default function Step4Contact({ data, address, googleMapsLoaded, onComplete, onBack }: Step4Props) {
  const [fullName, setFullName] = useState(data.fullName);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [consent, setConsent] = useState(data.consent);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Validate phone has exactly 10 digits
    const digitsOnly = phone.replace(/\D/g, '');
    setIsValid(
      fullName.trim() !== '' &&
      email.includes('@') &&
      digitsOnly.length === 10 &&
      consent
    );
  }, [fullName, email, phone, consent]);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    // Limit to 10 digits only
    const limited = cleaned.slice(0, 10);
    const match = limited.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`;
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = () => {
    if (isValid) {
      onComplete({ fullName, email, phone, consent });
    }
  };

  return (
    <div className="fixed top-[120px] bottom-0 left-0 right-0 grid grid-cols-1 md:grid-cols-2">
      {/* Left: Satellite Map Panel */}
      <div className="hidden md:block">
        <MapView address={address} googleMapsLoaded={googleMapsLoaded} />
      </div>

      {/* Right: Form Content */}
      <div className="flex items-center justify-center p-6 md:p-12 bg-white overflow-y-auto">
        <div className="w-full max-w-[500px] space-y-6">
          <h2 className="font-serif text-[2.8rem] leading-[1.2] text-navy">
            How should Lumen <em className="text-gold">reach you?</em>
          </h2>

          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-[0.78rem] font-semibold uppercase tracking-wide text-navy">
              Full Name <span className="text-gold">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="First and last name"
              className="w-full px-5 py-4 rounded-2xl bg-warm-white border-2 border-transparent text-[1.05rem] transition-all duration-300 focus:outline-none focus:border-gold focus:shadow-[0_0_0_4px_rgba(245,158,11,0.1)]"
              autoComplete="name"
            />
          </div>

          {/* Email + Phone Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-[0.78rem] font-semibold uppercase tracking-wide text-navy">
                Email <span className="text-gold">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full px-5 py-4 rounded-2xl bg-warm-white border-2 border-transparent text-[1.05rem] transition-all duration-300 focus:outline-none focus:border-gold focus:shadow-[0_0_0_4px_rgba(245,158,11,0.1)]"
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[0.78rem] font-semibold uppercase tracking-wide text-navy">
                Phone <span className="text-gold">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(555) 123-4567"
                className="w-full px-5 py-4 rounded-2xl bg-warm-white border-2 border-transparent text-[1.05rem] transition-all duration-300 focus:outline-none focus:border-gold focus:shadow-[0_0_0_4px_rgba(245,158,11,0.1)]"
                autoComplete="tel"
              />
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="flex gap-3">
            <button
              onClick={() => setConsent(!consent)}
              className={`flex-shrink-0 w-[22px] h-[22px] rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                consent ? 'bg-gold border-gold' : 'bg-white border-[#CBD5E1]'
              }`}
            >
              {consent && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
            <span className="text-[0.85rem] text-text-light leading-relaxed">
              We&apos;re here to help! Each time that you fill out this form, you agree to be contacted by phone call, pre-recorded voice, and/or text message at the telephone or mobile number that you entered above by Lumen Solar Concierge and by one (1) other company about solar and energy storage products and services. These calls/messages may be sent using automated telephone technology, even if your telephone or mobile number is currently listed on any state, federal or corporate &quot;Do Not Call&quot; list. Message and data rates may apply. You are not required to give your consent here as a condition of any purchase. I understand the <a href="/privacy-policy" target="_blank" className="text-navy font-semibold underline underline-offset-2">Privacy Policy</a> and agree to the <a href="/terms" target="_blank" className="text-navy font-semibold underline underline-offset-2">Terms & Conditions</a>.
            </span>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`w-full px-10 py-5 rounded-[50px] text-[1.1rem] font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
              isValid
                ? 'bg-gold text-navy hover:-translate-y-[2px] cursor-pointer shadow-[0_8px_30px_rgba(245,158,11,0.3)]'
                : 'bg-[#CBD5E1] text-white cursor-not-allowed'
            }`}
          >
            Get My Free Solar Report
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>

          {/* Back Button */}
          <button
            onClick={onBack}
            className="w-full flex items-center justify-center gap-2 text-text-light hover:text-navy transition-colors duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5" />
              <path d="M12 19 5 12l7-7" />
            </svg>
            Back
          </button>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-2 text-[0.78rem] text-text-light">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Your information is never sold. Ever.
          </div>
        </div>
      </div>
    </div>
  );
}
