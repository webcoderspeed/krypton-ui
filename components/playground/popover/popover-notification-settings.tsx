"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Bell, Settings } from "lucide-react"
import { useState } from "react"

export default function PopoverNotificationSettings() {
  const [settings, setSettings] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: true,
    security: true,
  })

  const updateSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Notification Settings
            </h4>
            <p className="text-sm text-muted-foreground">
              Manage how you receive notifications.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email" className="text-sm font-normal">
                Email notifications
              </Label>
              <Switch
                id="email"
                checked={settings.email}
                onCheckedChange={() => updateSetting('email')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push" className="text-sm font-normal">
                Push notifications
              </Label>
              <Switch
                id="push"
                checked={settings.push}
                onCheckedChange={() => updateSetting('push')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms" className="text-sm font-normal">
                SMS notifications
              </Label>
              <Switch
                id="sms"
                checked={settings.sms}
                onCheckedChange={() => updateSetting('sms')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="marketing" className="text-sm font-normal">
                Marketing emails
              </Label>
              <Switch
                id="marketing"
                checked={settings.marketing}
                onCheckedChange={() => updateSetting('marketing')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="security" className="text-sm font-normal">
                Security alerts
              </Label>
              <Switch
                id="security"
                checked={settings.security}
                onCheckedChange={() => updateSetting('security')}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">Reset</Button>
            <Button size="sm">Save</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}