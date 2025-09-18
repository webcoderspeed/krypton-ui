"use client";

import { Slider } from "@/components/ui/slider";

export default function SliderDisabled() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Disabled Slider</label>
        <Slider
          value={[60]}
          max={100}
          min={0}
          step={1}
          disabled
          className="w-full"
        />
        <p className="text-sm text-muted-foreground">Value: 60 (disabled)</p>
      </div>
    </div>
  );
}