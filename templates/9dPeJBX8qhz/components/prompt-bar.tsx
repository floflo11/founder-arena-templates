import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

interface PromptBarProps {
  prompt: string
  onPromptChange: (prompt: string) => void
  onGenerate: () => void
}

export function PromptBar({ prompt, onPromptChange, onGenerate }: PromptBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onGenerate()
    }
  }

  return (
    <div className="flex items-center gap-0 flex-1 min-w-0">
      <Input
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe what you want to see..."
        className="border-gray-200 bg-white/80 rounded-lg sm:rounded-xl h-10 sm:h-12 md:h-14 lg:h-16 px-1.5 sm:px-2 md:px-3 lg:px-4 text-4xl focus:ring-2 focus:ring-brand-600/40 focus:border-brand-600 transition-all flex-1 min-w-0"
      />
      <Button
        onClick={onGenerate}
        className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-lg sm:rounded-xl h-10 sm:h-12 md:h-14 lg:h-16 px-2 sm:px-3 md:px-4 lg:px-5 text-sm sm:text-base lg:text-lg transition-all shadow-md hover:shadow-lg hover:scale-105 ml-0.5 sm:ml-1"
        title="Generate (Enter)"
      >
        <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
      </Button>
    </div>
  )
}
