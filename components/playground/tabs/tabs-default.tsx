import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsDefault() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
          <p className="text-sm text-muted-foreground">
            Make changes to your account here. Click save when you&apos;re done.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Password Settings</h3>
          <p className="text-sm text-muted-foreground">
            Change your password here. After saving, you&apos;ll be logged out.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}