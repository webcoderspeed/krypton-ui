"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  GitFork, 
  Eye, 
  Download,
  ExternalLink,
  Calendar
} from "lucide-react";

export default function HoverCardCustomContent() {
  return (
    <div className="flex flex-wrap gap-8 justify-center p-8">
      {/* Repository Card */}
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" className="text-blue-600">
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
              <Button size="sm" variant="outline" className="h-8">
                <ExternalLink className="h-3 w-3 mr-1" />
                View
              </Button>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      {/* Product Card */}
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop&crop=center" 
              alt="Product" 
              className="w-16 h-16 rounded-lg object-cover"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-4">
            <div className="flex gap-4">
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop&crop=center" 
                alt="Product" 
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="space-y-2">
                <h4 className="font-semibold">Premium Headphones</h4>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">$299</span>
                  <span className="text-sm text-muted-foreground line-through">$399</span>
                  <Badge variant="destructive" className="text-xs">25% OFF</Badge>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              High-quality wireless headphones with noise cancellation and 30-hour battery life.
            </p>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm text-muted-foreground ml-2">4.8 (2,341 reviews)</span>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                Add to Cart
              </Button>
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      {/* Event Card */}
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="ghost" className="h-auto p-2">
            <div className="text-left">
              <div className="font-medium">React Conference 2024</div>
              <div className="text-sm text-muted-foreground">Mar 15, 2024</div>
            </div>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-96">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">React Conference 2024</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>March 15, 2024 • 9:00 AM - 6:00 PM PST</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Join us for a full day of React talks, workshops, and networking with the community.
            </p>

            <div className="space-y-2">
              <div className="text-sm font-medium">Featured Speakers:</div>
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <Avatar key={i} className="w-8 h-8 border-2 border-background">
                    <AvatarImage src={`https://i.pravatar.cc/32?img=${i + 1}`} />
                    <AvatarFallback>S{i + 1}</AvatarFallback>
                  </Avatar>
                ))}
                <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                  +12
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium">$99</div>
                <div className="text-xs text-muted-foreground">Early bird pricing</div>
              </div>
              <Button size="sm">
                Register Now
              </Button>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}