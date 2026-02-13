"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Plus, User, LogOut, Menu, X, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserAvatar } from "@/components/user-avatar"
import { useAuth } from "@/context/AuthContext"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleLogoClick = () => {
    if (user) {
      router.push("/marketplace")
    } else {
      router.push("/auth/login")
    }
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div onClick={handleLogoClick} className="flex items-center space-x-2 cursor-pointer">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">U</span>
            </div>
            <span className="font-bold text-xl">UMarket</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/marketplace"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Marketplace
            </Link>
            {user && (
              <Link 
                href="/messages"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Messages
              </Link>
            )}
            <Link href="/marketplace/create">
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Listing
              </Button>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search items..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <UserAvatar user={user} size="sm" />
                  <span className="text-sm font-medium">{user.displayName}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search items..."
                  className="pl-10"
                />
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-2">
                <Link 
                  href="/marketplace"
                  className="block text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Marketplace
                </Link>
                <Link 
                  href="/marketplace/create"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button size="sm" className="w-full flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create Listing
                  </Button>
                </Link>
              </div>

              {/* Mobile User Actions */}
              <div className="pt-4 border-t">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <UserAvatar user={user} size="sm" />
                      <span className="text-sm font-medium">{user.displayName}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full">
                      <LogOut className="w-4 h-4 mr-2" />
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full">Log In</Button>
                    </Link>
                    <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button size="sm" className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
