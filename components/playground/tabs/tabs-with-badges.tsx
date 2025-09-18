import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageSquare, Phone, Calendar } from "lucide-react"

export default function TabsWithBadges() {
  return (
    <Tabs defaultValue="inbox" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="inbox" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Inbox
          <Badge variant="destructive" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
            12
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="messages" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Messages
          <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
            3
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="calls" className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          Calls
          <Badge variant="outline" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
            7
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="calendar" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Calendar
          <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
            2
          </Badge>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="inbox">
        <div className="p-6 border rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Inbox
            </h3>
            <Badge variant="destructive">12 unread</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            You have 12 unread emails in your inbox. Click to view and manage your messages.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="messages">
        <div className="p-6 border rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Messages
            </h3>
            <Badge variant="secondary">3 new</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            You have 3 new direct messages from your team members.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="calls">
        <div className="p-6 border rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Calls
            </h3>
            <Badge variant="outline">7 missed</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            You have 7 missed calls. Review your call history and return important calls.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="calendar">
        <div className="p-6 border rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Calendar
            </h3>
            <Badge>2 upcoming</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            You have 2 upcoming events today. Check your schedule and prepare for meetings.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}