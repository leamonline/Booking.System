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

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'full_groom':
        return <Sparkles className="w-8 h-8" />;
      case 'bath_brush':
        return <Bath className="w-8 h-8" />;
      case 'nail_trim':
        return <Scissors className="w-8 h-8" />;
      default:
        return <Plus className="w-8 h-8" />;
    }
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#0284c7' }}></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Choose Your Service
        </h2>
        <p className="text-gray-600">
          Select the main grooming service for your pup
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => handleServiceSelect(service)}
            className={`card text-left hover:shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 ${
              selectedService?.id === service.id
                ? 'ring-2 ring-primary-600 bg-primary-50'
                : ''
            }`}
          >
            <div
              className={`inline-flex p-3 rounded-full mb-4 ${
                selectedService?.id === service.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-primary-100 text-primary-600'
              }`}
            >
              {getServiceIcon(service.service_type)}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {service.name}
            </h3>

            <p className="text-gray-600 text-sm mb-4">
              {service.description || 'Professional grooming service'}
            </p>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary-600">
                ${(service.price_small || 0) / 100}
              </span>
              <span className="text-sm text-gray-500">starting</span>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              {service.base_duration_minutes} min+
            </div>
          </button>
        ))}
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
