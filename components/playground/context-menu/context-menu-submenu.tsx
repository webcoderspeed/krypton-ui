"use client"

import React from "react"
import LucideIcon from "@/components/lucide-icon"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuSubmenu() {
  const handleAction = (action: string, subAction?: string) => {
    console.log(`Action: ${action}${subAction ? ` > ${subAction}` : ''}`)
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Context Menu with Submenus</CardTitle>
        <CardDescription>
          Right-click to explore nested menu options and submenus.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ContextMenu>
          <ContextMenuTrigger className="flex h-[180px] w-full items-center justify-center rounded-md border border-dashed text-sm">
            <div className="text-center">
              <LucideIcon name="Folder" className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p>Right-click for file operations</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Explore nested menus and submenus
              </p>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-64">
            <ContextMenuSub>
              <ContextMenuSubTrigger>
                <LucideIcon name="FileText" className="mr-2 h-4 w-4" />
                New
                <LucideIcon name="ChevronRight" className="ml-auto h-4 w-4" />
              </ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-48">
                <ContextMenuItem onClick={() => handleAction('new', 'document')}>
                  <LucideIcon name="FileText" className="mr-2 h-4 w-4" />
                  Document
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleAction('new', 'folder')}>
                  <LucideIcon name="Folder" className="mr-2 h-4 w-4" />
                  Folder
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleAction('new', 'image')}>
                  <LucideIcon name="Image" className="mr-2 h-4 w-4" />
                  Image
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleAction('new', 'video')}>
                  <LucideIcon name="Video" className="mr-2 h-4 w-4" />
                  Video
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleAction('new', 'audio')}>
                  <LucideIcon name="Music" className="mr-2 h-4 w-4" />
                  Audio
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            
            <ContextMenuSeparator />
            
            <ContextMenuSub>
              <ContextMenuSubTrigger>
                <LucideIcon name="Share" className="mr-2 h-4 w-4" />
                Share
                <LucideIcon name="ChevronRight" className="ml-auto h-4 w-4" />
              </ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-48">
                <ContextMenuItem onClick={() => handleAction('share', 'email')}>
                  <LucideIcon name="Mail" className="mr-2 h-4 w-4" />
                  Email
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleAction('share', 'message')}>
                  <LucideIcon name="MessageSquare" className="mr-2 h-4 w-4" />
                  Message
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleAction('share', 'call')}>
                  <LucideIcon name="Phone" className="mr-2 h-4 w-4" />
                  Phone Call
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleAction('share', 'web')}>
                  <LucideIcon name="Globe" className="mr-2 h-4 w-4" />
                  Web Link
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            
            <ContextMenuSub>
              <ContextMenuSubTrigger>
                <LucideIcon name="Download" className="mr-2 h-4 w-4" />
                Export
                <LucideIcon name="ChevronRight" className="ml-auto h-4 w-4" />
              </ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-48">
                <ContextMenuItem onClick={() => handleAction('export', 'pdf')}>
                  <LucideIcon name="FileText" className="mr-2 h-4 w-4" />
                  PDF
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleAction('export', 'zip')}>
                  <LucideIcon name="Archive" className="mr-2 h-4 w-4" />
                  ZIP Archive
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleAction('export', 'json')}>
                  <LucideIcon name="Code" className="mr-2 h-4 w-4" />
                  JSON
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleAction('export', 'csv')}>
                  <LucideIcon name="Database" className="mr-2 h-4 w-4" />
                  CSV
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            
            <ContextMenuSeparator />
            
            <ContextMenuSub>
              <ContextMenuSubTrigger>
                <LucideIcon name="Upload" className="mr-2 h-4 w-4" />
                Upload to
                <LucideIcon name="ChevronRight" className="ml-auto h-4 w-4" />
              </ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-48">
                <ContextMenuItem onClick={() => handleAction('upload', 'cloud')}>
                  <LucideIcon name="Cloud" className="mr-2 h-4 w-4" />
                  Cloud Storage
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleAction('upload', 'drive')}>
                  <LucideIcon name="HardDrive" className="mr-2 h-4 w-4" />
                  Local Drive
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleAction('upload', 'usb')}>
                  <LucideIcon name="Usb" className="mr-2 h-4 w-4" />
                  USB Device
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuContent>
        </ContextMenu>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>This example demonstrates:</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Nested submenus with hover activation</li>
            <li>Multiple levels of menu organization</li>
            <li>Consistent icon usage throughout menu hierarchy</li>
            <li>Logical grouping of related actions</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}