"use client"

import { useEffect, useState } from "react"

interface Snowflake {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

export function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])
  const [isEnabled, setIsEnabled] = useState(true)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isLowPowerDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2
    
    if (prefersReducedMotion || isLowPowerDevice) {
      setIsEnabled(false)
      return
    }

    // Create initial snowflakes
    const initialSnowflakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100 - 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.6 + 0.2
    }))
    setSnowflakes(initialSnowflakes)

    // Animation loop
    const interval = setInterval(() => {
      setSnowflakes(prev => 
        prev.map(flake => ({
          ...flake,
          y: flake.y >= 100 ? -5 : flake.y + flake.speed,
          x: flake.x + Math.sin(flake.y * 0.01) * 0.2
        }))
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  if (!isEnabled) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <div className="absolute inset-0">
        {snowflakes.map(flake => (
          <div
            key={flake.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${flake.x}%`,
              top: `${flake.y}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              opacity: flake.opacity,
              transition: 'none',
              willChange: 'transform'
            }}
          />
        ))}
      </div>
    </div>
  )
}
