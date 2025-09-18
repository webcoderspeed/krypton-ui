"use client";

import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function SliderDefault() {
  const [value, setValue] = useState([50]);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Default Slider</label>
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          min={0}
          step={1}
          className="w-full"
        />
        <p className="text-sm text-muted-foreground">Value: {value[0]}</p>
      </div>
    </div>
  );
}