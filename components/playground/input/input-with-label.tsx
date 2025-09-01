"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputWithLabelPlaygroundProps {
  className?: string;
}

export function InputWithLabelPlayground({ className }: InputWithLabelPlaygroundProps) {
  const [type, setType] = useState<"text" | "email" | "password" | "number">("text");
  const [disabled, setDisabled] = useState(false);
  const [placeholder, setPlaceholder] = useState("Enter text...");
  const [value, setValue] = useState("");
  const [required, setRequired] = useState(false);
  const [labelText, setLabelText] = useState("Label");
  const [helperText, setHelperText] = useState("This is a helper text");
  const [showHelper, setShowHelper] = useState(true);

  return (
    <div className={`space-y-6 p-6 border rounded-lg ${className}`}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Input with Label Playground</h3>
        
        {/* Controls */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as "text" | "email" | "password" | "number")}
              className="w-full p-2 border rounded"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
              <option value="number">Number</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Label Text</label>
            <input 
              type="text" 
              value={labelText} 
              onChange={(e) => setLabelText(e.target.value)}
              className="w-full p-2 border rounded"
            />
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
          
          <div>
            <label className="block text-sm font-medium mb-2">Helper Text</label>
            <input 
              type="text" 
              value={helperText} 
              onChange={(e) => setHelperText(e.target.value)}
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
              checked={required} 
              onChange={(e) => setRequired(e.target.checked)}
              id="required"
            />
            <label htmlFor="required" className="text-sm font-medium">Required</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={showHelper} 
              onChange={(e) => setShowHelper(e.target.checked)}
              id="showHelper"
            />
            <label htmlFor="showHelper" className="text-sm font-medium">Show Helper</label>
          </div>
        </div>
        
        {/* Preview */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Preview</label>
          <div className="max-w-md space-y-2">
            <Label htmlFor="preview-input">
              {labelText}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id="preview-input"
              type={type}
              disabled={disabled}
              placeholder={placeholder}
              value={value}
              required={required}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            />
            {showHelper && (
              <p className="text-sm text-muted-foreground">{helperText}</p>
            )}
          </div>
        </div>
        
        {/* Code */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Generated Code</label>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
            <code>{`<div className="space-y-2">
  <Label htmlFor="input-id">
    ${labelText}${required ? '\n    <span className="text-red-500 ml-1">*</span>' : ''}
  </Label>
  <Input
    id="input-id"
    type="${type}"
    ${disabled ? 'disabled' : ''}
    ${required ? 'required' : ''}
    placeholder="${placeholder}"
    value={value}
    onChange={(e) => setValue(e.target.value)}
  />${showHelper ? `\n  <p className="text-sm text-muted-foreground">${helperText}</p>` : ''}
</div>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}