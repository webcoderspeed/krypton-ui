"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputDefault() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
    </div>
  );
}