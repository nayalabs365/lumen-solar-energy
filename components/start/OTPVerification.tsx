'use client';

import { useState, useRef, useEffect } from 'react';
import ChangePhoneSheet from './ChangePhoneSheet';

interface OTPVerificationProps {
  phone: string;
  onVerified: () => void;
  onPhoneChange?: (newPhone: string) => void;
}

export default function OTPVerification({ phone, onVerified, onPhoneChange }: OTPVerificationProps) {
  const [currentPhone, setCurrentPhone] = useState(phone);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showChangePhone, setShowChangePhone] = useState(false);
  const [phoneUpdatedMsg, setPhoneUpdatedMsg] = useState('');
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    // Focus first input on mount
    inputRefs[0].current?.focus();

    // Send initial OTP
    sendOTP();

    // Start resend timer
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-advance to next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto-verify when all fields filled
    if (newOtp.every((digit) => digit !== '')) {
      verifyOTP(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);

    if (pastedData.length === 4) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      inputRefs[3].current?.focus();
      verifyOTP(pastedData);
    }
  };

  const sendOTP = async () => {
    try {
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: currentPhone }),
      });

      const data = await response.json();
      if (!data.success) {
        console.error('Failed to send OTP:', data.error);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const verifyOTP = async (code: string) => {
    setIsVerifying(true);
    setError('');

    try {
      const response = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: currentPhone, code }),
      });

      const data = await response.json();

      if (data.verified) {
        onVerified();
      } else {
        setError('Incorrect code. Please try again.');
        setOtp(['', '', '', '']);
        inputRefs[0].current?.focus();
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Verification failed. Please try again.');
      setOtp(['', '', '', '']);
      inputRefs[0].current?.focus();
    }

    setIsVerifying(false);
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;

    // Resend OTP via Twilio
    await sendOTP();
    setResendTimer(30);
    setOtp(['', '', '', '']);
    inputRefs[0].current?.focus();
  };

  const handlePhoneUpdated = (newPhone: string) => {
    setCurrentPhone(newPhone);
    setShowChangePhone(false);
    setOtp(['', '', '', '']);
    setResendTimer(30);
    onPhoneChange?.(newPhone);
    setPhoneUpdatedMsg(`Code sent to ${newPhone}`);
    setTimeout(() => setPhoneUpdatedMsg(''), 3000);
    inputRefs[0].current?.focus();
  };

  return (
    <>
    <div className="fixed inset-0 bg-white z-[200] overflow-y-auto" style={{ height: '100dvh', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
      <div className="min-h-full flex items-center justify-center p-6" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
      <div className="w-full max-w-[460px] text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-pale text-gold text-[0.82rem] font-semibold mb-6">
          <span>⚡</span>
          High demand
        </div>

        {/* Title */}
        <h2 className="font-serif text-[2.2rem] leading-[1.2] text-navy mb-4">
          Due to extremely high demand, we need to verify your phone number.
        </h2>

        {/* Subtitle */}
        <p className="text-[1.05rem] text-text-light mb-4">
          We&apos;ll send a 4-digit code to{' '}
          <strong className="text-navy">{currentPhone}</strong>{' '}
          to confirm it&apos;s you.
        </p>
        <p className="text-[0.9rem] mb-8">
          <button
            onClick={() => setShowChangePhone(true)}
            className="text-navy underline underline-offset-2 font-medium hover:text-gold transition-colors"
          >
            Wrong number?
          </button>
        </p>

        {/* Phone Updated Success Toast */}
        {phoneUpdatedMsg && (
          <div className="mb-4 px-4 py-2 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
            ✓ {phoneUpdatedMsg}
          </div>
        )}

        {/* OTP Input Group */}
        <div className="flex gap-3 justify-center mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-16 h-20 text-center font-serif text-[1.8rem] rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                digit
                  ? 'border-gold bg-gold-pale'
                  : error
                  ? 'border-red-500 bg-red-50'
                  : 'border-[#CBD5E1] bg-warm-white'
              } ${
                digit && !error
                  ? 'focus:border-gold focus:shadow-[0_0_0_4px_rgba(245,158,11,0.1)]'
                  : 'focus:border-gold focus:shadow-[0_0_0_4px_rgba(245,158,11,0.1)]'
              }`}
              disabled={isVerifying}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-[0.95rem] mb-4">{error}</p>
        )}

        {/* Verify Button */}
        <button
          onClick={() => verifyOTP(otp.join(''))}
          disabled={otp.some((d) => !d) || isVerifying}
          className={`w-full px-10 py-5 rounded-[50px] text-[1.1rem] font-bold transition-all duration-300 mb-6 ${
            otp.every((d) => d) && !isVerifying
              ? 'bg-navy text-white hover:-translate-y-[2px] cursor-pointer'
              : 'bg-[#CBD5E1] text-white cursor-not-allowed'
          }`}
        >
          {isVerifying ? 'Verifying...' : 'Verify & Continue'}
        </button>

        {/* Resend Section */}
        <p className="text-[0.9rem] text-text-light">
          Didn&apos;t receive it?{' '}
          <button
            onClick={handleResend}
            disabled={resendTimer > 0}
            className={`font-semibold ${
              resendTimer > 0
                ? 'text-text-light cursor-not-allowed'
                : 'text-navy cursor-pointer hover:underline'
            }`}
          >
            Resend code
          </button>
          {resendTimer > 0 && ` (${resendTimer}s)`}
        </p>

        {/* Helper Text */}
        <p className="text-[0.8rem] text-text-light mt-6">
          Standard message and data rates may apply
        </p>
      </div>
      </div>
    </div>

    <ChangePhoneSheet
      isOpen={showChangePhone}
      onClose={() => setShowChangePhone(false)}
      currentPhone={currentPhone}
      onPhoneUpdated={handlePhoneUpdated}
    />
    </>
  );
}
