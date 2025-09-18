import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Settings, Bell, Shield } from "lucide-react"

export default function TabsWithIcons() {
  return (
    <Tabs defaultValue="profile" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Security
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </h3>
          <p className="text-sm text-muted-foreground">
            View and edit your personal profile information.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Application Settings
          </h3>
          <p className="text-sm text-muted-foreground">
            Configure your application preferences and behavior.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage how and when you receive notifications.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="security">
        <div className="p-6 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage your account security and privacy settings.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}