"use client"

import { useState } from "react"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AvatarSelectorProps {
  currentAvatar?: string
  currentColor?: string
  onAvatarChange: (avatar: { type: 'initials' | 'preset'; value: string; color?: string }) => void
}

const AVATAR_COLORS = [
  { name: 'Blue', value: 'bg-blue-500' },
  { name: 'Green', value: 'bg-green-500' },
  { name: 'Purple', value: 'bg-purple-500' },
  { name: 'Red', value: 'bg-red-500' },
  { name: 'Orange', value: 'bg-orange-500' },
  { name: 'Pink', value: 'bg-pink-500' },
  { name: 'Teal', value: 'bg-teal-500' },
  { name: 'Indigo', value: 'bg-indigo-500' }
]

const AVATAR_PRESETS = [
  { name: 'Student', emoji: '🎓' },
  { name: 'Book', emoji: '📚' },
  { name: 'Laptop', emoji: '💻' },
  { name: 'Graduation', emoji: '🎓' },
  { name: 'Backpack', emoji: '🎒' },
  { name: 'Coffee', emoji: '☕' },
  { name: 'Bike', emoji: '🚲' },
  { name: 'Dorm', emoji: '🏠' }
]

export function AvatarSelector({ currentAvatar, currentColor, onAvatarChange }: AvatarSelectorProps) {
  const [selectedType, setSelectedType] = useState<'initials' | 'preset'>('initials')
  const [selectedColor, setSelectedColor] = useState(currentColor || 'bg-blue-500')
  const [selectedPreset, setSelectedPreset] = useState(AVATAR_PRESETS[0])

  const handleConfirm = () => {
    if (selectedType === 'initials') {
      onAvatarChange({ type: 'initials', value: 'initials', color: selectedColor })
    } else {
      onAvatarChange({ type: 'preset', value: selectedPreset.emoji })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Your Avatar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar Type Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">Avatar Type</label>
          <div className="flex gap-2">
            <Button
              variant={selectedType === 'initials' ? 'default' : 'outline'}
              onClick={() => setSelectedType('initials')}
              size="sm"
            >
              Initials
            </Button>
            <Button
              variant={selectedType === 'preset' ? 'default' : 'outline'}
              onClick={() => setSelectedType('preset')}
              size="sm"
            >
              Icon
            </Button>
          </div>
        </div>

        {/* Initials Avatar */}
        {selectedType === 'initials' && (
          <div>
            <label className="block text-sm font-medium mb-3">Background Color</label>
            <div className="grid grid-cols-4 gap-2">
              {AVATAR_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-12 h-12 rounded-full ${color.value} flex items-center justify-center text-white font-semibold text-lg border-2 ${
                    selectedColor === color.value ? 'border-ring' : 'border-transparent'
                  } hover:border-ring transition-colors`}
                >
                  <User className="w-6 h-6" />
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Your initials will appear on this background
            </p>
          </div>
        )}

        {/* Preset Avatar */}
        {selectedType === 'preset' && (
          <div>
            <label className="block text-sm font-medium mb-3">Choose an Icon</label>
            <div className="grid grid-cols-4 gap-2">
              {AVATAR_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setSelectedPreset(preset)}
                  className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl border-2 ${
                    selectedPreset.name === preset.name ? 'border-ring' : 'border-transparent'
                  } hover:border-ring transition-colors`}
                >
                  {preset.emoji}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {selectedPreset.name} icon
            </p>
          </div>
        )}

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium mb-3">Preview</label>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${
              selectedType === 'initials' ? selectedColor : 'bg-muted'
            }`}>
              {selectedType === 'initials' ? (
                <User className="w-8 h-8" />
              ) : (
                selectedPreset.emoji
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {selectedType === 'initials' ? 'Initials avatar' : `${selectedPreset.name} icon`}
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <Button onClick={handleConfirm} className="w-full">
          Save Avatar
        </Button>
      </CardContent>
    </Card>
  )
}
