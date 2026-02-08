'use client';

import { useEffect, useState } from 'react';

interface ProcessingLoaderProps {
  title: string;
  subtitle: string;
  steps: string[];
  stepTiming: number[]; // Milliseconds when each step completes
}

export default function ProcessingLoader({ title, subtitle, steps, stepTiming }: ProcessingLoaderProps) {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    // Show first step after 200ms
    setTimeout(() => setVisibleSteps([0]), 200);

    // Process each step based on timing
    steps.forEach((_, index) => {
      // Show step
      if (index > 0) {
        setTimeout(() => {
          setVisibleSteps((prev) => [...prev, index]);
        }, stepTiming[index - 1]);
      }

      // Complete step
      setTimeout(() => {
        setCompletedSteps((prev) => [...prev, index]);
      }, stepTiming[index]);
    });
  }, [steps, stepTiming]);

  return (
    <div className="fixed inset-0 bg-white z-[200] flex items-center justify-center">
      <div className="text-center">
        {/* Spinner Ring */}
        <div className="relative w-[140px] h-[140px] mx-auto mb-8">
          {/* Background ring */}
          <div className="absolute inset-0 border-[5px] border-[#E5E7EB] rounded-full" />

          {/* Spinning gold arc */}
          <div className="absolute inset-0 border-[5px] border-transparent border-t-gold rounded-full animate-spin" style={{ animationDuration: '1.2s' }} />

          {/* Secondary arc */}
          <div className="absolute inset-0 border-[5px] border-transparent border-t-gold/40 rounded-full animate-spin" style={{ animationDuration: '1.2s', animationDelay: '0.3s' }} />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center animate-pulse">
              <svg viewBox="0 0 48 48" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" className="w-10 h-10">
                <circle cx="24" cy="24" r="8" />
                <line x1="24" y1="6" x2="24" y2="12" />
                <line x1="24" y1="36" x2="24" y2="42" />
                <line x1="6" y1="24" x2="12" y2="24" />
                <line x1="36" y1="24" x2="42" y2="24" />
                <line x1="11.3" y1="11.3" x2="15.5" y2="15.5" />
                <line x1="32.5" y1="32.5" x2="36.7" y2="36.7" />
                <line x1="36.7" y1="11.3" x2="32.5" y2="15.5" />
                <line x1="15.5" y1="32.5" x2="11.3" y2="36.7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h2 className="font-serif text-[1.3rem] text-navy mb-2">{title}</h2>
        <p className="text-[0.92rem] text-text-light mb-8">{subtitle}</p>

        {/* Progress Steps */}
        <div className="space-y-4 max-w-sm mx-auto">
          {steps.map((step, index) => {
            const isVisible = visibleSteps.includes(index);
            const isCompleted = completedSteps.includes(index);

            return (
              <div
                key={index}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                {/* Circle indicator */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted ? 'bg-green' : 'bg-[#E5E7EB]'
                }`}>
                  {isCompleted ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" className="w-4 h-4">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <div className="w-3 h-3 border-2 border-text-light border-t-transparent rounded-full animate-spin" />
                  )}
                </div>

                {/* Step label */}
                <span className={`text-[0.95rem] transition-colors duration-300 ${
                  isCompleted ? 'text-navy font-medium' : 'text-text-light'
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
