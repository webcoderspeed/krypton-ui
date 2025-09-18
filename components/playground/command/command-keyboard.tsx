"use client";

import { useState, useEffect } from "react";
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
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  CornerDownLeft,
  X,
} from "lucide-react";

const keyboardShortcuts = [
  {
    key: "↑ / ↓",
    description: "Navigate items",
    icon: ArrowUp,
  },
  {
    key: "Enter",
    description: "Select item",
    icon: CornerDownLeft,
  },
  {
    key: "Escape",
    description: "Close dialog",
    icon: X,
  },
  {
    key: "← / →",
    description: "Navigate groups",
    icon: ArrowLeft,
  },
];

const navigationItems = [
  { label: "Home", shortcut: "⌘H" },
  { label: "Dashboard", shortcut: "⌘D" },
  { label: "Projects", shortcut: "⌘P" },
  { label: "Settings", shortcut: "⌘," },
];

export default function CommandKeyboard() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lastAction, setLastAction] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        setLastAction(`Navigated ${e.key === "ArrowUp" ? "up" : "down"}`);
        setTimeout(() => setLastAction(null), 2000);
      } else if (e.key === "Enter") {
        setLastAction("Item selected");
        setTimeout(() => setLastAction(null), 2000);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="space-y-4">
      <Command className="rounded-lg border shadow-md max-w-md">
        <CommandInput placeholder="Try keyboard navigation..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {navigationItems.map((item, index) => (
              <CommandItem
                key={item.label}
                onSelect={() => {
                  setSelectedIndex(index);
                  setLastAction(`Selected ${item.label}`);
                  setTimeout(() => setLastAction(null), 2000);
                }}
              >
                <span>{item.label}</span>
                <CommandShortcut>{item.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Keyboard Shortcuts">
            {keyboardShortcuts.map((shortcut) => {
              const Icon = shortcut.icon;
              return (
                <CommandItem key={shortcut.key}>
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{shortcut.description}</span>
                  <CommandShortcut>{shortcut.key}</CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
      
      {lastAction && (
        <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
          Last action: {lastAction}
        </div>
      )}
    </div>
  );
}