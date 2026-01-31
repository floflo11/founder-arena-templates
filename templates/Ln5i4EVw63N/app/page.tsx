export const dynamic = "force-dynamic"
import { WelcomeMessage } from "@/components/welcome-message"
import { LoginButton } from "@/components/login-button"
import { HowItWorksModal } from "@/components/how-it-works-modal"
import { getCurrentUser } from "@/lib/actions"
import Link from "next/link"

export default async function Home() {
  const user = await getCurrentUser()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8 flex flex-col items-center animate-[fade-in_0.5s_ease-in-out]">
        {/* Official X logo */}
        <div className="w-8 h-8 relative">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-full h-full">
            <path
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Title and subtitle */}
        <div className="text-center space-y-2 mt-4">
          <h1 className="text-3xl font-bold">Login with X</h1>
          <p className="text-gray-500 text-sm">Add X login to your v0 app in minutes</p>
        </div>

        {/* Main content: welcome message or login button */}
        <div className="w-full mt-8">{user ? <WelcomeMessage user={user} /> : <LoginButton />}</div>

        {/* Gray line separator */}
        <div className="w-full border-t border-gray-200 my-8"></div>

        {/* Bottom links */}
        <div className="flex justify-center space-x-12">
          <Link
            href="https://v0.dev/community/v0-login-x-Ln5i4EVw63N"
            target="_blank"
            className="text-gray-400 hover:text-gray-600 text-xs"
          >
            Open in v0
          </Link>

          <HowItWorksModal />

          <Link
            href="https://x.com/EstebanSuarez"
            target="_blank"
            className="text-gray-400 hover:text-gray-600 text-xs"
          >
            @estebansuarez
          </Link>
        </div>
      </div>
    </main>
  )
}
