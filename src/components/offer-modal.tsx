"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OfferModalProps {
  isOpen: boolean
  onClose: () => void
  item: {
    id: string
    title: string
    price: number
    seller: {
      id: string
      name: string
    }
  }
  onOfferSubmit: (offer: { price: number; message: string }) => void
  isLoading?: boolean
}

export function OfferModal({ isOpen, onClose, item, onOfferSubmit, isLoading = false }: OfferModalProps) {
  const [offerPrice, setOfferPrice] = useState("")
  const [offerMessage, setOfferMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const price = parseFloat(offerPrice)
    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid offer amount")
      return
    }

    onOfferSubmit({
      price,
      message: offerMessage.trim() || `I'd like to offer $${price} for ${item.title}`
    })
  }

  const handleClose = () => {
    if (!isLoading) {
      setOfferPrice("")
      setOfferMessage("")
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Make an Offer</CardTitle>
          <p className="text-sm text-muted-foreground">
            {item.title} - Listed at ${item.price}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="offerPrice" className="block text-sm font-medium mb-2">
                Your Offer ($)
              </label>
              <Input
                id="offerPrice"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="offerMessage" className="block text-sm font-medium mb-2">
                Message (optional)
              </label>
              <Textarea
                id="offerMessage"
                placeholder="Add a message to the seller..."
                value={offerMessage}
                onChange={(e) => setOfferMessage(e.target.value)}
                rows={3}
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {offerMessage.length}/200 characters
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !offerPrice.trim()}
                className="flex-1"
              >
                {isLoading ? "Sending..." : "Send Offer"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
