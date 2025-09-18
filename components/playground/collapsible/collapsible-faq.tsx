"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const faqs = [
  {
    id: "pricing",
    question: "What are your pricing plans?",
    answer: "We offer three pricing tiers: Basic ($9/month), Pro ($29/month), and Enterprise ($99/month). Each plan includes different features and usage limits to suit your needs."
  },
  {
    id: "support",
    question: "How can I contact customer support?",
    answer: "You can reach our support team through multiple channels: email (support@company.com), live chat (available 24/7), or phone (+1-800-123-4567). We typically respond within 2 hours during business days."
  },
  {
    id: "refund",
    question: "What is your refund policy?",
    answer: "We offer a 30-day money-back guarantee for all our plans. If you're not satisfied with our service, you can request a full refund within 30 days of your initial purchase."
  },
  {
    id: "integration",
    question: "Do you support third-party integrations?",
    answer: "Yes! We support over 50+ integrations including Slack, Discord, Zapier, Google Workspace, Microsoft Teams, and many more. You can find the complete list in our integrations directory."
  }
]

export default function CollapsibleFAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <HelpCircle className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      </div>
      
      {faqs.map((faq) => (
        <Card key={faq.id}>
          <Collapsible 
            open={openItems[faq.id]} 
            onOpenChange={() => toggleItem(faq.id)}
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-between p-6 h-auto text-left font-medium"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openItems[faq.id] ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0 pb-6">
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  )
}