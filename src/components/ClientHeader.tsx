/**
 * Client Header Component
 * 
 * Client-side wrapper for header functionality
 * Ensures proper hydration for interactive elements
 * Uses dynamic imports to avoid SSR issues
 */

'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/Button';

// Dynamically import ThemeToggle to avoid SSR issues
const ThemeToggle = dynamic(() => import('@/components/ThemeToggle').then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => (
    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
  ),
});

/**
 * Header component with navigation and theme toggle
 * Enhanced with modern styling and better mobile experience
 */
export function ClientHeader() {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              UMarket
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            <Button 
              href="/browse" 
              variant="ghost" 
              size="sm"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Browse
            </Button>
            <Button 
              href="/create-listing" 
              variant="ghost" 
              size="sm"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Create Listing
            </Button>
            <Button 
              href="/messages" 
              variant="ghost" 
              size="sm"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Messages
            </Button>
            <Button 
              href="/profile" 
              variant="ghost" 
              size="sm"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Profile
            </Button>
            <Button 
              href="/login" 
              variant="ghost" 
              size="sm"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Sign In
            </Button>
            <ThemeToggle />
          </nav>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              href="/login"
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
