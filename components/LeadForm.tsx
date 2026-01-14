'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Link from 'next/link'

interface FormData {
  name: string
  address: string
  phone: string
  monthlyBill: string
}

export default function LeadForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('Form submitted:', data)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      reset()
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md border-2 border-orange/20">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-3xl font-extrabold text-navy mb-3">Thank You!</h3>
          <p className="text-gray-700 text-lg font-medium">
            Your personalized solar report is being prepared. We&apos;ll text it to your phone shortly.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-md border-2 border-orange/20">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">
            Your Name
          </label>
          <input
            {...register('name', { required: 'Name is required' })}
            type="text"
            id="name"
            placeholder="Jane Smith"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Address Field */}
        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-navy mb-2">
            Home Address
          </label>
          <input
            {...register('address', { required: 'Address is required' })}
            type="text"
            id="address"
            placeholder="123 Main St, Springfield, IL"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition"
          />
          {errors.address && (
            <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-2">
            Phone Number
          </label>
          <input
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9()\-\s]+$/,
                message: 'Please enter a valid phone number'
              }
            })}
            type="tel"
            id="phone"
            placeholder="(555) 123-4567"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition"
          />
          <p className="text-gray-500 text-xs mt-1">We&apos;ll text your report here</p>
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Monthly Bill Dropdown */}
        <div>
          <label htmlFor="monthlyBill" className="block text-sm font-semibold text-navy mb-2">
            Monthly Electric Bill
          </label>
          <select
            {...register('monthlyBill', { required: 'Please select your average bill' })}
            id="monthlyBill"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent outline-none transition bg-white"
          >
            <option value="">Select your average bill</option>
            <option value="under-100">Under $100</option>
            <option value="100-150">$100 - $150</option>
            <option value="150-200">$150 - $200</option>
            <option value="200-300">$200 - $300</option>
            <option value="over-300">Over $300</option>
          </select>
          {errors.monthlyBill && (
            <p className="text-red-600 text-sm mt-1">{errors.monthlyBill.message}</p>
          )}
        </div>

        {/* TCPA Consent */}
        <div className="text-xs text-gray-600 leading-relaxed">
          We&apos;re here to help! Each time that you fill out this form, you agree to be contacted by phone call, pre-recorded voice, and/or text message at the telephone or mobile number that you entered above by Lumen Solar Concierge and by one (1) other company about solar and energy storage products and services. These calls/messages may be sent using automated telephone technology, even if your telephone or mobile number is currently listed on any state, federal or corporate &quot;Do Not Call&quot; list. Message and data rates may apply. You are not required to give your consent here as a condition of any purchase. I understand the{' '}
          <Link href="/privacy" className="text-orange hover:underline">
            Privacy Policy
          </Link>
          {' '}and agree to the{' '}
          <Link href="/terms" className="text-orange hover:underline">
            Terms & Conditions
          </Link>
          .
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-orange to-amber-500 hover:from-orange/90 hover:to-amber-600 text-white font-extrabold text-lg py-5 px-8 rounded-xl shadow-2xl hover:shadow-orange/50 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <span className="text-2xl">☀️</span>
              Get My Free Report
            </>
          )}
        </button>
      </form>
    </div>
  )
}
