"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
          <div className="flex-1">
            {/* Search and Filter */}
            <Card className="mb-6">
              <CardContent className="p-4 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search for items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                  </Button>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Items Grid */}
            {filteredItems.length === 0 ? (
              <EmptyState 
                type="no-search-results"
                onAction={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
                actionText="Clear Filters"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {itemsWithSponsored.map((item, index) => (
                  item.id === 'sponsored-1' ? (
                    <SponsoredItemCard key={item.id} item={item} />
                  ) : (
                    <ItemCard key={item.id} item={item} />
                  )
                ))}
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
