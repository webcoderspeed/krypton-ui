import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { 
  Plus, 
  FileText, 
  Users, 
  Calendar, 
  Folder, 
  Image, 
  Video,
  MessageSquare,
  MoreHorizontal 
} from "lucide-react"

export default function PopoverQuickActions() {
  const actions = [
    { icon: FileText, label: "New Document", shortcut: "⌘N" },
    { icon: Folder, label: "New Folder", shortcut: "⌘⇧N" },
    { icon: Users, label: "Invite People", shortcut: "⌘I" },
    { icon: Calendar, label: "Schedule Meeting", shortcut: "⌘M" },
  ]

  const mediaActions = [
    { icon: Image, label: "Upload Image" },
    { icon: Video, label: "Upload Video" },
    { icon: MessageSquare, label: "Start Chat" },
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Quick Actions
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="start">
        <div className="grid gap-1">
          <div className="px-2 py-1.5">
            <h4 className="text-sm font-medium">Create New</h4>
          </div>
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="justify-start h-8 px-2"
            >
              <action.icon className="mr-2 h-4 w-4" />
              <span className="flex-1 text-left">{action.label}</span>
              <span className="text-xs text-muted-foreground">
                {action.shortcut}
              </span>
            </Button>
          ))}
          <Separator className="my-1" />
          <div className="px-2 py-1.5">
            <h4 className="text-sm font-medium">Media & Communication</h4>
          </div>
          {mediaActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="justify-start h-8 px-2"
            >
              <action.icon className="mr-2 h-4 w-4" />
              {action.label}
            </Button>
          ))}
          <Separator className="my-1" />
          <Button variant="ghost" className="justify-start h-8 px-2">
            <MoreHorizontal className="mr-2 h-4 w-4" />
            More options...
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}