"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SwitchWithForm() {
  const [notifications, setNotifications] = useState(true)
  const [marketing, setMarketing] = useState(false)
  const [analytics, setAnalytics] = useState(true)

  const handleSubmit = () => {
    console.log({
      notifications,
      marketing,
      analytics
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>
          Configure your notification settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifications">Push Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications about updates
            </p>
          </div>
          <Switch
            id="notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="marketing">Marketing Emails</Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about new features
            </p>
          </div>
          <Switch
            id="marketing"
            checked={marketing}
            onCheckedChange={setMarketing}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="analytics">Analytics</Label>
            <p className="text-sm text-muted-foreground">
              Help us improve our service
            </p>
          </div>
          <Switch
            id="analytics"
            checked={analytics}
            onCheckedChange={setAnalytics}
          />
        </div>
        
        <Button onClick={handleSubmit} className="w-full">
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  )
}