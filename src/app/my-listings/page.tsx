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
    image: '/api/placeholder/300/200',
    description: 'LED desk lamp with adjustable brightness.',
    status: 'sold',
    views: 67,
    inquiries: 8,
    postedAt: '2024-01-13',
  },
  {
    id: '4',
    title: 'Nike Running Shoes',
    price: 60,
    category: 'Clothing',
    condition: 'Fair',
    image: '/api/placeholder/300/200',
    description: 'Size 10 Nike running shoes, worn a few times.',
    status: 'active',
    views: 12,
    inquiries: 1,
    postedAt: '2024-01-12',
  },
  {
    id: '5',
    title: 'Coffee Maker',
    price: 35,
    category: 'Appliances',
    condition: 'New',
    image: '/api/placeholder/300/200',
    description: 'Brand new coffee maker, still in box.',
    status: 'active',
    views: 34,
    inquiries: 4,
    postedAt: '2024-01-11',
  },
  {
    id: '6',
    title: 'Gaming Mouse',
    price: 40,
    category: 'Electronics',
    condition: 'Like New',
    image: '/api/placeholder/300/200',
    description: 'RGB gaming mouse, barely used.',
    status: 'pending',
    views: 8,
    inquiries: 0,
    postedAt: '2024-01-10',
  },
];

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  sold: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
};

/**
 * My Listings Page Component
 * 
 * Displays user's listings with management options
 * Includes filtering, sorting, and listing actions
 */
export default function MyListingsPage() {
  const [listings, setListings] = useState(mockListings);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter listings based on status
  const filteredListings = listings.filter(listing => {
    if (filter === 'all') return true;
    return listing.status === filter;
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
  const handleDelete = (listingId: string) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      setListings(prev => prev.filter(listing => listing.id !== listingId));
    }
  };

  /**
   * Handle listing status change
   */
  const handleStatusChange = (listingId: string, newStatus: string) => {
    setListings(prev => prev.map(listing => 
      listing.id === listingId ? { ...listing, status: newStatus } : listing
    ));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ClientHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Listings
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your marketplace listings
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {listings.filter(l => l.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Active
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
              {listings.filter(l => l.status === 'sold').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Sold
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              {listings.reduce((sum, l) => sum + l.views, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Total Views
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
              {listings.reduce((sum, l) => sum + l.inquiries, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Inquiries
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Status Filter */}
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  id="status-filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Listings</option>
                  <option value="active">Active</option>
                  <option value="sold">Sold</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sort By
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="views">Most Viewed</option>
                </select>
              </div>
            </div>

            {/* Create New Listing Button */}
            <Button
              href="/create-listing"
              variant="primary"
              size="sm"
              className="w-full md:w-auto"
            >
              Create New Listing
            </Button>
          </div>
        </div>

        {/* Listings Grid */}
        {sortedListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedListings.map(listing => (
              <div
                key={listing.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
              >
                {/* Image */}
                <div className="aspect-w-16 aspect-h-12 bg-gray-200 dark:bg-gray-700 rounded-t-lg">
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
                    <div className="text-gray-400 dark:text-gray-500 text-sm">
                      No Image Available
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {listing.title}
                    </h3>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      ${listing.price}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {listing.category}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[listing.status as keyof typeof statusColors]}`}>
                      {listing.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {listing.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span>{listing.views} views</span>
                    <span>{listing.inquiries} inquiries</span>
                    <span>{listing.postedAt}</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      href={`/listing/${listing.id}`}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      View
                    </Button>
                    <Button
                      href={`/create-listing?edit=${listing.id}`}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      Edit
                    </Button>
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
                      onClick={() => handleDelete(listing.id)}
                      className="text-red-600 hover:text-red-700 hover:border-red-300"
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
            <div className="text-gray-400 dark:text-gray-500 text-lg mb-4">
              No listings found
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {filter === 'all' ? 'You haven\'t created any listings yet.' : `No ${filter} listings found.`}
            </p>
            <Button
              href="/create-listing"
              variant="primary"
              size="lg"
            >
              Create Your First Listing
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
