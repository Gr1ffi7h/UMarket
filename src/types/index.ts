export interface User {
  id: string
  email: string
  name: string
  school: string
  createdAt: Date
}

export interface Item {
  id: string
  title: string
  description: string
  price: number
  images: string[]
  sellerId: string
  seller: User
  category: string
  condition: string
  location: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthFormData {
  email: string
  password: string
  name?: string
  school?: string
}

export interface ListingFormData {
  title: string
  description: string
  price: number
  category: string
  condition: string
  location: string
  images: File[]
}
