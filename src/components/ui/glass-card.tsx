"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  delay?: number
}

export function GlassCard({ children, className, hover = true, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay * 0.1,
        ease: "easeOut"
      }}
      whileHover={hover ? { 
        y: -4, 
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)" 
      } : undefined}
      className={cn(
        "backdrop-blur-md bg-white/60 dark:bg-neutral-900/60 border border-white/20 dark:border-white/10 shadow-xl rounded-2xl",
        hover && "transition-all duration-300 ease-out",
        className
      )}
    >
      <Card className="border-0 shadow-none bg-transparent">
        {children}
      </Card>
    </motion.div>
  )
}
