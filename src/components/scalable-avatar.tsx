"use client"

import { User } from "lucide-react"

interface ScalableAvatarProps {
  user?: {
    id?: string
    name?: string
    email?: string
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

const SKIN_TONES = [
  { name: 'Light', value: '#FDBCB4' },
  { name: 'Medium Light', value: '#F1C27D' },
  { name: 'Medium', value: '#E5A87A' },
  { name: 'Medium Dark', value: '#C67856' },
  { name: 'Dark', value: '#8D5524' }
]

const HAIR_STYLES = [
  { name: 'Short', value: 'short' },
  { name: 'Medium', value: 'medium' },
  { name: 'Long', value: 'long' },
  { name: 'Bald', value: 'bald' }
]

const HAIR_COLORS = [
  { name: 'Black', value: '#1a1a1a' },
  { name: 'Brown', value: '#4a2c2a' },
  { name: 'Blonde', value: '#d4a574' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Gray', value: '#6b7280' }
]

const SHIRT_COLORS = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Gray', value: '#6b7280' }
]

const ACCESSORIES = [
  { name: 'None', value: 'none' },
  { name: 'Glasses', value: 'glasses' },
  { name: 'Headphones', value: 'headphones' }
]

export function ScalableAvatar({ user, size = "md", showStatus = false, className = "" }: ScalableAvatarProps) {
  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm": return "w-6 h-6"
      case "md": return "w-8 h-8"
      case "lg": return "w-12 h-12"
      case "xl": return "w-16 h-16"
      default: return "w-8 h-8"
    }
  }

  const getInitials = (name?: string) => {
    if (!name) return "U"
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  const config = user?.avatarConfig || {
    skinTone: SKIN_TONES[2].value, // Medium
    hairStyle: HAIR_STYLES[1].value, // Medium
    hairColor: HAIR_COLORS[1].value, // Brown
    shirtColor: SHIRT_COLORS[0].value, // Blue
    accessory: ACCESSORIES[0].value // None
  }

  const renderAvatar = () => {
    const sizeClass = getSizeClasses(size)

    return (
      <svg
        width={size === "sm" ? "24" : size === "lg" ? "48" : size === "xl" ? "64" : "32"}
        height={size === "sm" ? "24" : size === "lg" ? "48" : size === "xl" ? "64" : "32"}
        viewBox="0 0 100 100"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle cx="50" cy="50" r="50" fill={config.skinTone} />
        
        {/* Hair */}
        {config.hairStyle === 'short' && (
          <path
            d="M 30 35 Q 30 25 40 25 Q 50 25 60 25 Q 70 25 70 35 Q 70 45 60 45 Q 50 45 40 45 Q 30 45 30 35"
            fill={config.hairColor}
            stroke="none"
          />
        )}
        
        {config.hairStyle === 'medium' && (
          <path
            d="M 25 35 Q 25 20 40 20 Q 50 20 60 20 Q 75 20 75 35 Q 75 45 60 45 Q 50 45 40 45 Q 25 45 25 35"
            fill={config.hairColor}
            stroke="none"
          />
        )}
        
        {config.hairStyle === 'long' && (
          <path
            d="M 20 35 Q 20 15 40 15 Q 50 15 60 15 Q 80 15 80 35 Q 80 45 60 45 Q 50 45 40 45 Q 20 45 20 35"
            fill={config.hairColor}
            stroke="none"
          />
        )}

        {/* Face */}
        <circle cx="50" cy="50" r="15" fill="white" opacity="0.9" />
        
        {/* Eyes */}
        <circle cx="42" cy="48" r="2" fill="#1a1a1a" />
        <circle cx="58" cy="48" r="2" fill="#1a1a1a" />
        
        {/* Mouth */}
        <path
          d="M 45 55 Q 50 58 55 55"
          stroke="#1a1a1a"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Shirt */}
        <path
          d="M 50 65 L 50 90 L 25 90 L 25 75 L 75 75 L 75 90 Z"
          fill={config.shirtColor}
          stroke="white"
          strokeWidth="1"
        />

        {/* Accessory */}
        {config.accessory === 'glasses' && (
          <>
            <circle cx="42" cy="48" r="8" fill="none" stroke="#1a1a1a" strokeWidth="1" />
            <circle cx="58" cy="48" r="8" fill="none" stroke="#1a1a1a" strokeWidth="1" />
          </>
        )}

        {config.accessory === 'headphones' && (
          <>
            <path
              d="M 35 40 Q 35 35 40 35 L 60 35 L 60 40 Q 60 42 55 42 L 55 42 L 55 40 L 45 40"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="1.5"
            />
            <circle cx="35" cy="40" r="3" fill="#1a1a1a" />
            <circle cx="60" cy="40" r="3" fill="#1a1a1a" />
          </>
        )}
      </svg>
    )
  }

  const renderFallback = () => {
    const sizeClass = getSizeClasses(size)
    return (
      <div className={`rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold ${sizeClass} ${className}`}>
        {user ? getInitials(user.name) : <User className={`w-${size === "sm" ? "3" : size === "lg" ? "6" : size === "xl" ? "8" : "4"} h-${size === "sm" ? "3" : size === "lg" ? "6" : size === "xl" ? "8" : "4"}`} />}
      </div>
    )
  }

  if (!user || !user.avatarConfig) {
    return renderFallback()
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
