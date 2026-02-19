/**
 * Minimal Landing Page
 * 
 * Clean, compact landing page with reduced visual bulk
 * Focus on essential information and clear calls-to-action
 * Lightweight design optimized for fast loading
 */

import { Button } from '@/components/Button';
import { ClientHeader } from '@/components/ClientHeader';

/**
 * Minimal Hero Section
 * 
 * Compact hero with essential messaging only
 */
function MinimalHero() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-3">
          Campus Marketplace
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
          Buy and sell with fellow students. Simple, safe, and local.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/browse" variant="primary" size="md">
            Browse Items
          </Button>
          <Button href="/create-listing" variant="outline" size="md">
            Sell Something
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * Minimal Stats Section
 * 
 * Subtle stats display with reduced visual prominence
 */
function MinimalStats() {
  return (
    <section className="py-6 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center gap-8 text-center">
          <div>
            <div className="text-lg font-medium text-blue-600 dark:text-blue-400">
              1,000+
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              Active Students
            </div>
          </div>
          <div>
            <div className="text-lg font-medium text-blue-600 dark:text-blue-400">
              99.9%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              Uptime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Minimal Features Section
 * 
 * Compact feature list with clean presentation
 */
function MinimalFeatures() {
  const features = [
    { title: 'Student Verified', description: '.edu email required' },
    { title: 'Campus Local', description: 'Meet on campus' },
    { title: 'Safe Trading', description: 'Verified users only' },
  ];

  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Minimal Landing Page
 * 
 * Main landing page component with clean, lightweight design
 * Removes bulk and focuses on essential information
 */
export default function MinimalLandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ClientHeader />
      
      <main>
        <MinimalHero />
        <MinimalStats />
        <MinimalFeatures />
      </main>
    </div>
  );
}
