import { Trophy, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SponsoredSellerCard } from "@/components/sponsored-seller-card"

interface Seller {
  id: string
  name: string
  school: string
  avatar?: string
}

const mockTopSellers: Seller[] = [
  {
    id: "1",
    name: "Sarah C.",
    school: "Stanford",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
  },
  {
    id: "2", 
    name: "Mike J.",
    school: "MIT",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike"
  },
  {
    id: "3",
    name: "Emily D.",
    school: "Harvard", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily"
  },
  {
    id: "4",
    name: "Alex W.",
    school: "Berkeley",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
  },
  {
    id: "5",
    name: "Lisa M.",
    school: "Yale",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa"
  }
]

const sponsoredSeller: Seller = {
  id: "sponsored-1",
  name: "Tech Campus Store",
  school: "Multiple",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=techstore"
}

export function TopSellers() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-4 h-4 text-yellow-500" />
      case 2:
        return <Trophy className="w-4 h-4 text-gray-400" />
      case 3:
        return <Trophy className="w-4 h-4 text-amber-600" />
      default:
        return <span className="w-4 h-4 flex items-center justify-center text-xs font-medium text-muted-foreground">{rank}</span>
    }
  }

  const getRankBackground = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800"
      case 2:
        return "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-800"
      case 3:
        return "bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800"
      default:
        return ""
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="w-5 h-5 text-primary" />
          Top Sellers
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Leading sellers this month
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Sponsored Seller */}
        <SponsoredSellerCard seller={sponsoredSeller} />
        
        {/* Regular Top Sellers */}
        {mockTopSellers.map((seller, index) => (
          <div
            key={seller.id}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-sm ${
              getRankBackground(index + 1)
            }`}
          >
            {/* Rank */}
            <div className="flex items-center justify-center w-8">
              {getRankIcon(index + 1)}
            </div>

            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={seller.avatar}
                alt={seller.name}
                className="w-10 h-10 rounded-full border-2 border-background shadow-sm"
              />
            </div>

            {/* Seller Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-sm truncate">{seller.name}</h4>
                {index < 3 && (
                  <div className="flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-primary" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{seller.school}</span>
              </div>
            </div>

            {/* Rank Badge */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full">
                <Trophy className="w-3 h-3" />
              </div>
            </div>
          </div>
        ))}

        {/* View All Link */}
        <div className="pt-2 border-t">
          <button className="w-full text-center text-sm text-primary hover:text-primary/80 transition-colors py-2">
            View Full Leaderboard
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
