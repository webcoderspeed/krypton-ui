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
  Clock,
  Star,
  Hash,
  AtSign,
  FileText,
  Users,
  MessageSquare,
  Calendar,
  Bookmark,
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  category: string;
  lastUsed?: Date;
  isFavorite?: boolean;
}

const allItems: CommandItem[] = [
  {
    id: "new-doc",
    label: "New Document",
    description: "Create a new document",
    icon: FileText,
    shortcut: "⌘N",
    category: "actions",
    lastUsed: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "team-chat",
    label: "Team Chat",
    description: "Open team discussion",
    icon: MessageSquare,
    shortcut: "⌘T",
    category: "navigation",
    isFavorite: true,
    lastUsed: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
  {
    id: "calendar",
    label: "Calendar",
    description: "View your schedule",
    icon: Calendar,
    shortcut: "⌘C",
    category: "navigation",
    isFavorite: true,
  },
  {
    id: "bookmarks",
    label: "Bookmarks",
    description: "Saved items",
    icon: Bookmark,
    category: "navigation",
    lastUsed: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: "mention-user",
    label: "Mention User",
    description: "Tag someone in a comment",
    icon: AtSign,
    category: "actions",
  },
  {
    id: "add-tag",
    label: "Add Tag",
    description: "Organize with tags",
    icon: Hash,
    category: "actions",
  },
  {
    id: "team-members",
    label: "Team Members",
    description: "View team directory",
    icon: Users,
    category: "navigation",
  },
];

export default function CommandAdvanced() {
  const [items, setItems] = useState(allItems);
  const [query, setQuery] = useState("");

  const toggleFavorite = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
  };

  const updateLastUsed = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, lastUsed: new Date() } : item
    ));
  };

  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.description?.toLowerCase().includes(query.toLowerCase())
  );

  const recentItems = items
    .filter(item => item.lastUsed)
    .sort((a, b) => (b.lastUsed?.getTime() || 0) - (a.lastUsed?.getTime() || 0))
    .slice(0, 3);

  const favoriteItems = items.filter(item => item.isFavorite);

  const actionItems = filteredItems.filter(item => item.category === "actions");
  const navigationItems = filteredItems.filter(item => item.category === "navigation");

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Command className="rounded-lg border shadow-md max-w-md">
      <CommandInput 
        placeholder="Search commands, pages, and more..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        {query === "" && recentItems.length > 0 && (
          <>
            <CommandGroup heading="Recent">
              {recentItems.map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem 
                    key={`recent-${item.id}`}
                    onSelect={() => updateLastUsed(item.id)}
                  >
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-col flex-1">
                      <span>{item.label}</span>
                      {item.lastUsed && (
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(item.lastUsed)}
                        </span>
                      )}
                    </div>
                    {item.shortcut && (
                      <CommandShortcut>{item.shortcut}</CommandShortcut>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}
        
        {query === "" && favoriteItems.length > 0 && (
          <>
            <CommandGroup heading="Favorites">
              {favoriteItems.map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem 
                    key={`favorite-${item.id}`}
                    onSelect={() => updateLastUsed(item.id)}
                  >
                    <Star className="mr-2 h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Icon className="mr-2 h-4 w-4" />
                    <div className="flex flex-col flex-1">
                      <span>{item.label}</span>
                      {item.description && (
                        <span className="text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      )}
                    </div>
                    {item.shortcut && (
                      <CommandShortcut>{item.shortcut}</CommandShortcut>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}
        
        {actionItems.length > 0 && (
          <CommandGroup heading="Actions">
            {actionItems.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem 
                  key={item.id}
                  onSelect={() => updateLastUsed(item.id)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <div className="flex flex-col flex-1">
                    <span>{item.label}</span>
                    {item.description && (
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="ml-2 p-1 hover:bg-accent rounded"
                  >
                    <Star 
                      className={`h-3 w-3 ${
                        item.isFavorite 
                          ? "text-yellow-500 fill-yellow-500" 
                          : "text-muted-foreground"
                      }`} 
                    />
                  </button>
                  {item.shortcut && (
                    <CommandShortcut>{item.shortcut}</CommandShortcut>
                  )}
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}
        
        {navigationItems.length > 0 && actionItems.length > 0 && (
          <CommandSeparator />
        )}
        
        {navigationItems.length > 0 && (
          <CommandGroup heading="Navigation">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem 
                  key={item.id}
                  onSelect={() => updateLastUsed(item.id)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <div className="flex flex-col flex-1">
                    <span>{item.label}</span>
                    {item.description && (
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="ml-2 p-1 hover:bg-accent rounded"
                  >
                    <Star 
                      className={`h-3 w-3 ${
                        item.isFavorite 
                          ? "text-yellow-500 fill-yellow-500" 
                          : "text-muted-foreground"
                      }`} 
                    />
                  </button>
                  {item.shortcut && (
                    <CommandShortcut>{item.shortcut}</CommandShortcut>
                  )}
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}