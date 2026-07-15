"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <AlertTriangle className="h-12 w-12 mx-auto mb-6 text-yellow-500" />
        <h2 className="text-xl font-display text-[#FAFAFA] mb-2">Something went wrong</h2>
        <p className="text-sm text-[#A1A1AA] mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <Button
          onClick={reset}
          className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20"
        >
          Try again
        </Button>
      </div>
    </div>
  )
}
