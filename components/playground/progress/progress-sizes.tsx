"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";

export function ProgressSizes() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Small Progress</h4>
        <Progress value={25} className="w-full h-2" />
        <p className="text-xs text-muted-foreground">25% complete</p>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default Progress</h4>
        <Progress value={50} className="w-full h-4" />
        <p className="text-xs text-muted-foreground">50% complete</p>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Large Progress</h4>
        <Progress value={75} className="w-full h-6" />
        <p className="text-xs text-muted-foreground">75% complete</p>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Extra Large Progress</h4>
        <Progress value={90} className="w-full h-8" />
        <p className="text-xs text-muted-foreground">90% complete</p>
      </div>
    </div>
  );
}