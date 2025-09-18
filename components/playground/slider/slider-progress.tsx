"use client";

import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function SliderProgress() {
  const [progress, setProgress] = useState([0]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && progress[0] < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newValue = prev[0] + 1;
          if (newValue >= 100) {
            setIsPlaying(false);
            return [100];
          }
          return [newValue];
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setProgress([0]);
    setIsPlaying(false);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Media Player Progress</label>
        <Slider
          value={progress}
          onValueChange={setProgress}
          max={100}
          min={0}
          step={1}
          className="w-full"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handlePlayPause}
              disabled={progress[0] >= 100}
            >
              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </Button>
            <Button size="sm" variant="outline" onClick={handleReset}>
              <RotateCcw className="h-3 w-3" />
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">
            {Math.floor(progress[0] * 3.6 / 60)}:{String(Math.floor(progress[0] * 3.6 % 60)).padStart(2, '0')} / 6:00
          </span>
        </div>
      </div>
    </div>
  );
}