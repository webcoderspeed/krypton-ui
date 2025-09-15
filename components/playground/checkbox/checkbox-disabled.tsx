"use client";

import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxDisabled() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="disabled" disabled />
          <label
            htmlFor="disabled"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Disabled checkbox
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="disabled-checked" disabled checked />
          <label
            htmlFor="disabled-checked"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Disabled and checked
          </label>
        </div>
      </div>
    </div>
  );
}