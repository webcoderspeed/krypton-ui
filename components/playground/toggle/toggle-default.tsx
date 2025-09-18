"use client"

import { Toggle } from "@/components/ui/toggle"
import { Bold } from "lucide-react"

export default function ToggleDefault() {
  return (
    <div className="flex items-center justify-center p-8">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
    </div>
  )
}