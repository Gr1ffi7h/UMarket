"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Filter, Search } from "lucide-react"
import { ModernButton } from "@/components/ui/modern-button"
import { GlassCard } from "@/components/ui/glass-card"
import { ModernItemCard } from "@/components/modern-item-card"
import { SponsoredItemCard } from "@/components/sponsored-item-card"
import { TopSellers } from "@/components/top-sellers"
import { ModernNavbar } from "@/components/modern-navbar"
import { MobileNavbar } from "@/components/mobile-navbar"
import { AuthGuard } from "@/components/auth-guard"
import { mockItems, sponsoredItem } from "@/lib/mock-data"
import { EmptyState } from "@/components/empty-state"
import { motion } from "framer-motion"



const categories = ["all", "Textbooks", "Electronics", "Furniture", "Supplies", "Sports", "Office Supplies"]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  // Simple search filtering with loading simulation
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      // No search query - filter by category only
      if (selectedCategory === "all") {
        return mockItems
      }
      return mockItems.filter(item => item.category === selectedCategory)
    }

    const query = searchTerm.toLowerCase()
    
    return mockItems.filter(item => {
      // Search in title, description, category, and seller name
      const matchesSearch = 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.seller.name.toLowerCase().includes(query) ||
        item.seller.school.toLowerCase().includes(query)

      // Category filter
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory, mockItems])

  // Insert sponsored items when there's no search query
  const itemsWithSponsored = useMemo(() => {
    if (searchTerm.trim()) {
      // During search, don't show sponsored items
      return filteredItems
    }

    // No search - insert sponsored items every 3 items
    const result: any[] = []
    filteredItems.forEach((item, index) => {
      result.push(item)
      if ((index + 1) % 3 === 0 && index < filteredItems.length - 1) {
        result.push(sponsoredItem)
      }
    })
    return result
  }, [filteredItems, searchTerm])

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-neutral-900 dark:to-slate-800">
        {/* Desktop Navbar */}
        <div className="hidden md:block">
          <ModernNavbar />
        </div>
        
        {/* Mobile Navbar */}
        <div className="md:hidden">
          <MobileNavbar />
        </div>
      
      <main className="container mx-auto px-4 py-4 md:py-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Marketplace
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Discover items from your college community
          </p>
        </motion.div>

        <div className="flex flex-col xl:flex-row gap-6 md:gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filter */}
            <GlassCard delay={0} className="mb-6">
              <div className="p-4 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search for items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/40 dark:bg-neutral-800/40 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  <ModernButton variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                  </ModernButton>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'bg-white/40 dark:bg-neutral-800/40 text-muted-foreground hover:bg-white/60 dark:hover:bg-neutral-800/60'
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Items Grid */}
            {filteredItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <EmptyState 
                  type="no-search-results"
                  onAction={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                  }}
                  actionText="Clear Filters"
                />
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {itemsWithSponsored.map((item, index) => (
                  item.id === 'sponsored-1' ? (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SponsoredItemCard item={item} />
                    </motion.div>
                  ) : (
                    <ModernItemCard 
                      key={item.id} 
                      item={item} 
                      delay={index}
                    />
                  )
                ))}
              </div>
            )}
          </div>

          {/* Sidebar - Top Sellers */}
          <div className="xl:w-80">
            <div className="sticky top-20 md:top-24">
              <GlassCard delay={0.5}>
                <TopSellers />
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
    </div>
    </AuthGuard>
  )
}
