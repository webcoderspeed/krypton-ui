"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Moon, Sun } from "lucide-react"

export default function SwitchThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <Card className={`w-full max-w-md transition-colors ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white'}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          Theme Settings
        </CardTitle>
        <CardDescription className={isDarkMode ? 'text-slate-300' : 'text-muted-foreground'}>
          Switch between light and dark mode
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="theme-toggle" className="flex items-center gap-2">
              Dark Mode
            </Label>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-muted-foreground'}`}>
              {isDarkMode ? 'Dark theme is active' : 'Light theme is active'}
            </p>
          </div>
          <Switch
            id="theme-toggle"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
          />
        </div>
      </CardContent>
    </Card>
  )
}