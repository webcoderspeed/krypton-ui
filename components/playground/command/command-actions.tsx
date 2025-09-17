"use client";

import { useState } from "react";
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
  Copy,
  Download,
  Edit,
  Share,
  Trash2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

const actions = [
  {
    id: "copy",
    label: "Copy",
    icon: Copy,
    shortcut: "⌘C",
    action: () => toast.success("Copied to clipboard"),
  },
  {
    id: "edit",
    label: "Edit",
    icon: Edit,
    shortcut: "⌘E",
    action: () => toast.info("Opening editor"),
  },
  {
    id: "share",
    label: "Share",
    icon: Share,
    shortcut: "⌘S",
    action: () => toast.info("Opening share dialog"),
  },
  {
    id: "download",
    label: "Download",
    icon: Download,
    shortcut: "⌘D",
    action: () => toast.success("Download started"),
  },
  {
    id: "upload",
    label: "Upload",
    icon: Upload,
    shortcut: "⌘U",
    action: () => toast.info("Opening file picker"),
  },
  {
    id: "delete",
    label: "Delete",
    icon: Trash2,
    shortcut: "⌘⌫",
    action: () => toast.error("Item deleted"),
  },
];

export default function CommandActions() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleSelect = (actionId: string) => {
    const action = actions.find((a) => a.id === actionId);
    if (action) {
      setSelectedAction(actionId);
      action.action();
      setTimeout(() => setSelectedAction(null), 1000);
    }
  };

  return (
    <Command className="rounded-lg border shadow-md max-w-md">
      <CommandInput placeholder="Search actions..." />
      <CommandList>
        <CommandEmpty>No actions found.</CommandEmpty>
        <CommandGroup heading="File Actions">
          {actions.slice(0, 3).map((action) => {
            const Icon = action.icon;
            return (
              <CommandItem
                key={action.id}
                onSelect={() => handleSelect(action.id)}
                className={selectedAction === action.id ? "bg-accent" : ""}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{action.label}</span>
                <CommandShortcut>{action.shortcut}</CommandShortcut>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Other Actions">
          {actions.slice(3).map((action) => {
            const Icon = action.icon;
            return (
              <CommandItem
                key={action.id}
                onSelect={() => handleSelect(action.id)}
                className={selectedAction === action.id ? "bg-accent" : ""}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{action.label}</span>
                <CommandShortcut>{action.shortcut}</CommandShortcut>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}