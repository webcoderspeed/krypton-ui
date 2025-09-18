"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function RadioGroupControlled() {
  const [value, setValue] = useState("medium");

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Controlled Radio Group</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Selected value: <span className="font-mono bg-muted px-1 rounded">{value}</span>
        </p>
        <RadioGroup value={value} onValueChange={setValue} className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="small" id="size-small" />
            <Label htmlFor="size-small">Small</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="size-medium" />
            <Label htmlFor="size-medium">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="large" id="size-large" />
            <Label htmlFor="size-large">Large</Label>
          </div>
        </RadioGroup>
        <div className="mt-4 space-x-2">
          <Button variant="outline" size="sm" onClick={() => setValue("small")}>
            Set Small
          </Button>
          <Button variant="outline" size="sm" onClick={() => setValue("medium")}>
            Set Medium
          </Button>
          <Button variant="outline" size="sm" onClick={() => setValue("large")}>
            Set Large
          </Button>
        </div>
      </div>
    </div>
  );
}