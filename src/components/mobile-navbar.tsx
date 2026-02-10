"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Plus, User, LogOut, Menu, X, Home, UserCircle, Moon, Sun, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserAvatar } from "@/components/user-avatar"
import { auth } from "@/lib/auth"

export function MobileNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(auth.getCurrentUser())
  const router = useRouter()

  const handleLogout = () => {
    auth.logout()
    setUser(null)
    router.push("/")
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <Link href="/marketplace" className="flex items-center space-x-2">
              <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">U</span>
              </div>
              <span className="font-bold text-lg">UMarket</span>
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
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
            <div className="py-4 border-t">
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
                        <span className="text-sm font-medium">{user.name}</span>
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

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t md:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            {/* Marketplace */}
            <Link 
              href="/marketplace"
              className="flex flex-col items-center gap-1 text-primary"
            >
              <Home className="w-5 h-5" />
              <span className="text-xs font-medium">Marketplace</span>
            </Link>

            {/* Create Listing */}
            <Link 
              href="/marketplace/create"
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="text-xs font-medium">Create</span>
            </Link>

            {/* Messages */}
            {user && (
              <Link 
                href="/messages"
                className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs font-medium">Messages</span>
              </Link>
            )}

            {/* Profile */}
            {user ? (
              <Link 
                href="/profile"
                className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
              >
                <UserCircle className="w-5 h-5" />
                <span className="text-xs font-medium">Profile</span>
              </Link>
            ) : (
              <Link 
                href="/auth/login"
                className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
              >
                <UserCircle className="w-5 h-5" />
                <span className="text-xs font-medium">Login</span>
              </Link>
            )}

            {/* Theme Toggle */}
            <div className="flex flex-col items-center gap-1">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Add padding to bottom to account for fixed bottom nav */}
      <div className="h-16 md:hidden"></div>
    </>
  )
}
