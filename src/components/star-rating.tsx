"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
  size?: "sm" | "md" | "lg"
  showValue?: boolean
}

export function StarRating({ 
  rating, 
  onRatingChange, 
  readonly = false, 
  size = "md",
  showValue = false 
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6"
  }

  const handleStarClick = (starRating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starRating)
    }
  }

  const handleMouseEnter = (starRating: number) => {
    if (!readonly) {
      setHoverRating(starRating)
    }
  }

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0)
    }
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= (hoverRating || rating)
          return (
            <Star
              key={star}
              className={`${sizeClasses[size]} ${
                isFilled 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'fill-gray-200 text-gray-200'
              } ${
                !readonly ? 'cursor-pointer hover:scale-110 transition-transform' : ''
              }`}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
            />
          )
        })}
      </div>
      {showValue && (
        <span className="text-sm text-muted-foreground ml-2">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
