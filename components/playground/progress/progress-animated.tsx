"use client";

import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export function ProgressAnimated() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsRunning(false);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
    }

    return () => clearInterval(interval);
  }, [isRunning, progress]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setProgress(0);
    setIsRunning(false);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Animated Progress</h4>
        <Progress value={progress} className="w-full" />
        <p className="text-xs text-muted-foreground">{progress}% complete</p>
      </div>
      
      <div className="flex gap-2">
        <Button 
          onClick={handleStart} 
          disabled={isRunning || progress === 100}
          size="sm"
        >
          Start
        </Button>
        <Button 
          onClick={handlePause} 
          disabled={!isRunning}
          variant="outline"
          size="sm"
        >
          Pause
        </Button>
        <Button 
          onClick={handleReset}
          variant="outline"
          size="sm"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}