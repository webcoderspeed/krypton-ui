"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Zap, Sparkles, Rocket, TestTube } from "lucide-react"

export default function SwitchFeatureFlags() {
  const [betaFeatures, setBetaFeatures] = useState(false)
  const [experimentalUI, setExperimentalUI] = useState(false)
  const [advancedMode, setAdvancedMode] = useState(true)
  const [debugMode, setDebugMode] = useState(false)

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Feature Flags
        </CardTitle>
        <CardDescription>
          Enable experimental features and advanced settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="beta-features" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Beta Features
              <Badge variant="secondary" className="text-xs">Beta</Badge>
            </Label>
            <p className="text-sm text-muted-foreground">
              Access to new features before they&apos;re released
            </p>
          </div>
          <Switch
            id="beta-features"
            checked={betaFeatures}
            onCheckedChange={setBetaFeatures}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="experimental-ui" className="flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              Experimental UI
              <Badge variant="destructive" className="text-xs">Experimental</Badge>
            </Label>
            <p className="text-sm text-muted-foreground">
              Try out new interface designs and layouts
            </p>
          </div>
          <Switch
            id="experimental-ui"
            checked={experimentalUI}
            onCheckedChange={setExperimentalUI}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="advanced-mode" className="flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              Advanced Mode
              <Badge variant="outline" className="text-xs">Pro</Badge>
            </Label>
            <p className="text-sm text-muted-foreground">
              Show advanced options and detailed controls
            </p>
          </div>
          <Switch
            id="advanced-mode"
            checked={advancedMode}
            onCheckedChange={setAdvancedMode}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="debug-mode" className="flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              Debug Mode
              <Badge variant="secondary" className="text-xs">Dev</Badge>
            </Label>
            <p className="text-sm text-muted-foreground">
              Show debugging information and logs
            </p>
          </div>
          <Switch
            id="debug-mode"
            checked={debugMode}
            onCheckedChange={setDebugMode}
          />
        </div>
      </CardContent>
    </Card>
  )
}