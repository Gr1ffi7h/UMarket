"use client"

import { useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/auth"

interface AuthGuardProps {
  children: ReactNode
  fallback?: ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const router = useRouter()
  const user = auth.getCurrentUser()

  useEffect(() => {
    // If user is not authenticated, redirect to login
    if (!user) {
      router.push("/auth/login")
    }
  }, [user, router])

  // If not authenticated, show fallback or nothing
  if (!user) {
    return <>{fallback || null}</>
  }

  return <>{children}</>
}
