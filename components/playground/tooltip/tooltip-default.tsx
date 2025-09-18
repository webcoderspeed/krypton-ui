"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function TooltipDefault() {
  return (
    <div className="flex items-center justify-center p-8">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This is a simple tooltip</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}