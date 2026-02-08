export default function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="fixed top-16 left-0 right-0 z-[99] flex items-center justify-center px-12 py-5 bg-white gap-3">
      {/* Left label */}
      <div className={`text-[0.82rem] font-semibold min-w-[28px] text-center transition-colors duration-300 ${currentStep ===  1 ? 'text-navy' : 'text-text-light'}`}>
        {String(currentStep).padStart(2, '0')}
      </div>

      {/* Progress track with dots and segments */}
      <div className="flex-1 max-w-[480px] flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center flex-1">
            {/* Dot */}
            <div
              className={`w-[10px] h-[10px] rounded-full transition-all duration-400 ${
                index < currentStep
                  ? 'bg-gold'
                  : index === currentStep - 1
                  ? 'bg-gold'
                  : 'bg-[#E5E7EB]'
              }`}
            />

            {/* Segment (not after last dot) */}
            {index < totalSteps - 1 && (
              <div className="flex-1 h-1 bg-[#E5E7EB] rounded mx-1 overflow-hidden">
                <div
                  className={`h-full bg-gold rounded transition-all duration-500 ${
                    index < currentStep - 1
                      ? 'w-full'
                      : index === currentStep - 1
                      ? 'w-1/2'
                      : 'w-0'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right label */}
      <div className="text-[0.82rem] font-semibold text-text-light min-w-[28px] text-center">
        {String(totalSteps).padStart(2, '0')}
      </div>
    </div>
  );
}
