"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
  school: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string, school: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load session from localStorage on mount ONLY
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('umarket_user')
      const savedSession = localStorage.getItem('umarket_session')
      
      if (savedUser && savedSession) {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      }
    } catch (error) {
      console.error('Error loading user session:', error)
      // Clear corrupted data
      localStorage.removeItem('umarket_user')
      localStorage.removeItem('umarket_session')
    } finally {
      setIsLoading(false)
    }
  }, []) // Empty dependency array - run only once on mount

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Validate .edu email
      if (!email.endsWith('.edu')) {
        throw new Error('UMarket is currently limited to verified college students (.edu emails only).')
      }

      // Create mock user
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        school: 'University'
      }

      // Save to localStorage
      localStorage.setItem('umarket_user', JSON.stringify(userData))
      localStorage.setItem('umarket_session', JSON.stringify({ 
        authenticated: true, 
        timestamp: Date.now() 
      }))

      // Update state
      setUser(userData)
      
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string, name: string, school: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Validate .edu email
      if (!email.endsWith('.edu')) {
        throw new Error('UMarket is currently limited to verified college students (.edu emails only).')
      }

      // Create mock user
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        school
      }

      // Save to localStorage
      localStorage.setItem('umarket_user', JSON.stringify(userData))
      localStorage.setItem('umarket_session', JSON.stringify({ 
        authenticated: true, 
        timestamp: Date.now() 
      }))

      // Update state
      setUser(userData)
      
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('umarket_user')
    localStorage.removeItem('umarket_session')
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
