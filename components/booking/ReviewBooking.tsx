'use client';

import { useEffect, useState } from 'react';
import { Calendar, Clock, User, Dog, Sparkles, AlertCircle } from 'lucide-react';
import type { BookingData } from '@/app/book/page';
import { formatDate, formatTime } from '@/lib/utils/datetime';
import { formatPrice } from '@/lib/utils/pricing';
import { supabase } from '@/lib/supabase/client';
import type { Service } from '@/types/database';

interface Props {
  bookingData: BookingData;
  onNext: (data: Partial<BookingData>) => void;
  onBack: () => void;
}

export default function ReviewBooking({ bookingData, onNext, onBack }: Props) {
  const [mainService, setMainService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServiceDetails();
  }, []);

  async function loadServiceDetails() {
    try {
      if (bookingData.mainService?.id) {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('id', bookingData.mainService.id)
          .single();

        if (error) throw error;
        setMainService(data);

        // Calculate pricing
        const size = bookingData.petData?.size as any;
        const priceMap: any = {
          extra_small: data.price_extra_small,
          small: data.price_small,
          medium: data.price_medium,
          large: data.price_large,
          extra_large: data.price_extra_large,
          giant: data.price_giant,
        };

        const mainServicePrice = priceMap[size] || data.price_small || 0;
        const addOnsTotal =
          bookingData.addOns?.reduce((sum, addon) => sum + addon.price, 0) || 0;
        const subtotal = mainServicePrice + addOnsTotal;
        const deposit = Math.floor(subtotal * 0.5); // 50% deposit

        onNext({
          subtotal,
          deposit,
          total: subtotal,
        });
      }
    } catch (error) {
      console.error('Error loading service:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleConfirm = () => {
    onNext({});
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Review Your Booking
        </h2>
        <p className="text-gray-600">
          Please confirm all details are correct
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* Appointment Details */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-600" />
            Appointment Details
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-medium text-gray-900">
                {bookingData.selectedDate
                  ? formatDate(bookingData.selectedDate)
                  : 'Not selected'}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Time</span>
              <span className="font-medium text-gray-900">
                {bookingData.selectedTime
                  ? formatTime(bookingData.selectedTime)
                  : 'Not selected'}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Groomer</span>
              <span className="font-medium text-gray-900">
                {bookingData.groomerName || 'Not assigned'}
              </span>
            </div>
          </div>
        </div>

        {/* Customer & Pet Info */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary-600" />
            Customer & Pet
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Customer</span>
              <span className="font-medium text-gray-900">
                {bookingData.customerData?.firstName}{' '}
                {bookingData.customerData?.lastName}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Email</span>
              <span className="font-medium text-gray-900 break-all">
                {bookingData.customerData?.email}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Phone</span>
              <span className="font-medium text-gray-900">
                {bookingData.customerData?.phone}
              </span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center gap-2">
                <Dog className="w-4 h-4" />
                Pet Name
              </span>
              <span className="font-medium text-gray-900">
                {bookingData.petData?.name}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Breed</span>
              <span className="font-medium text-gray-900">
                {bookingData.petData?.breed || 'Not specified'}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Size</span>
              <span className="font-medium text-gray-900 capitalize">
                {bookingData.petData?.size?.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-600" />
            Services
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-900">
                {bookingData.mainService?.name}
              </span>
              <span className="font-medium text-gray-900">
                {bookingData.subtotal &&
                bookingData.addOns &&
                bookingData.addOns.length > 0
                  ? formatPrice(
                      bookingData.subtotal -
                        bookingData.addOns.reduce((sum, a) => sum + a.price, 0)
                    )
                  : bookingData.subtotal
                  ? formatPrice(bookingData.subtotal)
                  : '$0.00'}
              </span>
            </div>

            {bookingData.addOns && bookingData.addOns.length > 0 && (
              <>
                {bookingData.addOns.map((addon) => (
                  <div key={addon.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">+ {addon.name}</span>
                    <span className="text-gray-900">
                      {formatPrice(addon.price)}
                    </span>
                  </div>
                ))}
              </>
            )}

            <hr className="my-2" />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-primary-600">
                {bookingData.total ? formatPrice(bookingData.total) : '$0.00'}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Deposit Due Now (50%)</span>
              <span className="font-medium text-gray-900">
                {bookingData.deposit ? formatPrice(bookingData.deposit) : '$0.00'}
              </span>
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="card bg-amber-50 border-amber-200">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Cancellation Policy
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Free cancellation up to 48 hours before appointment</li>
                <li>• 50% cancellation fee within 24-48 hours</li>
                <li>• 100% fee for cancellations less than 24 hours</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button onClick={onBack} className="btn-secondary flex-1 sm:flex-initial">
          Back
        </button>
        <button onClick={handleConfirm} className="btn-primary flex-1">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
