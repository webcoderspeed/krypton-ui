"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, Type, MousePointer, Volume2, Contrast, ZoomIn } from "lucide-react"

export default function SwitchAccessibility() {
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [screenReader, setScreenReader] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [focusIndicator, setFocusIndicator] = useState(true)
  const [magnification, setMagnification] = useState(false)

  return (
    <Card className={`w-full max-w-lg transition-all ${highContrast ? 'bg-black text-white border-white' : ''}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Accessibility Settings
        </CardTitle>
        <CardDescription className={highContrast ? 'text-gray-300' : 'text-muted-foreground'}>
          Configure accessibility features for better usability
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="high-contrast" className="flex items-center gap-2">
              <Contrast className="h-4 w-4" />
              High Contrast Mode
            </Label>
            <p className={`text-sm ${highContrast ? 'text-gray-300' : 'text-muted-foreground'}`}>
              Increase contrast for better visibility
            </p>
          </div>
          <Switch
            id="high-contrast"
            checked={highContrast}
            onCheckedChange={setHighContrast}
          />
        </div>
        
        <Separator className={highContrast ? 'bg-gray-600' : ''} />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="large-text" className="flex items-center gap-2">
              <Type className={`h-4 w-4 ${largeText ? 'h-5 w-5' : ''}`} />
              Large Text
            </Label>
            <p className={`${largeText ? 'text-base' : 'text-sm'} ${highContrast ? 'text-gray-300' : 'text-muted-foreground'}`}>
              Increase text size for better readability
            </p>
          </div>
          <Switch
            id="large-text"
            checked={largeText}
            onCheckedChange={setLargeText}
          />
        </div>
        
        <Separator className={highContrast ? 'bg-gray-600' : ''} />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="screen-reader" className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              Screen Reader Support
            </Label>
            <p className={`text-sm ${highContrast ? 'text-gray-300' : 'text-muted-foreground'}`}>
              Enhanced support for screen reading software
            </p>
          </div>
          <Switch
            id="screen-reader"
            checked={screenReader}
            onCheckedChange={setScreenReader}
          />
        </div>
        
        <Separator className={highContrast ? 'bg-gray-600' : ''} />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="reduced-motion" className="flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              Reduced Motion
            </Label>
            <p className={`text-sm ${highContrast ? 'text-gray-300' : 'text-muted-foreground'}`}>
              Minimize animations and transitions
            </p>
          </div>
          <Switch
            id="reduced-motion"
            checked={reducedMotion}
            onCheckedChange={setReducedMotion}
          />
        </div>
        
        <Separator className={highContrast ? 'bg-gray-600' : ''} />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="focus-indicator" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Enhanced Focus Indicators
            </Label>
            <p className={`text-sm ${highContrast ? 'text-gray-300' : 'text-muted-foreground'}`}>
              Show clear focus outlines for keyboard navigation
            </p>
          </div>
          <Switch
            id="focus-indicator"
            checked={focusIndicator}
            onCheckedChange={setFocusIndicator}
            className={focusIndicator ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
          />
        </div>
        
        <Separator className={highContrast ? 'bg-gray-600' : ''} />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 flex-1">
            <Label htmlFor="magnification" className="flex items-center gap-2">
              <ZoomIn className="h-4 w-4" />
              Screen Magnification
            </Label>
            <p className={`text-sm ${highContrast ? 'text-gray-300' : 'text-muted-foreground'}`}>
              Enable zoom functionality for better visibility
            </p>
          </div>
          <Switch
            id="magnification"
            checked={magnification}
            onCheckedChange={setMagnification}
          />
        </div>
      </CardContent>
    </Card>
  )
}