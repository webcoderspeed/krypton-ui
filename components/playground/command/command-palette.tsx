"use client"

import React, { useState } from "react"
import {
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  Bell,
  Search,
  Plus,
  FileText,
  Folder,
  Download,
  Upload,
  Copy,
  Trash2,
  Edit,
  Share,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

const actions = {
  general: [
    {
      icon: Search,
      label: "Search files",
      shortcut: "⌘F",
      action: () => console.log("Search files")
    },
    {
      icon: Plus,
      label: "Create new file",
      shortcut: "⌘N",
      action: () => console.log("Create new file")
    },
    {
      icon: Folder,
      label: "Create new folder",
      shortcut: "⌘⇧N",
      action: () => console.log("Create new folder")
    },
    {
      icon: Download,
      label: "Download",
      shortcut: "⌘D",
      action: () => console.log("Download")
    },
    {
      icon: Upload,
      label: "Upload",
      shortcut: "⌘U",
      action: () => console.log("Upload")
    },
  ],
  edit: [
    {
      icon: Copy,
      label: "Copy",
      shortcut: "⌘C",
      action: () => console.log("Copy")
    },
    {
      icon: Edit,
      label: "Rename",
      shortcut: "F2",
      action: () => console.log("Rename")
    },
    {
      icon: Trash2,
      label: "Delete",
      shortcut: "⌫",
      action: () => console.log("Delete")
    },
    {
      icon: Share,
      label: "Share",
      shortcut: "⌘⇧S",
      action: () => console.log("Share")
    },
  ],
  settings: [
    {
      icon: Settings,
      label: "Settings",
      shortcut: "⌘,",
      action: () => console.log("Settings")
    },
    {
      icon: User,
      label: "Profile",
      shortcut: "⌘P",
      action: () => console.log("Profile")
    },
    {
      icon: Bell,
      label: "Notifications",
      shortcut: "⌘⇧N",
      action: () => console.log("Notifications")
    },
    {
      icon: Moon,
      label: "Toggle theme",
      shortcut: "⌘T",
      action: () => console.log("Toggle theme")
    },
    {
      icon: LogOut,
      label: "Sign out",
      shortcut: "⌘⇧Q",
      action: () => console.log("Sign out")
    },
  ]
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const handleAction = (action: () => void) => {
    action()
    setOpen(false)
    setSearchValue("")
  }

  const filteredActions = Object.entries(actions).reduce((acc, [category, items]) => {
    const filtered = items.filter(item =>
      item.label.toLowerCase().includes(searchValue.toLowerCase())
    )
    if (filtered.length > 0) {
      acc[category] = filtered
    }
    return acc
  }, {} as Record<string, typeof actions.general>)

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Command Palette</CardTitle>
        <CardDescription>
          A command palette with actions, shortcuts, and categories. Press ⌘K to open.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-muted-foreground">
              <Search className="mr-2 h-4 w-4" />
              Search commands...
              <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0">
            <Command className="rounded-lg border-0 shadow-md">
              <CommandInput 
                placeholder="Type a command or search..." 
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                
                {Object.entries(filteredActions).map(([category, items], categoryIndex) => (
                  <React.Fragment key={category}>
                    {categoryIndex > 0 && <CommandSeparator />}
                    <CommandGroup heading={category.charAt(0).toUpperCase() + category.slice(1)}>
                      {items.map((item, index) => {
                        const Icon = item.icon
                        return (
                          <CommandItem
                            key={`${category}-${index}`}
                            onSelect={() => handleAction(item.action)}
                          >
                            <Icon className="mr-2 h-4 w-4" />
                            <span>{item.label}</span>
                            <CommandShortcut>{item.shortcut}</CommandShortcut>
                          </CommandItem>
                        )
                      })}
                    </CommandGroup>
                  </React.Fragment>
                ))}
              </CommandList>
            </Command>
          </DialogContent>
        </Dialog>
        
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => actions.general[0].action()}
              className="justify-start"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => actions.general[1].action()}
              className="justify-start"
            >
              <Plus className="mr-2 h-4 w-4" />
              New File
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => actions.settings[0].action()}
              className="justify-start"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => actions.settings[3].action()}
              className="justify-start"
            >
              <Moon className="mr-2 h-4 w-4" />
              Theme
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}