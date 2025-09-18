"use client"

import { Toggle } from "@/components/ui/toggle"
import { Bold } from "lucide-react"

export default function ToggleSizes() {
  return (
    <div className="flex items-center justify-center gap-4 p-8">
      <div className="flex flex-col items-center gap-2">
        <Toggle size="sm" aria-label="Toggle bold small">
          <Bold className="h-3 w-3" />
        </Toggle>
        <span className="text-sm text-muted-foreground">Small</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Toggle size="default" aria-label="Toggle bold default">
          <Bold className="h-4 w-4" />
        </Toggle>
        <span className="text-sm text-muted-foreground">Default</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Toggle size="lg" aria-label="Toggle bold large">
          <Bold className="h-5 w-5" />
        </Toggle>
        <span className="text-sm text-muted-foreground">Large</span>
      </div>
    </div>
  )
}