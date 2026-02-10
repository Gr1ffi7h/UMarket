export interface User {
  id: string
  email: string
  name: string
  school: string
  avatar?: string
  avatarColor?: string
  avatarType?: 'initials' | 'preset'
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

class MockAuth {
  private static instance: MockAuth
  private user: User | null = null

  static getInstance(): MockAuth {
    if (!MockAuth.instance) {
      MockAuth.instance = new MockAuth()
    }
    return MockAuth.instance
  }

  async signUp(email: string, password: string, name: string, school: string, avatarData?: { type: 'initials' | 'preset'; value: string; color?: string }): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Validate .edu email
    if (!email.endsWith('.edu')) {
      throw new Error('UMarket is currently limited to verified college students (.edu emails only).')
    }

    // Create mock user with avatar data
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      school,
      avatarType: avatarData?.type || 'initials',
      avatar: avatarData?.value,
      avatarColor: avatarData?.color || 'bg-blue-500'
    }

    this.user = user
    if (typeof window !== 'undefined') {
      localStorage.setItem('umarket_user', JSON.stringify(user))
    }
    return user
  }

  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Validate .edu email
    if (!email.endsWith('.edu')) {
      throw new Error('UMarket is currently limited to verified college students (.edu emails only).')
    }

    // Mock login - in real app would verify credentials
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      school: email.split('@')[1].split('.')[0].replace(/\b\w/g, l => l.toUpperCase()),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    }

    this.user = user
    if (typeof window !== 'undefined') {
      localStorage.setItem('umarket_user', JSON.stringify(user))
    }
    return user
  }

  logout(): void {
    this.user = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('umarket_user')
    }
  }

  updateUserAvatar(avatarData: { type: 'initials' | 'preset'; value: string; color?: string }): void {
    const currentUser = this.getCurrentUser()
    if (!currentUser) return

    const updatedUser: User = {
      ...currentUser,
      avatarType: avatarData.type,
      avatar: avatarData.value,
      avatarColor: avatarData.color
    }

    this.user = updatedUser
    if (typeof window !== 'undefined') {
      localStorage.setItem('umarket_user', JSON.stringify(updatedUser))
    }
  }

  getCurrentUser(): User | null {
    if (this.user) {
      return this.user
    }

    // Check localStorage (only on client side)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('umarket_user')
      if (stored) {
        try {
          this.user = JSON.parse(stored)
          return this.user
        } catch {
          localStorage.removeItem('umarket_user')
        }
      }
    }

    return null
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }
}

export const auth = MockAuth.getInstance()
