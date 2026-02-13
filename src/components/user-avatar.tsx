"use client"

interface UserAvatarProps {
  user?: {
    id: string
    displayName: string
    email: string
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
  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm": return "w-6 h-6"
      case "md": return "w-8 h-8"
      case "lg": return "w-12 h-12"
      case "xl": return "w-16 h-16"
      default: return "w-8 h-8"
    }
  }

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className="relative">
      <div className={`rounded-full bg-neutral-300 dark:bg-neutral-600 flex items-center justify-center text-neutral-800 dark:text-neutral-200 font-semibold ${getSizeClasses(size)} ${className}`}>
        <span style={{ fontSize: size === 'sm' ? '10px' : size === 'lg' ? '18px' : size === 'xl' ? '24px' : '14px' }}>
          {getInitial(user?.displayName || 'U')}
        </span>
      </div>
      {showStatus && (
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-background"></div>
      )}
    </div>
  )
}
