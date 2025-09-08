"use client"

import { useState } from "react"
import { ChevronDown, Settings, Bell, Shield, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const settingsData = [
  {
    id: "general",
    title: "General Settings",
    icon: Settings,
    items: [
      { id: "auto-save", label: "Auto-save changes", defaultChecked: true },
      { id: "show-tips", label: "Show helpful tips", defaultChecked: false },
      { id: "compact-mode", label: "Compact mode", defaultChecked: false }
    ]
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    items: [
      { id: "email-notifications", label: "Email notifications", defaultChecked: true },
      { id: "push-notifications", label: "Push notifications", defaultChecked: true },
      { id: "marketing-emails", label: "Marketing emails", defaultChecked: false }
    ]
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    icon: Shield,
    items: [
      { id: "two-factor", label: "Two-factor authentication", defaultChecked: false },
      { id: "data-sharing", label: "Allow data sharing", defaultChecked: false },
      { id: "analytics", label: "Usage analytics", defaultChecked: true }
    ]
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: Palette,
    items: [
      { id: "dark-mode", label: "Dark mode", defaultChecked: false },
      { id: "high-contrast", label: "High contrast", defaultChecked: false },
      { id: "animations", label: "Enable animations", defaultChecked: true }
    ]
  }
]

export function CollapsibleAnimated() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    general: true
  })
  const [settings, setSettings] = useState<Record<string, boolean>>(
    settingsData.reduce((acc, section) => {
      section.items.forEach(item => {
        acc[item.id] = item.defaultChecked
      })
      return acc
    }, {} as Record<string, boolean>)
  )

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const toggleSetting = (settingId: string) => {
    setSettings(prev => ({
      ...prev,
      [settingId]: !prev[settingId]
    }))
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Animated Settings</CardTitle>
        <CardDescription>
          Settings panel with smooth collapsible animations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {settingsData.map((section) => {
            const Icon = section.icon
            const isOpen = openSections[section.id] || false
            
            return (
              <Collapsible
                key={section.id}
                open={isOpen}
                onOpenChange={() => toggleSection(section.id)}
              >
                <div className="rounded-lg border bg-card">
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-4 hover:bg-accent/50 transition-all duration-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-md transition-colors duration-200 ${
                        isOpen ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{section.title}</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-all duration-300 ease-in-out ${
                        isOpen ? "rotate-180 text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
                    <div className="px-4 pb-4 space-y-3 border-t bg-muted/20">
                      {section.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-2">
                          <Label 
                            htmlFor={item.id} 
                            className="text-sm font-normal cursor-pointer"
                          >
                            {item.label}
                          </Label>
                          <Switch
                            id={item.id}
                            checked={settings[item.id] || false}
                            onCheckedChange={() => toggleSetting(item.id)}
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}