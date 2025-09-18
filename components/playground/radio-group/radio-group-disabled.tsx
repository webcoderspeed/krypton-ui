"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function RadioGroupDisabled() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Disabled Radio Group</h3>
        <RadioGroup defaultValue="option-two" disabled className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="disabled-one" />
            <Label htmlFor="disabled-one">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="disabled-two" />
            <Label htmlFor="disabled-two">Option Two (Selected)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-three" id="disabled-three" />
            <Label htmlFor="disabled-three">Option Three</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Individual Disabled Items</h3>
        <RadioGroup defaultValue="enabled-two" className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="enabled-one" id="enabled-one" />
            <Label htmlFor="enabled-one">Enabled Option</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="enabled-two" id="enabled-two" />
            <Label htmlFor="enabled-two">Enabled Option (Selected)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="disabled-item" id="disabled-item" disabled />
            <Label htmlFor="disabled-item" className="text-muted-foreground">
              Disabled Option
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}