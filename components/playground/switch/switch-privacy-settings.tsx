"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Shield, Eye, Users, Bell } from "lucide-react"

export default function SwitchPrivacySettings() {
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [activityStatus, setActivityStatus] = useState(false)
  const [dataSharing, setDataSharing] = useState(false)
  const [readReceipts, setReadReceipts] = useState(true)

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Privacy Settings
        </CardTitle>
        <CardDescription>
          Control your privacy and data sharing preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="profile-visibility" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Profile Visibility
            </Label>
            <p className="text-sm text-muted-foreground">
              Allow others to see your profile information
            </p>
          </div>
          <Switch
            id="profile-visibility"
            checked={profileVisibility}
            onCheckedChange={setProfileVisibility}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="activity-status" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Activity Status
            </Label>
            <p className="text-sm text-muted-foreground">
              Show when you&apos;re online or active
            </p>
          </div>
          <Switch
            id="activity-status"
            checked={activityStatus}
            onCheckedChange={setActivityStatus}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="data-sharing" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Data Sharing
            </Label>
            <p className="text-sm text-muted-foreground">
              Share usage data to improve our services
            </p>
          </div>
          <Switch
            id="data-sharing"
            checked={dataSharing}
            onCheckedChange={setDataSharing}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="read-receipts" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Read Receipts
            </Label>
            <p className="text-sm text-muted-foreground">
              Let others know when you&apos;ve read their messages
            </p>
          </div>
          <Switch
            id="read-receipts"
            checked={readReceipts}
            onCheckedChange={setReadReceipts}
          />
        </div>
      </CardContent>
    </Card>
  )
}