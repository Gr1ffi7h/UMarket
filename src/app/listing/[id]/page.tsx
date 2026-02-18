/**
 * Listing Details Page Component
 * 
 * Dynamic route for displaying individual listing details
 * Shows item information, seller details, and contact options
 * Responsive design with dark mode support
 */

'use client';

import React from 'react';
import { Button } from '@/components/Button';
import { ClientHeader } from '@/components/ClientHeader';

// Mock listing data (in a real app, this would come from an API)
const mockListings: Record<string, any> = {
  '1': {
    id: '1',
    title: 'MacBook Pro 14"',
    price: 1200,
    category: 'Electronics',
    condition: 'Like New',
    description: 'Excellent condition MacBook Pro, barely used. Perfect for students who need a powerful laptop for coding, design, or general coursework. Includes original charger and box.\n\nSpecifications:\n- Apple M1 Pro chip\n- 16GB RAM\n- 512GB SSD\n- 14-inch Liquid Retina XDR display\n- macOS Monterey\n\nPurchased new in September 2023, selling because I upgraded to a newer model.',
    images: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
    seller: {
      name: 'John Doe',
      email: 'john.doe@university.edu',
      rating: 4.8,
      totalSales: 12,
      memberSince: 'January 2024',
      responseTime: 'Usually within 1 hour',
    },
    location: 'University Campus - North Dorms',
    postedAt: '2024-01-15',
    views: 45,
    inquiries: 3,
  },
  '2': {
    id: '2',
    title: 'Calculus Textbook',
    price: 45,
    category: 'Books',
    condition: 'Good',
    description: 'Calculus: Early Transcendentals, 8th Edition by James Stewart. Great condition with minimal highlighting. Perfect for calculus courses.\n\nISBN: 978-1285741557\n\nUsed for MATH 151 and MATH 152. Selling because I\'ve completed the calculus sequence.',
    images: ['/api/placeholder/600/400', '/api/placeholder/600/400'],
    seller: {
      name: 'Jane Smith',
      email: 'jane.smith@university.edu',
      rating: 4.9,
      totalSales: 8,
      memberSince: 'September 2023',
      responseTime: 'Usually within 30 minutes',
    },
    location: 'University Campus - Library',
    postedAt: '2024-01-14',
    views: 23,
    inquiries: 2,
  },
};

/**
 * Listing Details Page Component
 * 
 * Displays detailed information about a specific listing
 * Includes seller info, contact options, and related listings
 */
export default function ListingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [listingId, setListingId] = React.useState<string>('');
  const [listing, setListing] = React.useState<any>(null);

  React.useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setListingId(resolvedParams.id);
      setListing(mockListings[resolvedParams.id] || null);
    };
    getParams();
  }, [params]);

  // Handle loading state
  if (!listingId) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <ClientHeader />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </main>
      </div>
    );
  }

  // Handle case where listing doesn't exist
  if (!listing) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <ClientHeader />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Listing Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The listing you're looking for doesn't exist or has been removed.
            </p>
            <Button href="/browse" variant="primary" size="lg">
              Browse Other Listings
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ClientHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Button href="/" variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                Home
              </Button>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <Button href="/browse" variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                Browse
              </Button>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <span className="text-gray-900 dark:text-white font-medium">{listing.title}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {listing.title}
              </h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    ${listing.price}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {listing.category}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {listing.condition}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {listing.views} views • {listing.inquiries} inquiries
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
                <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <div className="text-gray-400 dark:text-gray-500 text-center">
                    <div className="text-lg mb-2">Image 1 of {listing.images.length}</div>
                    <div className="text-sm">No Image Available</div>
                  </div>
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {listing.images.map((_: string, index: number) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Description
              </h2>
              <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {listing.description}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Location
              </h2>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {listing.location}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Seller Information
              </h2>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                    {listing.seller.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {listing.seller.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {listing.seller.email}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Rating</span>
                  <span className="font-medium text-gray-900 dark:text-white">⭐ {listing.seller.rating}/5.0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Total Sales</span>
                  <span className="font-medium text-gray-900 dark:text-white">{listing.seller.totalSales}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Member Since</span>
                  <span className="font-medium text-gray-900 dark:text-white">{listing.seller.memberSince}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Response Time</span>
                  <span className="font-medium text-gray-900 dark:text-white">{listing.seller.responseTime}</span>
                </div>
              </div>

              <Button
                href={`/messages?listing=${listing.id}`}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Contact Seller
              </Button>
            </div>

            {/* Listing Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Listing Details
              </h2>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Posted</span>
                  <span className="font-medium text-gray-900 dark:text-white">{listing.postedAt}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Category</span>
                  <span className="font-medium text-gray-900 dark:text-white">{listing.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Condition</span>
                  <span className="font-medium text-gray-900 dark:text-white">{listing.condition}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Views</span>
                  <span className="font-medium text-gray-900 dark:text-white">{listing.views}</span>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Safety Tips
              </h3>
              <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Meet in a public place on campus</li>
                <li>• Inspect items before purchase</li>
                <li>• Use secure payment methods</li>
                <li>• Trust your instincts</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
