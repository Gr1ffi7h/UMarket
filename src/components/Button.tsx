/**
 * Button Component
 * 
 * Enhanced reusable button component with multiple variants and sizes
 * Built with accessibility, performance, and dark mode support in mind
 * Supports navigation via href prop or onClick handler
 * Optimized for college student user experience
 */

import React from 'react';
import Link from 'next/link';
import { ButtonProps } from '@/types';

/**
 * Button component with consistent styling and enhanced behavior
 * Server-safe component - no client-side only hooks
 * Features improved hover states and accessibility
 */
export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  href,
  ...props
}: ButtonProps & { href?: string }) {
  // Base classes for all buttons with enhanced transitions
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    ${loading ? 'cursor-wait' : ''}
    active:scale-95
  `;

  // Enhanced variant-specific classes with dark mode support
  const variantClasses = {
    primary: `
      bg-blue-600 text-white shadow-md hover:shadow-lg
      hover:bg-blue-700 focus:ring-blue-500
      border border-transparent
      dark:bg-blue-500 dark:hover:bg-blue-600
      dark:focus:ring-blue-400 dark:shadow-blue-900/20
      transform hover:-translate-y-0.5
    `,
    secondary: `
      bg-gray-100 text-gray-900 shadow-sm hover:shadow-md
      hover:bg-gray-200 focus:ring-gray-500
      border border-gray-300
      dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600
      dark:hover:bg-gray-700 dark:focus:ring-gray-400
      dark:shadow-gray-900/20
    `,
    destructive: `
      bg-red-600 text-white shadow-md hover:shadow-lg
      hover:bg-red-700 focus:ring-red-500
      border border-transparent
      dark:bg-red-700 dark:hover:bg-red-800
      transform hover:-translate-y-0.5
    `,
    outline: `
      bg-transparent text-gray-700 shadow-sm hover:shadow-md
      hover:bg-gray-50 focus:ring-gray-500
      border-2 border-gray-300
      dark:text-gray-300 dark:hover:bg-gray-800
      dark:border-gray-600 dark:focus:ring-gray-400
      dark:shadow-gray-900/10
    `,
    ghost: `
      bg-transparent text-gray-700
      hover:bg-gray-100 focus:ring-gray-500
      border border-transparent
      dark:text-gray-300 dark:hover:bg-gray-800
      dark:focus:ring-gray-400
    `,
  };

  // Enhanced size-specific classes with better padding
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const buttonContent = (
    <>
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </>
  );

  // If href is provided, render as Link with enhanced styling
  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...props}
      >
        {buttonContent}
      </Link>
    );
  }

  // Otherwise render as button with enhanced attributes
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {buttonContent}
    </button>
  );
}
