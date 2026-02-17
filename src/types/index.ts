/**
 * Global TypeScript Types
 * 
 * Shared types used across the UMarket application
 * Ensures type safety and consistency
 */

// Environment variable types
export interface EnvConfig {
  NEXTAUTH_URL: string;
  NEXTAUTH_SECRET: string;
  DATABASE_URL: string;
  NODE_ENV: 'development' | 'production' | 'test';
  APP_URL: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// User types (placeholder for future implementation)
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Marketplace item types (placeholder for future implementation)
export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  images: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Layout types
export interface LayoutProps extends BaseComponentProps {
  title?: string;
  description?: string;
}

// Form types
export interface FormFieldProps extends BaseComponentProps {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

// Button types
export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}
