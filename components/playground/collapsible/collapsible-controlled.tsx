"use client"

import { useState } from "react"
import { ChevronDown, Settings } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function CollapsibleControlled() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-[400px] space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="collapsible-control"
          checked={isOpen}
          onCheckedChange={setIsOpen}
        />
        <Label htmlFor="collapsible-control">
          {isOpen ? "Collapse" : "Expand"} Settings
        </Label>
      </div>
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <h4 className="text-sm font-semibold">Advanced Settings</h4>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Enable Notifications</Label>
              <Switch id="notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="analytics">Analytics Tracking</Label>
              <Switch id="analytics" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-save">Auto Save</Label>
              <Switch id="auto-save" defaultChecked />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}