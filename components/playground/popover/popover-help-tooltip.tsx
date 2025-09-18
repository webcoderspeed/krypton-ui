import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { HelpCircle, ExternalLink, Book, MessageCircle, Mail } from "lucide-react"

export default function PopoverHelpTooltip() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" side="top">
            <div className="grid gap-3">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Password Requirements</h4>
                <p className="text-sm text-muted-foreground">
                  Your password must meet the following criteria:
                </p>
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• At least 8 characters long</li>
                <li>• Contains at least one uppercase letter</li>
                <li>• Contains at least one lowercase letter</li>
                <li>• Contains at least one number</li>
                <li>• Contains at least one special character</li>
              </ul>
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Button variant="ghost" size="sm" className="justify-start h-8">
                  <Book className="mr-2 h-4 w-4" />
                  Security Guide
                  <ExternalLink className="ml-auto h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="justify-start h-8">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Live Chat Support
                </Button>
                <Button variant="ghost" size="sm" className="justify-start h-8">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <input
        id="password"
        type="password"
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Enter your password"
      />
    </div>
  )
}