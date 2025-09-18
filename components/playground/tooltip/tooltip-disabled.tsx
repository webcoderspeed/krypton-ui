"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function TooltipDisabled() {
  return (
    <div className="flex items-center justify-center p-8">
      <TooltipProvider>
        <div className="flex gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Enabled Button</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This tooltip works normally</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" disabled>
                Disabled Button
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This tooltip still shows on disabled button</p>
            </TooltipContent>
          </Tooltip>

          {/* Tooltip that doesn't show */}
          <Tooltip open={false}>
            <TooltipTrigger asChild>
              <Button variant="outline">No Tooltip</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This tooltip is disabled</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  )
}