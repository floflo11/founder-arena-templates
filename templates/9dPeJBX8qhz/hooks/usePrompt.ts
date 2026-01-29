import { useState, useEffect } from "react"

export function usePrompt(defaultPrompt = "A man standing over a cliff watching the sun") {
  // Initialize prompt state with localStorage if available
  const [prompt, setPrompt] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("prompt") || defaultPrompt
    }
    return defaultPrompt
  })

  // Update localStorage when prompt changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("prompt", prompt)
    }
  }, [prompt])

  return { prompt, setPrompt }
}
