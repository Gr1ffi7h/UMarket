/**
 * Admin Dashboard Component
 * 
 * Client-side admin interface with user and listing management
 * Includes role management and listing deletion capabilities
 */

'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  created_at: string;
}

interface Listing {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  description: string;
  image?: string;
  seller_id: string;
  posted_at: string;
  profiles: {
    id: string;
    username: string;
    email: string;
  };
}

interface AdminDashboardProps {
  initialUsers: User[];
  initialListings: Listing[];
  currentUserId: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export function AdminDashboard({ initialUsers, initialListings, currentUserId }: AdminDashboardProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const showMessage = (msg: string, isError = false) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleBanUser = async (userId: string) => {
    if (!supabase) {
      showMessage('Supabase not configured', true);
      return;
    }

    if (userId === currentUserId) {
      showMessage('Cannot ban yourself', true);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'banned' })
        .eq('id', userId);

      if (error) {
        showMessage('Error banning user: ' + error.message, true);
      } else {
        setUsers(users.map(u => u.id === userId ? { ...u, role: 'banned' } : u));
        showMessage('User banned successfully');
      }
    } catch (error) {
      showMessage('Error banning user', true);
    } finally {
      setLoading(false);
    }
  };

  const handleUnbanUser = async (userId: string) => {
    if (!supabase) {
      showMessage('Supabase not configured', true);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'user' })
        .eq('id', userId);

      if (error) {
        showMessage('Error unbanning user: ' + error.message, true);
      } else {
        setUsers(users.map(u => u.id === userId ? { ...u, role: 'user' } : u));
        showMessage('User unbanned successfully');
      }
    } catch (error) {
      showMessage('Error unbanning user', true);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteListing = async (listingId: string) => {
    if (!supabase) {
      showMessage('Supabase not configured', true);
      return;
    }

    if (!confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', listingId);

      if (error) {
        showMessage('Error deleting listing: ' + error.message, true);
      } else {
        setListings(listings.filter(l => l.id !== listingId));
        showMessage('Listing deleted successfully');
      }
    } catch (error) {
      showMessage('Error deleting listing', true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {message && (
        <div className={`p-4 rounded-md ${
          message.includes('Error') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
        }`}>
          {message}
        </div>
      )}

      {/* Users Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Users ({users.length})</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.username}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'banned' ? 'bg-red-100 text-red-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {user.role === 'banned' ? (
                        <button
                          onClick={() => handleUnbanUser(user.id)}
                          disabled={loading}
                          className="text-green-600 hover:text-green-900 disabled:opacity-50"
                        >
                          Unban
                        </button>
                      ) : user.role !== 'admin' ? (
                        <button
                          onClick={() => handleBanUser(user.id)}
                          disabled={loading}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50"
                        >
                          Ban
                        </button>
                      ) : (
                        <span className="text-gray-400">Admin</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Listings Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Listings ({listings.length})</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Listing
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seller
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {listings.map((listing) => (
                  <tr key={listing.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {listing.image && (
                          <img
                            className="h-10 w-10 rounded-full object-cover mr-3"
                            src={listing.image}
                            alt={listing.title}
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                          <div className="text-sm text-gray-500">{listing.category} • {listing.condition}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{listing.profiles.username}</div>
                      <div className="text-sm text-gray-500">{listing.profiles.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${listing.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(listing.posted_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDeleteListing(listing.id)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
