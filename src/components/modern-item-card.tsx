"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, User, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { UserAvatar } from "@/components/user-avatar"
import { SellerRating } from "@/components/seller-rating"
import { cn } from "@/lib/utils"

interface ModernItemCardProps {
  item: {
    id: string
    title: string
    price: number
    description: string
    category: string
    condition: string
    location: string
    seller: {
      id: string
      name: string
      email: string
    }
    images?: string[]
    createdAt?: string
  }
  className?: string
  delay?: number
}

export function ModernItemCard({ item, className, delay = 0 }: ModernItemCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: delay * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      className={cn("group", className)}
    >
      <Link href={`/marketplace/${item.id}`}>
        <Card className="backdrop-blur-md bg-white/60 dark:bg-neutral-900/60 border border-white/20 dark:border-white/10 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 ease-out h-full">
          <CardContent className="p-0 h-full">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 z-10" />
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Image Placeholder</span>
              </div>
              
              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20"
              />
              
              {/* Like Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault()
                  setIsLiked(!isLiked)
                }}
                className="absolute top-3 right-3 z-30 p-2 rounded-full backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 shadow-lg"
              >
                <Heart 
                  className={`w-4 h-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Title */}
              <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              {/* Price */}
              <div className="flex items-center justify-between">
                <motion.span 
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  ${item.price}
                </motion.span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {item.condition}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>

              {/* Location */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{item.location}</span>
              </div>

              {/* Seller Info */}
              <div className="flex items-center justify-between pt-3 border-t border-white/20 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <UserAvatar user={item.seller} size="sm" />
                  <div>
                    <p className="text-sm font-medium">{item.seller.name}</p>
                    <SellerRating sellerId={item.seller.id} />
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium"
                >
                  View
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
