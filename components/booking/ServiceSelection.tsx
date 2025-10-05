'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Bath, Scissors, Plus, AlertCircle } from 'lucide-react';
import type { BookingData } from '@/app/book/page';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import type { Service } from '@/types/database';

interface Props {
  bookingData: BookingData;
  onNext: (data: Partial<BookingData>) => void;
  onBack: () => void;
}

export default function ServiceSelection({ bookingData, onNext }: Props) {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .in('service_type', ['full_groom', 'bath_brush'])
        .order('service_type');

      if (error) throw error;
      // Filter out Nail Clipping service
      const filtered = (data || []).filter(s => !s.name.toLowerCase().includes('nail'));
      setServices(filtered);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  const handleContinue = () => {
    if (!selectedService) return;

    onNext({
      mainService: {
        id: selectedService.id,
        name: selectedService.name,
        type: selectedService.service_type,
      },
    });
  };

  const getServiceEmoji = (name: string) => {
    if (name.toLowerCase().includes('full groom')) return '✂️';
    if (name.toLowerCase().includes('de-shedding')) return '🐕';
    if (name.toLowerCase().includes('maintenance')) return '🛁';
    return '✨';
  };

  const getServiceTitle = (name: string) => {
    if (name.toLowerCase().includes('full groom')) return 'FULL GROOM';
    if (name.toLowerCase().includes('de-shedding')) return 'DE-SHEDDING PACKAGE';
    if (name.toLowerCase().includes('maintenance')) return 'MAINTENANCE GROOM';
    return name.toUpperCase();
  };

  const getServiceTagline = (name: string) => {
    if (name.toLowerCase().includes('full groom')) return 'For a head-to-paw transformation!';
    if (name.toLowerCase().includes('de-shedding')) return 'Wave goodbye to tumble-fur!';
    if (name.toLowerCase().includes('maintenance')) return 'Stay tidy between cuts.';
    return 'Professional grooming service';
  };

  const getServiceDetails = (service: Service) => {
    if (service.name.toLowerCase().includes('full groom')) {
      return {
        includes: 'Includes: bath, haircut, nail trim, ear cleaning',
        result: 'Your dog leaves fresh, styled, and ready for hugs.'
      };
    }
    if (service.name.toLowerCase().includes('de-shedding')) {
      return {
        includes: 'Deep cleanse, undercoat removal, brush out, blow dry',
        result: 'Perfect for double-coated or shedding breeds.'
      };
    }
    if (service.name.toLowerCase().includes('maintenance')) {
      return {
        includes: 'Bath, brush, trim of eyes, feet & hygiene areas',
        result: 'For regulars who love looking smart.'
      };
    }
    return {
      includes: service.description || '',
      result: ''
    };
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Choose Your Service
          </h2>
        </div>

        <div className="card max-w-2xl mx-auto bg-amber-50 border-amber-200">
          <div className="flex gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Database Not Configured
              </h3>
              <p className="text-gray-700 mb-4">
                To use the booking system, you need to set up Supabase:
              </p>
              <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                <li>Create a free account at <a href="https://supabase.com" target="_blank" className="text-blue-600 hover:underline">supabase.com</a></li>
                <li>Create a new project</li>
                <li>Run the SQL schema from <code className="bg-gray-100 px-1 rounded">lib/supabase/schema.sql</code></li>
                <li>Copy your credentials to <code className="bg-gray-100 px-1 rounded">.env.local</code></li>
              </ol>
              <p className="text-sm text-gray-600 mt-4">
                See <code className="bg-gray-100 px-1 rounded">SETUP.md</code> for detailed instructions.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-start">
          <a href="/" className="btn-secondary">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#f59e0b' }}></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Choose Your Service
        </h2>
        <p className="text-gray-600">
          Select the perfect grooming package for your pup
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((service) => {
          const details = getServiceDetails(service);
          const isSelected = selectedService?.id === service.id;

          return (
            <button
              key={service.id}
              onClick={() => handleServiceSelect(service)}
              className={`relative overflow-hidden rounded-2xl transition-all transform hover:-translate-y-1 active:scale-95 ${
                isSelected ? 'ring-8 shadow-2xl scale-105' : 'shadow-lg hover:shadow-xl'
              }`}
              style={{
                backgroundColor: isSelected ? '#fef3c7' : '#bfdbfe',
                border: isSelected ? '6px solid #f59e0b' : '4px solid #1e3a8a',
                padding: '0'
              }}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full font-bold text-sm"
                  style={{ backgroundColor: '#16a34a', color: 'white' }}
                >
                  ✓ SELECTED
                </div>
              )}

              {/* Icon Circle */}
              <div className="flex justify-center pt-8 pb-6">
                <div
                  className="w-32 h-20 rounded-full flex items-center justify-center text-5xl"
                  style={{
                    backgroundColor: isSelected ? '#16a34a' : '#f59e0b',
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.3s'
                  }}
                >
                  {getServiceEmoji(service.name)}
                </div>
              </div>

              {/* Title */}
              <h3
                className="text-2xl font-black mb-4 px-6"
                style={{
                  color: '#ea580c',
                  fontFamily: 'Arial Black, sans-serif',
                  letterSpacing: '0.5px'
                }}
              >
                {getServiceTitle(service.name)}
              </h3>

              {/* Tagline */}
              <p
                className="text-base italic font-semibold mb-4 px-6"
                style={{ color: '#ea580c' }}
              >
                {getServiceTagline(service.name)}
              </p>

              {/* Details */}
              <div className="px-6 mb-6 text-left">
                <p className="text-sm font-medium text-gray-800 mb-2">
                  {details.includes}
                </p>
                <p className="text-sm font-medium text-gray-800">
                  {details.result}
                </p>
              </div>

              {/* Pricing Buttons */}
              <div className="space-y-3 px-6 pb-6">
                <div
                  className="rounded-xl py-3 px-4 font-bold text-white text-center"
                  style={{
                    backgroundColor: '#f59e0b',
                    border: '3px solid #1e3a8a'
                  }}
                >
                  Small: £{(service.price_small || 0) / 100}+
                </div>
                <div
                  className="rounded-xl py-3 px-4 font-bold text-white text-center"
                  style={{
                    backgroundColor: '#f59e0b',
                    border: '3px solid #1e3a8a'
                  }}
                >
                  Medium: £{(service.price_medium || 0) / 100}+
                </div>
                <div
                  className="rounded-xl py-3 px-4 font-bold text-white text-center"
                  style={{
                    backgroundColor: '#f59e0b',
                    border: '3px solid #1e3a8a'
                  }}
                >
                  Large: £{(service.price_large || 0) / 100}+
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end pt-6">
        <button
          onClick={handleContinue}
          disabled={!selectedService}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
