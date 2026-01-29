"use client"

import { Slider } from "@/components/ui/slider"

interface BrushSizeControlProps {
  brushSize: number[]
  onBrushSizeChange: (size: number[]) => void
  className?: string
}

export function BrushSizeControl({ brushSize, onBrushSizeChange, className }: BrushSizeControlProps) {
  return (
    <div className="w-24 [&>span[role=slider]]:bg-brand-600 [&>span[role=slider]]:border-brand-600 [&_.bg-primary]:bg-brand-600" >
      <Slider value={brushSize} onValueChange={onBrushSizeChange} max={100} min={1} step={1} className={className ? className : "flex-1"} />
    </div>
  )
}
