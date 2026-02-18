/**
 * Theme Toggle Component
 * 
 * Modern, accessible theme toggle button for light/dark mode switching
 * Features smooth animations and proper ARIA labels
 * Fully functional with ThemeProvider context
 */

'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';

/**
 * Theme toggle button with sun/moon icons
 * Provides visual feedback for current theme state
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 w-10 h-10"
        aria-label="Loading theme toggle"
        disabled
      />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-lg transition-all duration-300 ease-in-out
        bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
        border border-gray-300 dark:border-gray-600
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-900
        w-10 h-10 flex items-center justify-center
        group
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="sr-only">Toggle theme</span>
      
      {/* Sun icon for light mode */}
      <svg
        className={`
          h-5 w-5 text-yellow-600 dark:text-yellow-500 transition-all duration-300 ease-in-out
          ${isDark ? 'opacity-0 scale-0 rotate-180 absolute' : 'opacity-100 scale-100 rotate-0'}
        `}
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
        className={`
          h-5 w-5 text-blue-600 dark:text-blue-400 transition-all duration-300 ease-in-out
          ${isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-180 absolute'}
        `}
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
      
      {/* Subtle hover effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
    </button>
  );
}
