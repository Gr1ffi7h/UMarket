/**
 * Header Component
 * 
 * Navigation header with theme toggle
 * Client component for interactive functionality
 */

'use client';

import React from 'react';
import { Button } from '@/components/Button';
import { ThemeToggle } from '@/components/ThemeToggle';

/**
 * Header component with navigation and theme toggle
 * Client component for interactive theme switching
 */
export function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              UMarket
            </h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Button href="/browse" variant="ghost" size="sm">
              Browse
            </Button>
            <Button href="/login" variant="ghost" size="sm">
              Sign In
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
