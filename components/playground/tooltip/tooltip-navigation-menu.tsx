"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  Home, 
  Search, 
  Bell, 
  Mail, 
  User, 
  Settings,
  BarChart3,
  FileText,
  Calendar,
  Users
} from "lucide-react"

export default function TooltipNavigationMenu() {
  return (
    <div className="flex items-center justify-center p-8">
      <TooltipProvider>
        <div className="space-y-8">
          {/* Sidebar Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Sidebar Navigation</h3>
            <div className="flex flex-col gap-2 w-12">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Home className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="space-y-1">
                    <p className="font-medium">Dashboard</p>
                    <p className="text-xs text-muted-foreground">View your overview and recent activity</p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <BarChart3 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="space-y-1">
                    <p className="font-medium">Analytics</p>
                    <p className="text-xs text-muted-foreground">Track performance and metrics</p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Users className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="space-y-1">
                    <p className="font-medium">Team</p>
                    <p className="text-xs text-muted-foreground">Manage team members and permissions</p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <FileText className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="space-y-1">
                    <p className="font-medium">Documents</p>
                    <p className="text-xs text-muted-foreground">Access and organize your files</p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Calendar className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="space-y-1">
                    <p className="font-medium">Calendar</p>
                    <p className="text-xs text-muted-foreground">Schedule and manage events</p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Settings className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="space-y-1">
                    <p className="font-medium">Settings</p>
                    <p className="text-xs text-muted-foreground">Configure your preferences</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Top Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Top Navigation</h3>
            <div className="flex gap-2 justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Search</p>
                    <p className="text-xs text-muted-foreground">Press Cmd+K to open</p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Notifications</p>
                    <p className="text-xs text-muted-foreground">3 unread notifications</p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Mail className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full text-[10px] text-white flex items-center justify-center">
                      7
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Messages</p>
                    <p className="text-xs text-muted-foreground">7 new messages</p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">Profile</p>
                    <p className="text-xs text-muted-foreground">View and edit your profile</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  )
}