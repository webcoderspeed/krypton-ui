"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface InputPlaygroundProps {
  className?: string;
}

export function InputPlayground({ className }: InputPlaygroundProps) {
  const [type, setType] = useState<"text" | "email" | "password" | "number">("text");
  const [disabled, setDisabled] = useState(false);
  const [placeholder, setPlaceholder] = useState("Enter text...");
  const [value, setValue] = useState("");
  const [required, setRequired] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

  return (
    <div className={`space-y-6 p-6 border rounded-lg ${className}`}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Input Playground</h3>
        
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
              checked={required} 
              onChange={(e) => setRequired(e.target.checked)}
              id="required"
            />
            <label htmlFor="required" className="text-sm font-medium">Required</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={readOnly} 
              onChange={(e) => setReadOnly(e.target.checked)}
              id="readOnly"
            />
            <label htmlFor="readOnly" className="text-sm font-medium">Read Only</label>
          </div>
        </div>
        
        {/* Preview */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Preview</label>
          <Input
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            required={required}
            readOnly={readOnly}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        {/* Code */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Generated Code</label>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
            <code>{`<Input
  type="${type}"
  ${disabled ? 'disabled' : ''}
  ${required ? 'required' : ''}
  ${readOnly ? 'readOnly' : ''}
  placeholder="${placeholder}"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}