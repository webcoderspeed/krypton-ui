import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  File,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Code,
  Database,
  FolderOpen,
  Upload,
  Download,
  Scissors,
  Copy,
  Clipboard
} from "lucide-react"

export default function DropdownMenuFileOperations() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <File className="mr-2 h-4 w-4" />
          File
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>File Operations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <FileText className="mr-2 h-4 w-4" />
            <span>New</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Text File
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Code className="mr-2 h-4 w-4" />
              Code File
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FolderOpen className="mr-2 h-4 w-4" />
              Folder
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Database className="mr-2 h-4 w-4" />
              Database
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        <DropdownMenuItem>
          <FolderOpen className="mr-2 h-4 w-4" />
          <span>Open</span>
          <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <Upload className="mr-2 h-4 w-4" />
          <span>Upload</span>
          <DropdownMenuShortcut>⌘U</DropdownMenuShortcut>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          <Scissors className="mr-2 h-4 w-4" />
          <span>Cut</span>
          <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          <span>Copy</span>
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <Clipboard className="mr-2 h-4 w-4" />
          <span>Paste</span>
          <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Download className="mr-2 h-4 w-4" />
            <span>Export As</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              PDF
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Image className="mr-2 h-4 w-4" />
              PNG
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              ZIP
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Code className="mr-2 h-4 w-4" />
              JSON
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}