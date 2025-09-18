"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectGrouped() {
  return (
    <div className="w-[280px]">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a food item" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="carrot">Carrot</SelectItem>
            <SelectItem value="broccoli">Broccoli</SelectItem>
            <SelectItem value="spinach">Spinach</SelectItem>
            <SelectItem value="tomato">Tomato</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Proteins</SelectLabel>
            <SelectItem value="chicken">Chicken</SelectItem>
            <SelectItem value="beef">Beef</SelectItem>
            <SelectItem value="fish">Fish</SelectItem>
            <SelectItem value="tofu">Tofu</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}