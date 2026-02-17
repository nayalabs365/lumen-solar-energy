'use client';

import { useState, useEffect } from 'react';

interface ChangePhoneSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhone: string;
  onPhoneUpdated: (newPhone: string) => void;
}

const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  const limited = cleaned.slice(0, 10);
  const match = limited.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (match) {
    return !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`;
  }
  return value;
};

export default function ChangePhoneSheet({
  isOpen,
  onClose,
  currentPhone,
  onPhoneUpdated,
}: ChangePhoneSheetProps) {
  const [phone, setPhone] = useState(currentPhone);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Sync with currentPhone prop when sheet opens
  useEffect(() => {
    if (isOpen) {
      setPhone(currentPhone);
      setError('');
    }
  }, [isOpen, currentPhone]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const phoneDigits = phone.replace(/\D/g, '');
  const hasChanged = phone !== currentPhone;
  const isValidPhone = phoneDigits.length === 10;
  const canSubmit = hasChanged && isValidPhone && !isLoading;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
    setError('');
  };

  const handleSendCode = async () => {
    if (!canSubmit) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneDigits }),
      });

      const data = await response.json();

      if (data.success) {
        onPhoneUpdated(phone);
        onClose();
      } else {
        setError(data.error || 'Failed to send code. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 300,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 300ms ease-out',
        }}
      />

      {/* Bottom Sheet */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 301,
          backgroundColor: '#FFFBF5',
          borderRadius: '20px 20px 0 0',
          padding: '24px 24px max(24px, env(safe-area-inset-bottom))',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 300ms ease-out',
          boxShadow: '0 -4px 32px rgba(30,58,90,0.15)',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        {/* Drag Handle */}
        <div
          style={{
            width: '40px',
            height: '4px',
            backgroundColor: '#CBD5E1',
            borderRadius: '2px',
            margin: '0 auto 20px',
          }}
        />

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: '1.4rem',
              color: '#1E3A5A',
              margin: 0,
            }}
          >
            Update your phone number
          </h3>
          <button
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#F1F5F9',
              cursor: 'pointer',
              color: '#64748B',
              flexShrink: 0,
            }}
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '0.9rem',
            color: '#64748B',
            marginBottom: '20px',
          }}
        >
          We&apos;ll send a new verification code to this number.
        </p>

        {/* Phone Input */}
        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.78rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#1E3A5A',
              marginBottom: '8px',
            }}
          >
            Phone Number
          </label>
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="(555) 123-4567"
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: '16px',
              border: `2px solid ${error ? '#EF4444' : '#CBD5E1'}`,
              backgroundColor: '#FFFFFF',
              fontSize: '1.1rem',
              color: '#334155',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
          />

          {/* Error Message */}
          {error && (
            <p
              style={{
                fontSize: '0.85rem',
                color: '#EF4444',
                marginTop: '6px',
              }}
            >
              {error}
            </p>
          )}
        </div>

        {/* Send New Code Button */}
        <button
          onClick={handleSendCode}
          disabled={!canSubmit}
          style={{
            width: '100%',
            padding: '16px 24px',
            borderRadius: '50px',
            border: 'none',
            backgroundColor: canSubmit ? '#1E3A5A' : '#CBD5E1',
            color: '#FFFFFF',
            fontSize: '1.05rem',
            fontWeight: 700,
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'background-color 0.2s, transform 0.2s',
            transform: canSubmit ? 'translateY(0)' : undefined,
          }}
        >
          {isLoading ? (
            <>
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#FFFFFF',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              Sending...
            </>
          ) : (
            'Send New Code'
          )}
        </button>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  );
}
