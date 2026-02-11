"use client"

import { User } from "lucide-react"
import { auth } from "@/lib/auth"
import { ScalableAvatar } from "./scalable-avatar"

interface UserAvatarProps {
  user?: {
    id: string
    name: string
    email: string
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

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm": return "w-6 h-6"
      case "md": return "w-8 h-8"
      case "lg": return "w-12 h-12"
      case "xl": return "w-16 h-16"
      default: return "w-8 h-8"
    }
  }

  const getIconSize = (size: string) => {
    switch (size) {
      case "sm": return "w-3 h-3"
      case "md": return "w-4 h-4"
      case "lg": return "w-6 h-6"
      case "xl": return "w-8 h-8"
      default: return "w-4 h-4"
    }
  }

  const getEmojiSize = (size: string) => {
    switch (size) {
      case "sm": return "text-xs"
      case "md": return "text-sm"
      case "lg": return "text-lg"
      case "xl": return "text-xl"
      default: return "text-sm"
    }
  }

  if (!avatarUser) {
    return (
      <div className={`rounded-full bg-muted flex items-center justify-center ${getSizeClasses(size)} ${className}`}>
        <User className={`${getIconSize(size)} text-muted-foreground`} />
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  const renderAvatar = () => {
    // If user has a scalable avatar configuration
    if (avatarUser.avatarType === 'scalable' && avatarUser.avatarConfig) {
      return <ScalableAvatar user={avatarUser} size={size} showStatus={showStatus} className={className} />
    }

    // If user has a preset avatar (emoji)
    if (avatarUser.avatarType === 'preset' && avatarUser.avatar) {
      return (
        <div className={`rounded-full bg-muted flex items-center justify-center ${getSizeClasses(size)} ${className}`}>
          <span className={`${getEmojiSize(size)}`}>{avatarUser.avatar}</span>
        </div>
      )
    }

    // If user has initials avatar with color
    if (avatarUser.avatarType === 'initials') {
      const colorClass = avatarUser.avatarColor || 'bg-blue-500'
      return (
        <div className={`rounded-full ${colorClass} flex items-center justify-center text-white font-semibold ${getSizeClasses(size)} ${className}`}>
          {getInitials(avatarUser.name)}
        </div>
      )
    }

    // Default: initials with blue background
    return (
      <div className={`rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold ${getSizeClasses(size)} ${className}`}>
        {getInitials(avatarUser.name)}
      </div>
    )
  }

  return (
    <div className="relative">
      {renderAvatar()}
      {showStatus && (
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-background"></div>
      )}
    </div>
  )
}
