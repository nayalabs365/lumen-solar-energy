'use client';

import { useEffect, useState } from 'react';

interface LocationLoaderProps {
  address: string;
  onComplete: () => void;
}

export default function LocationLoader({ address, onComplete }: LocationLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    '📍 Locating your property...',
    '🛰️ Loading satellite imagery...',
    '☀️ Analyzing sunlight exposure...',
  ];

  useEffect(() => {
    // Step through the loading messages
    const timer1 = setTimeout(() => setCurrentStep(1), 1000);
    const timer2 = setTimeout(() => setCurrentStep(2), 2000);
    const timer3 = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed top-[120px] bottom-0 left-0 right-0 flex items-center justify-center bg-gradient-to-br from-[#e8f0f8] to-[#c5d9ef]">
      <div className="text-center max-w-md px-6">
        {/* Animated sun icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 animate-spin-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="20" fill="#F59E0B" />
              <g stroke="#F59E0B" strokeWidth="4" strokeLinecap="round">
                <line x1="50" y1="10" x2="50" y2="20" />
                <line x1="50" y1="80" x2="50" y2="90" />
                <line x1="10" y1="50" x2="20" y2="50" />
                <line x1="80" y1="50" x2="90" y2="50" />
                <line x1="20" y1="20" x2="28" y2="28" />
                <line x1="72" y1="72" x2="80" y2="80" />
                <line x1="80" y1="20" x2="72" y2="28" />
                <line x1="28" y1="72" x2="20" y2="80" />
              </g>
            </svg>
          </div>
        </div>

        {/* Address being located */}
        <p className="text-navy font-serif text-xl mb-4">{address}</p>

        {/* Progress steps */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-lg transition-all duration-500 ${
                index <= currentStep
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              } ${index === currentStep ? 'text-gold font-semibold' : 'text-navy/70'}`}
            >
              {step}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-full bg-navy/20 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gold h-full transition-all duration-1000 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
