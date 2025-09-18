"use client"

import { useState } from "react"
import { ChevronDown, Star, Truck, Shield, RotateCcw } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const productSections = [
  {
    id: "description",
    title: "Product Description",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Experience premium sound quality with our latest wireless headphones. 
          Featuring advanced noise cancellation technology, 30-hour battery life, 
          and comfortable over-ear design perfect for long listening sessions.
        </p>
        <ul className="text-sm text-muted-foreground space-y-1 ml-4">
          <li>• Active Noise Cancellation (ANC)</li>
          <li>• 30-hour battery life with quick charge</li>
          <li>• Premium leather ear cushions</li>
          <li>• Bluetooth 5.0 connectivity</li>
          <li>• Built-in microphone for calls</li>
        </ul>
      </div>
    )
  },
  {
    id: "specifications",
    title: "Technical Specifications",
    content: (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-medium">Driver Size:</span>
            <p className="text-muted-foreground">40mm</p>
          </div>
          <div>
            <span className="font-medium">Frequency Response:</span>
            <p className="text-muted-foreground">20Hz - 20kHz</p>
          </div>
          <div>
            <span className="font-medium">Impedance:</span>
            <p className="text-muted-foreground">32 Ohms</p>
          </div>
          <div>
            <span className="font-medium">Weight:</span>
            <p className="text-muted-foreground">250g</p>
          </div>
          <div>
            <span className="font-medium">Connectivity:</span>
            <p className="text-muted-foreground">Bluetooth 5.0, 3.5mm</p>
          </div>
          <div>
            <span className="font-medium">Charging:</span>
            <p className="text-muted-foreground">USB-C</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "shipping",
    title: "Shipping & Returns",
    content: (
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Truck className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-sm">Free Shipping</h4>
            <p className="text-xs text-muted-foreground">
              Free standard shipping on orders over $50. Express shipping available.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <RotateCcw className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-sm">30-Day Returns</h4>
            <p className="text-xs text-muted-foreground">
              Easy returns within 30 days. No questions asked.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-purple-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-sm">2-Year Warranty</h4>
            <p className="text-xs text-muted-foreground">
              Comprehensive warranty covering manufacturing defects.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "reviews",
    title: "Customer Reviews",
    content: (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm font-medium">4.8 out of 5</span>
          <span className="text-sm text-muted-foreground">(124 reviews)</span>
        </div>
        
        <div className="space-y-3">
          <div className="border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm">Sarah M.</span>
                <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              &ldquo;Amazing sound quality and the noise cancellation works perfectly. 
              Very comfortable for long use.&rdquo;
            </p>
          </div>
          
          <div className="border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm">Mike R.</span>
                <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="h-3 w-3 text-gray-300" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              &ldquo;Great headphones overall. Battery life is excellent. 
              Only wish they were a bit lighter.&rdquo;
            </p>
          </div>
        </div>
      </div>
    )
  }
]

export default function CollapsibleProductDetails() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    description: true
  })

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Premium Wireless Headphones</h1>
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold">$199.99</span>
          <span className="text-lg text-muted-foreground line-through">$249.99</span>
          <Badge variant="destructive">20% OFF</Badge>
        </div>
      </div>
      
      {productSections.map((section) => (
        <div key={section.id} className="border rounded-lg">
          <Collapsible 
            open={openSections[section.id]} 
            onOpenChange={() => toggleSection(section.id)}
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-between p-4 h-auto font-medium"
              >
                <span>{section.title}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections[section.id] ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 pb-4">
                <Separator className="mb-4" />
                {section.content}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  )
}