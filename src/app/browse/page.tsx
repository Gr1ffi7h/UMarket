/**
 * Browse Page Component
 * 
 * Displays all marketplace items in a grid layout
 * Features search, filtering, and sorting functionality
 * Responsive design with dark mode support
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/Button';
import { ClientHeader } from '@/components/ClientHeader';

// Mock data for marketplace items
const mockItems = [
  {
    id: '1',
    title: 'MacBook Pro 14"',
    price: 1200,
    category: 'Electronics',
    condition: 'Like New',
    image: '/api/placeholder/300/200',
    description: 'Excellent condition MacBook Pro, barely used.',
    seller: 'john.doe@university.edu',
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
    seller: 'jane.smith@university.edu',
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
    seller: 'mike.wilson@university.edu',
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
    seller: 'sarah.jones@university.edu',
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
    seller: 'alex.brown@university.edu',
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
    seller: 'chris.davis@university.edu',
    postedAt: '2024-01-10',
  },
];

const categories = ['All', 'Electronics', 'Books', 'Furniture', 'Clothing', 'Appliances'];
const conditions = ['All', 'New', 'Like New', 'Good', 'Fair'];

/**
 * Browse Page Component
 * 
 * Main marketplace browsing interface with search and filters
 * Displays items in a responsive grid layout
 */
export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Filter items based on search and filters
  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesCondition = selectedCondition === 'All' || item.condition === selectedCondition;
    
    return matchesSearch && matchesCategory && matchesCondition;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      case 'oldest':
        return new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ClientHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Browse Marketplace
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find great deals from fellow students
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Items
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search for items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Condition Filter */}
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Condition
              </label>
              <select
                id="condition"
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {conditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {sortedItems.length} {sortedItems.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {/* Items Grid */}
        {sortedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedItems.map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
              >
                <div className="aspect-w-16 aspect-h-12 bg-gray-200 dark:bg-gray-700 rounded-t-lg">
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
                    <div className="text-gray-400 dark:text-gray-500 text-sm">
                      No Image Available
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {item.title}
                    </h3>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      ${item.price}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {item.category}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {item.condition}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.postedAt}
                    </span>
                    <Button
                      href={`/item/${item.id}`}
                      variant="outline"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-lg mb-4">
              No items found
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
