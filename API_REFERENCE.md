# API Reference & Integration Guide

## 🔌 API Routes to Implement

### Booking Flow APIs

#### 1. Create Appointment
```typescript
// app/api/appointments/route.ts
POST /api/appointments

Request Body:
{
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
  },
  pet: {
    name: string
    breed?: string
    size: SizeCategory
    coatType: CoatType
    weight?: number
    behavioralNotes?: string
    medicalConditions?: string
  },
  appointment: {
    date: string (ISO date)
    time: string (HH:mm:ss)
    groomerId: string
    mainServiceId: string
    addOnServiceIds: string[]
  }
}

Response:
{
  appointmentId: string
  paymentIntentClientSecret: string
  depositAmount: number
}
```

#### 2. Check Availability
```typescript
// app/api/availability/route.ts
GET /api/availability?date=2025-10-06

Response:
{
  date: string
  groomers: [
    {
      groomerId: string
      groomerName: string
      timeSlots: [
        {
          time: string
          available: boolean
          estimatedDuration?: number
        }
      ]
    }
  ]
}
```

#### 3. Confirm Payment
```typescript
// app/api/appointments/[id]/confirm/route.ts
POST /api/appointments/{id}/confirm

Request Body:
{
  paymentIntentId: string
}

Response:
{
  success: boolean
  appointment: Appointment
}
```

---

## 💳 Stripe Integration

### Setup Payment Intent
```typescript
// lib/stripe/create-payment-intent.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function createPaymentIntent(
  amount: number, // in cents
  customerId: string,
  metadata: Record<string, string>
) {
  return await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
    capture_method: 'manual', // Authorize now, capture later
    metadata: {
      customerId,
      appointmentId: metadata.appointmentId,
    },
  })
}
```

### Webhook Handler
```typescript
// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    return new Response('Webhook signature verification failed', { status: 400 })
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      // Update appointment status
      break
    case 'payment_intent.payment_failed':
      // Handle failed payment
      break
    case 'charge.captured':
      // Mark full payment received
      break
  }

  return new Response(JSON.stringify({ received: true }))
}
```

### Capture Payment After Service
```typescript
// lib/stripe/capture-payment.ts
export async function capturePayment(paymentIntentId: string) {
  const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId)
  return paymentIntent
}
```

---

## 📧 Email Integration (SendGrid)

### Setup
```typescript
// lib/email/client.ts
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export { sgMail }
```

### Booking Confirmation Email
```typescript
// lib/email/send-confirmation.ts
import { sgMail } from './client'

export async function sendBookingConfirmation({
  to,
  customerName,
  petName,
  date,
  time,
  groomerName,
  services,
  total,
}: {
  to: string
  customerName: string
  petName: string
  date: string
  time: string
  groomerName: string
  services: string[]
  total: number
}) {
  await sgMail.send({
    to,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: 'Grooming Appointment Confirmed - Paws & Polish',
    html: `
      <h1>Appointment Confirmed!</h1>
      <p>Hi ${customerName},</p>
      <p>Your grooming appointment for ${petName} is confirmed.</p>

      <h2>Appointment Details</h2>
      <ul>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Groomer:</strong> ${groomerName}</li>
        <li><strong>Services:</strong> ${services.join(', ')}</li>
        <li><strong>Total:</strong> $${(total / 100).toFixed(2)}</li>
      </ul>

      <p>We look forward to pampering ${petName}!</p>

      <p>If you need to cancel or reschedule, please contact us at least 48 hours in advance.</p>
    `,
  })
}
```

### Reminder Emails
```typescript
// lib/email/send-reminder.ts
export async function send72HourReminder(appointment: Appointment) {
  // Similar structure to confirmation
}

export async function send24HourReminder(appointment: Appointment) {
  // Similar structure to confirmation
}
```

---

## 📱 SMS Integration (Twilio)

### Setup
```typescript
// lib/sms/client.ts
import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export { client }
```

### Send SMS Reminder
```typescript
// lib/sms/send-reminder.ts
import { client } from './client'

export async function send24HourSMSReminder({
  to,
  customerName,
  petName,
  date,
  time,
}: {
  to: string
  customerName: string
  petName: string
  date: string
  time: string
}) {
  await client.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
    body: `Hi ${customerName}! This is a reminder that ${petName}'s grooming appointment is tomorrow at ${time}. See you then! - Paws & Polish`,
  })
}
```

---

## ⏰ Scheduled Jobs (Vercel Cron)

### Setup Cron Jobs
```typescript
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/send-72h-reminders",
      "schedule": "0 9 * * *"
    },
    {
      "path": "/api/cron/send-24h-reminders",
      "schedule": "0 9 * * *"
    }
  ]
}
```

### 72-Hour Reminder Cron
```typescript
// app/api/cron/send-72h-reminders/route.ts
export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Get appointments 72 hours from now
  const targetDate = new Date()
  targetDate.setHours(targetDate.getHours() + 72)

  const { data: appointments } = await supabase
    .from('appointments')
    .select('*, customers(*), pets(*)')
    .eq('appointment_date', targetDate.toISOString().split('T')[0])
    .eq('status', 'confirmed')

  // Send email reminders
  for (const apt of appointments || []) {
    await sendBookingReminder(apt)
  }

  return new Response('OK')
}
```

---

## 🔒 Authentication (Admin Dashboard)

### NextAuth.js Setup
```bash
npm install next-auth
```

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Verify admin credentials
        // Check against Supabase or environment variable
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: '1', email: credentials.email, role: 'admin' }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
})

export { handler as GET, handler as POST }
```

---

## 📸 Photo Upload (Supabase Storage)

### Upload Before/After Photos
```typescript
// lib/storage/upload-photo.ts
import { supabase } from '@/lib/supabase/client'

export async function uploadAppointmentPhoto(
  appointmentId: string,
  file: File,
  type: 'before' | 'after'
) {
  // Upload to Supabase Storage
  const fileName = `${appointmentId}-${type}-${Date.now()}.${file.name.split('.').pop()}`
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('appointment-photos')
    .upload(fileName, file)

  if (uploadError) throw uploadError

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('appointment-photos')
    .getPublicUrl(fileName)

  // Save to database
  const { error: dbError } = await supabase
    .from('appointment_photos')
    .insert({
      appointment_id: appointmentId,
      photo_url: urlData.publicUrl,
      photo_type: type,
    })

  if (dbError) throw dbError

  return urlData.publicUrl
}
```

---

## 📊 Analytics & Reports

### Revenue Report
```typescript
// app/api/reports/revenue/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get('start')
  const endDate = searchParams.get('end')

  const { data, error } = await supabase
    .from('appointments')
    .select('total_cents, deposit_cents, full_payment_received')
    .gte('appointment_date', startDate)
    .lte('appointment_date', endDate)
    .eq('status', 'completed')

  const revenue = data?.reduce((sum, apt) => sum + apt.total_cents, 0) || 0

  return Response.json({
    totalRevenue: revenue,
    appointmentCount: data?.length || 0,
    averageTicket: data?.length ? revenue / data.length : 0,
  })
}
```

---

## 🔍 Search & Filters

### Search Customers
```typescript
// app/api/customers/search/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  const { data } = await supabase
    .from('customers')
    .select('*, pets(*)')
    .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`)
    .limit(20)

  return Response.json(data)
}
```

---

## 🎯 Rate Limiting

```typescript
// middleware.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

export async function middleware(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return new Response('Too Many Requests', { status: 429 })
  }
}
```

---

## 📝 Notes

- All amounts are in **cents** (e.g., $50.00 = 5000)
- All times are in **24-hour format** (HH:mm:ss)
- All dates are **ISO 8601** format (YYYY-MM-DD)
- Use **server-side validation** for all inputs
- Implement **CSRF protection** for forms
- Add **request logging** for debugging
- Use **TypeScript** for type safety
- Test all APIs with **Postman** or **Thunder Client**
