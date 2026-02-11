"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScalableAvatar } from "./scalable-avatar"

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

interface AvatarConfiguratorProps {
  user?: {
    id: string
    name: string
    email: string
    avatarConfig?: {
      skinTone: string
      hairStyle: string
      hairColor: string
      shirtColor: string
      accessory?: string
    }
  }
  onAvatarChange: (config: { skinTone: string; hairStyle: string; hairColor: string; shirtColor: string; accessory?: string }) => void
}

export function AvatarConfigurator({ user, onAvatarChange }: AvatarConfiguratorProps) {
  const [config, setConfig] = useState({
    skinTone: user?.avatarConfig?.skinTone || SKIN_TONES[2].value,
    hairStyle: user?.avatarConfig?.hairStyle || HAIR_STYLES[1].value,
    hairColor: user?.avatarConfig?.hairColor || HAIR_COLORS[1].value,
    shirtColor: user?.avatarConfig?.shirtColor || SHIRT_COLORS[0].value,
    accessory: user?.avatarConfig?.accessory || ACCESSORIES[0].value
  })

  const handleSave = () => {
    onAvatarChange(config)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customize Your Avatar</CardTitle>
        <div className="flex items-center gap-4">
          <ScalableAvatar user={{ ...user, avatarConfig: config }} size="xl" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Skin Tone */}
        <div>
          <label className="block text-sm font-medium mb-3">Skin Tone</label>
          <div className="grid grid-cols-5 gap-2">
            {SKIN_TONES.map((tone) => (
              <button
                key={tone.name}
                onClick={() => setConfig(prev => ({ ...prev, skinTone: tone.value }))}
                className={`w-full h-12 rounded-lg border-2 transition-all ${
                  config.skinTone === tone.value 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'border-border hover:border-primary'
                }`}
                style={{ backgroundColor: tone.value }}
              >
                <span className="text-xs font-medium">{tone.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Hair Style */}
        <div>
          <label className="block text-sm font-medium mb-3">Hair Style</label>
          <div className="grid grid-cols-4 gap-2">
            {HAIR_STYLES.map((style) => (
              <button
                key={style.name}
                onClick={() => setConfig(prev => ({ ...prev, hairStyle: style.value }))}
                className={`p-3 rounded-lg border-2 transition-all ${
                  config.hairStyle === style.value 
                    ? 'border-primary bg-primary text-primary-foreground' 
                    : 'border-border hover:border-primary'
                }`}
              >
                <span className="text-sm font-medium">{style.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Hair Color */}
        <div>
          <label className="block text-sm font-medium mb-3">Hair Color</label>
          <div className="grid grid-cols-5 gap-2">
            {HAIR_COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => setConfig(prev => ({ ...prev, hairColor: color.value }))}
                className={`w-full h-8 rounded-lg border-2 transition-all ${
                  config.hairColor === color.value 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'border-border hover:border-primary'
                }`}
                style={{ backgroundColor: color.value }}
              >
                <span className="text-xs font-medium">{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Shirt Color */}
        <div>
          <label className="block text-sm font-medium mb-3">Shirt Color</label>
          <div className="grid grid-cols-4 gap-2">
            {SHIRT_COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => setConfig(prev => ({ ...prev, shirtColor: color.value }))}
                className={`w-full h-8 rounded-lg border-2 transition-all ${
                  config.shirtColor === color.value 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'border-border hover:border-primary'
                }`}
                style={{ backgroundColor: color.value }}
              >
                <span className="text-xs font-medium">{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Accessory */}
        <div>
          <label className="block text-sm font-medium mb-3">Accessory</label>
          <div className="grid grid-cols-3 gap-2">
            {ACCESSORIES.map((accessory) => (
              <button
                key={accessory.name}
                onClick={() => setConfig(prev => ({ ...prev, accessory: accessory.value }))}
                className={`p-3 rounded-lg border-2 transition-all ${
                  config.accessory === accessory.value 
                    ? 'border-primary bg-primary text-primary-foreground' 
                    : 'border-border hover:border-primary'
                }`}
              >
                <span className="text-sm font-medium">{accessory.name}</span>
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Avatar Configuration
        </Button>
      </CardContent>
    </Card>
  )
}
