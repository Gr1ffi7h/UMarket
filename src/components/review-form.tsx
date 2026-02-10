"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { StarRating } from "./star-rating"
import { reviews } from "@/lib/reviews"

interface ReviewFormProps {
  sellerId: string
  sellerName: string
  itemId: string
  itemTitle: string
  reviewerId: string
  reviewerName: string
  onReviewSubmitted?: () => void
}

export function ReviewForm({
  sellerId,
  sellerName,
  itemId,
  itemTitle,
  reviewerId,
  reviewerName,
  onReviewSubmitted
}: ReviewFormProps) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      // Check if user already reviewed
      if (reviews.hasUserReviewedSellerForItem(sellerId, reviewerId, itemId)) {
        setError("You have already reviewed this seller for this item")
        return
      }

      await reviews.addReview(
        sellerId,
        reviewerId,
        reviewerName,
        rating,
        comment.trim() || undefined,
        itemId,
        itemTitle
      )

      // Reset form
      setRating(5)
      setComment("")
      
      if (onReviewSubmitted) {
        onReviewSubmitted()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Review for {sellerName}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Review your experience with this transaction for "{itemTitle}"
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <StarRating 
              rating={rating} 
              onRatingChange={setRating}
              size="lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Comment (optional)
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this seller..."
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {comment.length}/500 characters
            </p>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isSubmitting || rating === 0}
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
