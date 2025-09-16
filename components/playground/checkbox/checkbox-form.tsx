"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CheckboxForm() {
  const [items, setItems] = useState([
    { id: "recents", label: "Recents", checked: false },
    { id: "home", label: "Home", checked: true },
    { id: "applications", label: "Applications", checked: false },
    { id: "desktop", label: "Desktop", checked: true },
    { id: "downloads", label: "Downloads", checked: false },
    { id: "documents", label: "Documents", checked: false },
  ]);

  const handleCheckedChange = (id: string, checked: boolean) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked } : item
    ));
  };

  const handleSubmit = () => {
    const selectedItems = items.filter(item => item.checked);
    alert(`Selected items: ${selectedItems.map(item => item.label).join(", ")}`);
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Sidebar</h3>
          <p className="text-sm text-muted-foreground">
            Select the items you want to display in the sidebar.
          </p>
        </div>
        
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={item.id}
                checked={item.checked}
                onCheckedChange={(checked) => handleCheckedChange(item.id, checked as boolean)}
              />
              <label
                htmlFor={item.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
        
        <Button onClick={handleSubmit} className="w-full">
          Update preferences
        </Button>
      </div>
    </div>
  );
}