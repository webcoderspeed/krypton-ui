"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SwitchDefault() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}