'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ServiceSelection from '@/components/booking/ServiceSelection';
import PetSelection from '@/components/booking/PetSelection';
import DateSelection from '@/components/booking/DateSelection';
import TimeSelection from '@/components/booking/TimeSelection';
import AddOnsSelection from '@/components/booking/AddOnsSelection';
import ReviewBooking from '@/components/booking/ReviewBooking';
import PaymentStep from '@/components/booking/PaymentStep';

export type BookingData = {
  // Step 1: Service
  mainService?: {
    id: string;
    name: string;
    type: string;
  };

  // Step 2: Pet
  customerId?: string;
  petId?: string;
  isNewCustomer?: boolean;
  customerData?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  petData?: {
    name: string;
    breed: string;
    size: string;
    coatType: string;
    weight?: number;
    behavioralNotes?: string;
    medicalConditions?: string;
  };

  // Step 3: Date
  selectedDate?: Date;

  // Step 4: Time & Groomer
  selectedTime?: string;
  groomerId?: string;
  groomerName?: string;

  // Step 5: Add-ons
  addOns?: {
    id: string;
    name: string;
    price: number;
  }[];

  // Pricing
  subtotal?: number;
  deposit?: number;
  total?: number;
};

const STEPS = [
  { number: 1, name: 'Service', component: ServiceSelection },
  { number: 2, name: 'Pet Info', component: PetSelection },
  { number: 3, name: 'Date', component: DateSelection },
  { number: 4, name: 'Time', component: TimeSelection },
  { number: 5, name: 'Add-ons', component: AddOnsSelection },
  { number: 6, name: 'Review', component: ReviewBooking },
  { number: 7, name: 'Payment', component: PaymentStep },
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({});

  const handleNext = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const CurrentStepComponent = STEPS[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:underline" style={{ color: '#f59e0b' }}>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <div className="text-sm text-gray-500">
              Step {currentStep} of {STEPS.length}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      currentStep > step.number
                        ? 'text-white'
                        : currentStep === step.number
                        ? 'text-white ring-4 ring-amber-100'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    style={currentStep >= step.number ? { backgroundColor: '#f59e0b' } : {}}
                  >
                    {currentStep > step.number ? '✓' : step.number}
                  </div>
                  <span
                    className={`text-xs mt-1 hidden sm:block ${
                      currentStep >= step.number ? 'text-gray-900 font-medium' : 'text-gray-400'
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 transition-colors ${
                      currentStep > step.number ? '' : 'bg-gray-200'
                    }`}
                    style={currentStep > step.number ? { backgroundColor: '#f59e0b' } : {}}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <CurrentStepComponent
          bookingData={bookingData}
          onNext={handleNext}
          onBack={handleBack}
        />
      </main>
    </div>
  );
}
