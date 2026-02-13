"use client"

import { useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { LoadingSkeleton } from "./loading-skeleton"

interface AuthGuardProps {
  children: ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect after loading is complete and user is not authenticated
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  // Show loading skeleton while checking auth
  if (isLoading) {
    return <LoadingSkeleton />
  }

  // If not authenticated and not loading, the useEffect will handle redirect
  if (!user) {
    return <LoadingSkeleton />
  }

  return <>{children}</>
}
