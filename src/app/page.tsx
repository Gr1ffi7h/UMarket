/**
 * Home Page Component
 * 
 * Main landing page for UMarket
 * Server component optimized for performance and SEO
 * Updated with functional navigation
 */

import { Button } from '@/components/Button';

/**
 * Hero section component
 */
function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to{' '}
          <span className="text-blue-600">UMarket</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          The secure marketplace exclusively for college students. 
          Buy, sell, and trade with verified .edu email addresses.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/dashboard" variant="primary" size="lg">
            Get Started
          </Button>
          <Button href="/signup" variant="outline" size="lg">
            Sign Up
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * Features section component
 */
function FeaturesSection() {
  const features = [
    {
      title: 'Secure Verification',
      description: 'Only .edu email addresses allowed for maximum security and trust.',
    },
    {
      title: 'Easy Listings',
      description: 'Create listings in seconds with our intuitive interface.',
    },
    {
      title: 'Real-time Messaging',
      description: 'Communicate directly with buyers and sellers instantly.',
    },
    {
      title: 'Mobile Friendly',
      description: 'Access UMarket from any device, anywhere on campus.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Why Choose UMarket?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * CTA section component
 */
function CTASection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Ready to Start Trading?
        </h2>
        
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of college students already using UMarket.
        </p>
        
        <Button href="/signup" variant="primary" size="lg">
          Sign Up Now
        </Button>
      </div>
    </section>
  );
}

/**
 * Main home page component
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
}
