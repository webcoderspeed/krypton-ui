"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HelpCircle, Info, AlertCircle } from "lucide-react"

export default function TooltipFormHelp() {
  return (
    <div className="flex items-center justify-center p-8">
      <TooltipProvider>
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Form with Help Tooltips</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="username">Username</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Username must be 3-20 characters long and contain only letters, numbers, and underscores</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input id="username" placeholder="Enter username" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="password">Password</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-blue-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p>Password requirements:</p>
                      <ul className="text-xs space-y-1">
                        <li>• At least 8 characters</li>
                        <li>• One uppercase letter</li>
                        <li>• One lowercase letter</li>
                        <li>• One number</li>
                        <li>• One special character</li>
                      </ul>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input id="password" type="password" placeholder="Enter password" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="email">Email</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertCircle className="h-4 w-4 text-amber-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>We&apos;ll send verification emails to this address. Make sure it&apos;s accessible.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input id="email" type="email" placeholder="Enter email address" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="api-key">API Key</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p>Your API key for external integrations</p>
                      <p className="text-xs text-muted-foreground">Keep this secret and don&apos;t share it publicly</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input id="api-key" placeholder="sk-..." />
            </div>

            <Button className="w-full">Create Account</Button>
          </div>
        </div>
      </TooltipProvider>
    </div>
  )
}