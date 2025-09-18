"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  Star,
  Eye,
  Clock
} from "lucide-react"

export default function DropdownMenuSortFilter() {
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [showFavorites, setShowFavorites] = useState(false)
  const [showRecent, setShowRecent] = useState(true)
  const [showHidden, setShowHidden] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Sort & Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ArrowUpDown className="mr-2 h-4 w-4" />
            <span>Sort by</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="date">Date Modified</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="size">Size</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="type">Type</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {sortOrder === "asc" ? (
              <ArrowUp className="mr-2 h-4 w-4" />
            ) : (
              <ArrowDown className="mr-2 h-4 w-4" />
            )}
            <span>Order</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
              <DropdownMenuRadioItem value="asc">
                <ArrowUp className="mr-2 h-4 w-4" />
                Ascending
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="desc">
                <ArrowDown className="mr-2 h-4 w-4" />
                Descending
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuCheckboxItem
          checked={showFavorites}
          onCheckedChange={setShowFavorites}
        >
          <Star className="mr-2 h-4 w-4" />
          Show Favorites Only
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuCheckboxItem
          checked={showRecent}
          onCheckedChange={setShowRecent}
        >
          <Clock className="mr-2 h-4 w-4" />
          Show Recent
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuCheckboxItem
          checked={showHidden}
          onCheckedChange={setShowHidden}
        >
          <Eye className="mr-2 h-4 w-4" />
          Show Hidden Files
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          <Calendar className="mr-2 h-4 w-4" />
          Filter by Date Range
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          Clear All Filters
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}