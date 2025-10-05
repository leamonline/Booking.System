# Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase

1. Create a free account at [https://supabase.com](https://supabase.com)
2. Create a new project
3. Go to **SQL Editor** and run the schema from `lib/supabase/schema.sql`
4. Go to **Settings** → **API** and copy:
   - Project URL
   - Anon/Public key

### 3. Configure Environment Variables

Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📋 What's Working Now

✅ **Homepage** - Beautiful landing page with "Book Appointment" CTA
✅ **7-Step Booking Flow** - Complete customer booking experience:
  - Service selection
  - Pet information
  - Date picker
  - Time slot selection
  - Add-on services
  - Review & confirmation
  - Payment (UI only - Stripe integration pending)

✅ **Admin Dashboard** - Basic admin interface structure
✅ **Database Schema** - Complete PostgreSQL schema with RLS
✅ **Mobile-First Design** - Fully responsive with Tailwind CSS

---

## 🔜 Next Steps to Production

### Required Integrations

#### 1. Stripe Payment Processing
```bash
npm install @stripe/stripe-js stripe
```

Add to `.env.local`:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

Create payment intent API route and integrate with `PaymentStep.tsx`

#### 2. Email Notifications (SendGrid)
```bash
npm install @sendgrid/mail
```

Add to `.env.local`:
```env
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
```

#### 3. SMS Notifications (Twilio)
```bash
npm install twilio
```

Add to `.env.local`:
```env
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=+1234567890
```

---

## 🎨 Customization

### Update Business Information

**Homepage** (`app/page.tsx`):
- Change business name
- Update hours of operation
- Modify contact information

**Services & Pricing** (Supabase):
- Edit services in the `services` table
- Adjust pricing by size category

**Groomers** (Supabase):
- Add/edit groomers in `groomers` table
- Change color codes for calendar

### Styling

**Colors** (`tailwind.config.ts`):
```typescript
colors: {
  primary: { ... }, // Change brand colors
  secondary: { ... },
}
```

**Logo**: Replace in `app/page.tsx` and `app/layout.tsx`

---

## 📱 Testing on Mobile

1. Find your local IP address:
```bash
# macOS/Linux
ifconfig | grep "inet "

# Windows
ipconfig
```

2. Access from phone: `http://YOUR-IP:3000`

---

## 🚢 Deploy to Production

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables
4. Deploy!

### Custom Domain

1. Buy domain (Namecheap, Google Domains, etc.)
2. Add custom domain in Vercel
3. Update DNS records
4. Enable HTTPS (automatic with Vercel)

---

## 📊 Database Management

### View Data
Use Supabase Table Editor or SQL Editor

### Backup
```bash
# Supabase handles automatic backups
# For manual backup, export from SQL Editor
```

### Seed Initial Data

Already included in schema:
- 2 groomers (Sarah & Jessica)
- 6 services (Full Groom, Bath & Brush, etc.)

---

## 🐛 Troubleshooting

### "Failed to fetch services"
- Check Supabase credentials in `.env.local`
- Verify RLS policies are enabled
- Ensure schema is applied correctly

### Styling not loading
```bash
npm run dev
# Clear browser cache
# Check tailwind.config.ts paths
```

### Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

---

## 📚 Key Files

- `app/page.tsx` - Homepage
- `app/book/page.tsx` - Booking flow coordinator
- `components/booking/*` - 7-step booking components
- `app/admin/page.tsx` - Admin dashboard
- `lib/supabase/schema.sql` - Database schema
- `lib/utils/pricing.ts` - Pricing calculations
- `types/database.ts` - TypeScript types

---

## 🎯 Production Checklist

Before going live:

- [ ] Set up real Stripe account (not test mode)
- [ ] Configure SendGrid production email
- [ ] Set up Twilio SMS
- [ ] Enable Supabase production mode
- [ ] Add custom domain
- [ ] Test complete booking flow
- [ ] Test payment processing
- [ ] Test email/SMS notifications
- [ ] Add analytics (Google Analytics, Plausible, etc.)
- [ ] Set up error monitoring (Sentry)
- [ ] Create privacy policy & terms
- [ ] Enable SSL certificate
- [ ] Test mobile responsiveness
- [ ] Load test with expected traffic

---

## 💡 Tips

- **Mobile Testing**: Use Chrome DevTools device mode
- **Fast Refresh**: Next.js updates instantly on save
- **Type Safety**: TypeScript catches errors before runtime
- **Performance**: Next.js optimizes images automatically
- **SEO**: Add metadata in `layout.tsx` for better SEO

---

## 🆘 Support

Need help? Check:
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Stripe Docs](https://stripe.com/docs)

---

Happy grooming! 🐕✨
