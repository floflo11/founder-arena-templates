"use client"

interface GeneratedImageProps {
  imageUrl: string | null
  isGenerating: boolean
  aiEnabled: boolean
  strokeCount: number
}

export function GeneratedImage({ imageUrl, isGenerating, aiEnabled, strokeCount }: GeneratedImageProps) {
  if (!aiEnabled) {
    return (
      <div className="aspect-square rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-inner">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-gray-300 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">AI Generation Disabled</p>
          <p className="text-sm text-gray-400">Enable AI to see generated results</p>
        </div>
      </div>
    )
  }

  // First time loading (no image yet)
  if (isGenerating && !imageUrl) {
    return (
      <div
        className="aspect-square rounded-3xl overflow-hidden shadow-lg border border-gray-200 bg-white relative ring-2 ring-blue-300/50 shadow-blue-200/50 shadow-2xl"
      >
        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 opacity-40 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <p className="text-gray-600 font-medium">Generating...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!imageUrl) {
    return (
      <div className="aspect-square rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-inner border border-gray-200">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
          {strokeCount < 2 ? (
            <>
              <p className="text-gray-600 font-medium">Draw at least 2 strokes</p>
              <p className="text-sm text-gray-500">
                {strokeCount === 0 
                  ? "Start by drawing something on the canvas" 
                  : `${strokeCount}/2 strokes • ${2 - strokeCount} more to go!`
                }
              </p>
              <div className="flex justify-center gap-1 mt-2">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      i < strokeCount ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600 font-medium">Ready to generate!</p>
              <p className="text-sm text-gray-500">Your AI-generated image will appear here</p>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`aspect-square rounded-3xl overflow-hidden shadow-lg border border-gray-200 bg-white relative ${
        isGenerating ? "ring-2 ring-blue-300/50 shadow-blue-200/50 shadow-2xl" : ""
      }`}
    >
      <img
        src={imageUrl || "/placeholder.svg"}
        alt="AI Generated"
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isGenerating ? "opacity-40" : "opacity-100"
        }`}
        style={{ imageRendering: "crisp-edges" }}
      />


    </div>
  )
}
