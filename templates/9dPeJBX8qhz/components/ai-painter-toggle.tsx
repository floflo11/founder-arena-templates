"use client"

import { useState, useEffect } from "react"
import { Brush, Sparkles, Zap, ZapOff } from "lucide-react"

interface AiPainterToggleProps {
  isEnabled: boolean
  onToggle: () => void
  isGenerating: boolean
}

export function AiPainterToggle({ isEnabled, onToggle, isGenerating }: AiPainterToggleProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative w-16 h-16 rounded-2xl transition-all duration-300 transform
          ${isEnabled 
            ? 'bg-gradient-to-br from-brand-500 to-blue-500 hover:from-brand-400 hover:to-blue-400 shadow-lg hover:shadow-xl' 
            : 'bg-gradient-to-br from-gray-300 to-gray-400 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg'
          }
          ${isHovered ? 'scale-110' : 'scale-100'}
          ${isGenerating ? 'animate-pulse' : ''}
        `}
        title={isEnabled ? "AI Connected - Click to disconnect" : "AI Disconnected - Click to connect"}
      >
        {/* 3D Effect Background */}
        <div className={`
          absolute inset-0 rounded-2xl transition-all duration-300
          ${isEnabled 
            ? 'bg-gradient-to-t from-brand-600/50 to-transparent' 
            : 'bg-gradient-to-t from-gray-500/50 to-transparent'
          }
        `} />
        
        {/* Main Icon */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {isEnabled ? (
            <div className="relative">
              <Brush className={`
                w-8 h-8 text-white transition-all duration-300
                ${isGenerating ? 'animate-bounce' : ''}
              `} />
              {/* Sparkles effect when enabled */}
              <div className={`
                absolute -top-1 -right-1 w-4 h-4 transition-all duration-300
                ${isGenerating ? 'animate-spin' : 'animate-pulse'}
              `}>
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </div>
            </div>
          ) : (
            <div className="relative">
              <Brush className="w-8 h-8 text-gray-600" />
              {/* Disconnect indicator */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <ZapOff className="w-2 h-2 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Glow effect when enabled */}
        {isEnabled && (
          <div className={`
            absolute inset-0 rounded-2xl blur-xl opacity-30 transition-all duration-300
            ${isGenerating ? 'animate-pulse' : ''}
            bg-gradient-to-br from-brand-500 to-blue-500
          `} />
        )}
      </button>

      {/* Status text */}
      <div className="text-center">
        <p className={`
          text-sm font-medium transition-colors duration-300
          ${isEnabled ? 'text-brand-600' : 'text-gray-500'}
        `}>
          {/* {isEnabled ? 'AI Connected' : 'AI Disconnected'} */}
        </p>
        {isGenerating && (
          <p className="text-xs text-blue-500 animate-pulse">
            Generating...
          </p>
        )}
      </div>
    </div>
  )
}
