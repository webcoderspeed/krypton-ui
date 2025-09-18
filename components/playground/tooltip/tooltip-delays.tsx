"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function TooltipDelays() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Tooltip Delays</h3>
        </div>
        
        <div className="flex gap-4 justify-center">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">No Delay</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Appears immediately</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={500}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">500ms Delay</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Appears after 500ms</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={1000}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">1s Delay</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Appears after 1 second</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Hover over buttons to see different delay timings
        </div>
      </div>
    </div>
  )
}