"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const colors = [
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e",
  "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1",
  "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#64748b"
]

export default function PopoverColorPicker() {
  const [selectedColor, setSelectedColor] = useState("#3b82f6")

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start">
          <div 
            className="w-4 h-4 rounded mr-2 border" 
            style={{ backgroundColor: selectedColor }}
          />
          {selectedColor}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Pick a color</h4>
            <p className="text-sm text-muted-foreground">
              Choose from our color palette.
            </p>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded border-2 hover:scale-110 transition-transform"
                style={{ 
                  backgroundColor: color,
                  borderColor: selectedColor === color ? "#000" : "transparent"
                }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="flex-1 h-8 px-2 border rounded text-sm"
              placeholder="#000000"
            />
            <div 
              className="w-8 h-8 rounded border" 
              style={{ backgroundColor: selectedColor }}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}