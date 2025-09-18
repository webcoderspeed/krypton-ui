"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SelectControlled() {
  const [selectedValue, setSelectedValue] = useState<string>("")
  const [history, setHistory] = useState<string[]>([])

  const handleValueChange = (value: string) => {
    setSelectedValue(value)
    setHistory(prev => [...prev, value])
  }

  const clearSelection = () => {
    setSelectedValue("")
    setHistory([])
  }

  return (
    <div className="w-[400px] space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Controlled Select</CardTitle>
          <CardDescription>
            This select is controlled by React state
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedValue} onValueChange={handleValueChange}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your favorite framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="vue">Vue</SelectItem>
              <SelectItem value="angular">Angular</SelectItem>
              <SelectItem value="svelte">Svelte</SelectItem>
              <SelectItem value="nextjs">Next.js</SelectItem>
              <SelectItem value="nuxt">Nuxt</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Button onClick={clearSelection} variant="outline" size="sm">
              Clear Selection
            </Button>
            <Button 
              onClick={() => setSelectedValue("react")} 
              variant="outline" 
              size="sm"
            >
              Set to React
            </Button>
          </div>
          
          {selectedValue && (
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm font-medium">Current Selection:</p>
              <p className="text-sm text-muted-foreground">{selectedValue}</p>
            </div>
          )}
          
          {history.length > 0 && (
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm font-medium mb-2">Selection History:</p>
              <div className="flex flex-wrap gap-1">
                {history.map((item, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 bg-background rounded text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}