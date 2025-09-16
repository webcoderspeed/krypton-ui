"use client";

import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxWithText() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Checkbox id="marketing" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="marketing"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Marketing emails
            </label>
            <p className="text-xs text-muted-foreground">
              Receive emails about new products, features, and more.
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="security" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="security"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Security updates
            </label>
            <p className="text-xs text-muted-foreground">
              Get notified when there are important security updates.
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="newsletter" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="newsletter"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Weekly newsletter
            </label>
            <p className="text-xs text-muted-foreground">
              Subscribe to our weekly newsletter for tips and updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}