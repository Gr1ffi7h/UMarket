/**
 * Profile Page Component
 * 
 * Displays user profile information and navigation
 * Shows user details, stats, and quick actions
 * Responsive design with dark mode support
 */

'use client';

import React from 'react';
import { Button } from '@/components/Button';
import { ClientHeader } from '@/components/ClientHeader';

/**
 * Profile Page Component
 * 
 * Main profile page showing user information and navigation options
 * Includes user stats, recent activity, and quick action buttons
 */
export default function ProfilePage() {
  const userStats = {
    listings: 12,
    sold: 8,
    bought: 5,
    rating: 4.8,
  };

  const recentActivity = [
    { type: 'listing', title: 'MacBook Pro 14"', date: '2 days ago', status: 'active' },
    { type: 'sold', title: 'Calculus Textbook', date: '1 week ago', status: 'completed' },
    { type: 'bought', title: 'Desk Lamp', date: '2 weeks ago', status: 'completed' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ClientHeader />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-medium text-gray-600 dark:text-gray-300">
                  JD
                </span>
              </div>
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                John Doe
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                john.doe@university.edu
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                University Campus
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Member since January 2024
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col space-y-2">
              <Button
                href="/profile/edit"
                variant="primary"
                size="sm"
                className="w-full sm:w-auto"
              >
                Edit Profile
              </Button>
              <Button
                href="/my-listings"
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
              >
                My Listings
              </Button>
              <Button
                href="/messages"
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
              >
                Messages
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {userStats.listings}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Active Listings
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
              {userStats.sold}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Items Sold
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              {userStats.bought}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Items Bought
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
              {userStats.rating}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Rating
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'listing' ? 'bg-blue-500' :
                    activity.type === 'sold' ? 'bg-green-500' : 'bg-purple-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.type === 'listing' ? 'Listed' :
                       activity.type === 'sold' ? 'Sold' : 'Bought'} • {activity.date}
                    </p>
                  </div>
                </div>
                
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {activity.status === 'active' ? 'Active' : 'Completed'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button
            href="/create-listing"
            variant="primary"
            size="lg"
            className="flex-1"
          >
            Create New Listing
          </Button>
          <Button
            href="/browse"
            variant="outline"
            size="lg"
            className="flex-1"
          >
            Browse Marketplace
          </Button>
        </div>
      </main>
    </div>
  );
}
