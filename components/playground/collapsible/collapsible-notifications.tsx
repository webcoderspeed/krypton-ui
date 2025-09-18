"use client"

import { useState } from "react"
import { ChevronDown, Bell, Check, X, AlertCircle, Info, CheckCircle } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type NotificationType = "info" | "success" | "warning" | "error"

interface Notification {
  id: number
  type: NotificationType
  title: string
  message: string
  time: string
  read: boolean
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "success",
    title: "Payment Successful",
    message: "Your payment of $99.99 has been processed successfully.",
    time: "2 min ago",
    read: false
  },
  {
    id: 2,
    type: "info",
    title: "New Feature Available",
    message: "Check out our new dashboard analytics feature.",
    time: "1 hour ago",
    read: false
  },
  {
    id: 3,
    type: "warning",
    title: "Storage Almost Full",
    message: "You're using 85% of your storage space. Consider upgrading.",
    time: "3 hours ago",
    read: true
  },
  {
    id: 4,
    type: "error",
    title: "Failed to Sync",
    message: "Unable to sync your data. Please check your connection.",
    time: "1 day ago",
    read: true
  }
]

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "info":
      return <Info className="h-4 w-4 text-blue-500" />
    case "warning":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />
    case "error":
      return <AlertCircle className="h-4 w-4 text-red-500" />
  }
}

export default function CollapsibleNotifications() {
  const [isOpen, setIsOpen] = useState(false)
  const [notificationList, setNotificationList] = useState(notifications)

  const unreadCount = notificationList.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const removeNotification = (id: number) => {
    setNotificationList(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="w-[400px] border rounded-lg">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between p-4 h-auto"
          >
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5" />
              <span className="font-semibold">Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="h-5 min-w-5 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="p-4 pt-0 space-y-3">
            {unreadCount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Mark all as read
                </Button>
              </div>
            )}
            
            {notificationList.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No notifications
              </p>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {notificationList.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={cn(
                      "p-3 transition-colors",
                      !notification.read && "bg-blue-50 border-blue-200"
                    )}
                  >
                    <div className="flex items-start space-x-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">{notification.title}</h4>
                          <div className="flex items-center space-x-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                              onClick={() => removeNotification(notification.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}