import { Star, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface SponsoredSellerCardProps {
  seller: {
    id: string
    name: string
    school: string
    avatar?: string
  }
}

export function SponsoredSellerCard({ seller }: SponsoredSellerCardProps) {
  return (
    <Card className="border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50/50 to-amber-100/50 dark:from-amber-900/10 dark:to-amber-800/10">
      <CardContent className="p-4">
        {/* Sponsored Badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
            <Star className="w-3 h-3" />
            Sponsored Seller
          </div>
        </div>

        {/* Seller Content */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={seller.avatar}
              alt={seller.name}
              className="w-12 h-12 rounded-full border-2 border-amber-300 dark:border-amber-700 shadow-sm"
            />
          </div>

          {/* Seller Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm truncate">{seller.name}</h4>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{seller.school}</span>
            </div>
          </div>

          {/* Star Badge */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-1 bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full">
              <Star className="w-3 h-3" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
