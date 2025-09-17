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
} from "@/components/ui/command";
import {
  ChevronRight,
  ArrowLeft,
  Folder,
  File,
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "files",
    label: "Files",
    icon: Folder,
    children: [
      { id: "recent", label: "Recent Files", icon: File },
      { id: "favorites", label: "Favorites", icon: File },
      { id: "shared", label: "Shared with me", icon: File },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    children: [
      { id: "profile", label: "Profile", icon: User },
      { id: "notifications", label: "Notifications", icon: Bell },
      { id: "privacy", label: "Privacy & Security", icon: Shield },
      { id: "appearance", label: "Appearance", icon: Palette },
      { id: "language", label: "Language & Region", icon: Globe },
    ],
  },
];

export default function CommandNested() {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

  const getCurrentItems = (): MenuItem[] => {
    let items = menuItems;
    for (const pathSegment of currentPath) {
      const item = items.find((i) => i.id === pathSegment);
      if (item?.children) {
        items = item.children;
      }
    }
    return items;
  };

  const navigateToItem = (item: MenuItem) => {
    if (item.children) {
      setCurrentPath([...currentPath, item.id]);
      setBreadcrumb([...breadcrumb, item.label]);
    }
  };

  const navigateBack = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
      setBreadcrumb(breadcrumb.slice(0, -1));
    }
  };

  const navigateToRoot = () => {
    setCurrentPath([]);
    setBreadcrumb([]);
  };

  const currentItems = getCurrentItems();
  const canGoBack = currentPath.length > 0;

  return (
    <Command className="rounded-lg border shadow-md max-w-md">
      <CommandInput 
        placeholder={`Search ${breadcrumb.length > 0 ? breadcrumb.join(' > ') : 'menu'}...`} 
      />
      <CommandList>
        <CommandEmpty>No items found.</CommandEmpty>
        
        {breadcrumb.length > 0 && (
          <>
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={navigateBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span>Back</span>
              </CommandItem>
              <CommandItem onSelect={navigateToRoot}>
                <Folder className="mr-2 h-4 w-4" />
                <span>Home</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
          </>
        )}
        
        <CommandGroup 
          heading={breadcrumb.length > 0 ? breadcrumb[breadcrumb.length - 1] : "Main Menu"}
        >
          {currentItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            
            return (
              <CommandItem 
                key={item.id} 
                onSelect={() => navigateToItem(item)}
                className={hasChildren ? "cursor-pointer" : ""}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
                {hasChildren && (
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                )}
              </CommandItem>
            );
          })}
        </CommandGroup>
        
        {breadcrumb.length > 0 && (
          <>
            <CommandSeparator />
            <div className="px-2 py-1.5 text-xs text-muted-foreground">
              Path: Home {breadcrumb.length > 0 && ' > ' + breadcrumb.join(' > ')}
            </div>
          </>
        )}
      </CommandList>
    </Command>
  );
}