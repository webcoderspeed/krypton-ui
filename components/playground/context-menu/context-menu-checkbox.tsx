"use client"

import React, { useState } from "react"
import {
  Settings,
  Eye,
  EyeOff,
  Grid,
  List,
  SortAsc,
  SortDesc,
  Calendar,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuCheckbox() {
  const [showBookmarks, setShowBookmarks] = useState(true)
  const [showFullUrls, setShowFullUrls] = useState(false)
  const [showPeople, setShowPeople] = useState(true)
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("name")

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Context Menu with Checkboxes & Radio</CardTitle>
        <CardDescription>
          Right-click to see checkboxes and radio button groups in action.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ContextMenu>
          <ContextMenuTrigger className="flex h-[200px] w-full items-center justify-center rounded-md border border-dashed text-sm">
            <div className="text-center">
              <Settings className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p>Right-click for view options</p>
              <div className="mt-4 space-y-1 text-xs text-muted-foreground">
                <p>View: {viewMode}</p>
                <p>Sort: {sortBy}</p>
                <p>Bookmarks: {showBookmarks ? 'Visible' : 'Hidden'}</p>
                <p>Full URLs: {showFullUrls ? 'Visible' : 'Hidden'}</p>
                <p>People: {showPeople ? 'Visible' : 'Hidden'}</p>
              </div>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-64">
            <ContextMenuLabel>View Options</ContextMenuLabel>
            <ContextMenuSeparator />
            
            <ContextMenuCheckboxItem
              checked={showBookmarks}
              onCheckedChange={setShowBookmarks}
            >
              <Eye className="mr-2 h-4 w-4" />
              Show Bookmarks
            </ContextMenuCheckboxItem>
            
            <ContextMenuCheckboxItem
              checked={showFullUrls}
              onCheckedChange={setShowFullUrls}
            >
              Show Full URLs
            </ContextMenuCheckboxItem>
            
            <ContextMenuCheckboxItem
              checked={showPeople}
              onCheckedChange={setShowPeople}
            >
              Show People
            </ContextMenuCheckboxItem>
            
            <ContextMenuSeparator />
            
            <ContextMenuLabel>View Mode</ContextMenuLabel>
            <ContextMenuRadioGroup value={viewMode} onValueChange={setViewMode}>
              <ContextMenuRadioItem value="grid">
                <Grid className="mr-2 h-4 w-4" />
                Grid View
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="list">
                <List className="mr-2 h-4 w-4" />
                List View
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
            
            <ContextMenuSeparator />
            
            <ContextMenuLabel>Sort By</ContextMenuLabel>
            <ContextMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <ContextMenuRadioItem value="name">
                <SortAsc className="mr-2 h-4 w-4" />
                Name
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="date">
                <Calendar className="mr-2 h-4 w-4" />
                Date Modified
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="size">
                <SortDesc className="mr-2 h-4 w-4" />
                Size
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="type">
                <Clock className="mr-2 h-4 w-4" />
                Type
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>This example demonstrates:</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Checkbox items for toggleable options</li>
            <li>Radio groups for mutually exclusive choices</li>
            <li>Labels to organize menu sections</li>
            <li>Real-time state updates reflected in the UI</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}