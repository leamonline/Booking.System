# Dog Grooming Salon Booking System

A beautiful, mobile-first booking system built for a 2-groomer dog grooming salon. Features a 7-step booking flow, dual-groomer scheduling, automated notifications, and Stripe payment integration.

## Features

### Customer-Facing
- **7-Step Booking Flow**: Intuitive mobile-first booking experience
  1. Service selection (Full Groom, Bath & Brush, Nail Trim)
  2. Pet information collection
  3. Date picker with availability
  4. Time slot selection with real-time availability
  5. Add-on services selection
  6. Review and confirmation
  7. Secure payment processing

- **Pet Profiles**: Store multiple pets per customer with detailed information
- **Automated Reminders**: Email and SMS notifications at 72hrs and 24hrs before appointments
- **Payment Processing**: Secure Stripe integration with deposit collection

### Admin Features
- **Dual-Groomer Calendar**: Color-coded scheduling for both groomers
- **Customer Database**: Manage customer and pet information
- **Appointment Management**: Create, edit, and cancel bookings
- **Variable Schedule**: Set availability 6-8 weeks in advance
- **Photo Management**: Upload before/after photos for each appointment

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4 (with @tailwindcss/postcss)
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **Notifications**: SendGrid (Email), Twilio (SMS)
- **Hosting**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account (for payments)
- SendGrid account (for emails)
- Twilio account (for SMS)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/leamonline/Booking.System.git
cd Booking.System
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials:
- Supabase URL and anon key
- Stripe publishable and secret keys
- SendGrid API key and from email
- Twilio credentials

4. Set up the database:
- Create a new Supabase project
- Run the SQL schema from `lib/supabase/schema.sql`
- Enable Row Level Security policies

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The system uses the following main tables:
- `customers`: Customer contact information
- `pets`: Pet profiles linked to customers
- `groomers`: Groomer information and calendar colors
- `services`: Service types with pricing by dog size
- `appointments`: Booking details with payment tracking
- `availability`: Groomer schedule management
- `appointment_photos`: Before/after photos

See `lib/supabase/schema.sql` for the complete schema.

## Pricing Structure

Services are priced based on dog size:
- Extra Small (under 10 lbs): $40-50
- Small (10-29 lbs): $50-70
- Medium (30-44 lbs): $60-85
- Large (45-64 lbs): $75-110
- Extra Large (65-100 lbs): $100-130
- Giant (100+ lbs): $130-150+

Additional charges:
- Curly/doodle coats: +25-50%
- Severe matting: $2/minute

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
npm run build
```

## Configuration

### Business Hours
Edit `lib/utils/datetime.ts` to change operating hours (default: 8:30 AM - 3:00 PM)

### Cancellation Policy
- 48+ hours: Free cancellation
- 24-48 hours: 50% fee
- <24 hours: 100% fee

### Deposit Amount
Default: 50% deposit required at booking (configurable in `lib/utils/pricing.ts`)

## Support

For issues or questions:
- Create an issue on GitHub
- Email: support@pawsandpolish.com

## License

ISC

## Next Steps

To complete the system:
1. Integrate real Stripe Payment Intents
2. Implement admin authentication
3. Build admin dashboard pages
4. Set up SendGrid email templates
5. Configure Twilio SMS messaging
6. Add photo upload to Supabase Storage
7. Implement booking conflict detection
8. Add reporting and analytics

## Troubleshooting

### Build Error: Tailwind CSS PostCSS Plugin
If you see an error about Tailwind CSS and PostCSS, ensure:
1. `@tailwindcss/postcss` is installed: `npm install @tailwindcss/postcss`
2. Your `postcss.config.mjs` uses `'@tailwindcss/postcss': {}`
3. Your `globals.css` starts with `@import "tailwindcss";`

This project uses **Tailwind CSS v4** which has a different configuration than v3.

**Note:** Custom utility classes (`.btn-primary`, `.card`, etc.) are defined using plain CSS in `globals.css` instead of `@apply` directives for better compatibility with Tailwind v4.

### Port Already in Use
If port 3000 is busy:
```bash
# Use a different port
npm run dev -- -p 3001
```

### Supabase Connection Issues
- Verify your `.env.local` has correct credentials
- Check that RLS policies are enabled in Supabase
- Ensure the database schema has been applied

## Development Roadmap

- [ ] Real-time availability checking
- [ ] Online check-in system
- [ ] Customer portal for managing bookings
- [ ] Loyalty program integration
- [ ] Package deals and memberships
- [ ] Multi-location support
