"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  MousePointer2,
  Copy,
  Scissors,
  Clipboard,
  RotateCcw,
  RotateCw,
  Trash2,
  Edit,
  Eye,
  Share,
  Bookmark,
  Download,
  Printer,
  Search,
  Zap
} from "lucide-react"

export default function DropdownMenuContext() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-sm text-muted-foreground">
        Right-click the card below to see context menu
      </div>
      
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <div 
            className="w-64 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
            onContextMenu={(e) => {
              e.preventDefault()
              setIsOpen(true)
            }}
          >
            <div className="text-center">
              <MousePointer2 className="mx-auto h-6 w-6 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Right-click me</p>
            </div>
          </div>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" />
            <span>View</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem>
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy</span>
            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <Scissors className="mr-2 h-4 w-4" />
            <span>Cut</span>
            <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <Clipboard className="mr-2 h-4 w-4" />
            <span>Paste</span>
            <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Share className="mr-2 h-4 w-4" />
              <span>Share</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Copy Link</DropdownMenuItem>
              <DropdownMenuItem>Email</DropdownMenuItem>
              <DropdownMenuItem>Social Media</DropdownMenuItem>
              <DropdownMenuItem>Embed Code</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          
          <DropdownMenuItem>
            <Bookmark className="mr-2 h-4 w-4" />
            <span>Add to Bookmarks</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <Download className="mr-2 h-4 w-4" />
            <span>Download</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <Printer className="mr-2 h-4 w-4" />
            <span>Print</span>
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem>
            <Search className="mr-2 h-4 w-4" />
            <span>Search</span>
            <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <Zap className="mr-2 h-4 w-4" />
            <span>Quick Actions</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem>
            <RotateCcw className="mr-2 h-4 w-4" />
            <span>Undo</span>
            <DropdownMenuShortcut>⌘Z</DropdownMenuShortcut>
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <RotateCw className="mr-2 h-4 w-4" />
            <span>Redo</span>
            <DropdownMenuShortcut>⌘⇧Z</DropdownMenuShortcut>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
            <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}