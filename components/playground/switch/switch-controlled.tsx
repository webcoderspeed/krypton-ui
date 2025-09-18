"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SwitchControlled() {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch 
          id="controlled-switch" 
          checked={isChecked}
          onCheckedChange={setIsChecked}
        />
        <Label htmlFor="controlled-switch">
          {isChecked ? "Enabled" : "Disabled"}
        </Label>
      </div>
      <p className="text-sm text-muted-foreground">
        Current state: {isChecked ? "ON" : "OFF"}
      </p>
    </div>
  )
}