"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type User = {
  id: string
  email: string
  password: string
  displayName: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => boolean
  signup: (email: string, password: string, displayName: string) => boolean
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Load session from localStorage on mount ONLY
  useEffect(() => {
    try {
      console.log('🔍 Loading session from localStorage...')
      const savedSession = localStorage.getItem('umarket_session')
      const savedUsers = localStorage.getItem('umarket_users')
      
      console.log('📦 Found session:', savedSession)
      console.log('👥 Found users:', savedUsers)
      
      if (savedSession && savedUsers) {
        const session = JSON.parse(savedSession)
        const users = JSON.parse(savedUsers)
        const currentUser = users.find((u: User) => u.id === session.userId)
        
        if (currentUser) {
          console.log('✅ Session valid, setting user:', currentUser)
          setUser(currentUser)
        } else {
          console.log('❌ Session user not found')
          localStorage.removeItem('umarket_session')
        }
      } else {
        console.log('ℹ️ No session found')
      }
    } catch (error) {
      console.error('❌ Error loading session:', error)
      // Clear corrupted data
      localStorage.removeItem('umarket_session')
      localStorage.removeItem('umarket_users')
    } finally {
      setLoading(false)
    }
  }, []) // Empty dependency array - run only once on mount

  const login = (email: string, password: string): boolean => {
    try {
      console.log('🔐 Attempting login for:', email)
      
      const savedUsers = localStorage.getItem('umarket_users')
      if (!savedUsers) {
        console.log('❌ No users found')
        return false
      }

      const users = JSON.parse(savedUsers)
      const normalizedEmail = email.toLowerCase()
      
      const foundUser = users.find((u: User) => u.email.toLowerCase() === normalizedEmail)
      
      if (!foundUser) {
        console.log('❌ User not found')
        return false
      }
      
      if (foundUser.password !== password) {
        console.log('❌ Password mismatch')
        return false
      }
      
      // Login successful
      console.log('✅ Login successful for:', foundUser)
      
      // Set session
      localStorage.setItem('umarket_session', JSON.stringify({
        userId: foundUser.id,
        timestamp: Date.now()
      }))
      
      // Update state
      setUser(foundUser)
      return true
      
    } catch (error) {
      console.error('❌ Login error:', error)
      return false
    }
  }

  const signup = (email: string, password: string, displayName: string): boolean => {
    try {
      console.log('📝 Attempting signup for:', email)
      
      // Validate .edu email
      if (!email.endsWith('.edu')) {
        console.log('❌ Invalid email domain')
        return false
      }
      
      // Get existing users
      let users: User[] = []
      const savedUsers = localStorage.getItem('umarket_users')
      if (savedUsers) {
        users = JSON.parse(savedUsers)
      }
      
      // Check if user already exists
      const normalizedEmail = email.toLowerCase()
      const existingUser = users.find((u: User) => u.email.toLowerCase() === normalizedEmail)
      
      if (existingUser) {
        console.log('❌ User already exists')
        return false
      }
      
      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: normalizedEmail,
        password,
        displayName
      }
      
      // Save user
      users.push(newUser)
      localStorage.setItem('umarket_users', JSON.stringify(users))
      
      // Set session
      localStorage.setItem('umarket_session', JSON.stringify({
        userId: newUser.id,
        timestamp: Date.now()
      }))
      
      // Update state
      setUser(newUser)
      
      console.log('✅ Signup successful:', newUser)
      return true
      
    } catch (error) {
      console.error('❌ Signup error:', error)
      return false
    }
  }

  const logout = () => {
    console.log('🚪 Logging out...')
    setUser(null)
    localStorage.removeItem('umarket_session')
  }

  const value: AuthContextType = {
    user,
    loading,
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
