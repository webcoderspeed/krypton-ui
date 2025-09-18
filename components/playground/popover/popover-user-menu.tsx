import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { User, Settings, LogOut, CreditCard, Bell } from "lucide-react"

export default function PopoverUserMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex gap-3 p-2">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">shadcn</p>
            <p className="text-xs leading-none text-muted-foreground">
              m@example.com
            </p>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="grid gap-1">
          <Button variant="ghost" className="justify-start h-8 px-2">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button variant="ghost" className="justify-start h-8 px-2">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </Button>
          <Button variant="ghost" className="justify-start h-8 px-2">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" className="justify-start h-8 px-2">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
        </div>
        <Separator className="my-2" />
        <Button variant="ghost" className="justify-start h-8 px-2 w-full">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </PopoverContent>
    </Popover>
  )
}