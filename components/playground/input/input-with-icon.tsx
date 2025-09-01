"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

interface InputWithIconPlaygroundProps {
  className?: string;
}

export function InputWithIconPlayground({ className }: InputWithIconPlaygroundProps) {
  const [type, setType] = useState<"text" | "email" | "password" | "search">("text");
  const [disabled, setDisabled] = useState(false);
  const [placeholder, setPlaceholder] = useState("Enter text...");
  const [value, setValue] = useState("");
  const [iconPosition, setIconPosition] = useState<"left" | "right">("left");
  const [showPassword, setShowPassword] = useState(false);

  const getIcon = () => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "password":
        return <Lock className="h-4 w-4" />;
      case "search":
        return <Search className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getPasswordToggleIcon = () => {
    return showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />;
  };

  return (
    <div className={`space-y-6 p-6 border rounded-lg ${className}`}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Input with Icon Playground</h3>
        
        {/* Controls */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as "text" | "email" | "password" | "search")}
              className="w-full p-2 border rounded"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
              <option value="search">Search</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Icon Position</label>
            <select 
              value={iconPosition} 
              onChange={(e) => setIconPosition(e.target.value as "left" | "right")}
              className="w-full p-2 border rounded"
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Placeholder</label>
            <input 
              type="text" 
              value={placeholder} 
              onChange={(e) => setPlaceholder(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={disabled} 
              onChange={(e) => setDisabled(e.target.checked)}
              id="disabled"
            />
            <label htmlFor="disabled" className="text-sm font-medium">Disabled</label>
          </div>
        </div>
        
        {/* Preview */}
        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="max-w-md relative">
            {iconPosition === "left" && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                {getIcon()}
              </div>
            )}
            <Input
              type={type === "password" && showPassword ? "text" : type}
              disabled={disabled}
              placeholder={placeholder}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
              className={`${
                iconPosition === "left" ? "pl-10" : ""
              } ${
                iconPosition === "right" || type === "password" ? "pr-10" : ""
              }`}
            />
            {iconPosition === "right" && type !== "password" && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                {getIcon()}
              </div>
            )}
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {getPasswordToggleIcon()}
              </button>
            )}
          </div>
        </div>
        
        {/* Code */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Generated Code</label>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
            <code>{`<div className="relative">
  ${iconPosition === "left" ? `<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
    ${type === "email" ? "<Mail className=\"h-4 w-4\" />" : 
      type === "password" ? "<Lock className=\"h-4 w-4\" />" : 
      type === "search" ? "<Search className=\"h-4 w-4\" />" : 
      "<User className=\"h-4 w-4\" />"}
  </div>` : ""}
  <Input
    type="${type === "password" ? "password" : type}"
    ${disabled ? 'disabled' : ''}
    placeholder="${placeholder}"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="${iconPosition === "left" ? "pl-10" : ""}${iconPosition === "right" || type === "password" ? " pr-10" : ""}"
  />
  ${iconPosition === "right" && type !== "password" ? `<div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
    ${type === "email" ? "<Mail className=\"h-4 w-4\" />" : 
      type === "search" ? "<Search className=\"h-4 w-4\" />" : 
      "<User className=\"h-4 w-4\" />"}
  </div>` : ""}
  ${type === "password" ? `<button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
  >
    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
  </button>` : ""}
</div>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}