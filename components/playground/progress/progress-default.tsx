"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";

export function ProgressDefault() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default Progress</h4>
        <Progress value={33} className="w-full" />
        <p className="text-xs text-muted-foreground">33% complete</p>
      </div>
    </div>
  );
}