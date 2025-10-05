import Link from 'next/link';
import { Sparkles, Clock, Award, MapPin, Phone, Mail } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8" style={{ color: '#f59e0b' }} />
              <h1 className="text-2xl font-bold text-gray-900">Smarter Dog</h1>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="tel:07507731487"
                className="hidden sm:flex items-center gap-2 text-sm font-medium hover:underline"
                style={{ color: '#f59e0b' }}
              >
                <Phone className="w-4 h-4" />
                07507 731487
              </a>
              <Link
                href="/admin"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🏆 Award-Winning Dog Grooming Salon
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            40+ Years Pampering Pups
          </h2>

          <p className="text-xl font-semibold mb-2" style={{ color: '#f59e0b' }}>
            All Breeds • Ashton-under-Lyne
          </p>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
            Professional grooming with a friendly touch. From a quick tidy-up to a full pamper session,
            we've got your furry friend covered! 🐕✨
          </p>

          {/* Primary CTA */}
          <Link
            href="/book"
            className="inline-block text-white px-8 py-4 rounded-xl
                     font-semibold text-lg hover:opacity-90 transition-all
                     duration-200 shadow-lg hover:shadow-xl active:scale-95
                     transform min-h-[56px] min-w-[200px]"
            style={{ backgroundColor: '#f59e0b' }}
          >
            Book Appointment Online
          </Link>

          <p className="mt-4 text-sm text-gray-500">
            Or call/WhatsApp us on <a href="tel:07507731487" className="font-semibold hover:underline" style={{ color: '#f59e0b' }}>07507 731487</a>
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="bg-amber-100 p-4 rounded-full">
                <Award className="w-8 h-8" style={{ color: '#f59e0b' }} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              40+ Years Experience
            </h3>
            <p className="text-gray-600">
              Recognized by Three Best Rated Pet Groomers. Your pup is in expert hands!
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="bg-amber-100 p-4 rounded-full">
                <Sparkles className="w-8 h-8" style={{ color: '#f59e0b' }} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              All Breeds Welcome
            </h3>
            <p className="text-gray-600">
              From tiny Chihuahuas to gentle giants - we groom all dog breeds with care
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="bg-amber-100 p-4 rounded-full">
                <Clock className="w-8 h-8" style={{ color: '#f59e0b' }} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Convenient Hours
            </h3>
            <p className="text-gray-600">
              Mon, Tue & Wed: 8:30am - 3:00pm. Book online or call to schedule!
            </p>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Our Grooming Services
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Full Groom */}
          <div className="card hover:shadow-lg transition-shadow border-2 border-amber-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">✨</span>
              <h4 className="font-semibold text-xl">Full Groom</h4>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Bath, haircut, nail trim, ear cleaning - the complete pamper package!
            </p>
            <div className="flex flex-wrap gap-2 text-sm mb-3">
              <span className="bg-amber-50 px-2 py-1 rounded">Small: £38+</span>
              <span className="bg-amber-50 px-2 py-1 rounded">Medium: £46+</span>
              <span className="bg-amber-50 px-2 py-1 rounded">Large: £62+</span>
            </div>
          </div>

          {/* De-Shedding */}
          <div className="card hover:shadow-lg transition-shadow border-2 border-amber-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌟</span>
              <h4 className="font-semibold text-xl">De-Shedding Package</h4>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Deep cleanse and undercoat removal - say goodbye to excess fur!
            </p>
            <div className="flex flex-wrap gap-2 text-sm mb-3">
              <span className="bg-amber-50 px-2 py-1 rounded">Small: £30+</span>
              <span className="bg-amber-50 px-2 py-1 rounded">Medium: £40+</span>
              <span className="bg-amber-50 px-2 py-1 rounded">Large: £50+</span>
            </div>
          </div>

          {/* Maintenance Groom */}
          <div className="card hover:shadow-lg transition-shadow border-2 border-amber-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">💅</span>
              <h4 className="font-semibold text-xl">Maintenance Groom</h4>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Bath, brush and trim of specific areas - perfect for a quick tidy-up!
            </p>
            <div className="flex flex-wrap gap-2 text-sm mb-3">
              <span className="bg-amber-50 px-2 py-1 rounded">Small: £30+</span>
              <span className="bg-amber-50 px-2 py-1 rounded">Medium: £40+</span>
              <span className="bg-amber-50 px-2 py-1 rounded">Large: £50+</span>
            </div>
          </div>
        </div>

        {/* Quick Services */}
        <div className="card bg-amber-50 border-2 border-amber-200">
          <h4 className="font-semibold text-xl mb-3 flex items-center gap-2">
            <span>⚡</span> Quick Services - £10 Each
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-lg">
              <p className="font-medium">Nail Clipping</p>
              <p className="text-sm text-gray-600">Quick & painless trim</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="font-medium">Ear Cleaning</p>
              <p className="text-sm text-gray-600">Gentle thorough clean</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="font-medium">Anal Gland Expression</p>
              <p className="text-sm text-gray-600">Professional care</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            💊 Optional flea treatment available
          </p>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/book"
            className="btn-primary inline-block text-white"
            style={{ backgroundColor: '#f59e0b' }}
          >
            Book Your Appointment Now
          </Link>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hours */}
            <div className="card">
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" style={{ color: '#f59e0b' }} />
                Opening Hours
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday, Tuesday & Wednesday</span>
                  <span className="font-semibold text-gray-900">8:30am - 3:00pm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Appointments</span>
                  <span className="font-semibold text-gray-900">1:00pm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thursday - Sunday</span>
                  <span className="font-semibold text-gray-900">Closed</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">📅 By appointment only</p>
            </div>

            {/* Contact */}
            <div className="card">
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" style={{ color: '#f59e0b' }} />
                Find Us
              </h4>
              <div className="space-y-3">
                <p className="text-gray-900 font-medium">
                  183 Kings Road<br />
                  Ashton-under-Lyne<br />
                  OL6 8HD
                </p>
                <div className="space-y-2">
                  <a
                    href="tel:07507731487"
                    className="flex items-center gap-2 font-semibold hover:underline"
                    style={{ color: '#f59e0b' }}
                  >
                    <Phone className="w-4 h-4" />
                    07507 731487 (Call or WhatsApp)
                  </a>
                  <a
                    href="mailto:leam@smarterdog.co.uk"
                    className="flex items-center gap-2 hover:underline"
                    style={{ color: '#f59e0b' }}
                  >
                    <Mail className="w-4 h-4" />
                    leam@smarterdog.co.uk
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 text-sm mb-2">
            🐾 <strong>Smarter Dog</strong> - Award-Winning Dog Grooming
          </p>
          <p className="text-gray-500 text-xs">
            &copy; 2025 Smarter Dog. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
