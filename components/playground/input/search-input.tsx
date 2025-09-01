"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchInputPlaygroundProps {
  className?: string;
}

export function SearchInputPlayground({ className }: SearchInputPlaygroundProps) {
  const [value, setValue] = useState("");
  const [placeholder, setPlaceholder] = useState("Search...");
  const [disabled, setDisabled] = useState(false);
  const [showClearButton, setShowClearButton] = useState(true);
  const [size, setSize] = useState<"default" | "sm" | "lg">("default");

  const handleClear = () => {
    setValue("");
  };

  const handleSearch = () => {
    console.log("Searching for:", value);
  };

  return (
    <div className={`space-y-6 p-6 border rounded-lg ${className}`}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Search Input Playground</h3>
        
        {/* Controls */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <select 
              value={size} 
              onChange={(e) => setSize(e.target.value as "default" | "sm" | "lg")}
              className="w-full p-2 border rounded"
            >
              <option value="default">Default</option>
              <option value="sm">Small</option>
              <option value="lg">Large</option>
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
          
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={showClearButton} 
              onChange={(e) => setShowClearButton(e.target.checked)}
              id="showClear"
            />
            <label htmlFor="showClear" className="text-sm font-medium">Show Clear Button</label>
          </div>
        </div>
        
        {/* Preview */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Preview</label>
          <div className="max-w-md">
            <div className="relative flex items-center">
              <div className="absolute left-3 text-muted-foreground">
                <Search className={`${size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4"}`} />
              </div>
              <Input
                type="search"
                disabled={disabled}
                placeholder={placeholder}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                className={`pl-10 ${showClearButton && value ? "pr-20" : "pr-4"} ${
                  size === "sm" ? "h-8 text-xs" : 
                  size === "lg" ? "h-12 text-base" : ""
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              {showClearButton && value && (
                <div className="absolute right-2 flex items-center space-x-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size={size === "sm" ? "sm" : "sm"}
                    onClick={handleClear}
                    className="h-6 w-6 p-0 hover:bg-muted"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Code */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Generated Code</label>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
            <code>{`<div className="relative flex items-center">
  <div className="absolute left-3 text-muted-foreground">
    <Search className="${size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4"}" />
  </div>
  <Input
    type="search"
    ${disabled ? 'disabled' : ''}
    placeholder="${placeholder}"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="pl-10${showClearButton ? " pr-20" : " pr-4"}${size === "sm" ? " h-8 text-xs" : size === "lg" ? " h-12 text-base" : ""}"
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    }}
  />${showClearButton ? `
  {value && (
    <div className="absolute right-2 flex items-center space-x-1">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleClear}
        className="h-6 w-6 p-0 hover:bg-muted"
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  )}` : ""}
</div>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}