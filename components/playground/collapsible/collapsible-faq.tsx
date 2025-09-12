"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const faqData = [
  {
    id: "item-1",
    question: "What is a design system?",
    answer: "A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications. It provides a unified language and consistent look and feel across products."
  },
  {
    id: "item-2",
    question: "How do I customize the components?",
    answer: "Components can be customized through CSS variables, Tailwind classes, or by extending the base components. Each component accepts className props and follows design tokens for consistent theming."
  },
  {
    id: "item-3",
    question: "Is this library accessible?",
    answer: "Yes, all components are built with accessibility in mind. They follow WAI-ARIA guidelines, support keyboard navigation, and work with screen readers. We use Radix UI primitives as the foundation for complex components."
  },
  {
    id: "item-4",
    question: "Can I use this in production?",
    answer: "Absolutely! The components are production-ready and battle-tested. They're built with TypeScript, have comprehensive test coverage, and follow semantic versioning for stable releases."
  }
]

export function CollapsibleFAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>FAQ Collapsible</CardTitle>
        <CardDescription>
          Frequently asked questions with independent collapsible sections.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {faqData.map((item) => (
            <Collapsible
              key={item.id}
              open={openItems[item.id] || false}
              onOpenChange={() => toggleItem(item.id)}
            >
              <div className="rounded-lg border">
                <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left hover:bg-accent/50 transition-colors">
                  <h3 className="text-sm font-medium leading-none">
                    {item.question}
                  </h3>
                  <Button variant="ghost" size="sm" className="w-9 p-0 shrink-0">
                    {openItems[item.id] ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {openItems[item.id] ? "Collapse" : "Expand"}
                    </span>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}