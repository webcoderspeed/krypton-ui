"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HoverCardPositions() {
  const positions = [
    { side: "top", label: "Top" },
    { side: "bottom", label: "Bottom" },
    { side: "left", label: "Left" },
    { side: "right", label: "Right" },
  ] as const;

  return (
    <div className="flex flex-wrap gap-8 justify-center p-8">
      {positions.map((position) => (
        <HoverCard key={position.side}>
          <HoverCardTrigger asChild>
            <Button variant="outline">{position.label}</Button>
          </HoverCardTrigger>
          <HoverCardContent side={position.side} className="w-64">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{position.side}</Badge>
                <span className="text-sm font-medium">Position Demo</span>
              </div>
              <p className="text-sm text-muted-foreground">
                This hover card appears on the {position.side} side of the trigger element.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}