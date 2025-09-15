"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Search, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function InputWithIcons() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email-icon">Email with Icon</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email-icon"
              type="email"
              placeholder="Email"
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="search-icon">Search with Icon</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-icon"
              type="search"
              placeholder="Search..."
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password-icon">Password with Toggle</Label>
          <div className="relative">
            <Input
              id="password-icon"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}