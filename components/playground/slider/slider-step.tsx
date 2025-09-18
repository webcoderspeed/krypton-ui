"use client";

import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function SliderStep() {
  const [value, setValue] = useState([25]);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Step Slider (Step: 25)</label>
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          min={0}
          step={25}
          className="w-full"
        />
        <p className="text-sm text-muted-foreground">Value: {value[0]}</p>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
}