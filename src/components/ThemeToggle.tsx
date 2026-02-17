/**
 * Theme Toggle Component
 * 
 * Button to switch between light and dark themes
 * Accessible with proper ARIA labels and keyboard navigation
 * Shows current theme state with appropriate icons
 */

'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';

/**
 * Theme Toggle Button
 * 
 * Provides a button to toggle between light and dark themes
 * Uses sun/moon icons to indicate current state
 * Fully accessible with keyboard navigation support
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="sr-only">Toggle theme</span>
      
      {/* Sun icon for light mode */}
      <svg
        className={`h-5 w-5 transition-all duration-200 ${
          theme === 'light' ? 'opacity-100 scale-100' : 'opacity-0 scale-0 absolute'
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      
      {/* Moon icon for dark mode */}
      <svg
        className={`h-5 w-5 transition-all duration-200 ${
          theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-0 absolute'
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
      
      {/* Placeholder to maintain button size */}
      <div className="h-5 w-5" />
    </button>
  );
}
