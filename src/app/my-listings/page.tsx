/**
 * My Listings Page Component
 * 
 * Displays user's marketplace listings in a grid layout
 * Features listing management with edit/delete actions
 * Responsive design with dark mode support
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/Button';
import { ClientHeader } from '@/components/ClientHeader';

// Mock data for user's listings
const mockListings = [
  {
    id: '1',
    title: 'MacBook Pro 14"',
    price: 1200,
    category: 'Electronics',
    condition: 'Like New',
    image: '/api/placeholder/300/200',
    description: 'Excellent condition MacBook Pro, barely used.',
    status: 'active',
    views: 45,
    inquiries: 3,
    postedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Calculus Textbook',
    price: 45,
    category: 'Books',
    condition: 'Good',
    image: '/api/placeholder/300/200',
    description: 'Calculus: Early Transcendentals, 8th Edition.',
    status: 'active',
    views: 23,
    inquiries: 2,
    postedAt: '2024-01-14',
  },
  {
    id: '3',
    title: 'Desk Lamp',
    price: 25,
    category: 'Furniture',
    condition: 'Good',
    status: 'sold',
    views: 67,
    inquiries: 1,
    postedAt: '2024-01-13',
  },
  {
    id: '4',
    title: 'Nike Running Shoes',
    price: 60,
    category: 'Clothing',
    condition: 'Fair',
    status: 'active',
    postedAt: '2024-01-12',
    views: 12,
    inquiries: 1,
  },
  {
    id: '5',
    title: 'Coffee Maker',
    price: 35,
    category: 'Appliances',
    condition: 'New',
    status: 'active',
    postedAt: '2024-01-11',
    views: 34,
    inquiries: 4,
  },
  {
    id: '6',
    title: 'Gaming Mouse',
    price: 40,
    category: 'Electronics',
    condition: 'Like New',
    status: 'pending',
    postedAt: '2024-01-10',
    views: 8,
    inquiries: 0,
  },
];

const categories = ['All', 'Electronics', 'Books', 'Furniture', 'Clothing', 'Appliances'];
const statuses = ['All', 'Active', 'Sold', 'Draft'];

/**
 * Minimal My Listings Page Component
 * 
 * Displays user's listings with compact layout
 * Reduced spacing and minimal visual elements
 */
export default function MinimalMyListingsPage() {
  const [listings, setListings] = useState(mockListings);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Filter listings based on filters
  const filteredListings = listings.filter(listing => {
    const matchesCategory = selectedCategory === 'All' || listing.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || listing.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesCategory && matchesStatus;
  });

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      case 'oldest':
        return new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'views':
        return b.views - a.views;
      default:
        return 0;
    }
  });

  /**
   * Handle listing deletion
   */
  const handleDeleteListing = (listingId: string) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      setListings(prev => prev.filter(listing => listing.id !== listingId));
    }
  };

  /**
   * Handle listing status change
   */
  const handleStatusChange = (listingId: string, newStatus: string) => {
    setListings(prev => prev.map(listing => 
      listing.id === listingId 
        ? { ...listing, status: newStatus }
        : listing
    ));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ClientHeader />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              My Listings
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Manage your marketplace listings
            </p>
          </div>
          <Button href="/create-listing" variant="primary" size="sm">
            Create Listing
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sort
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price-low">Price: Low</option>
                <option value="price-high">Price: High</option>
                <option value="views">Most Views</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {sortedListings.length} {sortedListings.length === 1 ? 'listing' : 'listings'}
          </p>
        </div>

        {/* Listings Grid */}
        {sortedListings.length > 0 ? (
          <div className="space-y-3">
            {sortedListings.map(listing => (
              <div
                key={listing.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-3">
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          No Image
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {listing.title}
                          </h3>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            listing.status === 'active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {listing.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            ${listing.price}
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-300">
                            {listing.category}
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-300">
                            {listing.condition}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          <span>{listing.views} views</span>
                          <span>{listing.inquiries} inquiries</span>
                          <span>{listing.postedAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Button
                      href={`/listing/${listing.id}`}
                      variant="outline"
                      size="sm"
                    >
                      View
                    </Button>
                    <Button
                      href={`/create-listing?edit=${listing.id}`}
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {listing.status === 'active' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(listing.id, 'sold')}
                      >
                        Mark Sold
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteListing(listing.id)}
                      className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-sm mb-2">
              No listings found
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Start by creating your first listing
            </p>
            <Button href="/create-listing" variant="primary" size="sm">
              Create Listing
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
