/**
 * Featured Listing Algorithm
 * 
 * Deterministic hourly rotation using modulo operation
 * Ensures same listing appears during the same hour globally
 * No randomness, no external scheduling needed
 */

// Mock database of active listings
// In production, this would come from your database
const ACTIVE_LISTINGS = [
  {
    id: '1',
    title: 'MacBook Pro 14"',
    price: 1200,
    category: 'Electronics',
    condition: 'Like New',
    image: '/api/placeholder/200/150',
    description: 'Powerful laptop in excellent condition',
    postedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Calculus Textbook',
    price: 45,
    category: 'Books',
    condition: 'Good',
    image: '/api/placeholder/200/150',
    description: 'Essential calculus textbook with minimal notes',
    postedAt: '2024-01-14',
  },
  {
    id: '3',
    title: 'Desk Lamp',
    price: 25,
    category: 'Furniture',
    condition: 'Good',
    image: '/api/placeholder/200/150',
    description: 'LED desk lamp with adjustable brightness',
    postedAt: '2024-01-13',
  },
  {
    id: '4',
    title: 'Nike Running Shoes',
    price: 60,
    category: 'Clothing',
    condition: 'Fair',
    image: '/api/placeholder/200/150',
    description: 'Comfortable running shoes, lightly used',
    postedAt: '2024-01-12',
  },
  {
    id: '5',
    title: 'Coffee Maker',
    price: 35,
    category: 'Appliances',
    condition: 'New',
    image: '/api/placeholder/200/150',
    description: 'Brand new coffee maker, never opened',
    postedAt: '2024-01-11',
  },
  {
    id: '6',
    title: 'Gaming Mouse',
    price: 40,
    category: 'Electronics',
    condition: 'Like New',
    image: '/api/placeholder/200/150',
    description: 'Wireless gaming mouse with RGB lighting',
    postedAt: '2024-01-10',
  },
  {
    id: '7',
    title: 'Winter Jacket',
    price: 80,
    category: 'Clothing',
    condition: 'Excellent',
    image: '/api/placeholder/200/150',
    description: 'Warm winter jacket, size M',
    postedAt: '2024-01-09',
  },
  {
    id: '8',
    title: 'Physics Textbook',
    price: 55,
    category: 'Books',
    condition: 'Good',
    image: '/api/placeholder/200/150',
    description: 'University physics textbook, latest edition',
    postedAt: '2024-01-08',
  },
];

/**
 * Get current hour in UTC (0-23)
 * 
 * Uses deterministic timestamp calculation
 * Ensures consistent hour calculation across servers
 */
function getCurrentUTCHour(): number {
  return Math.floor(Date.now() / (1000 * 60 * 60)) % 24;
}

/**
 * Get featured listing using deterministic algorithm
 * 
 * Algorithm:
 * 1. Get current UTC hour (0-23)
 * 2. Use modulo operation: featuredIndex = currentHour % listings.length
 * 3. Return listing at that index
 * 
 * This ensures:
 * - Same listing appears during the same hour globally
 * - Listing changes every new hour
 * - No randomness on page refresh
 * - No external scheduling needed
 */
export function getFeaturedListing(): typeof ACTIVE_LISTINGS[0] | null {
  // Edge case: No listings available
  if (ACTIVE_LISTINGS.length === 0) {
    return null;
  }

  // Edge case: Only one listing exists
  if (ACTIVE_LISTINGS.length === 1) {
    return ACTIVE_LISTINGS[0];
  }

  // Deterministic selection using current hour
  const currentHour = getCurrentUTCHour();
  const featuredIndex = currentHour % ACTIVE_LISTINGS.length;
  
  return ACTIVE_LISTINGS[featuredIndex];
}

/**
 * Get multiple featured listings for grid display
 * 
 * Uses the same deterministic algorithm but returns multiple listings
 * Starting from the featured listing and wrapping around
 */
export function getFeaturedListings(count: number = 6): typeof ACTIVE_LISTINGS {
  // Edge case: No listings available
  if (ACTIVE_LISTINGS.length === 0) {
    return [];
  }

  // Edge case: Fewer listings than requested count
  if (ACTIVE_LISTINGS.length <= count) {
    return [...ACTIVE_LISTINGS];
  }

  const currentHour = getCurrentUTCHour();
  const featuredIndex = currentHour % ACTIVE_LISTINGS.length;
  
  // Return listings starting from featured index
  const featuredListings: typeof ACTIVE_LISTINGS = [];
  
  for (let i = 0; i < count; i++) {
    const index = (featuredIndex + i) % ACTIVE_LISTINGS.length;
    featuredListings.push(ACTIVE_LISTINGS[index]);
  }
  
  return featuredListings;
}

/**
 * Get all active listings (for browse page)
 * 
 * In production, this would query your database
 */
export function getAllActiveListings(): typeof ACTIVE_LISTINGS {
  return [...ACTIVE_LISTINGS];
}
