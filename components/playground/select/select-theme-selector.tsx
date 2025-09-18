"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Moon, Monitor, Palette } from "lucide-react"

const themes = [
  {
    value: "light",
    name: "Light",
    description: "Clean and bright interface",
    icon: Sun,
    preview: "bg-white border-gray-200",
    textColor: "text-gray-900"
  },
  {
    value: "dark",
    name: "Dark",
    description: "Easy on the eyes in low light",
    icon: Moon,
    preview: "bg-gray-900 border-gray-700",
    textColor: "text-white"
  },
  {
    value: "system",
    name: "System",
    description: "Follows your system preference",
    icon: Monitor,
    preview: "bg-gradient-to-r from-white to-gray-900 border-gray-400",
    textColor: "text-gray-700"
  },
  {
    value: "auto",
    name: "Auto",
    description: "Changes based on time of day",
    icon: Palette,
    preview: "bg-gradient-to-r from-orange-200 to-blue-900 border-orange-400",
    textColor: "text-gray-800"
  }
]

export default function SelectThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState<string>("system")
  
  const getThemeInfo = (value: string) => {
    return themes.find(theme => theme.value === value)
  }

  return (
    <div className="w-[400px]">
      <Card>
        <CardHeader>
          <CardTitle>Theme Preferences</CardTitle>
          <CardDescription>
            Choose your preferred color scheme for the application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedTheme} onValueChange={setSelectedTheme}>
            <SelectTrigger>
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              {themes.map((theme) => {
                const IconComponent = theme.icon
                return (
                  <SelectItem key={theme.value} value={theme.value}>
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-4 w-4" />
                      <div className="flex flex-col">
                        <span className="font-medium">{theme.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {theme.description}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          
          {selectedTheme && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-3">Theme Preview</h4>
                <div className="space-y-3">
                  {(() => {
                    const themeInfo = getThemeInfo(selectedTheme)
                    if (!themeInfo) return null
                    const IconComponent = themeInfo.icon
                    
                    return (
                      <>
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5" />
                          <div>
                            <p className="font-medium">{themeInfo.name} Theme</p>
                            <p className="text-sm text-muted-foreground">
                              {themeInfo.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-lg border-2 ${themeInfo.preview}`}>
                          <div className={`${themeInfo.textColor} space-y-2`}>
                            <div className="font-semibold">Sample Interface</div>
                            <div className="text-sm opacity-80">
                              This is how your interface will look with the {themeInfo.name.toLowerCase()} theme.
                            </div>
                            <div className="flex gap-2 mt-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full opacity-60"></div>
                              <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-60"></div>
                              <div className="w-3 h-3 bg-green-500 rounded-full opacity-60"></div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  💡 Theme changes are applied instantly and saved to your preferences.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}