"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";

export function ProgressColors() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default (Primary)</h4>
        <Progress value={60} className="w-full" />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Success (Green)</h4>
        <Progress 
          value={80} 
          className="w-full [&>div]:bg-green-500" 
        />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Warning (Yellow)</h4>
        <Progress 
          value={45} 
          className="w-full [&>div]:bg-yellow-500" 
        />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Danger (Red)</h4>
        <Progress 
          value={25} 
          className="w-full [&>div]:bg-red-500" 
        />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Info (Blue)</h4>
        <Progress 
          value={70} 
          className="w-full [&>div]:bg-blue-500" 
        />
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Purple Gradient</h4>
        <Progress 
          value={85} 
          className="w-full [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-pink-500" 
        />
      </div>
    </div>
  );
}