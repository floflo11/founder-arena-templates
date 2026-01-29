"use client"

import type React from "react"
import { useEffect } from "react"
import { getKeyboardRows, getAllColors } from "@/lib/colors"

interface ColorPaletteProps {
  selectedColor: string
  onColorChange: (color: string) => void
  backgroundColor: string
  onBackgroundColorChange: (color: string) => void
}

export function ColorPalette({
  selectedColor,
  onColorChange,
  backgroundColor,
  onBackgroundColorChange,
}: ColorPaletteProps) {
  const keyboardColors = getKeyboardRows()
  const allColors = getAllColors()
  
  const handleDragStart = (e: React.DragEvent, color: string) => {
    e.dataTransfer.setData("color", color)
    e.dataTransfer.effectAllowed = "copy"
  }

  const handleColorClick = (color: string) => {
    onColorChange(color)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      const color = allColors.find(c => c.shortcut === key);
      if (color) {
        onColorChange(color.color);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [allColors, onColorChange]);

  // Remove focus from all color buttons when selected color changes
  useEffect(() => {
    const buttons = document.querySelectorAll('[data-color-button]')
    buttons.forEach(button => {
      if (button instanceof HTMLButtonElement) {
        button.blur()
      }
    })
  }, [selectedColor])

  const isBackgroundColor = (color: string) => color === backgroundColor

  const renderColorButton = (colorInfo: { color: string, label: string, shortcut: string }) => {
    const { color, label, shortcut } = colorInfo;
    return (
      <div key={color} className="relative">
        <button
          onClick={() => handleColorClick(color)}
          draggable
          onDragStart={(e) => handleDragStart(e, color)}
          className={`relative w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 cursor-pointer ${
            selectedColor === color ? "border-gray-800 shadow-lg" : "border-gray-300"
          }`}
          style={{ backgroundColor: color }}
          title={`${label} (${shortcut}) - Click to select`}
          data-color-button
        >
          <span className={`absolute inset-0 flex items-center justify-center text-[12px] font-semibold leading-none pointer-events-none select-none ${
            color === "#FFFFFF" || color === "#E5E7EB" || color === "#FBBF24" || color === "#84CC16"
              ? "text-gray-600"
              : "text-white/80"
          }`}>
            {shortcut}
          </span>
        </button>
        {/* {isBackgroundColor(color) && (
          <div className="absolute -inset-1 rounded-xl border-2 border-dashed border-blue-500 animate-pulse pointer-events-none">
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        )} */}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Top row */}
      <div className="flex gap-1">
        {keyboardColors.topRow.map(renderColorButton)}
      </div>

      {/* Middle row */}
      <div className="flex gap-1">
        {keyboardColors.middleRow.map(renderColorButton)}
      </div>

      {/* Bottom row */}
      <div className="flex gap-1">
        {keyboardColors.bottomRow.map(renderColorButton)}
      </div>
    </div>
  )
}
