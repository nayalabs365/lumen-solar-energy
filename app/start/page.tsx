'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { trackEvent } from '@/lib/analytics';
import TopBar from '@/components/start/TopBar';
import ProgressBar from '@/components/start/ProgressBar';
import Step1Address from '@/components/start/steps/Step1Address';
import Step2PropertyType from '@/components/start/steps/Step2PropertyType';
import Step3Bill from '@/components/start/steps/Step3Bill';
import Step4Contact from '@/components/start/steps/Step4Contact';
import ProcessingLoader from '@/components/start/ProcessingLoader';
import OTPVerification from '@/components/start/OTPVerification';
import ChatWidget from '@/components/start/ChatWidget';
import LocationLoader from '@/components/start/LocationLoader';
import ErrorScreen from '@/components/start/ErrorScreen';

export type FormData = {
  address: string;
  ownership: string;
  propertyType: string;
  monthlyBill: number;
  fullName: string;
  email: string;
  phone: string;
  consent: boolean;
};

type Screen = 'step1' | 'locationLoader' | 'step2' | 'step3' | 'step4' | 'loader1' | 'otp' | 'loader2' | 'error';

export default function StartPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('step1');
  const [currentStep, setCurrentStep] = useState(1);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    address: '',
    ownership: '',
    propertyType: '',
    monthlyBill: 180,
    fullName: '',
    email: '',
    phone: '',
    consent: false,
  });

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    setCurrentScreen(`step${step}` as Screen);
  };

  const handleStep1Complete = (data: { address: string; ownership: string }) => {
    updateFormData(data);

    // Track address entered
    trackEvent('address_entered', {});

    // Track homeowner confirmed (if they selected "I own my home")
    if (data.ownership === 'I own my home') {
      trackEvent('homeowner_confirmed', {});
    }

    // Track step completion
    trackEvent('form_step_complete', {
      step_number: 1,
      step_name: 'address',
    });

    setCurrentScreen('locationLoader');
  };

  const handleLocationLoadComplete = () => {
    goToStep(2);
  };

  const handleStep2Complete = (propertyType: string) => {
    updateFormData({ propertyType });

    // Track step completion
    trackEvent('form_step_complete', {
      step_number: 2,
      step_name: 'property_type',
    });

    goToStep(3);
  };

  const handleStep3Complete = (monthlyBill: number) => {
    updateFormData({ monthlyBill });

    // Track electric bill entered
    trackEvent('electric_bill_entered', {
      bill_range: `$${monthlyBill}`,
    });

    // Track step completion
    trackEvent('form_step_complete', {
      step_number: 3,
      step_name: 'electric_bill',
    });

    goToStep(4);
  };

  const handleStep4Complete = async (data: {
    fullName: string;
    email: string;
    phone: string;
    consent: boolean;
  }) => {
    updateFormData(data);

    // Track step completion
    trackEvent('form_step_complete', {
      step_number: 4,
      step_name: 'contact_info',
    });

    // Track lead form submission - KEY CONVERSION EVENT
    trackEvent('lead_form_submit', {});

    setCurrentScreen('loader1');

    // After 3.5s, check if we should skip OTP
    const skipOTP = process.env.NEXT_PUBLIC_SKIP_OTP === 'true';

    setTimeout(async () => {
      if (skipOTP) {
        // Skip OTP and go directly to report generation
        await generateReport();
      } else {
        // Show OTP screen
        setCurrentScreen('otp');
      }
    }, 3500);
  };

  const handleOTPVerified = async () => {
    setCurrentScreen('loader2');

    // Generate report after 2.5s loader
    setTimeout(async () => {
      await generateReport();
    }, 2500);
  };

  const handleRetry = () => {
    // Reset to loader and try generating report again
    setCurrentScreen('loader2');
    setTimeout(async () => {
      await generateReport();
    }, 500);
  };

  const handleContactSupport = () => {
    window.location.href = 'mailto:support@lumensolar.energy?subject=Report Generation Error';
  };

  const generateReport = async () => {
    try {
      // Call the report service API
      const reportServiceUrl = process.env.NEXT_PUBLIC_REPORT_SERVICE_URL || 'http://localhost:3001';
      const response = await fetch(`${reportServiceUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.fullName.split(' ')[0],
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          ownershipStatus: formData.ownership,
          propertyType: formData.propertyType,
          monthlyBill: formData.monthlyBill,
        }),
      });

      const data = await response.json();

      if (data.success && data.reportUrl) {
        // Redirect to the report
        window.location.href = data.reportUrl;
      } else {
        console.error('Report generation failed:', data.error || 'Unknown error');
        setErrorMessage(data.error || 'Failed to generate report. Please try again or contact support.');
        setCurrentScreen('error');
      }
    } catch (error) {
      console.error('Error generating report:', error);
      setErrorMessage('An error occurred while generating your report. Please try again or contact support.');
      setCurrentScreen('error');
    }
  };

  // Helper to get step name from screen
  const getStepInfo = (screen: Screen): { step_number: number; step_name: string } | null => {
    const stepMap: Record<string, { step_number: number; step_name: string }> = {
      step1: { step_number: 1, step_name: 'address' },
      step2: { step_number: 2, step_name: 'property_type' },
      step3: { step_number: 3, step_name: 'electric_bill' },
      step4: { step_number: 4, step_name: 'contact_info' },
    };
    return stepMap[screen] || null;
  };

  // Track form_step_view when step changes
  useEffect(() => {
    const stepInfo = getStepInfo(currentScreen);
    if (stepInfo) {
      trackEvent('form_step_view', stepInfo);
    }
  }, [currentScreen]);

  // Track form_abandoned when user tries to leave
  useEffect(() => {
    const handleBeforeUnload = () => {
      const stepInfo = getStepInfo(currentScreen);
      if (stepInfo && stepInfo.step_number < 4) {
        trackEvent('form_abandoned', {
          last_step: stepInfo.step_number,
          last_step_name: stepInfo.step_name,
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentScreen]);

  const showChatWidget = !['locationLoader', 'loader1', 'otp', 'loader2'].includes(currentScreen);

  return (
    <>
      {/* Load Google Maps Script once for all steps */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places&loading=async`}
        strategy="afterInteractive"
        onLoad={() => {
          setTimeout(() => {
            setGoogleMapsLoaded(true);
          }, 100);
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Top Bar - Always visible */}
        <TopBar />

      {/* Progress Bar - Only for step screens */}
      {currentScreen.startsWith('step') && <ProgressBar currentStep={currentStep} totalSteps={4} />}

      {/* Step Screens */}
      {currentScreen === 'step1' && (
        <Step1Address
          data={{ address: formData.address, ownership: formData.ownership }}
          onComplete={handleStep1Complete}
        />
      )}
      {currentScreen === 'locationLoader' && (
        <LocationLoader
          address={formData.address}
          onComplete={handleLocationLoadComplete}
        />
      )}
      {currentScreen === 'step2' && (
        <Step2PropertyType
          selected={formData.propertyType}
          address={formData.address}
          googleMapsLoaded={googleMapsLoaded}
          onComplete={handleStep2Complete}
          onBack={() => goToStep(1)}
        />
      )}
      {currentScreen === 'step3' && (
        <Step3Bill
          value={formData.monthlyBill}
          address={formData.address}
          googleMapsLoaded={googleMapsLoaded}
          onComplete={handleStep3Complete}
          onBack={() => goToStep(2)}
        />
      )}
      {currentScreen === 'step4' && (
        <Step4Contact
          data={{
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            consent: formData.consent,
          }}
          address={formData.address}
          googleMapsLoaded={googleMapsLoaded}
          onComplete={handleStep4Complete}
          onBack={() => goToStep(3)}
        />
      )}

      {/* Processing Loaders */}
      {currentScreen === 'loader1' && (
        <ProcessingLoader
          title="Analyzing your home"
          subtitle="This will only take a moment."
          steps={[
            'Locating your property',
            'Checking local sunlight data',
            'Calculating your savings estimate',
          ]}
          stepTiming={[1000, 2000, 2800]}
        />
      )}
      {currentScreen === 'loader2' && (
        <ProcessingLoader
          title="Generating your solar report"
          subtitle="Crunching the numbers for your home."
          steps={[
            'Analyzing roof and sunlight data',
            'Calculating system size and savings',
            'Building your personalized report',
          ]}
          stepTiming={[800, 1600, 2200]}
        />
      )}

      {/* OTP Verification */}
      {currentScreen === 'otp' && (
        <OTPVerification phone={formData.phone} onVerified={handleOTPVerified} />
      )}

      {/* Error Screen */}
      {currentScreen === 'error' && (
        <ErrorScreen
          title="Report Generation Failed"
          message={errorMessage}
          onRetry={handleRetry}
          onContactSupport={handleContactSupport}
        />
      )}

      {/* Chat Widget */}
      {showChatWidget && <ChatWidget />}
      </div>
    </>
  );
}
