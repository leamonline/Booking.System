'use client';

import { Calendar, Clock, User, Dog, Sparkles, MapPin } from 'lucide-react';
import type { BookingData } from '@/app/book/page';
import { formatPrice } from '@/lib/utils/pricing';

interface Props {
  bookingData: BookingData;
  currentStep: number;
}

export default function BookingSummary({ bookingData, currentStep }: Props) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes}${ampm}`;
  };

  return (
    <div className="sticky top-6">
      <div className="card bg-amber-50 border-2 border-amber-200">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-amber-200">
          <Sparkles className="w-5 h-5" style={{ color: '#f59e0b' }} />
          <h3 className="font-bold text-gray-900">Your Booking</h3>
        </div>

        <div className="space-y-4 text-sm">
          {/* Service */}
          {bookingData.mainService ? (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f59e0b' }}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Service</p>
                <p className="font-semibold text-gray-900">{bookingData.mainService.name}</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 opacity-40">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-300">
                <Sparkles className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Service</p>
                <p className="text-sm text-gray-500">Not selected</p>
              </div>
            </div>
          )}

          {/* Pet */}
          {bookingData.petData ? (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f59e0b' }}>
                <Dog className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Pet</p>
                <p className="font-semibold text-gray-900">{bookingData.petData.name}</p>
                <p className="text-xs text-gray-600">{bookingData.petData.breed}</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 opacity-40">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-300">
                <Dog className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Pet</p>
                <p className="text-sm text-gray-500">Not added</p>
              </div>
            </div>
          )}

          {/* Date */}
          {bookingData.selectedDate ? (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f59e0b' }}>
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Date</p>
                <p className="font-semibold text-gray-900">{formatDate(bookingData.selectedDate)}</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 opacity-40">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-300">
                <Calendar className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm text-gray-500">Not selected</p>
              </div>
            </div>
          )}

          {/* Time */}
          {bookingData.selectedTime ? (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f59e0b' }}>
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Time</p>
                <p className="font-semibold text-gray-900">{formatTime(bookingData.selectedTime)}</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 opacity-40">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-300">
                <Clock className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Time</p>
                <p className="text-sm text-gray-500">Not selected</p>
              </div>
            </div>
          )}

          {/* Customer */}
          {bookingData.customerData ? (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f59e0b' }}>
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Customer</p>
                <p className="font-semibold text-gray-900">
                  {bookingData.customerData.firstName} {bookingData.customerData.lastName}
                </p>
              </div>
            </div>
          ) : currentStep >= 2 ? (
            <div className="flex gap-3 opacity-40">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-300">
                <User className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Customer</p>
                <p className="text-sm text-gray-500">Not added</p>
              </div>
            </div>
          ) : null}

          {/* Price */}
          {bookingData.total && (
            <>
              <div className="border-t-2 border-amber-200 pt-3 mt-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-600">Total</span>
                  <span className="text-xl font-bold" style={{ color: '#f59e0b' }}>
                    {formatPrice(bookingData.total)}
                  </span>
                </div>
                {bookingData.deposit && (
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-600">Deposit (50%)</span>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(bookingData.deposit)}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Location */}
        <div className="mt-6 pt-4 border-t-2 border-amber-200">
          <div className="flex gap-2 text-xs text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#f59e0b' }} />
            <div>
              <p className="font-semibold text-gray-900">Smarter Dog</p>
              <p>183 Kings Road</p>
              <p>Ashton-under-Lyne</p>
              <p className="mt-1">07507 731487</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
