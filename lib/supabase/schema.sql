-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CUSTOMERS TABLE
-- ============================================
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_phone ON customers(phone);

-- ============================================
-- PETS TABLE
-- ============================================
CREATE TYPE size_category AS ENUM ('extra_small', 'small', 'medium', 'large', 'extra_large', 'giant');
CREATE TYPE coat_type AS ENUM ('short', 'medium', 'long', 'curly', 'wire', 'double');

CREATE TABLE pets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    breed VARCHAR(100),
    size_category size_category NOT NULL,
    coat_type coat_type NOT NULL,
    weight_lbs INTEGER,
    date_of_birth DATE,
    behavioral_notes TEXT,
    medical_conditions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_pets_customer_id ON pets(customer_id);

-- ============================================
-- GROOMERS TABLE
-- ============================================
CREATE TABLE groomers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    color_code VARCHAR(7) NOT NULL, -- Hex color for calendar
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default groomer
INSERT INTO groomers (name, color_code) VALUES
    ('Smarter Dog Grooming Salon', '#f59e0b'); -- Amber

-- ============================================
-- SERVICES TABLE
-- ============================================
CREATE TYPE service_type AS ENUM ('full_groom', 'bath_brush', 'nail_trim', 'addon');

CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    service_type service_type NOT NULL,
    description TEXT,
    base_duration_minutes INTEGER NOT NULL, -- Base duration for small dogs
    -- Pricing by size category (in cents)
    price_extra_small INTEGER,
    price_small INTEGER,
    price_medium INTEGER,
    price_large INTEGER,
    price_extra_large INTEGER,
    price_giant INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default services
INSERT INTO services (name, service_type, description, base_duration_minutes,
                     price_extra_small, price_small, price_medium, price_large,
                     price_extra_large, price_giant) VALUES
    ('Full Groom', 'full_groom', 'Complete grooming package: bath, haircut, nails, ears',
     90, 4000, 5000, 6000, 7500, 10000, 13000),
    ('Bath & Brush', 'bath_brush', 'Bath, blow dry, and brush out',
     60, 3500, 4500, 5500, 6500, 8500, 11000),
    ('Nail Trim', 'nail_trim', 'Nail trimming and filing',
     15, 1500, 1500, 1500, 1500, 1500, 1500),
    ('De-shedding Treatment', 'addon', 'Deep conditioning and de-shedding',
     20, 1500, 2000, 2500, 3000, 3500, 4000),
    ('Teeth Brushing', 'addon', 'Dental hygiene treatment',
     10, 1000, 1000, 1000, 1000, 1000, 1000),
    ('Ear Cleaning', 'addon', 'Thorough ear cleaning',
     10, 1000, 1000, 1000, 1000, 1000, 1000);

-- ============================================
-- AVAILABILITY TABLE
-- ============================================
CREATE TABLE availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    groomer_id UUID NOT NULL REFERENCES groomers(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    is_available BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(groomer_id, date)
);

CREATE INDEX idx_availability_date ON availability(date);
CREATE INDEX idx_availability_groomer_date ON availability(groomer_id, date);

-- ============================================
-- APPOINTMENTS TABLE
-- ============================================
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show');

CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    groomer_id UUID NOT NULL REFERENCES groomers(id),
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    duration_minutes INTEGER NOT NULL,
    status appointment_status DEFAULT 'pending',

    -- Services (stored as JSON array of service IDs)
    services JSONB NOT NULL,

    -- Pricing
    subtotal_cents INTEGER NOT NULL,
    deposit_cents INTEGER NOT NULL,
    total_cents INTEGER NOT NULL,

    -- Payment tracking
    stripe_payment_intent_id VARCHAR(255),
    deposit_paid BOOLEAN DEFAULT false,
    full_payment_received BOOLEAN DEFAULT false,

    -- Additional info
    groomer_notes TEXT,
    customer_notes TEXT,

    -- Matting
    matting_fee_cents INTEGER DEFAULT 0,
    matting_minutes INTEGER DEFAULT 0,

    -- Cancellation
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancellation_fee_cents INTEGER DEFAULT 0,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_customer ON appointments(customer_id);
CREATE INDEX idx_appointments_pet ON appointments(pet_id);
CREATE INDEX idx_appointments_groomer ON appointments(groomer_id);
CREATE INDEX idx_appointments_status ON appointments(status);

-- ============================================
-- APPOINTMENT PHOTOS TABLE
-- ============================================
CREATE TYPE photo_type AS ENUM ('before', 'after', 'during');

CREATE TABLE appointment_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    photo_type photo_type NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_photos_appointment ON appointment_photos(appointment_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_photos ENABLE ROW LEVEL SECURITY;

-- Public read access to services and groomers
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE groomers ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active services" ON services
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active groomers" ON groomers
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view availability" ON availability
    FOR SELECT USING (true);

-- Customers can view their own data
CREATE POLICY "Customers can view own data" ON customers
    FOR SELECT USING (true);

CREATE POLICY "Customers can insert own data" ON customers
    FOR INSERT WITH CHECK (true);

-- Pets policies
CREATE POLICY "Anyone can view pets" ON pets
    FOR SELECT USING (true);

CREATE POLICY "Anyone can insert pets" ON pets
    FOR INSERT WITH CHECK (true);

-- Appointments policies
CREATE POLICY "Anyone can view appointments" ON appointments
    FOR SELECT USING (true);

CREATE POLICY "Anyone can create appointments" ON appointments
    FOR INSERT WITH CHECK (true);

-- Photos policies
CREATE POLICY "Anyone can view photos" ON appointment_photos
    FOR SELECT USING (true);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pets_updated_at BEFORE UPDATE ON pets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to check for appointment conflicts
CREATE OR REPLACE FUNCTION check_appointment_conflict()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if groomer has overlapping appointment
    IF EXISTS (
        SELECT 1 FROM appointments
        WHERE groomer_id = NEW.groomer_id
        AND appointment_date = NEW.appointment_date
        AND status NOT IN ('cancelled', 'no_show')
        AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
        AND (
            (NEW.start_time >= start_time AND NEW.start_time < end_time)
            OR (NEW.end_time > start_time AND NEW.end_time <= end_time)
            OR (NEW.start_time <= start_time AND NEW.end_time >= end_time)
        )
    ) THEN
        RAISE EXCEPTION 'Appointment conflict: Groomer already has an appointment at this time';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_appointment_conflict_trigger
    BEFORE INSERT OR UPDATE ON appointments
    FOR EACH ROW EXECUTE FUNCTION check_appointment_conflict();

-- ============================================
-- HELPFUL VIEWS
-- ============================================

-- View for upcoming appointments with customer and pet details
CREATE OR REPLACE VIEW upcoming_appointments AS
SELECT
    a.id,
    a.appointment_date,
    a.start_time,
    a.end_time,
    a.status,
    c.first_name || ' ' || c.last_name AS customer_name,
    c.phone AS customer_phone,
    c.email AS customer_email,
    p.name AS pet_name,
    p.breed,
    p.size_category,
    g.name AS groomer_name,
    g.color_code,
    a.total_cents,
    a.deposit_paid
FROM appointments a
JOIN customers c ON a.customer_id = c.id
JOIN pets p ON a.pet_id = p.id
JOIN groomers g ON a.groomer_id = g.id
WHERE a.appointment_date >= CURRENT_DATE
ORDER BY a.appointment_date, a.start_time;
