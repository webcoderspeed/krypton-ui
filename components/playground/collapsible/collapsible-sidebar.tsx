"use client"

import { useState } from "react"
import { 
  ChevronDown, 
  Home, 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  Shield, 
  CreditCard,
  User,
  UserPlus,
  UserCheck
} from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <Home className="h-4 w-4" />
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart3 className="h-4 w-4" />
  },
  {
    id: "users",
    label: "User Management",
    icon: <Users className="h-4 w-4" />,
    children: [
      {
        id: "all-users",
        label: "All Users",
        icon: <User className="h-4 w-4" />
      },
      {
        id: "add-user",
        label: "Add User",
        icon: <UserPlus className="h-4 w-4" />
      },
      {
        id: "user-roles",
        label: "User Roles",
        icon: <UserCheck className="h-4 w-4" />
      }
    ]
  },
  {
    id: "content",
    label: "Content",
    icon: <FileText className="h-4 w-4" />
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-4 w-4" />,
    children: [
      {
        id: "general",
        label: "General",
        icon: <Settings className="h-4 w-4" />
      },
      {
        id: "security",
        label: "Security",
        icon: <Shield className="h-4 w-4" />
      },
      {
        id: "billing",
        label: "Billing",
        icon: <CreditCard className="h-4 w-4" />
      }
    ]
  }
]

export default function CollapsibleSidebar() {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  const [activeItem, setActiveItem] = useState("dashboard")

  const toggleMenu = (id: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleItemClick = (id: string) => {
    setActiveItem(id)
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isOpen = openMenus[item.id]
    const isActive = activeItem === item.id

    if (hasChildren) {
      return (
        <div key={item.id}>
          <Collapsible open={isOpen} onOpenChange={() => toggleMenu(item.id)}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-between h-auto p-3",
                  level > 0 && "ml-4",
                  isActive && "bg-accent"
                )}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              {item.children?.map(child => renderMenuItem(child, level + 1))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      )
    }

    return (
      <Button
        key={item.id}
        variant="ghost"
        className={cn(
          "w-full justify-start h-auto p-3",
          level > 0 && "ml-8",
          isActive && "bg-accent"
        )}
        onClick={() => handleItemClick(item.id)}
      >
        <div className="flex items-center space-x-3">
          {item.icon}
          <span className="text-sm font-medium">{item.label}</span>
        </div>
      </Button>
    )
  }

  return (
    <div className="w-[280px] h-[500px] border rounded-lg p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold px-3">Admin Panel</h2>
        <p className="text-sm text-muted-foreground px-3">Manage your application</p>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map(item => renderMenuItem(item))}
      </nav>
      
      <div className="mt-6 pt-6 border-t">
        <div className="px-3 py-2">
          <p className="text-xs text-muted-foreground">Active: {activeItem}</p>
        </div>
      </div>
    </div>
  )
}