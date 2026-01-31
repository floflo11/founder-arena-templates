"use client"

import { useCallback, useLayoutEffect, useState } from "react"

export interface UseMeasureRect {
  width: number
  height: number
}

export function useMeasure(): [(node: HTMLElement | null) => void, UseMeasureRect] {
  const [rect, setRect] = useState<UseMeasureRect>({ width: 0, height: 0 })
  const [element, setElement] = useState<HTMLElement | null>(null)

  const ref = useCallback((node: HTMLElement | null) => {
    setElement(node)
  }, [])

  useLayoutEffect(() => {
    if (!element) return

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect
        setRect({ width, height })
      }
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [element])

  return [ref, rect]
}
