"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Wifi, Bluetooth, Volume2, Vibrate, Smartphone, Battery } from "lucide-react"

export default function SwitchDeviceSettings() {
  const [wifi, setWifi] = useState(true)
  const [bluetooth, setBluetooth] = useState(false)
  const [sound, setSound] = useState(true)
  const [vibration, setVibration] = useState(true)
  const [autoRotate, setAutoRotate] = useState(false)
  const [batterySaver, setBatterySaver] = useState(false)

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          Device Settings
        </CardTitle>
        <CardDescription>
          Configure your device connectivity and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="wifi" className="flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              Wi-Fi
            </Label>
            <p className="text-sm text-muted-foreground">
              {wifi ? "Connected to network" : "Disconnected"}
            </p>
          </div>
          <Switch
            id="wifi"
            checked={wifi}
            onCheckedChange={setWifi}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="bluetooth" className="flex items-center gap-2">
              <Bluetooth className="h-4 w-4" />
              Bluetooth
            </Label>
            <p className="text-sm text-muted-foreground">
              {bluetooth ? "Discoverable" : "Not discoverable"}
            </p>
          </div>
          <Switch
            id="bluetooth"
            checked={bluetooth}
            onCheckedChange={setBluetooth}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="sound" className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              Sound
            </Label>
            <p className="text-sm text-muted-foreground">
              Notification and media sounds
            </p>
          </div>
          <Switch
            id="sound"
            checked={sound}
            onCheckedChange={setSound}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="vibration" className="flex items-center gap-2">
              <Vibrate className="h-4 w-4" />
              Vibration
            </Label>
            <p className="text-sm text-muted-foreground">
              Haptic feedback for notifications
            </p>
          </div>
          <Switch
            id="vibration"
            checked={vibration}
            onCheckedChange={setVibration}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="auto-rotate" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Auto-rotate Screen
            </Label>
            <p className="text-sm text-muted-foreground">
              Automatically rotate screen orientation
            </p>
          </div>
          <Switch
            id="auto-rotate"
            checked={autoRotate}
            onCheckedChange={setAutoRotate}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="battery-saver" className="flex items-center gap-2">
              <Battery className="h-4 w-4" />
              Battery Saver
            </Label>
            <p className="text-sm text-muted-foreground">
              Reduce performance to save battery
            </p>
          </div>
          <Switch
            id="battery-saver"
            checked={batterySaver}
            onCheckedChange={setBatterySaver}
          />
        </div>
      </CardContent>
    </Card>
  )
}