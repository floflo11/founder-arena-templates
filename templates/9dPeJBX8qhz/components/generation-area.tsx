import React from "react"
import { GeneratedImage } from "@/components/generated-image"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Anchor, Sparkles, Shuffle } from "lucide-react"

interface GenerationAreaProps {
  generatedImage: string | null
  isGenerating: boolean
  aiEnabled: boolean
  strokeCount: number
  strength: number[]
  onStrengthChange: (strength: number[]) => void
  seed: number
  onSeedChange: (seed: number) => void
  onRandomizeSeed: () => void
}

export function GenerationArea({
  generatedImage,
  isGenerating,
  aiEnabled,
  strokeCount,
  strength,
  onStrengthChange,
  seed,
  onSeedChange,
  onRandomizeSeed,
}: GenerationAreaProps) {
  const handleSeedInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeedChange(Number.parseInt(e.target.value) || 0)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center">
        <div className="aspect-square w-full max-w-lg relative">
          {/* Floating overlay cards */}
          <div className="absolute top-4 right-4 flex flex-row gap-3 z-10">
            {/* Strength Card */}
            <div
              className="bg-white/60 backdrop-blur-md rounded-xl px-4 py-3 shadow flex items-center gap-2"
              title="Controls how much the AI should change your drawing (anchor = closer to original, sparkles = more creative)"
            >
              <Anchor className="w-3 h-3 text-brand-600" />
              <Slider
                id="strength"
                value={strength}
                onValueChange={onStrengthChange}
                max={0.9}
                min={0.7}
                step={0.01}
                className="w-24 [&>span[role=slider]]:bg-brand-600 [&>span[role=slider]]:border-brand-600 [&_.bg-primary]:bg-brand-600"
              />
              <Sparkles className="w-3 h-3 text-brand-600" />
            </div>

            {/* Seed Card */}
            <div className="bg-white/60 backdrop-blur-md rounded-xl px-4 py-3 shadow flex items-center gap-2">
              <span className="text-xs font-medium text-brand-600">Seed</span>
              <input
                id="seed"
                type="text"
                value={seed}
                onChange={handleSeedInputChange}
                className="border-0 bg-transparent outline-none text-xs font-mono text-center w-16 text-brand-600 focus:text-brand-700 transition-colors"
                title="Edit seed"
              />
              <Button
                variant="ghost"
                onClick={onRandomizeSeed}
                className="hover:bg-white/40 rounded-lg h-6 w-6 p-0 transition-all"
                title="Random seed"
              >
                <Shuffle className="w-3 h-3 text-brand-600" />
              </Button>
            </div>
          </div>

          <GeneratedImage
            imageUrl={generatedImage}
            isGenerating={isGenerating}
            aiEnabled={aiEnabled}
            strokeCount={strokeCount}
          />
        </div>
      </div>
    </div>
  )
}
