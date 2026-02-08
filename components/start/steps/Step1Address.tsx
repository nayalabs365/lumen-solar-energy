'use client';

import { useState, useEffect, useRef } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

interface Step1Props {
  data: { address: string; ownership: string };
  onComplete: (data: { address: string; ownership: string }) => void;
}

const libraries: ("places")[] = ["places"];

export default function Step1Address({ data, onComplete }: Step1Props) {
  const [address, setAddress] = useState(data.address);
  const [ownership, setOwnership] = useState(data.ownership);
  const [isValid, setIsValid] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  useEffect(() => {
    setIsValid(address.length > 3 && ownership !== '');
  }, [address, ownership]);

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.formatted_address) {
        setAddress(place.formatted_address);
      }
    }
  };

  const handleSubmit = () => {
    if (isValid) {
      onComplete({ address, ownership });
    }
  };

  // Fallback if no API key
  if (!googleMapsApiKey) {
    return (
      <div className="fixed top-[120px] bottom-0 left-0 right-0 flex items-center justify-center p-6">
        <div className="max-w-md bg-red-50 border-2 border-red-500 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-serif text-red-900 mb-4">Configuration Error</h2>
          <p className="text-red-700 mb-4">
            Google Maps API key is not configured. Please add <code className="bg-red-100 px-2 py-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your environment variables.
          </p>
          <p className="text-sm text-red-600">
            Get your API key from: <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <LoadScript
        googleMapsApiKey={googleMapsApiKey}
        libraries={libraries}
        onLoad={() => setIsScriptLoaded(true)}
      >
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

            {/* Address Field with Google Autocomplete */}
            <div className="space-y-3">
              <label className="block text-[0.95rem] font-bold uppercase tracking-wider text-navy">
                ENTER YOUR ADDRESS <span className="text-gold">*</span>
              </label>
              {isScriptLoaded ? (
                <Autocomplete
                  onLoad={(autocomplete) => {
                    autocompleteRef.current = autocomplete;
                  }}
                  onPlaceChanged={handlePlaceSelect}
                  options={{
                    componentRestrictions: { country: 'us' }, // US addresses only
                    types: ['address'], // Only addresses, not businesses
                    fields: ['formatted_address', 'address_components', 'geometry'],
                  }}
                >
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main Street, City, State"
                    className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-[#CBD5E1] text-[1.1rem] text-navy placeholder:text-gray-400 transition-all duration-300 focus:outline-none focus:border-gold focus:shadow-[0_0_0_4px_rgba(245,158,11,0.1)] hover:border-gold-light"
                    autoComplete="off"
                  />
                </Autocomplete>
              ) : (
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Loading Google Maps..."
                  disabled
                  className="w-full px-6 py-5 rounded-2xl bg-gray-100 border-2 border-gray-300 text-[1.1rem] text-gray-400"
                />
              )}
              <p className="text-[0.82rem] text-text-light font-medium">
                💡 Start typing and select your address from the dropdown
              </p>
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
      </LoadScript>

      {/* Ensure Google Autocomplete dropdown is visible */}
      <style jsx global>{`
        .pac-container {
          z-index: 9999 !important;
          margin-top: 4px;
          border-radius: 12px;
          border: 1px solid #CBD5E1;
          box-shadow: 0 8px 24px rgba(30, 58, 90, 0.15);
          font-family: 'Outfit', sans-serif;
        }
        .pac-item {
          padding: 12px 16px;
          font-size: 1rem;
          border-top: 1px solid #E5E7EB;
          cursor: pointer;
        }
        .pac-item:first-child {
          border-top: none;
        }
        .pac-item:hover {
          background-color: #FEF3C7;
        }
        .pac-item-selected {
          background-color: #FEF3C7;
        }
        .pac-matched {
          font-weight: 600;
          color: #1E3A5A;
        }
        .pac-icon {
          display: none;
        }
      `}</style>
    </>
  );
}
