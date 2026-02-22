/**
 * Featured Listing Algorithm
 * 
 * Fetches real listings from Supabase database
 * Deterministic hourly rotation using modulo operation
 * Ensures same listing appears during the same hour globally
 */

import { supabase } from './supabaseClient';

export interface Listing {
  id: string;
  title: string;
  price: number;
  description: string;
  created_at: string;
}

/**
 * Get all active listings from database
 */
async function getAllActiveListings(): Promise<Listing[]> {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('listings')
      .select(`
        id,
        title,
        price,
        description,
        created_at
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching listings:', error);
      return [];
    }

    return data?.map(listing => ({
      id: listing.id,
      title: listing.title,
      price: listing.price,
      description: listing.description,
      created_at: listing.created_at,
    })) || [];
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}

/**
 * Get featured listings using deterministic hourly algorithm
 * 
 * @param count Number of listings to return
 * @returns Array of featured listings
 */
export async function getFeaturedListings(count: number = 6): Promise<Listing[]> {
  const allListings = await getAllActiveListings();
  
  if (allListings.length === 0) {
    return [];
  }

  // Get current hour (0-23) for deterministic selection
  const currentHour = new Date().getHours();
  
  // Use modulo to create deterministic starting index
  const startIndex = currentHour % allListings.length;
  
  // Get consecutive listings starting from the deterministic index
  const featuredListings = [];
  for (let i = 0; i < count && i < allListings.length; i++) {
    const index = (startIndex + i) % allListings.length;
    featuredListings.push(allListings[index]);
  }
  
  return featuredListings;
}
