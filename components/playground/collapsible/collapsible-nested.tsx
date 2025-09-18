"use client"

import { useState } from "react"
import { ChevronDown, Folder, File } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

export default function CollapsibleNested() {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    src: false,
    components: false,
    utils: false
  })

  const toggleFolder = (folder: string) => {
    setOpenFolders(prev => ({
      ...prev,
      [folder]: !prev[folder]
    }))
  }

  return (
    <div className="w-[350px] space-y-1 p-4 border rounded-lg">
      <h3 className="font-semibold mb-3">Project Structure</h3>
      
      {/* Root src folder */}
      <Collapsible open={openFolders.src} onOpenChange={() => toggleFolder('src')}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-start p-2 h-auto">
            <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${openFolders.src ? 'rotate-180' : ''}`} />
            <Folder className="h-4 w-4 mr-2" />
            src
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-6 space-y-1">
          {/* Nested components folder */}
          <Collapsible open={openFolders.components} onOpenChange={() => toggleFolder('components')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${openFolders.components ? 'rotate-180' : ''}`} />
                <Folder className="h-4 w-4 mr-2" />
                components
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-6 space-y-1">
              <div className="flex items-center p-2">
                <File className="h-4 w-4 mr-2" />
                <span className="text-sm">Button.tsx</span>
              </div>
              <div className="flex items-center p-2">
                <File className="h-4 w-4 mr-2" />
                <span className="text-sm">Input.tsx</span>
              </div>
              <div className="flex items-center p-2">
                <File className="h-4 w-4 mr-2" />
                <span className="text-sm">Card.tsx</span>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Nested utils folder */}
          <Collapsible open={openFolders.utils} onOpenChange={() => toggleFolder('utils')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${openFolders.utils ? 'rotate-180' : ''}`} />
                <Folder className="h-4 w-4 mr-2" />
                utils
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-6 space-y-1">
              <div className="flex items-center p-2">
                <File className="h-4 w-4 mr-2" />
                <span className="text-sm">helpers.ts</span>
              </div>
              <div className="flex items-center p-2">
                <File className="h-4 w-4 mr-2" />
                <span className="text-sm">constants.ts</span>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="flex items-center p-2">
            <File className="h-4 w-4 mr-2" />
            <span className="text-sm">index.ts</span>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}