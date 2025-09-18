"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SwitchDisabled() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="disabled-off" disabled />
        <Label htmlFor="disabled-off" className="text-muted-foreground">
          Disabled (Off)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="disabled-on" disabled defaultChecked />
        <Label htmlFor="disabled-on" className="text-muted-foreground">
          Disabled (On)
        </Label>
      </div>
    </div>
  )
}