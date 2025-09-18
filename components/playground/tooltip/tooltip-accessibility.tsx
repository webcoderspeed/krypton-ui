"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  Volume2, 
  VolumeX, 
  Type, 
  Contrast, 
  Eye,
  EyeOff,
  Keyboard,
  MousePointer
} from "lucide-react"

export default function TooltipAccessibility() {
  return (
    <div className="flex items-center justify-center p-8">
      <TooltipProvider>
        <div className="space-y-8 w-full max-w-2xl">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Accessibility Features</h3>
            <p className="text-sm text-muted-foreground">
              Tooltips with keyboard navigation and screen reader support
            </p>
          </div>

          {/* Accessibility Controls */}
          <div className="space-y-4">
            <h4 className="font-medium">Accessibility Controls</h4>
            <div className="grid grid-cols-2 gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="justify-start gap-2">
                    <Volume2 className="h-4 w-4" />
                    Audio Descriptions
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Audio Descriptions</p>
                    <p className="text-sm">Enable spoken descriptions of visual content</p>
                    <p className="text-xs text-muted-foreground">
                      Keyboard shortcut: Alt + A
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="justify-start gap-2">
                    <Type className="h-4 w-4" />
                    Large Text
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Large Text Mode</p>
                    <p className="text-sm">Increase text size for better readability</p>
                    <p className="text-xs text-muted-foreground">
                      Current size: 16px → 20px
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="justify-start gap-2">
                    <Contrast className="h-4 w-4" />
                    High Contrast
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">High Contrast Mode</p>
                    <p className="text-sm">Enhance color contrast for better visibility</p>
                    <p className="text-xs text-muted-foreground">
                      Meets WCAG AAA standards
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="justify-start gap-2">
                    <Keyboard className="h-4 w-4" />
                    Keyboard Navigation
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Keyboard Navigation</p>
                    <p className="text-sm">Navigate using only keyboard</p>
                    <p className="text-xs text-muted-foreground">
                      Tab to focus, Enter to activate
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Screen Reader Optimized */}
          <div className="space-y-4">
            <h4 className="font-medium">Screen Reader Optimized</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      aria-label="Toggle audio playback"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle audio playback (Currently playing)</p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-sm">Audio is currently playing</span>
              </div>

              <div className="flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      aria-label="Show password"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Show password (Currently hidden)</p>
                  </TooltipContent>
                </Tooltip>
                <Input 
                  type="password" 
                  placeholder="Enter password"
                  aria-describedby="password-help"
                />
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="space-y-4">
            <h4 className="font-medium">Keyboard Shortcuts</h4>
            <div className="grid grid-cols-1 gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-between p-3 border rounded-lg cursor-help hover:bg-muted/50">
                    <span className="text-sm">Save Document</span>
                    <kbd className="px-2 py-1 text-xs bg-muted rounded">Ctrl + S</kbd>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Save Document</p>
                    <p className="text-sm">Save the current document to disk</p>
                    <p className="text-xs text-muted-foreground">
                      Also available in File menu
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-between p-3 border rounded-lg cursor-help hover:bg-muted/50">
                    <span className="text-sm">Open Search</span>
                    <kbd className="px-2 py-1 text-xs bg-muted rounded">Ctrl + K</kbd>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Open Search</p>
                    <p className="text-sm">Open the global search dialog</p>
                    <p className="text-xs text-muted-foreground">
                      Search across all content and commands
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-between p-3 border rounded-lg cursor-help hover:bg-muted/50">
                    <span className="text-sm">Toggle Theme</span>
                    <kbd className="px-2 py-1 text-xs bg-muted rounded">Ctrl + Shift + T</kbd>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Toggle Theme</p>
                    <p className="text-sm">Switch between light and dark mode</p>
                    <p className="text-xs text-muted-foreground">
                      Respects system preference by default
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Focus Management */}
          <div className="space-y-4">
            <h4 className="font-medium">Focus Management</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>• Use Tab to navigate between interactive elements</p>
              <p>• Use Shift + Tab to navigate backwards</p>
              <p>• Use Enter or Space to activate buttons</p>
              <p>• Use Escape to close tooltips and dialogs</p>
              <p>• Focus indicators are clearly visible</p>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  )
}