'use client';

import { useState } from 'react';
import { CheckCircle, CreditCard, Lock } from 'lucide-react';
import type { BookingData } from '@/app/book/page';
import { formatPrice } from '@/lib/utils/pricing';

interface Props {
  bookingData: BookingData;
  onNext: (data: Partial<BookingData>) => void;
  onBack: () => void;
}

export default function PaymentStep({ bookingData, onNext, onBack }: Props) {
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);

    // Simulate payment processing
    // In production, integrate with Square Web Payments SDK
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
    }, 2000);
  };

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center py-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 Booking Confirmed!
          </h2>

          <p className="text-gray-600 mb-6">
            Your appointment has been successfully booked. We've sent a
            confirmation email to{' '}
            <span className="font-medium">{bookingData.customerData?.email}</span>
          </p>

          <div className="bg-amber-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Appointment Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time</span>
                <span className="font-medium text-gray-900">
                  {bookingData.selectedDate?.toLocaleDateString()} at{' '}
                  {bookingData.selectedTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pet</span>
                <span className="font-medium text-gray-900">
                  {bookingData.petData?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service</span>
                <span className="font-medium text-gray-900">
                  {bookingData.mainService?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Groomer</span>
                <span className="font-medium text-gray-900">
                  {bookingData.groomerName}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              <strong>What's Next?</strong>
            </p>
            <ul className="text-sm text-gray-600 space-y-2 text-left max-w-md mx-auto">
              <li>✓ Check your email for confirmation and appointment details</li>
              <li>✓ You'll receive a reminder 72 hours before your appointment</li>
              <li>✓ We'll send another reminder 24 hours before</li>
              <li>
                ✓ Remaining balance of{' '}
                {bookingData.deposit && bookingData.total
                  ? formatPrice(bookingData.total - bookingData.deposit)
                  : '£0.00'}{' '}
                due at service completion
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <a href="/" className="btn-primary inline-block">
              Return to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          💳 Secure Payment
        </h2>
        <p className="text-gray-600">
          Complete your booking with a secure deposit payment
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        {/* Payment Summary */}
        <div className="card bg-amber-50 border-amber-200">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service Total</span>
              <span className="font-medium text-gray-900">
                {bookingData.total ? formatPrice(bookingData.total) : '£0.00'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900">Deposit Due Now</span>
              <span className="font-bold text-xl" style={{ color: '#f59e0b' }}>
                {bookingData.deposit ? formatPrice(bookingData.deposit) : '£0.00'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Remaining Balance</span>
              <span className="text-gray-600">
                {bookingData.deposit && bookingData.total
                  ? formatPrice(bookingData.total - bookingData.deposit)
                  : '£0.00'}{' '}
                (due at service)
              </span>
            </div>
          </div>
        </div>

        {/* Payment Form Placeholder */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5" style={{ color: '#f59e0b' }} />
            <h3 className="font-semibold text-gray-900">Card Information</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                className="input-field"
                disabled={processing}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="input-field"
                  disabled={processing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="input-field"
                  disabled={processing}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="input-field"
                disabled={processing}
              />
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 text-xs text-gray-500">
            <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              Your payment information is encrypted and secure. We use Square for
              payment processing and never store your full card details.
            </p>
          </div>
        </div>

        {/* Terms */}
        <div className="text-xs text-gray-600 text-center">
          By completing this booking, you agree to our{' '}
          <a href="#" className="hover:underline" style={{ color: '#f59e0b' }}>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="hover:underline" style={{ color: '#f59e0b' }}>
            Cancellation Policy
          </a>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          disabled={processing}
          className="btn-secondary flex-1 sm:flex-initial disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          disabled={processing}
          className="btn-primary flex-1 disabled:opacity-50"
        >
          {processing ? (
            <>
              <span className="animate-pulse">Processing...</span>
            </>
          ) : (
            `Pay ${bookingData.deposit ? formatPrice(bookingData.deposit) : '£0.00'}`
          )}
        </button>
      </div>
    </div>
  );
}
