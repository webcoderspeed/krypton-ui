"use client";

import { useState, useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Globe,
  Search,
  Star,
  TrendingUp,
} from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    title: "Popular repositories",
    description: "Trending on GitHub",
    icon: TrendingUp,
  },
  {
    id: "2",
    title: "Search the web",
    description: "Find anything online",
    icon: Globe,
  },
  {
    id: "3",
    title: "Starred items",
    description: "Your favorite content",
    icon: Star,
  },
  {
    id: "4",
    title: "Advanced search",
    description: "More search options",
    icon: Search,
  },
];

export default function CommandLoading() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length > 0) {
      setLoading(true);
      setResults([]);
      
      // Simulate API call
      const timer = setTimeout(() => {
        setResults(mockResults.filter(result => 
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase())
        ));
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <Command className="rounded-lg border shadow-md max-w-md">
      <CommandInput
        placeholder="Search for anything..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        {loading ? (
          <CommandGroup heading="Searching...">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2 px-2 py-1.5">
                <Skeleton className="h-4 w-4 rounded" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </CommandGroup>
        ) : results.length > 0 ? (
          <CommandGroup heading="Results">
            {results.map((result) => {
              const Icon = result.icon;
              return (
                <CommandItem key={result.id}>
                  <Icon className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{result.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {result.description}
                    </span>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ) : query.length > 0 ? (
          <CommandEmpty>No results found for &quot;{query}&quot;.</CommandEmpty>
        ) : (
          <CommandEmpty>Start typing to search...</CommandEmpty>
        )}
      </CommandList>
    </Command>
  );
}