'use client';

import { useState, useEffect } from 'react';

interface Step1Props {
  data: { address: string; ownership: string };
  onComplete: (data: { address: string; ownership: string }) => void;
}

export default function Step1Address({ data, onComplete }: Step1Props) {
  const [address, setAddress] = useState(data.address);
  const [ownership, setOwnership] = useState(data.ownership);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(address.length > 3 && ownership !== '');
  }, [address, ownership]);

  const handleSubmit = () => {
    if (isValid) {
      onComplete({ address, ownership });
    }
  };

  return (
    <div className="fixed top-[120px] bottom-0 left-0 right-0 grid grid-cols-1 md:grid-cols-2">
      {/* Left: Illustration Panel */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#e8f0f8] to-[#c5d9ef] p-12">
        <div className="text-center">
          <div className="text-[4rem] mb-4">🏠</div>
          <p className="text-navy font-serif text-2xl">Your solar journey starts here</p>
        </div>
      </div>

      {/* Right: Form Content */}
      <div className="flex items-center justify-center p-6 md:p-12 bg-white overflow-y-auto">
        <div className="w-full max-w-[500px] space-y-8">
          <h2 className="font-serif text-[2.8rem] leading-[1.2] text-navy">
            Where would you like to go <em className="text-gold">solar?</em>
          </h2>

          {/* Address Field */}
          <div className="space-y-2">
            <label className="block text-[0.78rem] font-semibold uppercase tracking-wide text-navy">
              Your Address <span className="text-gold">*</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your home address"
              className="w-full px-5 py-4 rounded-2xl bg-warm-white border-2 border-transparent text-[1.05rem] transition-all duration-300 focus:outline-none focus:border-gold focus:shadow-[0_0_0_4px_rgba(245,158,11,0.1)]"
              autoComplete="street-address"
            />
          </div>

          {/* Ownership Radio Group */}
          <div className="space-y-2">
            <label className="block text-[0.78rem] font-semibold uppercase tracking-wide text-navy">
              Ownership Status <span className="text-gold">*</span>
            </label>
            <div className="space-y-3">
              {['I own this home', 'I rent this home'].map((option) => (
                <button
                  key={option}
                  onClick={() => setOwnership(option)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 ${
                    ownership === option
                      ? 'border-gold bg-gold-pale'
                      : 'border-[#E5E7EB] bg-white hover:border-gold-light hover:bg-warm-white'
                  }`}
                >
                  <div className={`relative w-6 h-6 rounded-full border-2 flex-shrink-0 transition-all duration-300 ${
                    ownership === option ? 'border-gold' : 'border-[#CBD5E1]'
                  }`}>
                    <div className={`absolute inset-[3px] rounded-full bg-gold transition-transform duration-300 ${
                      ownership === option ? 'scale-100' : 'scale-0'
                    }`} />
                  </div>
                  <span className="text-[1.05rem]">{option}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`w-full px-10 py-5 rounded-[50px] text-[1.1rem] font-bold transition-all duration-300 ${
              isValid
                ? 'bg-navy text-white hover:-translate-y-[2px] cursor-pointer'
                : 'bg-[#CBD5E1] text-white cursor-not-allowed'
            }`}
          >
            Continue
          </button>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-2 text-[0.78rem] text-text-light">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Your info stays with Lumen. Always.
          </div>
        </div>
      </div>
    </div>
  );
}
