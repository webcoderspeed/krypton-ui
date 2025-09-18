"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Share2, Copy, Mail, MessageCircle, Twitter, Facebook } from "lucide-react"
import { useState } from "react"

export default function PopoverShareMenu() {
  const [copied, setCopied] = useState(false)
  const shareUrl = "https://example.com/shared-content"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Share this content</h4>
            <p className="text-sm text-muted-foreground">
              Anyone with the link can view this content.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                defaultValue={shareUrl}
                readOnly
                className="h-8"
              />
            </div>
            <Button size="sm" className="px-3" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
          </div>
          {copied && (
            <p className="text-xs text-green-600">Link copied to clipboard!</p>
          )}
          <div className="grid gap-2">
            <Label className="text-sm font-medium">Share via</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="justify-start">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <MessageCircle className="mr-2 h-4 w-4" />
                Message
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}