"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/auth"
import { LoadingSkeleton } from "./loading-skeleton"

interface RouteProtectionProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function RouteProtection({ children, requireAuth = false }: RouteProtectionProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const user = auth.getCurrentUser()
      
      if (requireAuth && !user) {
        // Redirect to login if auth is required but user is not logged in
        router.push("/auth/login")
        return
      }
      
      setIsAuthenticated(!!user)
      setIsLoading(false)
    }

    checkAuth()
  }, [requireAuth, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4">
            <LoadingSkeleton className="h-8 w-48" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border rounded-lg overflow-hidden">
                  <LoadingSkeleton className="aspect-square" />
                  <div className="p-4 space-y-3">
                    <LoadingSkeleton className="h-4 w-3/4" />
                    <LoadingSkeleton className="h-3 w-1/2" />
                    <LoadingSkeleton className="h-6 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return null // Will redirect
  }

  return <>{children}</>
}
