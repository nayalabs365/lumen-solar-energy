'use client';

interface ErrorScreenProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onContactSupport?: () => void;
}

export default function ErrorScreen({
  title = 'Something went wrong',
  message = 'We encountered an error while processing your request.',
  onRetry,
  onContactSupport,
}: ErrorScreenProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-red-500/10 rounded-full blur-2xl" />

            {/* Icon container */}
            <div className="relative w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>

        {/* Message */}
        <p className="text-gray-600 mb-8 leading-relaxed">{message}</p>

        {/* Actions */}
        <div className="space-y-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-medium py-3.5 px-6 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          )}

          {onContactSupport && (
            <button
              onClick={onContactSupport}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3.5 px-6 rounded-lg border border-gray-300 transition-colors duration-200"
            >
              Contact Support
            </button>
          )}
        </div>

        {/* Help text */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Email us at{' '}
            <a
              href="mailto:support@lumensolar.energy"
              className="text-[#f97316] hover:underline"
            >
              support@lumensolar.energy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
