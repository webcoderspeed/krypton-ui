"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FormInputPlaygroundProps {
  className?: string;
}

export function FormInputPlayground({ className }: FormInputPlaygroundProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showValidation, setShowValidation] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return value.length < 2 ? "Name must be at least 2 characters" : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email format" : "";
      case "phone":
        return !/^[\d\s\-\+\(\)]+$/.test(value) && value ? "Invalid phone format" : "";
      case "message":
        return value.length < 10 ? "Message must be at least 10 characters" : "";
      default:
        return "";
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (showValidation) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className={`space-y-6 p-6 border rounded-lg ${className}`}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Form Input Playground</h3>
        
        {/* Controls */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={showValidation} 
              onChange={(e) => setShowValidation(e.target.checked)}
              id="showValidation"
            />
            <label htmlFor="showValidation" className="text-sm font-medium">Show Validation</label>
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
          <label className="block text-sm font-medium">Preview</label>
          <form onSubmit={handleSubmit} className="max-w-md space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                disabled={disabled}
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("name", e.target.value)}
                className={errors.name && showValidation ? "border-red-500" : ""}
              />
              {errors.name && showValidation && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                disabled={disabled}
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("email", e.target.value)}
                className={errors.email && showValidation ? "border-red-500" : ""}
              />
              {errors.email && showValidation && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                disabled={disabled}
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("phone", e.target.value)}
                className={errors.phone && showValidation ? "border-red-500" : ""}
              />
              {errors.phone && showValidation && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">
                Message <span className="text-red-500">*</span>
              </Label>
              <textarea
                id="message"
                disabled={disabled}
                placeholder="Enter your message (min 10 characters)"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.message && showValidation ? "border-red-500" : ""}`}
                rows={3}
              />
              {errors.message && showValidation && (
                <p className="text-sm text-red-500">{errors.message}</p>
              )}
            </div>
            
            <Button type="submit" disabled={disabled} className="w-full">
              Submit Form
            </Button>
          </form>
        </div>
        
        {/* Code */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Generated Code</label>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
            <code>{`<form onSubmit={handleSubmit} className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="name">
      Name <span className="text-red-500">*</span>
    </Label>
    <Input
      id="name"
      type="text"
      ${disabled ? 'disabled' : ''}
      placeholder="Enter your name"
      value={formData.name}
      onChange={(e) => handleInputChange("name", e.target.value)}
      ${showValidation ? 'className={errors.name ? "border-red-500" : ""}' : ''}
    />
    ${showValidation ? '{errors.name && <p className="text-sm text-red-500">{errors.name}</p>}' : ''}
  </div>
  
  <div className="space-y-2">
    <Label htmlFor="email">
      Email <span className="text-red-500">*</span>
    </Label>
    <Input
      id="email"
      type="email"
      ${disabled ? 'disabled' : ''}
      placeholder="Enter your email"
      value={formData.email}
      onChange={(e) => handleInputChange("email", e.target.value)}
      ${showValidation ? 'className={errors.email ? "border-red-500" : ""}' : ''}
    />
    ${showValidation ? '{errors.email && <p className="text-sm text-red-500">{errors.email}</p>}' : ''}
  </div>
  
  <Button type="submit" ${disabled ? 'disabled' : ''} className="w-full">
    Submit Form
  </Button>
</form>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}