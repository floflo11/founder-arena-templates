"use client"

import { useState, useEffect } from "react"
import { UI_CONFIG } from "@/lib/auth-utils"

export function LoginButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Listen for messages from the popup when authentication succeeds or fails
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return

      // Ignore messages that are not simple strings (e.g. objects from Next.js HMR)
      if (typeof event.data !== "string") return

      if (event.data === "AUTH_SUCCESS") {
        // setIsLoading(false)
        setError(null)
        // Reload the page to show updated authentication status
        window.location.reload()
      }

      if (event.data.startsWith("AUTH_ERROR")) {
        setIsLoading(false)

        // Extraer el código de error específico si existe
        const errorCode = event.data.split(":")[1]
        let errorMessage = "Authentication error. Please try again."

        // Proporcionar mensajes más específicos según el código de error
        if (errorCode === "invalid_state") {
          errorMessage = "Security verification failed. Please try again."
        } else if (errorCode === "token_exchange_failed") {
          errorMessage = "Could not complete authentication with X. Please try again."
        } else if (errorCode === "user_data_failed") {
          errorMessage = "Could not retrieve your profile information. Please try again."
        } else if (errorCode === "missing_code") {
          errorMessage = "Authentication code missing. Please try again."
        }

        setError(errorMessage)
      }

      if (event.data === "AUTH_CANCELLED") {
        setIsLoading(false)
        // No need to show an error for cancellation
        setError(null)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  const handleLogin = () => {
    setIsLoading(true)
    setError(null)

    // URL to start the X authentication process
    const authUrl = "/api/auth/login"

    // Open a popup for authentication using the config values
    const { width, height } = UI_CONFIG.POPUP
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2

    const popup = window.open(
      authUrl,
      "Sign in with X",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`,
    )

    // If the popup is blocked, show a message
    if (!popup || popup.closed || typeof popup.closed === "undefined") {
      setIsLoading(false)
      setError("Popup blocked. Please allow popups for this site and try again.")
      return
    }

    // Check if the popup is manually closed
    const checkPopup = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkPopup)
        setIsLoading(false)
      }
    }, 500)
  }

  return (
    <div className="space-y-3 animate-slide-up">
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="mx-auto block bg-black hover:bg-black/90 text-white py-2 px-4 rounded w-64"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Connecting...</span>
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            {/* Official X logo */}
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4">
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                fill="currentColor"
              />
            </svg>
            <span>Login with X</span>
          </span>
        )}
      </button>

      {error && <p className="text-center text-sm text-red-500">{error}</p>}
    </div>
  )
}
