"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export default function HoverCardDelays() {
  const delays = [
    { openDelay: 0, closeDelay: 0, label: "No Delay" },
    { openDelay: 300, closeDelay: 150, label: "Fast" },
    { openDelay: 700, closeDelay: 300, label: "Normal" },
    { openDelay: 1000, closeDelay: 500, label: "Slow" },
  ];

  return (
    <div className="flex flex-wrap gap-6 justify-center p-8">
      {delays.map((delay, index) => (
        <HoverCard 
          key={index}
          openDelay={delay.openDelay}
          closeDelay={delay.closeDelay}
        >
          <HoverCardTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {delay.label}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-72">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{delay.label}</Badge>
                <span className="text-sm font-medium">Timing Demo</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Open delay: {delay.openDelay}ms</p>
                <p>Close delay: {delay.closeDelay}ms</p>
                <p className="text-xs">
                  Hover over the trigger to see the timing in action.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}