"use client"

import type React from "react"
import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react"

interface DrawingCanvasProps {
  onDrawingChange?: () => void
  onStrokeCountChange?: (count: number) => void
  selectedColor: string
  backgroundColor: string
  brushSize: number[]
  selectedTool: Tool
  onToolChange: (tool: Tool) => void
}

type Tool = "brush" | "eraser" | "select"

interface Point {
  x: number
  y: number
}

interface DrawingObject {
  id: string
  type: "brush" // Only brush objects now, eraser modifies these
  points: Point[]
  color: string
  size: number
  bounds: { x: number; y: number; width: number; height: number }
  zIndex: number
}

export const DrawingCanvas = forwardRef<HTMLCanvasElement, DrawingCanvasProps>(
  (
    { onDrawingChange, onStrokeCountChange, selectedColor, backgroundColor, brushSize, selectedTool, onToolChange },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [objects, setObjects] = useState<DrawingObject[]>([])
    const [selectedObjects, setSelectedObjects] = useState<string[]>([])
    const [isDragging, setIsDragging] = useState(false)
    const [currentPath, setCurrentPath] = useState<Point[]>([])
    const [history, setHistory] = useState<DrawingObject[][]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 })
    const [showBrushPreview, setShowBrushPreview] = useState(false)
    const [maxZIndex, setMaxZIndex] = useState(0)

    const saveToHistory = (newObjects: DrawingObject[]) => {
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(newObjects)
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    }

    const undo = () => {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setObjects([...history[newIndex]])
        setHistoryIndex(newIndex)
        setSelectedObjects([])
        onDrawingChange?.()
      }
    }

    const redo = () => {
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setObjects([...history[newIndex]])
        setHistoryIndex(newIndex)
        setSelectedObjects([])
        onDrawingChange?.()
      }
    }

    useImperativeHandle(ref, () => {
      const canvas = canvasRef.current!
      return Object.assign(canvas, {
        renderCleanCanvas,
      })
    })

    // Keyboard shortcuts for delete
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (selectedObjects.length > 0) {
            deleteSelectedObject()
          }
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [selectedObjects])

    // Handle drag and drop for background color
    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const handleDragOver = (e: DragEvent) => {
        e.preventDefault()
        e.dataTransfer!.dropEffect = "copy"
      }

      const handleDrop = (e: DragEvent) => {
        e.preventDefault()
        const color = e.dataTransfer!.getData("color")
        if (color) {
          // Update background color through parent component
          onDrawingChange?.()
        }
      }

      canvas.addEventListener("dragover", handleDragOver)
      canvas.addEventListener("drop", handleDrop)

      return () => {
        canvas.removeEventListener("dragover", handleDragOver)
        canvas.removeEventListener("drop", handleDrop)
      }
    }, [onDrawingChange])

    useEffect(() => {
      const canvas = canvasRef.current
      const previewCanvas = previewCanvasRef.current
      if (!canvas || !previewCanvas) return

      canvas.width = 512
      canvas.height = 512
      previewCanvas.width = 512
      previewCanvas.height = 512

      // Save initial empty state
      setHistory([[]])
      setHistoryIndex(0)

      redrawCanvas()
    }, [])

    useEffect(() => {
      redrawCanvas()
    }, [objects, selectedObjects, backgroundColor])

    useEffect(() => {
      drawPreview()
    }, [currentPath, mousePos, showBrushPreview, selectedTool, selectedColor, brushSize])

    // Notify parent of stroke count changes
    useEffect(() => {
      onStrokeCountChange?.(objects.length)
    }, [objects, onStrokeCountChange])

    // Handle paste events
    useEffect(() => {
      const handlePaste = async (e: ClipboardEvent) => {
        e.preventDefault()

        const items = e.clipboardData?.items
        if (!items || !canvasRef.current) return

        for (let i = 0; i < items.length; i++) {
          const item = items[i]

          if (item.type.indexOf("image") !== -1) {
            const blob = item.getAsFile()
            if (!blob) continue

            const img = new Image()
            img.crossOrigin = "anonymous"

            img.onload = () => {
              const canvas = canvasRef.current!
              const ctx = canvas.getContext("2d")!
              const canvasAspect = canvas.width / canvas.height
              const imgAspect = img.width / img.height

              let drawWidth, drawHeight, drawX, drawY

              if (imgAspect > canvasAspect) {
                // Image is wider than canvas
                drawWidth = canvas.width
                drawHeight = canvas.width / imgAspect
                drawX = 0
                drawY = (canvas.height - drawHeight) / 2
              } else {
                // Image is taller than canvas
                drawHeight = canvas.height
                drawWidth = canvas.height * imgAspect
                drawX = (canvas.width - drawWidth) / 2
                drawY = 0
              }

              // Clear canvas and set background color
              ctx.fillStyle = backgroundColor
              ctx.fillRect(0, 0, canvas.width, canvas.height)

              // Draw the pasted image
              ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)

              // Clear objects since we pasted an image
              setObjects([])
              saveToHistory([])

              // Trigger generation
              onDrawingChange?.()
            }

            img.src = URL.createObjectURL(blob)
            break
          }
        }
      }

      // Add paste event listener to document
      document.addEventListener("paste", handlePaste)
      return () => {
        document.removeEventListener("paste", handlePaste)
      }
    }, [onDrawingChange, backgroundColor])

    const redrawCanvas = () => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (!canvas || !ctx) return

      // Clear canvas completely first
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set background color
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Sort objects by zIndex and draw them
      const sortedObjects = [...objects].sort((a, b) => a.zIndex - b.zIndex)
      sortedObjects.forEach((obj) => {
        drawObject(ctx, obj, selectedObjects.includes(obj.id))
      })
    }

    // Method to render canvas without selection indicators (for export)
    const renderCleanCanvas = () => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (!canvas || !ctx) return

      // Store current canvas state
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      // Clear canvas completely first
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set background color
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Sort objects by zIndex and draw them WITHOUT selection indicators
      const sortedObjects = [...objects].sort((a, b) => a.zIndex - b.zIndex)
      sortedObjects.forEach((obj) => {
        drawObject(ctx, obj, false, false) // Never show selection
      })

      // Return a function to restore the original state
      return () => {
        ctx.putImageData(imageData, 0, 0)
      }
    }

    const drawPreview = () => {
      const previewCanvas = previewCanvasRef.current
      const ctx = previewCanvas?.getContext("2d")
      if (!previewCanvas || !ctx) return

      // Clear preview canvas
      ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height)

      // Draw current path being drawn
      if (isDrawing && currentPath.length > 0) {
        if (selectedTool === "brush") {
          ctx.globalCompositeOperation = "source-over"
          ctx.strokeStyle = selectedColor
          ctx.lineWidth = brushSize[0]
          ctx.lineCap = "round"
          ctx.lineJoin = "round"

          if (currentPath.length > 1) {
            ctx.beginPath()
            ctx.moveTo(currentPath[0].x, currentPath[0].y)
            for (let i = 1; i < currentPath.length; i++) {
              ctx.lineTo(currentPath[i].x, currentPath[i].y)
            }
            ctx.stroke()
          }
        }
        // No preview for eraser since it modifies existing objects in real-time
      }

      // Draw brush size preview
      if (showBrushPreview && selectedTool !== "select") {
        ctx.strokeStyle = selectedTool === "eraser" ? "#ff6b6b" : selectedColor
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.3
        ctx.beginPath()
        ctx.arc(mousePos.x, mousePos.y, brushSize[0] / 2, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.globalAlpha = 1
      }
    }

    const drawObject = (
      ctx: CanvasRenderingContext2D,
      obj: DrawingObject,
      isSelected: boolean,
      showSelection = true,
    ) => {
      // Only draw brush objects (eraser objects are no longer stored)
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = obj.color
      ctx.lineWidth = obj.size
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      if (obj.points.length > 1) {
        ctx.beginPath()
        ctx.moveTo(obj.points[0].x, obj.points[0].y)
        for (let i = 1; i < obj.points.length; i++) {
          ctx.lineTo(obj.points[i].x, obj.points[i].y)
        }
        ctx.stroke()
      }

      // Draw selection bounds only if showSelection is true
      if (isSelected && showSelection) {
        ctx.strokeStyle = "#007acc"
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.strokeRect(obj.bounds.x - 5, obj.bounds.y - 5, obj.bounds.width + 10, obj.bounds.height + 10)
        ctx.setLineDash([])
      }
    }

    const calculateBounds = (points: Point[]): { x: number; y: number; width: number; height: number } => {
      if (points.length === 0) return { x: 0, y: 0, width: 0, height: 0 }

      const xs = points.map((p) => p.x)
      const ys = points.map((p) => p.y)
      const minX = Math.min(...xs)
      const maxX = Math.max(...xs)
      const minY = Math.min(...ys)
      const maxY = Math.max(...ys)

      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      }
    }

    // Function to check if a point is within a certain distance of a line segment
    const distanceToLineSegment = (point: Point, lineStart: Point, lineEnd: Point): number => {
      const A = point.x - lineStart.x
      const B = point.y - lineStart.y
      const C = lineEnd.x - lineStart.x
      const D = lineEnd.y - lineStart.y

      const dot = A * C + B * D
      const lenSq = C * C + D * D
      let param = -1
      if (lenSq !== 0) {
        param = dot / lenSq
      }

      let xx, yy

      if (param < 0) {
        xx = lineStart.x
        yy = lineStart.y
      } else if (param > 1) {
        xx = lineEnd.x
        yy = lineEnd.y
      } else {
        xx = lineStart.x + param * C
        yy = lineStart.y + param * D
      }

      const dx = point.x - xx
      const dy = point.y - yy
      return Math.sqrt(dx * dx + dy * dy)
    }

    // Function to erase parts of objects that intersect with the eraser path
    const eraseFromObjects = (eraserPath: Point[], eraserSize: number) => {
      const modifiedObjects: DrawingObject[] = []
      let objectsChanged = false

      objects.forEach((obj) => {
        if (obj.type === "brush") {
          const newSegments: Point[][] = []
          let currentSegment: Point[] = []

          // Check each point in the object's path
          for (let i = 0; i < obj.points.length; i++) {
            const point = obj.points[i]
            let shouldErase = false

            // Check if this point should be erased by any point in the eraser path
            for (let j = 0; j < eraserPath.length; j++) {
              const eraserPoint = eraserPath[j]
              const distance = Math.sqrt(Math.pow(point.x - eraserPoint.x, 2) + Math.pow(point.y - eraserPoint.y, 2))

              if (distance <= (eraserSize + obj.size) / 2) {
                shouldErase = true
                break
              }

              // Also check distance to eraser line segments
              if (j > 0) {
                const prevEraserPoint = eraserPath[j - 1]
                const distToLine = distanceToLineSegment(point, prevEraserPoint, eraserPoint)
                if (distToLine <= (eraserSize + obj.size) / 2) {
                  shouldErase = true
                  break
                }
              }
            }

            if (!shouldErase) {
              currentSegment.push(point)
            } else {
              // Point should be erased
              if (currentSegment.length > 1) {
                newSegments.push([...currentSegment])
              }
              currentSegment = []
              objectsChanged = true
            }
          }

          // Add the last segment if it has points
          if (currentSegment.length > 1) {
            newSegments.push(currentSegment)
          }

          // Create new objects from the segments
          newSegments.forEach((segment, index) => {
            if (segment.length > 1) {
              const newZIndex = index === 0 ? obj.zIndex : maxZIndex + index + 1
              modifiedObjects.push({
                ...obj,
                id: index === 0 ? obj.id : `${obj.id}_split_${index}`,
                points: segment,
                bounds: calculateBounds(segment),
                zIndex: newZIndex,
              })
            }
          })

          // If no segments remain, the object was completely erased
          if (newSegments.length === 0) {
            objectsChanged = true
          }
        }
      })

      if (objectsChanged) {
        setObjects(modifiedObjects)
        setMaxZIndex((prev) => Math.max(prev, ...modifiedObjects.map((obj) => obj.zIndex)))
        return modifiedObjects
      }

      return objects
    }

    const getMousePos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Point => {
      const canvas = canvasRef.current
      if (!canvas) return { x: 0, y: 0 }

      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      // Check if it's a touch event
      if (e.type.startsWith("touch")) {
        const touchEvent = e as React.TouchEvent<HTMLCanvasElement>
        const touch = touchEvent.touches[0] || touchEvent.changedTouches[0]
        return {
          x: (touch.clientX - rect.left) * scaleX,
          y: (touch.clientY - rect.top) * scaleY,
        }
      } else {
        // Mouse event
        return {
          x: ((e as React.MouseEvent<HTMLCanvasElement>).clientX - rect.left) * scaleX,
          y: ((e as React.MouseEvent<HTMLCanvasElement>).clientY - rect.top) * scaleY,
        }
      }
    }

    const findObjectAtPoint = (point: Point): string | null => {
      // Sort by zIndex descending to find topmost object first
      const sortedObjects = [...objects].sort((a, b) => b.zIndex - a.zIndex)

      for (const obj of sortedObjects) {
        if (
          point.x >= obj.bounds.x - 10 &&
          point.x <= obj.bounds.x + obj.bounds.width + 10 &&
          point.y >= obj.bounds.y - 10 &&
          point.y <= obj.bounds.y + obj.bounds.height + 10
        ) {
          return obj.id
        }
      }
      return null
    }

    const bringToFront = (objectId: string) => {
      const newMaxZ = maxZIndex + 1
      setMaxZIndex(newMaxZ)

      setObjects((prev) =>
        prev.map((obj) => {
          if (obj.id === objectId) {
            return { ...obj, zIndex: newMaxZ }
          }
          return obj
        }),
      )
      saveToHistory(objects) // Re-save to history to ensure consistency
      onDrawingChange?.()
    }

    // Track drag start positions for movement threshold
    const [dragStartPositions, setDragStartPositions] = useState<{ [id: string]: { x: number; y: number } }>()
    const [dragOffsets, setDragOffsets] = useState<{ [id: string]: { x: number; y: number } }>()

    // Multiselect logic: shift+click adds/removes from selection (only for mouse, not touch)
    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault() // Prevent default touch behavior
      const pos = getMousePos(e)
      const isTouch = e.type.startsWith("touch")

      if (selectedTool === "select") {
        const objectId = findObjectAtPoint(pos)
        if (objectId) {
          // For touch devices, always single select. For mouse, allow shift+click multiselect
          if (!isTouch && (e as React.MouseEvent).shiftKey) {
            setSelectedObjects((prev) =>
              prev.includes(objectId) ? prev.filter((id) => id !== objectId) : [...prev, objectId],
            )
          } else {
            setSelectedObjects([objectId])
          }

          // Store drag offsets and start positions for all selected objects
          setIsDragging(true)

          // Get the current selection (including the newly selected object)
          const currentSelection =
            !isTouch && (e as React.MouseEvent).shiftKey
              ? selectedObjects.includes(objectId)
                ? selectedObjects.filter((id) => id !== objectId)
                : [...selectedObjects, objectId]
              : [objectId]

          setDragOffsets(() => {
            const offsets: { [id: string]: { x: number; y: number } } = {}
            currentSelection.forEach((id) => {
              const obj = objects.find((o) => o.id === id)
              if (obj) offsets[id] = { x: pos.x - obj.bounds.x, y: pos.y - obj.bounds.y }
            })
            return offsets
          })

          setDragStartPositions(() => {
            const starts: { [id: string]: { x: number; y: number } } = {}
            currentSelection.forEach((id) => {
              const obj = objects.find((o) => o.id === id)
              if (obj) starts[id] = { x: obj.bounds.x, y: obj.bounds.y }
            })
            return starts
          })
        } else {
          setSelectedObjects([])
        }
        return
      }
      setIsDrawing(true)
      setCurrentPath([pos])
      setSelectedObjects([])
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      const pos = getMousePos(e)
      setMousePos(pos)

      if (isDragging && selectedObjects.length > 0 && dragOffsets) {
        setObjects((prev) =>
          prev.map((obj) => {
            if (selectedObjects.includes(obj.id) && dragOffsets[obj.id]) {
              const offset = dragOffsets[obj.id]
              const newX = pos.x - offset.x
              const newY = pos.y - offset.y
              const dx = newX - obj.bounds.x
              const dy = newY - obj.bounds.y
              return {
                ...obj,
                points: obj.points.map((p) => ({ x: p.x + dx, y: p.y + dy })),
                bounds: {
                  ...obj.bounds,
                  x: newX,
                  y: newY,
                },
              }
            }
            return obj
          }),
        )
        return
      }

      if (!isDrawing) return

      if (selectedTool === "brush") {
        setCurrentPath((prev) => [...prev, pos])
        if (currentPath.length % 8 === 0) {
          onDrawingChange?.()
        }
      } else if (selectedTool === "eraser") {
        setCurrentPath((prev) => [...prev, pos])
        // Apply erasing in real-time
        if (currentPath.length > 1) {
          const newObjects = eraseFromObjects([...currentPath], brushSize[0])
          if (newObjects !== objects) {
            onDrawingChange?.()
          }
        }
      }
    }

    const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault() // Prevent default touch behavior

      if (isDragging && selectedObjects.length > 0 && dragStartPositions && dragOffsets) {
        setIsDragging(false)

        const finalMousePos = getMousePos(e)
        let movedSignificantly = false

        // Create a new version of the objects array with final positions
        const newObjects = objects.map((obj) => {
          if (selectedObjects.includes(obj.id)) {
            const start = dragStartPositions[obj.id]
            const offset = dragOffsets[obj.id]
            if (start && offset) {
              const finalX = finalMousePos.x - offset.x
              const finalY = finalMousePos.y - offset.y

              // Check for significant movement (reduced threshold for touch)
              const dx = Math.abs(finalX - start.x)
              const dy = Math.abs(finalY - start.y)
              const threshold = e.type.startsWith("touch") ? 5 : 10 // Lower threshold for touch
              if (dx > threshold || dy > threshold) {
                movedSignificantly = true
              }

              // Return object with its new, final position
              const objDx = finalX - obj.bounds.x
              const objDy = finalY - obj.bounds.y
              return {
                ...obj,
                points: obj.points.map((p) => ({ x: p.x + objDx, y: p.y + objDy })),
                bounds: { ...obj.bounds, x: finalX, y: finalY },
              }
            }
          }
          return obj
        })

        if (movedSignificantly) {
          let nextZ = maxZIndex + 1
          const finalObjects = newObjects.map((obj) => {
            if (selectedObjects.includes(obj.id)) {
              return { ...obj, zIndex: nextZ++ }
            }
            return obj
          })

          setObjects(finalObjects)
          setMaxZIndex((z) => z + selectedObjects.length)
          saveToHistory(finalObjects)

          // Add console log for debugging
          console.log("Object moved significantly, triggering generation")
          onDrawingChange?.() // This should trigger new generation
        }

        // Cleanup state regardless of movement
        setDragStartPositions(undefined)
        setDragOffsets(undefined)
        return
      }

      if (!isDrawing) return
      setIsDrawing(false)

      if (selectedTool === "brush" && currentPath.length > 1) {
        // Only add brush strokes as objects
        const newZIndex = maxZIndex + 1
        setMaxZIndex(newZIndex)

        const newObject: DrawingObject = {
          id: Date.now().toString(),
          type: "brush",
          points: [...currentPath],
          color: selectedColor,
          size: brushSize[0],
          bounds: calculateBounds(currentPath),
          zIndex: newZIndex,
        }

        const finalObjects = [...objects, newObject]
        setObjects(finalObjects)
        saveToHistory(finalObjects)
        onDrawingChange?.()
      } else if (selectedTool === "eraser" && currentPath.length > 1) {
        // For eraser, just save the final state after erasing
        const finalObjects = eraseFromObjects([...currentPath], brushSize[0])
        saveToHistory(finalObjects)
        onDrawingChange?.()
      }

      setCurrentPath([])
    }

    const deleteSelectedObject = () => {
      if (selectedObjects.length > 0) {
        const finalObjects = objects.filter((obj) => !selectedObjects.includes(obj.id))
        setObjects(finalObjects)
        setSelectedObjects([])
        saveToHistory(finalObjects)
        onDrawingChange?.()
      }
    }

    const clearCanvas = () => {
      setObjects([])
      setSelectedObjects([])
      saveToHistory([])
      onDrawingChange?.()
    }

    // Add Cmd+Z/Ctrl+Z undo
    useEffect(() => {
      const handleUndoKey = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
          e.preventDefault()
          undo()
        }
      }
      window.addEventListener("keydown", handleUndoKey)
      return () => window.removeEventListener("keydown", handleUndoKey)
    }, [])

    // Add Cmd+Y/Ctrl+Y redo
    useEffect(() => {
      const handleRedoKey = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "y") {
          e.preventDefault()
          redo()
        }
      }
      window.addEventListener("keydown", handleRedoKey)
      return () => window.removeEventListener("keydown", handleRedoKey)
    }, [])

    return (
      <div className="space-y-4">
        {/* Canvas Container - Fixed size to match AI result */}
        <div
          className="aspect-square rounded-3xl overflow-hidden shadow-lg border border-input relative"
          style={{ backgroundColor }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrawing}
            onMouseLeave={(e) => {
              stopDrawing(e)
              setShowBrushPreview(false)
            }}
            onMouseEnter={() => setShowBrushPreview(true)}
            onTouchStart={startDrawing}
            onTouchMove={handleMouseMove}
            onTouchEnd={stopDrawing}
          />
          <canvas ref={previewCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
        </div>
      </div>
    )
  },
)

DrawingCanvas.displayName = "DrawingCanvas"
