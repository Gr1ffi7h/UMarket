"use client"

import { User } from "lucide-react"
import { Avatar } from "./Avatar"
import { auth } from "@/lib/auth"

interface UserAvatarProps {
  user?: {
    id: string
    name: string
    email: string
    avatarConfig?: {
      skinTone: string
      hairStyle: string
      hairColor: string
      shirtColor: string
    }
  }
  size?: "sm" | "md" | "lg" | "xl"
  showStatus?: boolean
  className?: string
}

export function UserAvatar({ 
  user, 
  size = "md", 
  showStatus = false,
  className = ""
}: UserAvatarProps) {
  const currentUser = auth.getCurrentUser()
  const avatarUser = user || currentUser

  if (avatarUser?.avatarConfig) {
    return <Avatar config={avatarUser.avatarConfig} size={size} className={className} />
  }

  // Fallback to initials if no avatar config
  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm": return "w-6 h-6"
      case "md": return "w-8 h-8"
      case "lg": return "w-12 h-12"
      case "xl": return "w-16 h-16"
      default: return "w-8 h-8"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  return (
    <div className="relative">
      <div className={`rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold ${getSizeClasses(size)} ${className}`}>
        <span style={{ fontSize: size === 'sm' ? '10px' : size === 'lg' ? '18px' : size === 'xl' ? '24px' : '14px' }}>
          {getInitials(avatarUser?.name || 'U')}
        </span>
      </div>
      {showStatus && (
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-background"></div>
      )}
    </div>
  )
}
