"use client"

import { useState } from "react"
import { Toggle } from "@/components/ui/toggle"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone,
  Volume2,
  VolumeX,
  Moon,
  Sun
} from "lucide-react"

export default function ToggleNotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    inAppNotifications: true,
    soundEnabled: true,
    darkMode: false,
    doNotDisturb: false,
    marketingEmails: false
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const notificationTypes = [
    {
      key: 'emailNotifications' as const,
      icon: Mail,
      title: 'Email Notifications',
      description: 'Receive notifications via email'
    },
    {
      key: 'pushNotifications' as const,
      icon: Bell,
      title: 'Push Notifications',
      description: 'Get push notifications on your device'
    },
    {
      key: 'smsNotifications' as const,
      icon: MessageSquare,
      title: 'SMS Notifications',
      description: 'Receive important updates via SMS'
    },
    {
      key: 'inAppNotifications' as const,
      icon: Smartphone,
      title: 'In-App Notifications',
      description: 'Show notifications within the app'
    }
  ]

  const preferences = [
    {
      key: 'soundEnabled' as const,
      icon: settings.soundEnabled ? Volume2 : VolumeX,
      title: 'Sound',
      description: 'Play sound for notifications'
    },
    {
      key: 'darkMode' as const,
      icon: settings.darkMode ? Moon : Sun,
      title: 'Dark Mode',
      description: 'Use dark theme for the interface'
    },
    {
      key: 'doNotDisturb' as const,
      icon: Bell,
      title: 'Do Not Disturb',
      description: 'Silence all notifications temporarily'
    },
    {
      key: 'marketingEmails' as const,
      icon: Mail,
      title: 'Marketing Emails',
      description: 'Receive promotional and marketing content'
    }
  ]

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Notification Settings</h2>
        <p className="text-muted-foreground">
          Customize how you receive notifications and updates
        </p>
      </div>

      {/* Notification Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Types
          </CardTitle>
          <CardDescription>
            Choose which types of notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notificationTypes.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <Toggle
                  pressed={settings[item.key]}
                  onPressedChange={() => handleToggle(item.key)}
                  aria-label={`Toggle ${item.title}`}
                />
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Separator />

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Additional settings to customize your experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {preferences.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <Toggle
                  pressed={settings[item.key]}
                  onPressedChange={() => handleToggle(item.key)}
                  variant={item.key === 'doNotDisturb' && settings[item.key] ? 'outline' : 'default'}
                  aria-label={`Toggle ${item.title}`}
                />
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Current Settings Summary</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• {Object.values(settings).filter(Boolean).length} out of {Object.keys(settings).length} settings enabled</p>
            {settings.doNotDisturb && (
              <p className="text-orange-600">• Do Not Disturb mode is active</p>
            )}
            {!settings.emailNotifications && !settings.pushNotifications && (
              <p className="text-red-600">• No notification methods enabled</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}