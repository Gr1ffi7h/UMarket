"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ItemCard } from "@/components/item-card"
import { SponsoredItemCard } from "@/components/sponsored-item-card"
import { TopSellers } from "@/components/top-sellers"
import { Navbar } from "@/components/navbar"
import { MobileNavbar } from "@/components/mobile-navbar"
import { mockItems, sponsoredItem } from "@/lib/mock-data"
import { EmptyState } from "@/components/empty-state"



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
    <div className="min-h-screen bg-background">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>
      
      {/* Mobile Navbar */}
      <div className="md:hidden">
        <MobileNavbar />
      </div>
      
      <main className="container mx-auto px-4 py-4 md:py-8">
        {/* Hero Section */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-muted-foreground text-sm md:text-base">Discover items from your college community</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 md:gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-4 md:space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-3 md:p-4">
                <div className="flex flex-col gap-4">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search items, sellers, categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Category:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className="text-xs md:text-sm"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : itemsWithSponsored.length === 0 ? (
              <EmptyState 
                type={searchTerm.trim() ? "no-search-results" : "no-listings"}
                onAction={() => setSelectedCategory("all")}
                actionText="Browse All Categories"
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {itemsWithSponsored.map((item, index) => {
                  if (item.isSponsored) {
                    return <SponsoredItemCard key={`sponsored-${index}`} item={item} />
                  }
                  return <ItemCard key={item.id} item={item} />
                })}
              </div>
            )}
          </div>

          {/* Sidebar - Top Sellers */}
          <div className="xl:w-80">
            <div className="sticky top-20 md:top-24">
              <TopSellers />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
