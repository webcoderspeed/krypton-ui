"use client"

import { Toggle } from "@/components/ui/toggle"
import { Bold, Italic, Underline } from "lucide-react"

export default function ToggleWithText() {
  return (
    <div className="flex items-center justify-center gap-4 p-8">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
        Bold
      </Toggle>
      
      <Toggle variant="outline" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
        Italic
      </Toggle>
      
      <Toggle aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
        Underline
      </Toggle>
    </div>
  )
}