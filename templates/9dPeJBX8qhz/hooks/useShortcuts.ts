import { useEffect } from "react"

type Tool = "brush" | "eraser" | "select"

interface UseShortcutsProps {
  onToolChange: (tool: Tool) => void
  onColorChange: (color: string) => void
  onBackgroundPickerOpen: () => void
  onCustomColorPickerOpen: () => void
}

export function useShortcuts({
  onToolChange,
  onColorChange,
  onBackgroundPickerOpen,
  onCustomColorPickerOpen,
}: UseShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement) return

      // Tool shortcuts (numbers)
      switch (e.key) {
        case "1":
          onToolChange("brush")
          break
        case "2":
          onToolChange("select")
          break
        case "3":
          onToolChange("eraser")
          break
        case "4":
          onBackgroundPickerOpen()
          break
        case "a":
          onColorChange("#4B5563")
          break
        case "b":
          onColorChange("#FBBF24")
          break
        case "c":
          onColorChange("#3B82F6")
          break
        case "d":
          onColorChange("#EF4444")
          break
        case "e":
          onColorChange("#10B981")
          break
        case "f":
          onCustomColorPickerOpen()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onToolChange, onColorChange, onBackgroundPickerOpen, onCustomColorPickerOpen])
}
