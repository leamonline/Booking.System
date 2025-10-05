-- Update services to match Smarter Dog's exact offerings
-- Run this in your Supabase SQL Editor to update the services

-- First, delete old services and groomers
DELETE FROM services;
DELETE FROM groomers;

-- Insert single groomer
INSERT INTO groomers (name, color_code) VALUES
    ('Smarter Dog Grooming Salon', '#f59e0b');  -- Amber

-- Insert Smarter Dog's bookable services with correct pricing (in pence)

-- Full Groom: Small £38+, Medium £46+, Large £62+
INSERT INTO services (name, service_type, description, base_duration_minutes,
                     price_extra_small, price_small, price_medium, price_large,
                     price_extra_large, price_giant) VALUES
    ('Full Groom', 'full_groom', 'Bath, haircut, nail trim, ear cleaning - the complete pamper package!',
     90, 3800, 3800, 4600, 6200, 7000, 8000);

-- De-Shedding Package: Small £30+, Medium £40+, Large £50+
INSERT INTO services (name, service_type, description, base_duration_minutes,
                     price_extra_small, price_small, price_medium, price_large,
                     price_extra_large, price_giant) VALUES
    ('De-Shedding Package', 'bath_brush', 'Deep cleanse and undercoat removal - say goodbye to excess fur!',
     60, 3000, 3000, 4000, 5000, 5500, 6000);

-- Maintenance Groom: Small £30+, Medium £40+, Large £50+
INSERT INTO services (name, service_type, description, base_duration_minutes,
                     price_extra_small, price_small, price_medium, price_large,
                     price_extra_large, price_giant) VALUES
    ('Maintenance Groom', 'bath_brush', 'Bath, brush and trim of specific areas - perfect for a quick tidy-up!',
     60, 3000, 3000, 4000, 5000, 5500, 6000);

-- Note: Quick services (Nail Clipping, Ear Cleaning, Anal Gland Expression, Flea Treatment)
-- are drop-in services and not part of the online booking system

-- Verify the update
SELECT name, service_type, price_small/100 as price_small_gbp, price_medium/100 as price_medium_gbp, price_large/100 as price_large_gbp
FROM services
ORDER BY service_type, name;

SELECT name, color_code FROM groomers;
