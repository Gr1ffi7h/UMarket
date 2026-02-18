/**
 * Home Page Component
 * 
 * Modern landing page for UMarket with clean, minimal design
 * Optimized for college students with full dark mode support
 * Features enhanced Get Started and Sign Up flows
 */

import { Button } from '@/components/Button';
import { ClientHeader } from '@/components/ClientHeader';

/**
 * Hero section component with modern design
 */
function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 py-24 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Welcome to{' '}
            <span className="text-blue-600 dark:text-blue-400">UMarket</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            The secure marketplace exclusively for college students. 
            Buy, sell, and trade with verified .edu email addresses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              href="/dashboard" 
              variant="primary" 
              size="lg"
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Started
            </Button>
            <Button 
              href="/signup" 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Features section component with modern cards
 */
function FeaturesSection() {
  const features = [
    {
      title: 'Secure Verification',
      description: 'Only .edu email addresses allowed for maximum security and trust.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Easy Listings',
      description: 'Create listings in seconds with our intuitive interface.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
    {
      title: 'Real-time Messaging',
      description: 'Communicate directly with buyers and sellers instantly.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      title: 'Mobile Friendly',
      description: 'Access UMarket from any device, anywhere on campus.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose UMarket?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Designed specifically for college students with security and convenience in mind.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 bg-white dark:bg-gray-800"
            >
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-blue-600 dark:text-blue-400">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
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
 * Stats section component for social proof
 */
function StatsSection() {
  const stats = [
    { number: '1,000+', label: 'Active Students' },
    { number: '99.9%', label: 'Uptime' },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * CTA section component with enhanced design
 */
function CTASection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Start Trading?
        </h2>
        
        <p className="text-xl text-blue-100 dark:text-blue-200 mb-12 max-w-2xl mx-auto">
          Join thousands of college students already using UMarket to buy, sell, and trade safely on campus.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            href="/signup" 
            variant="primary" 
            size="lg"
            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Sign Up Now
          </Button>
          <Button 
            href="/browse" 
            variant="outline" 
            size="lg"
            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-200"
          >
            Browse Listings
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * Main home page component with modern layout
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <ClientHeader />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </main>
  );
}
