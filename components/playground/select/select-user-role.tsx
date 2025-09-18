"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Crown, Settings, Eye } from "lucide-react"

const roles = {
  admin: {
    name: "Administrator",
    description: "Full system access and user management",
    permissions: ["Create", "Read", "Update", "Delete", "Manage Users"],
    icon: Crown,
    color: "destructive" as const
  },
  moderator: {
    name: "Moderator",
    description: "Content moderation and user support",
    permissions: ["Read", "Update", "Moderate Content", "Support Users"],
    icon: Shield,
    color: "default" as const
  },
  editor: {
    name: "Editor",
    description: "Content creation and editing",
    permissions: ["Create", "Read", "Update", "Publish Content"],
    icon: Settings,
    color: "secondary" as const
  },
  viewer: {
    name: "Viewer",
    description: "Read-only access to content",
    permissions: ["Read"],
    icon: Eye,
    color: "outline" as const
  },
  contributor: {
    name: "Contributor",
    description: "Submit content for review",
    permissions: ["Create", "Read", "Submit for Review"],
    icon: Users,
    color: "secondary" as const
  }
}

export default function SelectUserRole() {
  const [selectedRole, setSelectedRole] = useState<string>("")
  
  const getRoleInfo = (roleKey: string) => {
    return roles[roleKey as keyof typeof roles]
  }

  return (
    <div className="w-[450px]">
      <Card>
        <CardHeader>
          <CardTitle>User Role Assignment</CardTitle>
          <CardDescription>
            Assign a role to determine user permissions and access levels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select a user role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Administrative Roles</SelectLabel>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4" />
                    <span>Administrator</span>
                  </div>
                </SelectItem>
                <SelectItem value="moderator">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Moderator</span>
                  </div>
                </SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Content Roles</SelectLabel>
                <SelectItem value="editor">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Editor</span>
                  </div>
                </SelectItem>
                <SelectItem value="contributor">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Contributor</span>
                  </div>
                </SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Basic Access</SelectLabel>
                <SelectItem value="viewer">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>Viewer</span>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          {selectedRole && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  {(() => {
                    const roleInfo = getRoleInfo(selectedRole)
                    const IconComponent = roleInfo.icon
                    return (
                      <>
                        <IconComponent className="h-5 w-5" />
                        <div>
                          <h4 className="font-medium">{roleInfo.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {roleInfo.description}
                          </p>
                        </div>
                      </>
                    )
                  })()}
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Permissions:</p>
                  <div className="flex flex-wrap gap-1">
                    {getRoleInfo(selectedRole).permissions.map((permission, index) => (
                      <Badge 
                        key={index} 
                        variant={getRoleInfo(selectedRole).color}
                        className="text-xs"
                      >
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  ⚠️ Role changes will take effect immediately. Users will be notified of permission updates.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}