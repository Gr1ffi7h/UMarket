/**
 * Button Component
 * 
 * Reusable button component with multiple variants and sizes
 * Built with accessibility and performance in mind
 * Supports navigation via href prop or onClick handler
 */

import React from 'react';
import Link from 'next/link';
import { ButtonProps } from '@/types';

/**
 * Button component with consistent styling and behavior
 * Server-safe component - no client-side only hooks
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
  // Base classes for all buttons
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-md
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${loading ? 'cursor-wait' : ''}
  `;

  // Variant-specific classes
  const variantClasses = {
    primary: `
      bg-blue-600 text-white
      hover:bg-blue-700 focus:ring-blue-500
      border border-transparent
      dark:bg-blue-500 dark:hover:bg-blue-600
    `,
    secondary: `
      bg-gray-100 text-gray-900
      hover:bg-gray-200 focus:ring-gray-500
      border border-gray-300
      dark:bg-gray-800 dark:text-gray-100
      dark:hover:bg-gray-700 dark:border-gray-600
    `,
    destructive: `
      bg-red-600 text-white
      hover:bg-red-700 focus:ring-red-500
      border border-transparent
    `,
    outline: `
      bg-transparent text-gray-700
      hover:bg-gray-50 focus:ring-gray-500
      border border-gray-300
      dark:text-gray-300 dark:hover:bg-gray-800
      dark:border-gray-600
    `,
    ghost: `
      bg-transparent text-gray-700
      hover:bg-gray-100 focus:ring-gray-500
      border border-transparent
      dark:text-gray-300 dark:hover:bg-gray-800
    `,
  };

  // Size-specific classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
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
          className="animate-spin -ml-1 mr-2 h-4 w-4"
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

  // If href is provided, render as Link
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

  // Otherwise render as button
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
