"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AvatarSelector } from "@/components/avatar-selector"
import { auth } from "@/lib/auth"
import { Navbar } from "@/components/navbar"
import { MobileNavbar } from "@/components/mobile-navbar"

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    school: ""
  })
  const [avatarData, setAvatarData] = useState<{ type: 'initials' | 'preset'; value: string; color?: string }>({
    type: 'initials',
    value: '',
    color: 'bg-blue-500'
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email: string) => {
    return email.endsWith(".edu")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Must be a .edu email address"
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    if (!formData.school.trim()) {
      newErrors.school = "School is required"
    }

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)
      try {
        const user = await auth.signUp(formData.email, formData.password, formData.name, formData.school, avatarData)
        
        // Force state update before navigation
        const currentUser = auth.getCurrentUser()
        if (currentUser) {
          router.push("/marketplace")
        } else {
          // Fallback if auth state doesn't update immediately
          setTimeout(() => {
            router.push("/marketplace")
          }, 100)
        }
      } catch (error) {
        setErrors({ email: error instanceof Error ? error.message : "Sign up failed" })
      } finally {
        setIsLoading(false)
      }
    } else {
      setErrors(newErrors)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>
      
      {/* Mobile Navbar */}
      <div className="md:hidden">
        <MobileNavbar />
      </div>
      
      <main className="flex items-center justify-center p-4 min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]">
      <Card className="w-full max-w-lg md:max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Join UMarket</CardTitle>
          <CardDescription>
            Create your account with your .edu email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                School Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="student@university.edu"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="school" className="text-sm font-medium">
                School
              </label>
              <Input
                id="school"
                name="school"
                type="text"
                placeholder="University Name"
                value={formData.school}
                onChange={handleChange}
                className={errors.school ? "border-red-500" : ""}
              />
              {errors.school && (
                <p className="text-sm text-red-500">{errors.school}</p>
              )}
            </div>

            {/* Avatar Selection */}
            <div className="space-y-4">
              <AvatarSelector 
                currentAvatar={avatarData.value}
                currentColor={avatarData.color}
                onAvatarChange={setAvatarData}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link 
                href="/auth/login" 
                className="text-primary hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
    </div>
  )
}
