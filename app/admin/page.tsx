'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Users, Dog, Settings, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('calendar');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">Paws & Polish Admin</h1>
            </div>
            <Link href="/" className="text-sm text-primary-600 hover:underline">
              View Site
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'calendar'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Calendar</span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'customers'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Customers</span>
          </button>

          <button
            onClick={() => setActiveTab('pets')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'pets'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Dog className="w-5 h-5" />
            <span>Pets</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'reports'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Reports</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'calendar' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Appointment Calendar
              </h2>
              <p className="text-gray-600 mb-6">
                View and manage appointments for both groomers
              </p>

              {/* Calendar Placeholder */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Dual-groomer calendar view coming soon
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Color-coded by groomer with drag-and-drop scheduling
                </p>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Customer Database
              </h2>
              <p className="text-gray-600 mb-6">
                Manage customer information and booking history
              </p>

              {/* Customers Placeholder */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Customer management coming soon</p>
                <p className="text-sm text-gray-400 mt-2">
                  Search, filter, and manage customer profiles
                </p>
              </div>
            </div>
          )}

          {activeTab === 'pets' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Pet Profiles</h2>
              <p className="text-gray-600 mb-6">
                View pet information, grooming history, and photos
              </p>

              {/* Pets Placeholder */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Dog className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Pet database coming soon</p>
                <p className="text-sm text-gray-400 mt-2">
                  Track grooming history and before/after photos
                </p>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Reports & Analytics
              </h2>
              <p className="text-gray-600 mb-6">
                Track bookings, revenue, and performance metrics
              </p>

              {/* Reports Placeholder */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Analytics dashboard coming soon</p>
                <p className="text-sm text-gray-400 mt-2">
                  Revenue tracking, no-show rates, and groomer performance
                </p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
              <p className="text-gray-600 mb-6">
                Configure business hours, services, and notifications
              </p>

              <div className="space-y-4 max-w-2xl">
                <div className="card">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Business Hours
                  </h3>
                  <p className="text-sm text-gray-600">
                    Monday - Friday: 8:30 AM - 3:00 PM
                  </p>
                  <button className="btn-secondary mt-3 text-sm">
                    Edit Hours
                  </button>
                </div>

                <div className="card">
                  <h3 className="font-semibold text-gray-900 mb-2">Services</h3>
                  <p className="text-sm text-gray-600">
                    Manage grooming services and pricing
                  </p>
                  <button className="btn-secondary mt-3 text-sm">
                    Manage Services
                  </button>
                </div>

                <div className="card">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Notification Settings
                  </h3>
                  <p className="text-sm text-gray-600">
                    Configure email and SMS reminders
                  </p>
                  <button className="btn-secondary mt-3 text-sm">
                    Configure Notifications
                  </button>
                </div>

                <div className="card">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Groomer Schedules
                  </h3>
                  <p className="text-sm text-gray-600">
                    Set availability for the next 6-8 weeks
                  </p>
                  <button className="btn-secondary mt-3 text-sm">
                    Manage Availability
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="card">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Today's Appointments
            </h3>
            <p className="text-3xl font-bold text-primary-600">0</p>
          </div>

          <div className="card">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              This Week
            </h3>
            <p className="text-3xl font-bold text-primary-600">0</p>
          </div>

          <div className="card">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Total Customers
            </h3>
            <p className="text-3xl font-bold text-primary-600">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
