"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function TabsControlled() {
  const [activeTab, setActiveTab] = useState("tab1")

  const tabs = [
    { value: "tab1", label: "First Tab", content: "This is the content of the first tab." },
    { value: "tab2", label: "Second Tab", content: "This is the content of the second tab." },
    { value: "tab3", label: "Third Tab", content: "This is the content of the third tab." },
    { value: "tab4", label: "Fourth Tab", content: "This is the content of the fourth tab." },
  ]

  return (
    <div className="w-[500px] space-y-4">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            variant={activeTab === tab.value ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">{tab.label}</h3>
              <p className="text-sm text-muted-foreground">{tab.content}</p>
              <div className="mt-4 text-xs text-muted-foreground">
                Current active tab: <span className="font-mono">{activeTab}</span>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}