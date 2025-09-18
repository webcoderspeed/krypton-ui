import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Plus } from "lucide-react"

export default function DropdownMenuSubExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Create New
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Create</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Document</DropdownMenuItem>
        <DropdownMenuItem>Spreadsheet</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>More Options</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Presentation</DropdownMenuItem>
            <DropdownMenuItem>Form</DropdownMenuItem>
            <DropdownMenuItem>Drawing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>From Template</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Folder</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}