"use client"

import { Toggle } from "@/components/ui/toggle"
import { Bold, Italic } from "lucide-react"

export default function ToggleVariants() {
  return (
    <div className="flex items-center justify-center gap-4 p-8">
      <div className="flex flex-col items-center gap-2">
        <Toggle variant="default" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </Toggle>
        <span className="text-sm text-muted-foreground">Default</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Toggle variant="outline" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </Toggle>
        <span className="text-sm text-muted-foreground">Outline</span>
      </div>
    </div>
  )
}