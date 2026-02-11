"use client"

export interface AvatarConfig {
  skinTone: string
  hairStyle: string
  hairColor: string
  shirtColor: string
}

interface AvatarProps {
  config?: AvatarConfig
  name?: string
  size?: "sm" | "md" | "lg" | "xl"
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
  { name: 'Curly', value: 'curly' },
  { name: 'Bald', value: 'bald' }
]

const HAIR_COLORS = [
  { name: 'Black', value: '#1a1a1a' },
  { name: 'Brown', value: '#4a2c2a' },
  { name: 'Blonde', value: '#d4a574' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Gray', value: '#6b7280' },
  { name: 'Light Brown', value: '#92400e' }
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

export function Avatar({ config, name, size = "md", className = "" }: AvatarProps) {
  const defaultConfig: AvatarConfig = {
    skinTone: SKIN_TONES[2].value, // Medium
    hairStyle: HAIR_STYLES[1].value, // Medium
    hairColor: HAIR_COLORS[1].value, // Brown
    shirtColor: SHIRT_COLORS[0].value // Blue
  }

  const avatarConfig = config || defaultConfig

  const getSize = () => {
    switch (size) {
      case "sm": return { width: 24, height: 24 }
      case "md": return { width: 32, height: 32 }
      case "lg": return { width: 48, height: 48 }
      case "xl": return { width: 64, height: 64 }
      default: return { width: 32, height: 32 }
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

  const renderHair = () => {
    const { width, height } = getSize()
    
    if (avatarConfig.hairStyle === 'short') {
      return (
        <path
          d={`M ${width * 0.3} ${height * 0.25} Q ${width * 0.3} ${height * 0.15} ${width * 0.4} ${height * 0.15} Q ${width * 0.7} ${height * 0.15} ${width * 0.7} ${height * 0.35} Q ${width * 0.7} ${height * 0.45} ${width * 0.4} ${height * 0.45}`}
          fill={avatarConfig.hairColor}
          stroke="none"
        />
      )
    }
    
    if (avatarConfig.hairStyle === 'medium') {
      return (
        <path
          d={`M ${width * 0.25} ${height * 0.25} Q ${width * 0.25} ${height * 0.1} ${width * 0.4} ${height * 0.1} Q ${width * 0.75} ${height * 0.1} ${width * 0.75} ${height * 0.35} Q ${width * 0.75} ${height * 0.45} ${width * 0.25} ${height * 0.45}`}
          fill={avatarConfig.hairColor}
          stroke="none"
        />
      )
    }
    
    if (avatarConfig.hairStyle === 'long') {
      return (
        <path
          d={`M ${width * 0.2} ${height * 0.25} Q ${width * 0.2} ${height * 0.05} ${width * 0.4} ${height * 0.05} Q ${width * 0.8} ${height * 0.05} ${width * 0.8} ${height * 0.35} Q ${width * 0.8} ${height * 0.45} ${width * 0.2} ${height * 0.45}`}
          fill={avatarConfig.hairColor}
          stroke="none"
        />
      )
    }
    
    if (avatarConfig.hairStyle === 'curly') {
      return (
        <path
          d={`M ${width * 0.25} ${height * 0.25} Q ${width * 0.3} ${height * 0.15} ${width * 0.35} ${height * 0.2} Q ${width * 0.4} ${height * 0.25} ${width * 0.45} ${height * 0.3} Q ${width * 0.5} ${height * 0.35} ${width * 0.55} ${height * 0.4} Q ${width * 0.6} ${height * 0.45} ${width * 0.4} ${height * 0.45}`}
          fill={avatarConfig.hairColor}
          stroke="none"
        />
      )
    }
    
    return null // Bald
  }

  const { width, height } = getSize()

  // If no config, show initials
  if (!config) {
    return (
      <div 
        className={`rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold ${className}`}
        style={{ width, height }}
      >
        <span style={{ fontSize: size === 'sm' ? '10px' : size === 'lg' ? '18px' : size === 'xl' ? '24px' : '14px' }}>
          {getInitials(name)}
        </span>
      </div>
    )
  }

  return (
    <div className={`rounded-full overflow-hidden ${className}`} style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Face Background */}
        <circle cx="50" cy="50" r="50" fill={avatarConfig.skinTone} />
        
        {/* Hair */}
        {renderHair()}
        
        {/* Face Features */}
        <circle cx="50" cy="50" r="15" fill="white" opacity="0.9" />
        
        {/* Eyes */}
        <circle cx="42" cy="48" r="2" fill="#1a1a1a" />
        <circle cx="58" cy="48" r="2" fill="#1a1a1a" />
        
        {/* Nose */}
        <path
          d="M 50 52 L 48 54"
          stroke={avatarConfig.skinTone}
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
        
        {/* Mouth */}
        <path
          d="M 45 56 Q 50 59 55 56"
          stroke="#1a1a1a"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Shirt */}
        <path
          d="M 50 65 L 50 90 L 25 90 L 25 75 L 75 75 L 75 90 Z"
          fill={avatarConfig.shirtColor}
          stroke="white"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

// Export configuration options for the avatar configurator
export { SKIN_TONES, HAIR_STYLES, HAIR_COLORS, SHIRT_COLORS }
