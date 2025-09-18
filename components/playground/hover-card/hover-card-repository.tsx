"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Star, 
  GitFork, 
  Eye, 
  ExternalLink,
  Calendar,
  Code
} from "lucide-react"

export default function HoverCardRepository() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Popular Repositories</h3>
        <div className="flex flex-wrap gap-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="text-blue-600 p-0 h-auto">
                shadcn/ui
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-96">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">shadcn/ui</h4>
                    <p className="text-sm text-muted-foreground">
                      Beautifully designed components built with Radix UI and Tailwind CSS.
                    </p>
                  </div>
                  <Badge variant="secondary">Public</Badge>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span>45.2k</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-4 w-4" />
                    <span>2.8k</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>1.2k</span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">TypeScript</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Updated 2 days ago</span>
                  </div>
                </div>

                <Button size="sm" variant="outline" className="w-full">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Repository
                </Button>
              </div>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="text-blue-600 p-0 h-auto">
                vercel/next.js
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-96">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">vercel/next.js</h4>
                    <p className="text-sm text-muted-foreground">
                      The React Framework for the Web. Used by some of the world&apos;s largest companies.
                    </p>
                  </div>
                  <Badge variant="secondary">Public</Badge>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span>120k</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-4 w-4" />
                    <span>25.8k</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>2.1k</span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">JavaScript</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Updated 1 hour ago</span>
                  </div>
                </div>

                <Button size="sm" variant="outline" className="w-full">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Repository
                </Button>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  )
}