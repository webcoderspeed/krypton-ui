import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Lock, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function TabsDisabled() {
  return (
    <Tabs defaultValue="completed" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="completed" className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Completed
          <Badge variant="secondary" className="ml-1">✓</Badge>
        </TabsTrigger>
        <TabsTrigger value="in-progress" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          In Progress
          <Badge variant="outline" className="ml-1">2</Badge>
        </TabsTrigger>
        <TabsTrigger value="pending" disabled className="flex items-center gap-2 opacity-50">
          <AlertCircle className="h-4 w-4" />
          Pending
          <Badge variant="destructive" className="ml-1">!</Badge>
        </TabsTrigger>
        <TabsTrigger value="locked" disabled className="flex items-center gap-2 opacity-50">
          <Lock className="h-4 w-4" />
          Locked
          <Badge variant="outline" className="ml-1">🔒</Badge>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="completed">
        <div className="p-6 border rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold">Completed Tasks</h3>
            <Badge variant="secondary">Available</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            View all your completed tasks and achievements.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Project setup completed</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Documentation written</span>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="in-progress">
        <div className="p-6 border rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">In Progress Tasks</h3>
            <Badge variant="outline">Available</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Tasks that are currently being worked on.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Testing components</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Code review</span>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="pending">
        <div className="p-6 border rounded-lg opacity-50">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-semibold">Pending Tasks</h3>
            <Badge variant="destructive">Disabled</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            This tab is disabled because there are unresolved dependencies.
          </p>
        </div>
      </TabsContent>
      
      <TabsContent value="locked">
        <div className="p-6 border rounded-lg opacity-50">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold">Locked Content</h3>
            <Badge variant="outline">Disabled</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            This content is locked and requires special permissions to access.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}