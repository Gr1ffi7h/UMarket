/**
 * Minimal Browse Page Component
 * 
 * Compact marketplace with reduced visual bulk
 * Clean grid layout with minimal spacing
 * Lightweight design optimized for fast browsing
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/Button';
import { ClientHeader } from '@/components/ClientHeader';
import { getAllActiveListings } from '@/lib/featured-listing';

// Get all active listings from centralized data source
const mockItems = getAllActiveListings();

const categories = ['All', 'Electronics', 'Books', 'Furniture', 'Clothing', 'Appliances'];
const conditions = ['All', 'New', 'Like New', 'Good', 'Fair'];

/**
 * Minimal Browse Page Component
 * 
 * Compact marketplace with clean grid layout
 * Reduced spacing and minimal visual elements
 */
export default function MinimalBrowsePage() {
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
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Browse
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Find great deals from fellow students
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {/* Search */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

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

            {/* Condition Filter */}
            <div>
              <label htmlFor="condition" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Condition
              </label>
              <select
                id="condition"
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {conditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
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
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {sortedItems.length} {sortedItems.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {/* Items Grid */}
        {sortedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedItems.map(item => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-200 dark:bg-gray-700 rounded-t">
                  <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-t flex items-center justify-center">
                    <div className="text-gray-400 dark:text-gray-500 text-xs">
                      No Image
                    </div>
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {item.title}
                    </h3>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      ${item.price}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {item.category}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {item.condition}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.postedAt}
                    </span>
                    <Button
                      href={`/listing/${item.id}`}
                      variant="outline"
                      size="sm"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-sm mb-2">
              No items found
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
