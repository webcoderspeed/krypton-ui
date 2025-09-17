"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Palette,
  Brush,
  Droplets,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";

const themes = [
  {
    name: "Light",
    description: "Clean and bright",
    icon: Sun,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    name: "Dark",
    description: "Easy on the eyes",
    icon: Moon,
    color: "bg-slate-100 text-slate-800",
  },
  {
    name: "Ocean",
    description: "Deep blue vibes",
    icon: Droplets,
    color: "bg-blue-100 text-blue-800",
  },
  {
    name: "Forest",
    description: "Natural green",
    icon: Brush,
    color: "bg-green-100 text-green-800",
  },
];

const customizations = [
  { name: "Custom Colors", shortcut: "⌘C" },
  { name: "Typography", shortcut: "⌘T" },
  { name: "Spacing", shortcut: "⌘S" },
  { name: "Animations", shortcut: "⌘A" },
];

export default function CommandStyled() {
  return (
    <Command className="rounded-xl border-2 border-dashed border-primary/20 shadow-lg max-w-md bg-gradient-to-br from-background to-muted/20">
      <CommandInput 
        placeholder="Search themes and styles..." 
        className="border-b border-border/50"
      />
      <CommandList>
        <CommandEmpty className="py-8 text-center">
          <Palette className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p>No themes found.</p>
        </CommandEmpty>
        <CommandGroup heading="🎨 Themes">
          {themes.map((theme) => {
            const Icon = theme.icon;
            return (
              <CommandItem 
                key={theme.name}
                className="group hover:bg-accent/50 transition-colors"
              >
                <div className={`mr-3 p-1.5 rounded-md ${theme.color}`}>
                  <Icon className="h-3 w-3" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{theme.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {theme.description}
                  </span>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="h-3 w-3 text-primary" />
                </div>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator className="my-2" />
        <CommandGroup heading="⚙️ Customization">
          {customizations.map((item) => (
            <CommandItem 
              key={item.name}
              className="hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30"
            >
              <Palette className="mr-2 h-4 w-4 text-primary" />
              <span>{item.name}</span>
              <CommandShortcut className="bg-primary/10 text-primary">
                {item.shortcut}
              </CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}