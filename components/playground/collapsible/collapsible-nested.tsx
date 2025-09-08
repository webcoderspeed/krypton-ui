"use client"

import { useState } from "react"
import { ChevronRight, Folder, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function CollapsibleNested() {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    src: false,
    components: false,
    utils: false,
  })

  const toggleFolder = (folder: string) => {
    setOpenFolders(prev => ({
      ...prev,
      [folder]: !prev[folder]
    }))
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Nested Collapsible</CardTitle>
        <CardDescription>
          File tree structure with nested collapsible folders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {/* Root level files */}
          <div className="flex items-center space-x-2 px-2 py-1">
            <File className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">package.json</span>
          </div>
          <div className="flex items-center space-x-2 px-2 py-1">
            <File className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">README.md</span>
          </div>

          {/* Src folder */}
          <Collapsible
            open={openFolders.src}
            onOpenChange={() => toggleFolder('src')}
          >
            <CollapsibleTrigger className="flex w-full items-center space-x-2 rounded px-2 py-1 hover:bg-accent">
              <ChevronRight
                className={`h-4 w-4 transition-transform duration-200 ${
                  openFolders.src ? "rotate-90" : ""
                }`}
              />
              <Folder className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">src</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-6 space-y-1">
              <div className="flex items-center space-x-2 px-2 py-1">
                <File className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">index.ts</span>
              </div>
              
              {/* Components subfolder */}
              <Collapsible
                open={openFolders.components}
                onOpenChange={() => toggleFolder('components')}
              >
                <CollapsibleTrigger className="flex w-full items-center space-x-2 rounded px-2 py-1 hover:bg-accent">
                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-200 ${
                      openFolders.components ? "rotate-90" : ""
                    }`}
                  />
                  <Folder className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">components</span>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-6 space-y-1">
                  <div className="flex items-center space-x-2 px-2 py-1">
                    <File className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Button.tsx</span>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1">
                    <File className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Card.tsx</span>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1">
                    <File className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Input.tsx</span>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Utils subfolder */}
              <Collapsible
                open={openFolders.utils}
                onOpenChange={() => toggleFolder('utils')}
              >
                <CollapsibleTrigger className="flex w-full items-center space-x-2 rounded px-2 py-1 hover:bg-accent">
                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-200 ${
                      openFolders.utils ? "rotate-90" : ""
                    }`}
                  />
                  <Folder className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">utils</span>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-6 space-y-1">
                  <div className="flex items-center space-x-2 px-2 py-1">
                    <File className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">cn.ts</span>
                  </div>
                  <div className="flex items-center space-x-2 px-2 py-1">
                    <File className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">format.ts</span>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  )
}