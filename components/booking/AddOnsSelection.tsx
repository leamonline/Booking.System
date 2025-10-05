'use client';

import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import type { BookingData } from '@/app/book/page';
import { supabase } from '@/lib/supabase/client';
import type { Service } from '@/types/database';
import { formatPrice, getServicePrice } from '@/lib/utils/pricing';

interface Props {
  bookingData: BookingData;
  onNext: (data: Partial<BookingData>) => void;
  onBack: () => void;
}

export default function AddOnsSelection({ bookingData, onNext, onBack }: Props) {
  const [addOnServices, setAddOnServices] = useState<Service[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAddOns();
  }, []);

  async function loadAddOns() {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .eq('service_type', 'addon')
        .order('name');

      if (error) throw error;
      setAddOnServices(data || []);
    } catch (error) {
      console.error('Error loading add-ons:', error);
    } finally {
      setLoading(false);
    }
  }

  const toggleAddOn = (serviceId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleContinue = () => {
    const selectedServices = addOnServices
      .filter((service) => selectedAddOns.includes(service.id))
      .map((service) => ({
        id: service.id,
        name: service.name,
        price: getServicePrice(service, bookingData.petData?.size as any) || 0,
      }));

    onNext({
      addOns: selectedServices,
    });
  };

  const handleSkip = () => {
    onNext({
      addOns: [],
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#f59e0b' }}></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          ✨ Enhance Your Service
        </h2>
        <p className="text-gray-600">
          Add extra pampering for your pup (optional)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {addOnServices.map((service) => {
          const isSelected = selectedAddOns.includes(service.id);
          const price = getServicePrice(
            service,
            (bookingData.petData?.size as any) || 'small'
          );

          return (
            <button
              key={service.id}
              onClick={() => toggleAddOn(service.id)}
              className={`card text-left hover:shadow-lg transition-all transform active:scale-95 relative ${
                isSelected ? 'ring-2 ring-amber-600 bg-amber-50' : ''
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 text-white rounded-full flex items-center justify-center" style={{ backgroundColor: '#f59e0b' }}>
                  <Check className="w-4 h-4" />
                </div>
              )}

              <h3 className="text-lg font-semibold text-gray-900 mb-2 pr-8">
                {service.name}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {service.description || 'Premium add-on service'}
              </p>

              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold" style={{ color: '#f59e0b' }}>
                  {formatPrice(price)}
                </span>
                <span className="text-sm text-gray-500">
                  +{service.base_duration_minutes} min
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {addOnServices.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No add-on services available at this time.</p>
        </div>
      )}

      {selectedAddOns.length > 0 && (
        <div className="card max-w-md mx-auto bg-amber-50 border-amber-200">
          <h4 className="font-semibold text-gray-900 mb-2">Selected Add-ons</h4>
          <ul className="space-y-1">
            {addOnServices
              .filter((s) => selectedAddOns.includes(s.id))
              .map((service) => (
                <li key={service.id} className="flex justify-between text-sm">
                  <span>{service.name}</span>
                  <span className="font-medium">
                    {formatPrice(
                      getServicePrice(
                        service,
                        (bookingData.petData?.size as any) || 'small'
                      )
                    )}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-4">
        <button onClick={onBack} className="btn-secondary flex-1 sm:flex-initial">
          Back
        </button>
        <div className="flex gap-2 flex-1">
          <button onClick={handleSkip} className="btn-secondary flex-1">
            Skip
          </button>
          <button onClick={handleContinue} className="btn-primary flex-1">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
