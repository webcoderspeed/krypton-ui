"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectDisabled() {
  return (
    <div className="w-[280px] space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Disabled Select</label>
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="This select is disabled" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Select with Disabled Items</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Some items are disabled" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available1">Available Option 1</SelectItem>
            <SelectItem value="disabled1" disabled>Disabled Option 1</SelectItem>
            <SelectItem value="available2">Available Option 2</SelectItem>
            <SelectItem value="disabled2" disabled>Disabled Option 2</SelectItem>
            <SelectItem value="available3">Available Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}