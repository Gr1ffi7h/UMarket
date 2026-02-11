"use client"

import { useState } from "react"
import { Avatar, SKIN_TONES, HAIR_STYLES, HAIR_COLORS, SHIRT_COLORS, AvatarConfig } from "./Avatar"

interface AvatarConfiguratorProps {
  onConfigChange: (config: AvatarConfig) => void
  initialConfig?: AvatarConfig
}

export function AvatarConfigurator({ onConfigChange, initialConfig }: AvatarConfiguratorProps) {
  const [config, setConfig] = useState<AvatarConfig>(initialConfig || {
    skinTone: SKIN_TONES[2].value,
    hairStyle: HAIR_STYLES[1].value,
    hairColor: HAIR_COLORS[1].value,
    shirtColor: SHIRT_COLORS[0].value
  })

  const updateConfig = (updates: Partial<AvatarConfig>) => {
    const newConfig = { ...config, ...updates }
    setConfig(newConfig)
    onConfigChange(newConfig)
  }

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div className="flex justify-center mb-6">
        <Avatar config={config} size="xl" />
      </div>

      {/* Skin Tone */}
      <div>
        <label className="block text-sm font-medium mb-3">Skin Tone</label>
        <div className="grid grid-cols-5 gap-2">
          {SKIN_TONES.map((tone) => (
            <button
              key={tone.name}
              onClick={() => updateConfig({ skinTone: tone.value })}
              className={`w-full h-10 rounded-lg border-2 transition-all ${
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
        <div className="grid grid-cols-5 gap-2">
          {HAIR_STYLES.map((style) => (
            <button
              key={style.name}
              onClick={() => updateConfig({ hairStyle: style.value })}
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
        <div className="grid grid-cols-6 gap-2">
          {HAIR_COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => updateConfig({ hairColor: color.value })}
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
              onClick={() => updateConfig({ shirtColor: color.value })}
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
    </div>
  )
}
