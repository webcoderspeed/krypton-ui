"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  Keyboard,
  Monitor,
  Moon,
  Sun
} from "lucide-react"

export default function DropdownMenuSettings() {
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(false)
  const [analytics, setAnalytics] = useState(true)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Preferences</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuCheckboxItem
          checked={notifications}
          onCheckedChange={setNotifications}
        >
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuCheckboxItem
          checked={autoSave}
          onCheckedChange={setAutoSave}
        >
          Auto-save
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuCheckboxItem
          checked={analytics}
          onCheckedChange={setAnalytics}
        >
          Analytics
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette className="mr-2 h-4 w-4" />
            <span>Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <Sun className="mr-2 h-4 w-4" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Monitor className="mr-2 h-4 w-4" />
              System
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Globe className="mr-2 h-4 w-4" />
            <span>Language</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Español</DropdownMenuItem>
            <DropdownMenuItem>Français</DropdownMenuItem>
            <DropdownMenuItem>Deutsch</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          <Keyboard className="mr-2 h-4 w-4" />
          Keyboard shortcuts
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <Shield className="mr-2 h-4 w-4" />
          Privacy & Security
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}