'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import type { BookingData } from '@/app/book/page';
import { supabase } from '@/lib/supabase/client';
import type { Groomer } from '@/types/database';
import { formatTime } from '@/lib/utils/datetime';

interface Props {
  bookingData: BookingData;
  onNext: (data: Partial<BookingData>) => void;
  onBack: () => void;
}

interface TimeSlot {
  time: string;
  available: boolean;
  groomerId?: string;
  groomerName?: string;
}

export default function TimeSelection({ bookingData, onNext, onBack }: Props) {
  const [groomers, setGroomers] = useState<Groomer[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGroomersAndSlots();
  }, []);

  async function loadGroomersAndSlots() {
    try {
      // Load groomers
      const { data: groomersData, error: groomersError } = await supabase
        .from('groomers')
        .select('*')
        .eq('is_active', true);

      if (groomersError) throw groomersError;
      setGroomers(groomersData || []);

      // Generate time slots (8:30 AM to 2:00 PM in 30-min intervals)
      const slots: TimeSlot[] = [];
      const startHour = 8;
      const startMinute = 30;
      const endHour = 14;
      const endMinute = 0;

      let currentHour = startHour;
      let currentMinute = startMinute;

      while (
        currentHour < endHour ||
        (currentHour === endHour && currentMinute <= endMinute)
      ) {
        const time = `${String(currentHour).padStart(2, '0')}:${String(
          currentMinute
        ).padStart(2, '0')}:00`;

        // For now, mark all slots as available
        // In production, check against existing appointments
        slots.push({
          time,
          available: true,
          groomerId: groomersData?.[0]?.id,
          groomerName: groomersData?.[0]?.name,
        });

        currentMinute += 30;
        if (currentMinute >= 60) {
          currentMinute = 0;
          currentHour += 1;
        }
      }

      setTimeSlots(slots);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSlotSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedSlot(slot);
    }
  };

  const handleContinue = () => {
    if (!selectedSlot) return;

    onNext({
      selectedTime: selectedSlot.time,
      groomerId: selectedSlot.groomerId,
      groomerName: selectedSlot.groomerName,
    });
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
          Choose a Time
        </h2>
        <p className="text-gray-600">
          {bookingData.selectedDate?.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="card max-w-2xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {timeSlots.map((slot) => (
            <button
              key={slot.time}
              onClick={() => handleSlotSelect(slot)}
              disabled={!slot.available}
              className={`p-4 rounded-lg font-medium transition-all min-h-[60px] flex flex-col items-center justify-center ${
                selectedSlot?.time === slot.time
                  ? 'bg-primary-600 text-white ring-2 ring-primary-600'
                  : slot.available
                  ? 'bg-white border-2 border-gray-200 text-gray-900 hover:border-primary-600 active:scale-95'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Clock className="w-5 h-5 mb-1" />
              <span>{formatTime(slot.time)}</span>
              {slot.available && (
                <span className="text-xs mt-1 opacity-75">
                  {slot.groomerName}
                </span>
              )}
            </button>
          ))}
        </div>

        {timeSlots.filter((s) => s.available).length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">
              No available time slots for this date. Please select a different date.
            </p>
          </div>
        )}

        {selectedSlot && (
          <div className="mt-6 p-4 bg-primary-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Selected Time</p>
                <p className="text-lg font-semibold text-primary-600">
                  {formatTime(selectedSlot.time)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Groomer</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedSlot.groomerName}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button onClick={onBack} className="btn-secondary flex-1 sm:flex-initial">
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!selectedSlot}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
