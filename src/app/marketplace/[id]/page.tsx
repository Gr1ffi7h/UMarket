"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, User, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmptyState } from "@/components/empty-state"
import { Navbar } from "@/components/navbar"
import { MobileNavbar } from "@/components/mobile-navbar"
import { SellerRating } from "@/components/seller-rating"
import { getItemById } from "@/lib/mock-data"
import { auth } from "@/lib/auth"
import { messaging } from "@/lib/messaging"

export default function ItemDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [contactMessage, setContactMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const item = getItemById(params.id as string)
  const user = auth.getCurrentUser()

  const handleContact = () => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    if (!item) return

    setIsLoading(true)
    
    // Check if conversation already exists
    const existingConversation = messaging.getConversationBetweenUsers(
      user.id,
      item.seller.id,
      item.id
    )

    if (existingConversation) {
      // Navigate to existing conversation
      router.push(`/messages?conversation=${existingConversation.id}`)
    } else {
      // Create new conversation with default message
      const defaultMessage = contactMessage.trim() || "Hey, is this still available?"
      
      messaging.sendMessage(
        user.id,
        item.seller.id,
        defaultMessage,
        item.id,
        item.title,
        user.name,
        item.seller.name
      )

      // Navigate to messages
      router.push("/messages")
    }
    
    setIsLoading(false)
  }

  // Handle item not found
  if (!item) {
    return (
      <main className="min-h-screen bg-background">
        {/* Desktop Navbar */}
        <div className="hidden md:block">
          <Navbar />
        </div>
        
        {/* Mobile Navbar */}
        <div className="md:hidden">
          <MobileNavbar />
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <button 
              onClick={() => router.push("/marketplace")}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Marketplace
            </button>
          </div>

          <EmptyState 
            type="no-search-results"
            onAction={() => router.push("/marketplace")}
            actionText="Browse Marketplace"
          />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href="/marketplace"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-muted-foreground text-sm">Image Placeholder</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="bg-muted px-2 py-1 rounded">{item.category}</span>
                    <span className="bg-muted px-2 py-1 rounded">{item.condition}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="border-t pt-6">
                  <h2 className="text-xl font-semibold mb-3">Contact Seller</h2>
                  <div className="space-y-4">
                    <textarea
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Hi! I'm interested in this item. Is it still available?"
                      className="w-full p-3 border border-input rounded-md bg-background resize-none h-24"
                    />
                    <Button onClick={handleContact} className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Message"}
                  </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">${item.price}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button size="lg" className="w-full mb-4" onClick={handleContact}>
                    {isLoading ? "Sending..." : "Message Seller"}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Price is negotiable. Contact seller to discuss.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Seller Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold">
                        {item.seller.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.seller.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.seller.school}
                      </p>
                      <SellerRating sellerId={item.seller.id} sellerName={item.seller.name} />
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      Member since {new Date().getFullYear() - 2}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Listed: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recently'}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
