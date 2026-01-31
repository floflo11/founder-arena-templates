import type * as React from "react"

export function AudioWaveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 12h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h12" />
      <path d="M22 12h-2a2 2 0 0 1-2-2V6a2 2 0 0 0-2-2H4" />
      <path d="M4 12a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3" />
    </svg>
  )
}
