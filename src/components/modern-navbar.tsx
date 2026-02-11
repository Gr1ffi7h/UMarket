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
import { motion, AnimatePresence } from "framer-motion"

export function ModernNavbar() {
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
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/60 dark:bg-neutral-900/60 border-b border-white/20 dark:border-white/10 shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div 
            onClick={handleLogoClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-sm">U</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">UMarket</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link 
                href="/marketplace"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Marketplace
              </Link>
            </motion.div>
            {user && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link 
                  href="/messages"
                  className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Messages
                </Link>
              </motion.div>
            )}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/marketplace/create">
                <Button size="sm" className="flex items-center gap-2 backdrop-blur-md bg-white/60 dark:bg-neutral-900/60 border border-white/20 dark:border-white/10">
                  <Plus className="w-4 h-4" />
                  Create Listing
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {user ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-3"
              >
                <div className="flex items-center space-x-2">
                  <UserAvatar user={user} size="sm" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden border-t border-white/20 dark:border-white/10 mt-4 pt-4"
            >
              <div className="space-y-4">
                <Link 
                  href="/marketplace"
                  className="block text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Marketplace
                </Link>
                {user && (
                  <Link 
                    href="/messages"
                    className="block text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Messages
                  </Link>
                )}
                <Link href="/marketplace/create" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create Listing
                  </Button>
                </Link>

                {/* Mobile User Actions */}
                <div className="pt-4 border-t border-white/20 dark:border-white/10">
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
                    <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full">Log In</Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
