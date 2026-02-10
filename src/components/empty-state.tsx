import { Package, Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface EmptyStateProps {
  type: "no-listings" | "no-search-results" | "no-sellers"
  onAction?: () => void
  actionText?: string
  title?: string
}

export function EmptyState({ type, onAction, actionText, title }: EmptyStateProps) {
  const getEmptyState = () => {
    switch (type) {
      case "no-listings":
        return {
          icon: <Package className="w-12 h-12 text-muted-foreground" />,
          title: "No listings yet",
          description: "Be the first to list an item in your marketplace!"
        }
      case "no-search-results":
        return {
          icon: <Search className="w-12 h-12 text-muted-foreground" />,
          title: "No results found",
          description: "Try adjusting your search terms or browse categories"
        }
      case "no-sellers":
        return {
          icon: <Users className="w-12 h-12 text-muted-foreground" />,
          title: "No sellers yet",
          description: "Start building your marketplace community"
        }
      default:
        return {
          icon: <Package className="w-12 h-12 text-muted-foreground" />,
          title: "Nothing here",
          description: "Check back later for updates"
        }
    }
  }

  const { icon, description, title: defaultTitle } = getEmptyState()
  const displayTitle = title || defaultTitle

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{displayTitle}</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>
        {onAction && actionText && (
          <Button onClick={onAction} size="lg">
            {actionText}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
