"use client"

import React, { useState } from "react"
import {
  File,
  Folder,
  Search,
  Star,
  Clock,
  User,
  Hash,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

const searchData = {
  files: [
    { name: "package.json", type: "file", path: "/package.json" },
    { name: "README.md", type: "file", path: "/README.md" },
    { name: "src", type: "folder", path: "/src" },
    { name: "components", type: "folder", path: "/src/components" },
    { name: "utils", type: "folder", path: "/src/utils" },
    { name: "App.tsx", type: "file", path: "/src/App.tsx" },
    { name: "index.ts", type: "file", path: "/src/index.ts" },
    { name: "Button.tsx", type: "file", path: "/src/components/Button.tsx" },
    { name: "Input.tsx", type: "file", path: "/src/components/Input.tsx" },
    { name: "helpers.ts", type: "file", path: "/src/utils/helpers.ts" },
  ],
  recent: [
    { name: "App.tsx", type: "file", path: "/src/App.tsx" },
    { name: "Button.tsx", type: "file", path: "/src/components/Button.tsx" },
    { name: "package.json", type: "file", path: "/package.json" },
  ],
  starred: [
    { name: "README.md", type: "file", path: "/README.md" },
    { name: "components", type: "folder", path: "/src/components" },
  ],
  people: [
    { name: "John Doe", email: "john@example.com", role: "Developer" },
    { name: "Jane Smith", email: "jane@example.com", role: "Designer" },
    { name: "Bob Johnson", email: "bob@example.com", role: "Manager" },
    { name: "Alice Brown", email: "alice@example.com", role: "Developer" },
  ],
  channels: [
    { name: "general", description: "General discussion" },
    { name: "development", description: "Development updates" },
    { name: "design", description: "Design discussions" },
    { name: "random", description: "Random conversations" },
  ]
}

export function CommandSearch() {
  const [searchValue, setSearchValue] = useState("")

  const filteredFiles = searchData.files.filter(item =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.path.toLowerCase().includes(searchValue.toLowerCase())
  )

  const filteredPeople = searchData.people.filter(person =>
    person.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    person.email.toLowerCase().includes(searchValue.toLowerCase()) ||
    person.role.toLowerCase().includes(searchValue.toLowerCase())
  )

  const filteredChannels = searchData.channels.filter(channel =>
    channel.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    channel.description.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Search Command</CardTitle>
        <CardDescription>
          Dynamic search across files, people, and channels with real-time filtering.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Search files, people, channels..." 
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            
            {!searchValue && (
              <>
                <CommandGroup heading="Recent">
                  {searchData.recent.map((item, index) => (
                    <CommandItem key={`recent-${index}`}>
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      {item.type === "file" ? (
                        <File className="mr-2 h-4 w-4" />
                      ) : (
                        <Folder className="mr-2 h-4 w-4" />
                      )}
                      <div className="flex flex-col">
                        <span>{item.name}</span>
                        <span className="text-xs text-muted-foreground">{item.path}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
                
                <CommandGroup heading="Starred">
                  {searchData.starred.map((item, index) => (
                    <CommandItem key={`starred-${index}`}>
                      <Star className="mr-2 h-4 w-4 text-yellow-500" />
                      {item.type === "file" ? (
                        <File className="mr-2 h-4 w-4" />
                      ) : (
                        <Folder className="mr-2 h-4 w-4" />
                      )}
                      <div className="flex flex-col">
                        <span>{item.name}</span>
                        <span className="text-xs text-muted-foreground">{item.path}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
            
            {searchValue && filteredFiles.length > 0 && (
              <CommandGroup heading="Files">
                {filteredFiles.slice(0, 5).map((item, index) => (
                  <CommandItem key={`file-${index}`}>
                    {item.type === "file" ? (
                      <File className="mr-2 h-4 w-4" />
                    ) : (
                      <Folder className="mr-2 h-4 w-4" />
                    )}
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.path}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {searchValue && filteredPeople.length > 0 && (
              <CommandGroup heading="People">
                {filteredPeople.slice(0, 3).map((person, index) => (
                  <CommandItem key={`person-${index}`}>
                    <User className="mr-2 h-4 w-4" />
                    <div className="flex flex-col">
                      <span>{person.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {person.email} • {person.role}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {searchValue && filteredChannels.length > 0 && (
              <CommandGroup heading="Channels">
                {filteredChannels.map((channel, index) => (
                  <CommandItem key={`channel-${index}`}>
                    <Hash className="mr-2 h-4 w-4" />
                    <div className="flex flex-col">
                      <span>#{channel.name}</span>
                      <span className="text-xs text-muted-foreground">{channel.description}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CardContent>
    </Card>
  )
}