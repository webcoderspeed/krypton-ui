"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputDisabled() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <Label htmlFor="disabled">Disabled Input</Label>
          <Input disabled type="email" id="disabled" placeholder="Email" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="disabled-value">Disabled with Value</Label>
          <Input 
            disabled 
            type="email" 
            id="disabled-value" 
            value="john@example.com" 
            readOnly
          />
        </div>
      </div>
    </div>
  );
}