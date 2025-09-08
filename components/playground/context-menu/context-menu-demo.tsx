"use client"

import React from "react"
import {
  Copy,
  Scissors,
  ClipboardPaste,
  Download,
  Share,
  Edit,
  Trash2,
  Star,
  MoreHorizontal,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuDemo() {
  const handleAction = (action: string) => {
    console.log(`Action: ${action}`)
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Context Menu</CardTitle>
        <CardDescription>
          Right-click on the area below to open the context menu.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ContextMenu>
          <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm">
            Right-click here
          </ContextMenuTrigger>
          <ContextMenuContent className="w-64">
            <ContextMenuItem onClick={() => handleAction('copy')}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
              <ContextMenuShortcut>⌘C</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleAction('cut')}>
              <Scissors className="mr-2 h-4 w-4" />
              Cut
              <ContextMenuShortcut>⌘X</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleAction('paste')}>
              <ClipboardPaste className="mr-2 h-4 w-4" />
              Paste
              <ContextMenuShortcut>⌘V</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={() => handleAction('edit')}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleAction('star')}>
              <Star className="mr-2 h-4 w-4" />
              Add to Favorites
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={() => handleAction('download')}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleAction('share')}>
              <Share className="mr-2 h-4 w-4" />
              Share
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem 
              onClick={() => handleAction('delete')}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
              <ContextMenuShortcut>⌫</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Try right-clicking on the dashed area above to see the context menu in action.</p>
          <p className="mt-2">The context menu includes common actions like copy, paste, edit, and delete with keyboard shortcuts.</p>
        </div>
      </CardContent>
    </Card>
  )
}