"use client";

import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  File,
  FileText,
  Folder,
  Image,
  Music,
  Video,
} from "lucide-react";

const files = [
  { name: "README.md", type: "file", icon: FileText },
  { name: "package.json", type: "file", icon: File },
  { name: "src", type: "folder", icon: Folder },
  { name: "components", type: "folder", icon: Folder },
  { name: "image.png", type: "image", icon: Image },
  { name: "song.mp3", type: "audio", icon: Music },
  { name: "video.mp4", type: "video", icon: Video },
  { name: "styles.css", type: "file", icon: File },
  { name: "index.html", type: "file", icon: FileText },
  { name: "utils", type: "folder", icon: Folder },
];

export default function CommandSearchable() {
  const [searchValue, setSearchValue] = useState("");

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Command className="rounded-lg border shadow-md max-w-md">
      <CommandInput
        placeholder="Search files and folders..."
        value={searchValue}
        onValueChange={setSearchValue}
      />
      <CommandList>
        <CommandEmpty>No files found.</CommandEmpty>
        <CommandGroup heading="Files">
          {filteredFiles.map((file) => {
            const Icon = file.icon;
            return (
              <CommandItem key={file.name}>
                <Icon className="mr-2 h-4 w-4" />
                <span>{file.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {file.type}
                </span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}