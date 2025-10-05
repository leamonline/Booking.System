'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { BookingData } from '@/app/book/page';

interface Props {
  bookingData: BookingData;
  onNext: (data: Partial<BookingData>) => void;
  onBack: () => void;
}

export default function DateSelection({ bookingData, onNext, onBack }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthName = currentMonth.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const isDateAvailable = (date: Date) => {
    // Only allow Monday, Tuesday, Wednesday (1, 2, 3)
    const day = date.getDay();
    if (day !== 1 && day !== 2 && day !== 3) return false;

    // Don't allow past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return false;

    // Allow dates up to 8 weeks in advance
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 56);
    if (date > maxDate) return false;

    return true;
  };

  const handleDateSelect = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    if (isDateAvailable(date)) {
      setSelectedDate(date);
    }
  };

  const handleContinue = () => {
    if (!selectedDate) return;
    onNext({ selectedDate });
  };

  const renderCalendar = () => {
    const days = [];
    const totalSlots = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;

    for (let i = 0; i < totalSlots; i++) {
      if (i < firstDayOfMonth || i >= daysInMonth + firstDayOfMonth) {
        days.push(
          <div key={i} className="aspect-square p-2" />
        );
      } else {
        const day = i - firstDayOfMonth + 1;
        const date = new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          day
        );
        const available = isDateAvailable(date);
        const isSelected =
          selectedDate?.toDateString() === date.toDateString();

        days.push(
          <button
            key={i}
            onClick={() => handleDateSelect(day)}
            disabled={!available}
            className={`aspect-square p-2 rounded-lg font-medium transition-all min-h-[44px] ${
              isSelected
                ? 'text-white ring-2 ring-amber-600'
                : available
                ? 'bg-white text-gray-900 hover:bg-amber-50 active:scale-95'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            style={isSelected ? { backgroundColor: '#f59e0b' } : {}}
          >
            {day}
          </button>
        );
      }
    }

    return days;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          📅 Choose a Date
        </h2>
        <p className="text-gray-600">
          We're open Monday, Tuesday & Wednesday
        </p>
      </div>

      <div className="card max-w-2xl mx-auto">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h3 className="text-xl font-semibold text-gray-900">{monthName}</h3>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Day Labels */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-gray-500 p-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>

        {/* Selected Date Display */}
        {selectedDate && (
          <div className="mt-6 p-4 bg-amber-50 rounded-lg text-center">
            <p className="text-sm text-gray-600">Selected Date</p>
            <p className="text-lg font-semibold" style={{ color: '#f59e0b' }}>
              {selectedDate.toLocaleDateString('en-GB', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-500 text-center">
          <p>⏰ Open Mon, Tue & Wed • 8:30am - 3:00pm</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button onClick={onBack} className="btn-secondary flex-1 sm:flex-initial">
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!selectedDate}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
