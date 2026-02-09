'use client';

import { useState, useEffect, useRef } from 'react';

interface Step1Props {
  data: { address: string; ownership: string };
  onComplete: (data: { address: string; ownership: string }) => void;
}

interface Prediction {
  placePrediction: {
    placeId: string;
    text: {
      text: string;
    };
    structuredFormat?: {
      mainText: {
        text: string;
      };
      secondaryText?: {
        text: string;
      };
    };
  };
}

export default function Step1Address({ data, onComplete }: Step1Props) {
  const [address, setAddress] = useState(data.address);
  const [ownership, setOwnership] = useState(data.ownership);
  const [isValid, setIsValid] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setIsValid(address.length > 3 && ownership !== '');
  }, [address, ownership]);

  const fetchPredictions = async (input: string) => {
    if (input.length < 3) {
      setPredictions([]);
      setShowPredictions(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/autocomplete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        console.error('Autocomplete API error:', await response.text());
        setPredictions([]);
        setShowPredictions(false);
        return;
      }

      const data = await response.json();

      if (data.suggestions && data.suggestions.length > 0) {
        setPredictions(data.suggestions);
        setShowPredictions(true);
      } else {
        setPredictions([]);
        setShowPredictions(false);
      }
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setPredictions([]);
      setShowPredictions(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);

    // Debounce API calls
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchPredictions(value);
    }, 150); // Wait 150ms after user stops typing
  };

  const handleSelectPrediction = (prediction: Prediction) => {
    // Remove ", USA" from the address
    const addressText = prediction.placePrediction.text.text.replace(', USA', '');
    setAddress(addressText);
    setShowPredictions(false);
    setPredictions([]);
  };

  const formatPredictionDisplay = (prediction: Prediction) => {
    const format = prediction.placePrediction.structuredFormat;

    if (format) {
      // Use structured format: "123 Main St" + "City, State ZIP"
      const main = format.mainText.text;
      const secondary = format.secondaryText?.text.replace(', USA', '') || '';

      return { main, secondary };
    } else {
      // Fallback to full text without USA
      const fullText = prediction.placePrediction.text.text.replace(', USA', '');
      return { main: fullText, secondary: '' };
    }
  };

  const handleSubmit = () => {
    if (isValid) {
      onComplete({ address, ownership });
    }
  };

  return (
    <>
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

            {/* Address Field with Custom Autocomplete */}
            <div className="space-y-3">
              <label className="block text-[0.95rem] font-bold uppercase tracking-wider text-navy">
                ENTER YOUR ADDRESS <span className="text-gold">*</span>
              </label>

              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={address}
                  onChange={handleInputChange}
                  onFocus={() => {
                    if (predictions.length > 0) {
                      setShowPredictions(true);
                    }
                  }}
                  placeholder="123 Main Street, City, State"
                  className="w-full px-6 py-5 rounded-2xl bg-white border-2 border-[#CBD5E1] text-[1.1rem] text-navy placeholder:text-gray-400 transition-all duration-300 focus:outline-none focus:border-gold focus:shadow-[0_0_0_4px_rgba(245,158,11,0.1)] hover:border-gold-light"
                  autoComplete="off"
                  name="address"
                  id="address-input"
                />

                {/* Loading indicator */}
                {isLoading && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {/* Custom Autocomplete Dropdown */}
                {showPredictions && predictions.length > 0 && (
                  <div className="absolute z-[9999] w-full mt-1 bg-white rounded-xl border border-[#CBD5E1] shadow-[0_8px_24px_rgba(30,58,90,0.15)] overflow-hidden">
                    {predictions.map((prediction, index) => {
                      const { main, secondary } = formatPredictionDisplay(prediction);

                      return (
                        <button
                          key={prediction.placePrediction.placeId}
                          type="button"
                          onClick={() => handleSelectPrediction(prediction)}
                          className={`w-full text-left px-4 py-3 hover:bg-[#FEF3C7] transition-colors ${
                            index > 0 ? 'border-t border-[#E5E7EB]' : ''
                          }`}
                        >
                          <div className="text-[1rem] text-navy font-medium">
                            {main}
                          </div>
                          {secondary && (
                            <div className="text-[0.875rem] text-gray-600 mt-0.5">
                              {secondary}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

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
    </>
  );
}
