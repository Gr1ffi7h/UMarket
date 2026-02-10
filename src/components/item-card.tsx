import Link from "next/link"
import Image from "next/image"
import { MapPin, User } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ItemCardProps {
  item: {
    id: string
    title: string
    description: string
    price: number
    images: string[]
    seller: {
      id: string
      name: string
      school: string
    }
    category: string
    condition: string
    location: string
  }
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/marketplace/${item.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-200 dark:bg-slate-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
              <p className="text-sm text-muted-foreground">Image Placeholder</p>
            </div>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-background/90 backdrop-blur-sm text-xs px-2 py-1 rounded-full font-medium">
              {item.category}
            </span>
          </div>

          {/* Condition Badge */}
          <div className="absolute top-2 right-2">
            <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
              {item.condition}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Title */}
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm line-clamp-2">
              {item.description}
            </p>

            {/* Price and Location */}
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">
                ${item.price}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{item.location}</span>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Footer Section */}
        <CardFooter className="px-4 pb-4 pt-0">
          <div className="flex items-center gap-2 w-full">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-3 h-3 text-primary-foreground" />
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="text-sm font-medium truncate">{item.seller.name}</span>
              <span className="text-xs text-muted-foreground">
                {item.seller.school.split(' ')[0]}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
