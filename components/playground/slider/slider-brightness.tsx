"use client";

import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function SliderBrightness() {
  const [brightness, setBrightness] = useState([70]);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Screen Brightness</label>
        <div className="flex items-center space-x-3">
          <Moon className="h-4 w-4 text-muted-foreground" />
          <Slider
            value={brightness}
            onValueChange={setBrightness}
            max={100}
            min={0}
            step={5}
            className="flex-1"
          />
          <Sun className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-center">
          <span className="text-sm text-muted-foreground">{brightness[0]}%</span>
        </div>
        <div 
          className="h-16 rounded-lg border transition-all duration-200"
          style={{ 
            backgroundColor: `hsl(0, 0%, ${brightness[0]}%)`,
            opacity: 0.8 
          }}
        />
      </div>
    </div>
  );
}