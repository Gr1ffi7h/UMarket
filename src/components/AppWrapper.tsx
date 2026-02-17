/**
 * App Wrapper Component
 * 
 * Client wrapper for theme provider and other client-side functionality
 * Ensures proper hydration and theme context availability
 */

'use client';

import React from 'react';
import { ThemeProvider } from './ThemeProvider';

/**
 * App wrapper component
 * Wraps children with ThemeProvider for client-side functionality
 */
export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
