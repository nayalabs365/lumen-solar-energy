'use client';

import { useState } from 'react';

interface Step3Props {
  value: number;
  onComplete: (monthlyBill: number) => void;
  onBack: () => void;
}

export default function Step3Bill({ value, onComplete, onBack }: Step3Props) {
  const [billAmount, setBillAmount] = useState(value);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillAmount(parseInt(e.target.value));
  };

  const handleSubmit = () => {
    onComplete(billAmount);
  };

  // Calculate gradient percentage for slider
  const sliderPercent = ((billAmount - 30) / (500 - 30)) * 100;

  return (
    <div className="fixed top-[120px] bottom-0 left-0 right-0 grid grid-cols-1 md:grid-cols-2">
      {/* Left: Illustration Panel */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#fef7e6] to-[#fbe7a0] p-12">
        <div className="text-center">
          <div className="text-[4rem] mb-4">☀️</div>
          <div className="text-[3rem] mb-4">💰</div>
          <p className="text-navy font-serif text-2xl">Save up to 87% on your energy bill</p>
        </div>
      </div>

      {/* Right: Form Content */}
      <div className="flex items-center justify-center p-6 md:p-12 bg-white overflow-y-auto">
        <div className="w-full max-w-[500px] space-y-8">
          <h2 className="font-serif text-[2.8rem] leading-[1.2] text-navy">
            What&apos;s your monthly <em className="text-gold">energy bill?</em>
          </h2>

          {/* Bill Slider Card */}
          <div className="border-2 border-[#E5E7EB] rounded-3xl p-8 bg-warm-white">
            {/* Amount Display */}
            <div className="text-center mb-8">
              <div className="flex items-start justify-center mb-2">
                <span className="text-gold text-[2rem] font-bold mr-1">$</span>
                <span className="font-serif text-navy text-[3.4rem] font-normal leading-none">
                  {billAmount}
                </span>
              </div>
              <div className="text-text-light text-[0.95rem]">per month</div>
            </div>

            {/* Range Slider */}
            <div className="space-y-3">
              <input
                type="range"
                min="30"
                max="500"
                value={billAmount}
                onChange={handleSliderChange}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(90deg, #F59E0B ${sliderPercent}%, #E5E7EB ${sliderPercent}%)`,
                }}
              />
              <div className="flex justify-between text-[0.85rem] text-text-light">
                <span>$30</span>
                <span>$500+</span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleSubmit}
            className="w-full px-10 py-5 rounded-[50px] text-[1.1rem] font-bold bg-navy text-white hover:-translate-y-[2px] transition-all duration-300"
          >
            Continue
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
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: white;
          border: 3px solid #F59E0B;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          cursor: pointer;
        }
        input[type='range']::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: white;
          border: 3px solid #F59E0B;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
