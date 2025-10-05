export type SizeCategory = 'extra_small' | 'small' | 'medium' | 'large' | 'extra_large' | 'giant';
export type CoatType = 'short' | 'medium' | 'long' | 'curly' | 'wire' | 'double';
export type ServiceType = 'full_groom' | 'bath_brush' | 'nail_trim' | 'addon';
export type AppointmentStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
export type PhotoType = 'before' | 'after' | 'during';

export interface Customer {
  id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
}

export interface Pet {
  id: string;
  customer_id: string;
  name: string;
  breed: string | null;
  size_category: SizeCategory;
  coat_type: CoatType;
  weight_lbs: number | null;
  date_of_birth: string | null;
  behavioral_notes: string | null;
  medical_conditions: string | null;
  created_at: string;
  updated_at: string;
}

export interface Groomer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  color_code: string;
  is_active: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  service_type: ServiceType;
  description: string | null;
  base_duration_minutes: number;
  price_extra_small: number | null;
  price_small: number | null;
  price_medium: number | null;
  price_large: number | null;
  price_extra_large: number | null;
  price_giant: number | null;
  is_active: boolean;
  created_at: string;
}

export interface Availability {
  id: string;
  groomer_id: string;
  date: string;
  is_available: boolean;
  notes: string | null;
  created_at: string;
}

export interface Appointment {
  id: string;
  customer_id: string;
  pet_id: string;
  groomer_id: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  status: AppointmentStatus;
  services: {
    service_id: string;
    name: string;
    price: number;
  }[];
  subtotal_cents: number;
  deposit_cents: number;
  total_cents: number;
  stripe_payment_intent_id: string | null;
  deposit_paid: boolean;
  full_payment_received: boolean;
  groomer_notes: string | null;
  customer_notes: string | null;
  matting_fee_cents: number;
  matting_minutes: number;
  cancelled_at: string | null;
  cancellation_fee_cents: number;
  created_at: string;
  updated_at: string;
}

export interface AppointmentPhoto {
  id: string;
  appointment_id: string;
  photo_url: string;
  photo_type: PhotoType;
  uploaded_at: string;
}

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: Customer;
        Insert: Omit<Customer, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Customer, 'id' | 'created_at' | 'updated_at'>>;
      };
      pets: {
        Row: Pet;
        Insert: Omit<Pet, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Pet, 'id' | 'created_at' | 'updated_at'>>;
      };
      groomers: {
        Row: Groomer;
        Insert: Omit<Groomer, 'id' | 'created_at'>;
        Update: Partial<Omit<Groomer, 'id' | 'created_at'>>;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, 'id' | 'created_at'>;
        Update: Partial<Omit<Service, 'id' | 'created_at'>>;
      };
      availability: {
        Row: Availability;
        Insert: Omit<Availability, 'id' | 'created_at'>;
        Update: Partial<Omit<Availability, 'id' | 'created_at'>>;
      };
      appointments: {
        Row: Appointment;
        Insert: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Appointment, 'id' | 'created_at' | 'updated_at'>>;
      };
      appointment_photos: {
        Row: AppointmentPhoto;
        Insert: Omit<AppointmentPhoto, 'id' | 'uploaded_at'>;
        Update: Partial<Omit<AppointmentPhoto, 'id' | 'uploaded_at'>>;
      };
    };
  };
}
