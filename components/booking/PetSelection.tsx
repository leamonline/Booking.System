'use client';

import { useState } from 'react';
import type { BookingData } from '@/app/book/page';

interface Props {
  bookingData: BookingData;
  onNext: (data: Partial<BookingData>) => void;
  onBack: () => void;
}

const SIZE_OPTIONS = [
  { value: 'extra_small', label: 'Extra Small', description: 'Under 10 lbs' },
  { value: 'small', label: 'Small', description: '10-29 lbs' },
  { value: 'medium', label: 'Medium', description: '30-44 lbs' },
  { value: 'large', label: 'Large', description: '45-64 lbs' },
  { value: 'extra_large', label: 'Extra Large', description: '65-100 lbs' },
  { value: 'giant', label: 'Giant', description: '100+ lbs' },
];

const COAT_OPTIONS = [
  { value: 'short', label: 'Short' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long' },
  { value: 'curly', label: 'Curly/Doodle' },
  { value: 'wire', label: 'Wire' },
  { value: 'double', label: 'Double Coat' },
];

export default function PetSelection({ bookingData, onNext, onBack }: Props) {
  const [isNewCustomer, setIsNewCustomer] = useState(true);
  const [formData, setFormData] = useState({
    // Customer info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Pet info
    petName: '',
    breed: '',
    size: '',
    coatType: '',
    weight: '',
    behavioralNotes: '',
    medicalConditions: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.petName ||
      !formData.size ||
      !formData.coatType
    ) {
      alert('Please fill in all required fields');
      return;
    }

    onNext({
      isNewCustomer,
      customerData: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      },
      petData: {
        name: formData.petName,
        breed: formData.breed,
        size: formData.size,
        coatType: formData.coatType,
        weight: formData.weight ? parseInt(formData.weight) : undefined,
        behavioralNotes: formData.behavioralNotes,
        medicalConditions: formData.medicalConditions,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Tell Us About Your Pup
        </h2>
        <p className="text-gray-600">
          We need a few details to provide the best care
        </p>
      </div>

      {/* New vs Returning Customer */}
      <div className="card">
        <div className="flex gap-4">
          <button
            onClick={() => setIsNewCustomer(true)}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
              isNewCustomer
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            New Customer
          </button>
          <button
            onClick={() => setIsNewCustomer(false)}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
              !isNewCustomer
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Returning Customer
          </button>
        </div>
      </div>

      <form className="space-y-6">
        {/* Customer Information */}
        {isNewCustomer && (
          <div className="card space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
                placeholder="(555) 123-4567"
                required
              />
            </div>
          </div>
        )}

        {/* Pet Information */}
        <div className="card space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Pet Information</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pet Name *
            </label>
            <input
              type="text"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Breed
            </label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., Golden Retriever, Mixed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size Category *
            </label>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select size</option>
              {SIZE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} - {option.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coat Type *
            </label>
            <select
              name="coatType"
              value={formData.coatType}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select coat type</option>
              {COAT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight (lbs)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="input-field"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Behavioral Notes
            </label>
            <textarea
              name="behavioralNotes"
              value={formData.behavioralNotes}
              onChange={handleChange}
              className="input-field"
              rows={3}
              placeholder="e.g., Anxious around other dogs, loves treats"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medical Conditions
            </label>
            <textarea
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleChange}
              className="input-field"
              rows={3}
              placeholder="e.g., Arthritis, skin allergies"
            />
          </div>
        </div>
      </form>

      {/* Navigation */}
      <div className="flex gap-4">
        <button onClick={onBack} className="btn-secondary flex-1 sm:flex-initial">
          Back
        </button>
        <button onClick={handleContinue} className="btn-primary flex-1">
          Continue
        </button>
      </div>
    </div>
  );
}
