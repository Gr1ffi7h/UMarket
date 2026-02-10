"use client"

import { StarRating } from "./star-rating"
import { reviews } from "@/lib/reviews"

interface SellerRatingProps {
  sellerId: string
  sellerName?: string
  showCount?: boolean
  size?: "sm" | "md" | "lg"
}

export function SellerRating({ 
  sellerId, 
  sellerName, 
  showCount = true, 
  size = "sm" 
}: SellerRatingProps) {
  const sellerRating = reviews.getSellerRating(sellerId)

  if (sellerRating.totalReviews === 0) {
    return (
      <div className="flex items-center gap-2">
        <StarRating rating={0} readonly size={size} />
        <span className="text-sm text-muted-foreground">
          No reviews yet
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <StarRating rating={sellerRating.averageRating} readonly size={size} showValue />
      {showCount && (
        <span className="text-sm text-muted-foreground">
          ({sellerRating.totalReviews} review{sellerRating.totalReviews !== 1 ? 's' : ''})
        </span>
      )}
    </div>
  )
}
