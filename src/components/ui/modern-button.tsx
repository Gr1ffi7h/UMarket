"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ModernButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}

export function ModernButton({ 
  children, 
  className, 
  variant = "default", 
  size = "default",
  disabled = false,
  onClick,
  type = "button"
}: ModernButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        onClick={onClick}
        type={type}
        className={cn(
          "backdrop-blur-md bg-white/60 dark:bg-neutral-900/60 border border-white/20 dark:border-white/10",
          "transition-all duration-300 ease-out",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {children}
      </Button>
    </motion.div>
  )
}
