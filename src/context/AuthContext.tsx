"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
  school: string
  avatar?: string
  avatarColor?: string
  avatarType?: 'initials' | 'preset' | 'scalable'
  avatarConfig?: {
    skinTone: string
    hairStyle: string
    hairColor: string
    shirtColor: string
    accessory?: string
  }
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string, school: string, avatarData?: any) => Promise<void>
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

  // Load session from localStorage on mount
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
  }, [])

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
        school: 'University',
        avatarType: 'initials',
        avatarColor: 'bg-blue-500'
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

  const signup = async (email: string, password: string, name: string, school: string, avatarData?: any) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Validate .edu email
      if (!email.endsWith('.edu')) {
        throw new Error('UMarket is currently limited to verified college students (.edu emails only).')
      }

      // Create mock user with avatar data
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        school,
        avatarType: avatarData?.type || 'initials',
        avatar: avatarData?.value,
        avatarColor: avatarData?.color || 'bg-blue-500',
        avatarConfig: avatarData?.type === 'scalable' ? avatarData : undefined
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
