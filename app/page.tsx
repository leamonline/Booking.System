import Link from 'next/link';
import { Sparkles, Clock, Heart, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Paws & Polish</h1>
            </div>
            <Link
              href="/admin"
              className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              Admin
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Premium Dog Grooming
            <span className="block text-primary-600 mt-2">
              Made Simple
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
            Professional grooming services for your furry family members.
            Expert care with a gentle touch, tailored to your dog's needs.
          </p>

          {/* Primary CTA */}
          <Link
            href="/book"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-xl
                     font-semibold text-lg hover:bg-primary-700 transition-all
                     duration-200 shadow-lg hover:shadow-xl active:scale-95
                     transform min-h-[56px] min-w-[200px]"
          >
            Book Appointment
          </Link>

          <p className="mt-4 text-sm text-gray-500">
            Same-day appointments often available
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="bg-primary-100 p-4 rounded-full">
                <Star className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Expert Groomers
            </h3>
            <p className="text-gray-600">
              Two experienced professionals dedicated to making your pup look and feel their best
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="bg-primary-100 p-4 rounded-full">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Flexible Scheduling
            </h3>
            <p className="text-gray-600">
              Book online 24/7 with real-time availability. Choose the time that works for you
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card text-center hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="flex justify-center mb-4">
              <div className="bg-primary-100 p-4 rounded-full">
                <Heart className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Gentle Care
            </h3>
            <p className="text-gray-600">
              Specialized handling for anxious dogs, seniors, and special needs pets
            </p>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Our Services
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card hover:shadow-lg transition-shadow">
            <h4 className="font-semibold text-lg mb-2">Full Groom</h4>
            <p className="text-gray-600 text-sm mb-2">Bath, haircut, nails, ears</p>
            <p className="text-primary-600 font-bold">From $40</p>
          </div>

          <div className="card hover:shadow-lg transition-shadow">
            <h4 className="font-semibold text-lg mb-2">Bath & Brush</h4>
            <p className="text-gray-600 text-sm mb-2">Wash, dry, brush out</p>
            <p className="text-primary-600 font-bold">From $35</p>
          </div>

          <div className="card hover:shadow-lg transition-shadow">
            <h4 className="font-semibold text-lg mb-2">Nail Trim</h4>
            <p className="text-gray-600 text-sm mb-2">Quick nail service</p>
            <p className="text-primary-600 font-bold">$15</p>
          </div>

          <div className="card hover:shadow-lg transition-shadow">
            <h4 className="font-semibold text-lg mb-2">Add-ons</h4>
            <p className="text-gray-600 text-sm mb-2">Teeth brushing, de-shedding</p>
            <p className="text-primary-600 font-bold">From $10</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/book"
            className="btn-primary inline-block"
          >
            View All Services & Book
          </Link>
        </div>
      </section>

      {/* Hours & Contact */}
      <section className="bg-gray-50 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-semibold text-lg mb-2">Hours</h4>
              <p className="text-gray-600">Monday - Friday</p>
              <p className="text-gray-900 font-semibold">8:30 AM - 3:00 PM</p>
              <p className="text-gray-500 text-sm mt-2">By appointment only</p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Contact</h4>
              <p className="text-gray-600">Questions about our services?</p>
              <a href="tel:555-123-4567" className="text-primary-600 font-semibold hover:underline">
                (555) 123-4567
              </a>
              <br />
              <a href="mailto:hello@pawsandpolish.com" className="text-primary-600 hover:underline">
                hello@pawsandpolish.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 text-sm">
          <p>&copy; 2025 Paws & Polish Dog Grooming. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
