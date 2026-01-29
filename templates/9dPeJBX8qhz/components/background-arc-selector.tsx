"use client"

import type React from "react"
import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface BackgroundArcSelectorProps {
  onBackgroundColorChange: (color: string) => void
  backgroundColor: string
}

export interface BackgroundArcSelectorRef {
  openPicker: () => void
}

export const BackgroundArcSelector = forwardRef<BackgroundArcSelectorRef, BackgroundArcSelectorProps>(
  ({ onBackgroundColorChange, backgroundColor }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    
    // Expose the openPicker method to parent components
    useImperativeHandle(ref, () => ({
      openPicker: () => setIsOpen(true)
    }))
    
    // Background colors (same beautiful colors as before)
    const backgroundColors = [
      { color: "#FFFFFF", label: "White" },
      { color: "#F8F9FA", label: "Light Gray" },
      { color: "#E9ECEF", label: "Gray" },
      { color: "#DEE2E6", label: "Medium Gray" },
      { color: "#000000", label: "Black" },
      { color: "#FFF3E0", label: "Warm White" },
      { color: "#E3F2FD", label: "Cool White" },
      { color: "#F3E5F5", label: "Purple Tint" },
      { color: "#E8F5E8", label: "Green Tint" },
      { color: "#FFF8E1", label: "Yellow Tint" },
    ]

    const handleColorSelect = (color: string) => {
      onBackgroundColorChange(color)
      setIsOpen(false)
    }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-xl w-12 h-12 shadow-sm hover:shadow-md transition-all border-gray-200/60"
          style={{ backgroundColor }}
          title="Canvas Background"
        >
          {/* Background icon overlay */}
          <svg className="w-5 h-5 text-gray-600 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          
          {/* "BG" text in corner */}
          <span className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white/90 text-[9px] font-bold text-gray-600 ring-1 ring-gray-200 shadow-sm ${
            backgroundColor === "#FFFFFF" || backgroundColor === "#F8F9FA" || backgroundColor === "#E9ECEF" || backgroundColor === "#FFF3E0" || backgroundColor === "#E3F2FD" || backgroundColor === "#FFF8E1"
              ? "text-gray-600" 
              : "text-white/80"
          }`}>
            4
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4" align="start">
        <div className="grid grid-cols-5 gap-2">
          {backgroundColors.map((bg, index) => {
            const isSelected = bg.color === backgroundColor
            return (
              <button
                key={index}
                onClick={() => handleColorSelect(bg.color)}
                className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
                  isSelected ? "border-blue-500 shadow-lg scale-105" : "border-gray-300 hover:border-gray-400"
                }`}
                style={{
                  backgroundColor: bg.color,
                  borderColor: bg.color === "#FFFFFF" ? "#D1D5DB" : isSelected ? "#3B82F6" : "#D1D5DB",
                }}
                title={bg.label}
              />
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
})
