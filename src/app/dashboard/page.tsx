/**
 * Dashboard Page Component
 * 
 * Main dashboard for authenticated users
 * Shows marketplace overview and quick actions
 * Responsive design with dark mode support
 */

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';

/**
 * Dashboard statistics data
 */
const stats = [
  { label: 'Active Listings', value: '12', change: '+2 this week' },
  { label: 'Items Sold', value: '8', change: '+1 this week' },
  { label: 'Messages', value: '5', change: '3 unread' },
  { label: 'Profile Views', value: '47', change: '+12 this week' },
];

/**
 * Recent activity data
 */
const recentActivity = [
  { id: 1, type: 'listing', title: 'Textbook: Introduction to Psychology', time: '2 hours ago', status: 'active' },
  { id: 2, type: 'message', title: 'Message from Sarah Johnson', time: '4 hours ago', status: 'unread' },
  { id: 3, type: 'sale', title: 'Sold: Desk Lamp', time: '1 day ago', status: 'completed' },
  { id: 4, type: 'listing', title: 'Bicycle: Mountain Bike', time: '2 days ago', status: 'active' },
];

/**
 * Dashboard Page Component
 * 
 * Main user dashboard with statistics, recent activity, and quick actions
 * Provides overview of marketplace activity and navigation options
 */
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                UMarket
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/listings"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                My Listings
              </Link>
              <Link
                href="/messages"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Messages
              </Link>
              <Link
                href="/profile"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, Student!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Here's what's happening with your marketplace activity today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-sm"></div>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        {stat.label}
                      </p>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {stat.change}
                          </span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button href="/listings/new" variant="primary" className="w-full">
                Create Listing
              </Button>
              <Button href="/browse" variant="outline" className="w-full">
                Browse Items
              </Button>
              <Button href="/messages" variant="outline" className="w-full">
                View Messages
              </Button>
              <Button href="/profile/edit" variant="outline" className="w-full">
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      activity.status === 'unread' ? 'bg-blue-500' :
                      activity.status === 'active' ? 'bg-green-500' :
                      'bg-gray-400'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activity.status === 'unread' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      activity.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
