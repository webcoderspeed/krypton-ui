"use client";

import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Volume2, VolumeX, Volume1 } from "lucide-react";

export default function SliderVolume() {
  const [volume, setVolume] = useState([75]);

  const getVolumeIcon = () => {
    if (volume[0] === 0) return <VolumeX className="h-4 w-4" />;
    if (volume[0] < 50) return <Volume1 className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Volume Control</label>
        <div className="flex items-center space-x-3">
          {getVolumeIcon()}
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            min={0}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground w-8">{volume[0]}%</span>
        </div>
      </div>
    </div>
  );
}