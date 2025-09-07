"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export default function AccordionControlled() {
  const [value, setValue] = useState<string>("")

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setValue("item-1")}
        >
          Open Item 1
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setValue("item-2")}
        >
          Open Item 2
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setValue("item-3")}
        >
          Open Item 3
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setValue("")}
        >
          Close All
        </Button>
      </div>
      
      <Accordion type="single" value={value} onValueChange={setValue} className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Controlled Item 1</AccordionTrigger>
          <AccordionContent>
            This accordion is controlled by external state. You can use the buttons
            above to programmatically control which item is open.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Controlled Item 2</AccordionTrigger>
          <AccordionContent>
            The current value is: {value || "none"}. This demonstrates how you can
            track and control the accordion state from parent components.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Controlled Item 3</AccordionTrigger>
          <AccordionContent>
            Controlled accordions are useful for complex interactions, form wizards,
            or when you need to sync the accordion state with other UI elements.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}