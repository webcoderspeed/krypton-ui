"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Moon, Monitor, Palette } from "lucide-react";

export default function RadioGroupTheme() {
  const [theme, setTheme] = useState("system");
  const [accentColor, setAccentColor] = useState("blue");

  const themeOptions = [
    {
      value: "light",
      label: "Light Mode",
      description: "Clean and bright interface",
      icon: Sun,
      preview: "bg-white border-gray-200"
    },
    {
      value: "dark",
      label: "Dark Mode",
      description: "Easy on the eyes in low light",
      icon: Moon,
      preview: "bg-gray-900 border-gray-700"
    },
    {
      value: "system",
      label: "System Default",
      description: "Follows your device settings",
      icon: Monitor,
      preview: "bg-gradient-to-r from-white to-gray-900 border-gray-400"
    }
  ];

  const accentColors = [
    { value: "blue", label: "Blue", color: "bg-blue-500" },
    { value: "green", label: "Green", color: "bg-green-500" },
    { value: "purple", label: "Purple", color: "bg-purple-500" },
    { value: "orange", label: "Orange", color: "bg-orange-500" },
    { value: "red", label: "Red", color: "bg-red-500" },
    { value: "pink", label: "Pink", color: "bg-pink-500" }
  ];

  return (
    <div className="space-y-6 w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Theme</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Choose your preferred interface theme
              </p>
            </div>
            <RadioGroup value={theme} onValueChange={setTheme} className="space-y-3">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div key={option.value} className="relative">
                    <div className="flex items-center space-x-4 rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value={option.value} id={`theme-${option.value}`} />
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`w-12 h-8 rounded border-2 ${option.preview}`} />
                        <div className="flex items-center space-x-3 flex-1">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <Label htmlFor={`theme-${option.value}`} className="cursor-pointer">
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-muted-foreground">{option.description}</div>
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Accent Color</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Choose your preferred accent color
              </p>
            </div>
            <RadioGroup value={accentColor} onValueChange={setAccentColor} className="grid grid-cols-2 gap-3">
              {accentColors.map((color) => (
                <div key={color.value} className="relative">
                  <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value={color.value} id={`color-${color.value}`} />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`w-4 h-4 rounded-full ${color.color}`} />
                      <Label htmlFor={`color-${color.value}`} className="cursor-pointer font-medium">
                        {color.label}
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Preview</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Theme:</span> {themeOptions.find(t => t.value === theme)?.label}</p>
              <p><span className="font-medium">Accent Color:</span> {accentColors.find(c => c.value === accentColor)?.label}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}