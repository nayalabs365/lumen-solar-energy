'use client';

import { useState } from 'react';
import MapView from '../MapView';

interface Step2Props {
  selected: string;
  address: string;
  googleMapsLoaded: boolean;
  onComplete: (propertyType: string) => void;
  onBack: () => void;
}

const propertyTypes = [
  { value: 'single_family', label: 'Single Family Home', icon: '🏠' },
  { value: 'townhome', label: 'Townhome / Duplex', icon: '🏘️' },
  { value: 'mobile', label: 'Mobile Home', icon: '🚐' },
  { value: 'commercial', label: 'Commercial', icon: '🏢' },
];

export default function Step2PropertyType({ selected, address, googleMapsLoaded, onComplete, onBack }: Step2Props) {
  const [propertyType, setPropertyType] = useState(selected);

  const handleSelect = (type: string) => {
    setPropertyType(type);
  };

  const handleSubmit = () => {
    if (propertyType) {
      onComplete(propertyType);
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
        <div className="w-full max-w-[500px] space-y-8">
          <h2 className="font-serif text-[2.8rem] leading-[1.2] text-navy">
            What type of property is <em className="text-gold">this?</em>
          </h2>

          {/* Icon Grid */}
          <div className="grid grid-cols-2 gap-4">
            {propertyTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => handleSelect(type.value)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${
                  propertyType === type.value
                    ? 'border-gold bg-gold-pale scale-105'
                    : 'border-[#E5E7EB] bg-white hover:border-gold-light hover:bg-warm-white hover:scale-105'
                }`}
              >
                <div className="text-[3.5rem] transition-transform duration-300">
                  {type.icon}
                </div>
                <span className="text-[0.95rem] text-center font-medium">{type.label}</span>
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleSubmit}
            disabled={!propertyType}
            className={`w-full px-10 py-5 rounded-[50px] text-[1.1rem] font-bold transition-all duration-300 ${
              propertyType
                ? 'bg-navy text-white hover:-translate-y-[2px] cursor-pointer'
                : 'bg-[#CBD5E1] text-white cursor-not-allowed'
            }`}
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
    </div>
  );
}
