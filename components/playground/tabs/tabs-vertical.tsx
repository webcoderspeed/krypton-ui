import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsVertical() {
  return (
    <Tabs defaultValue="general" orientation="vertical" className="flex w-[600px] h-[400px]">
      <TabsList className="flex flex-col h-full w-[200px] p-1">
        <TabsTrigger value="general" className="w-full justify-start">
          General
        </TabsTrigger>
        <TabsTrigger value="security" className="w-full justify-start">
          Security
        </TabsTrigger>
        <TabsTrigger value="integrations" className="w-full justify-start">
          Integrations
        </TabsTrigger>
        <TabsTrigger value="support" className="w-full justify-start">
          Support
        </TabsTrigger>
        <TabsTrigger value="organizations" className="w-full justify-start">
          Organizations
        </TabsTrigger>
        <TabsTrigger value="advanced" className="w-full justify-start">
          Advanced
        </TabsTrigger>
      </TabsList>
      <div className="flex-1 ml-4">
        <TabsContent value="general" className="mt-0">
          <div className="p-6 border rounded-lg h-full">
            <h3 className="text-lg font-semibold mb-4">General Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure your general account settings and preferences.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="security" className="mt-0">
          <div className="p-6 border rounded-lg h-full">
            <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
            <p className="text-sm text-muted-foreground">
              Manage your account security, two-factor authentication, and login preferences.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="integrations" className="mt-0">
          <div className="p-6 border rounded-lg h-full">
            <h3 className="text-lg font-semibold mb-4">Integrations</h3>
            <p className="text-sm text-muted-foreground">
              Connect and manage third-party integrations and API access.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="support" className="mt-0">
          <div className="p-6 border rounded-lg h-full">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <p className="text-sm text-muted-foreground">
              Get help, contact support, and access documentation.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="organizations" className="mt-0">
          <div className="p-6 border rounded-lg h-full">
            <h3 className="text-lg font-semibold mb-4">Organizations</h3>
            <p className="text-sm text-muted-foreground">
              Manage your organization settings and team members.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="advanced" className="mt-0">
          <div className="p-6 border rounded-lg h-full">
            <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure advanced options and developer settings.
            </p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  )
}