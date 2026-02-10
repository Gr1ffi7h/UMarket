import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string
  children?: React.ReactNode
}

export function LoadingSkeleton({ className, children }: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
    >
      {children}
    </div>
  )
}

export function ItemCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <LoadingSkeleton className="aspect-square" />
      <div className="p-4 space-y-3">
        <LoadingSkeleton className="h-4 w-3/4" />
        <LoadingSkeleton className="h-3 w-1/2" />
        <LoadingSkeleton className="h-6 w-1/3" />
      </div>
    </div>
  )
}

export function SellerCardSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border">
      <LoadingSkeleton className="w-10 h-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <LoadingSkeleton className="h-4 w-24" />
        <LoadingSkeleton className="h-3 w-16" />
      </div>
    </div>
  )
}
