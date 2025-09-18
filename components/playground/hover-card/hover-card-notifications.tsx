"use client";

import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell,
  Check,
  X,
  MessageSquare,
  Heart,
  UserPlus,
  ShoppingCart,
  AlertTriangle,
  Info,
  Gift,
  Calendar,
  Clock,
  MoreHorizontal
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "message",
    title: "New message from Sarah",
    description: "Hey! I've reviewed your proposal and have some feedback...",
    time: "2 minutes ago",
    read: false,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    sender: "Sarah Chen",
    icon: MessageSquare,
    color: "blue",
    actions: ["Reply", "Mark as read"]
  },
  {
    id: 2,
    type: "like",
    title: "Your post received 15 new likes",
    description: "Your recent article about React best practices is trending!",
    time: "1 hour ago",
    read: false,
    avatar: null,
    sender: null,
    icon: Heart,
    color: "red",
    actions: ["View post", "Share"]
  },
  {
    id: 3,
    type: "follow",
    title: "3 new followers",
    description: "Alex Johnson, Maria Garcia, and David Kim started following you",
    time: "3 hours ago",
    read: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    sender: "Alex Johnson",
    icon: UserPlus,
    color: "green",
    actions: ["View profiles", "Follow back"]
  },
  {
    id: 4,
    type: "order",
    title: "Order #1234 has been shipped",
    description: "Your wireless headphones are on the way! Expected delivery: Tomorrow",
    time: "6 hours ago",
    read: true,
    avatar: null,
    sender: null,
    icon: ShoppingCart,
    color: "purple",
    actions: ["Track package", "View order"]
  },
  {
    id: 5,
    type: "warning",
    title: "Security alert",
    description: "New login detected from San Francisco, CA. Was this you?",
    time: "1 day ago",
    read: false,
    avatar: null,
    sender: null,
    icon: AlertTriangle,
    color: "orange",
    actions: ["Secure account", "Not me"]
  },
  {
    id: 6,
    type: "info",
    title: "System maintenance scheduled",
    description: "We'll be performing maintenance on Sunday, 2 AM - 4 AM EST",
    time: "2 days ago",
    read: true,
    avatar: null,
    sender: null,
    icon: Info,
    color: "blue",
    actions: ["Learn more", "Set reminder"]
  }
];

const getIconColor = (color: string, read: boolean) => {
  const opacity = read ? "opacity-60" : "";
  switch (color) {
    case "blue": return `text-blue-600 ${opacity}`;
    case "red": return `text-red-600 ${opacity}`;
    case "green": return `text-green-600 ${opacity}`;
    case "purple": return `text-purple-600 ${opacity}`;
    case "orange": return `text-orange-600 ${opacity}`;
    default: return `text-gray-600 ${opacity}`;
  }
};

const getBgColor = (color: string) => {
  switch (color) {
    case "blue": return "bg-blue-100";
    case "red": return "bg-red-100";
    case "green": return "bg-green-100";
    case "purple": return "bg-purple-100";
    case "orange": return "bg-orange-100";
    default: return "bg-gray-100";
  }
};

export default function HoverCardNotifications() {
  const [readStates, setReadStates] = useState<Record<number, boolean>>(
    notifications.reduce((acc, notif) => ({ ...acc, [notif.id]: notif.read }), {} as Record<number, boolean>)
  );

  const toggleRead = (notificationId: number) => {
    setReadStates(prev => ({ ...prev, [notificationId]: !prev[notificationId] }));
  };

  const unreadCount = Object.values(readStates).filter(read => !read).length;

  return (
    <div className="space-y-8 p-8">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Notification Center</h3>
        <p className="text-sm text-muted-foreground">
          Hover over notifications to see details and quick actions
        </p>
      </div>

      <div className="max-w-md mx-auto">
        {/* Notification Bell */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Button variant="outline" size="lg" className="h-12 w-12 rounded-full">
              <Bell className="h-6 w-6" />
            </Button>
            {unreadCount > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
                variant="destructive"
              >
                {unreadCount}
              </Badge>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            const isRead = readStates[notification.id];
            
            return (
              <HoverCard key={notification.id}>
                <HoverCardTrigger asChild>
                  <div className="cursor-pointer group">
                    <div className={`p-4 rounded-lg border transition-all duration-200 ${
                      isRead 
                        ? 'bg-card hover:bg-muted/50' 
                        : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    }`}>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${getBgColor(notification.color)}`}>
                          <Icon className={`h-4 w-4 ${getIconColor(notification.color, isRead)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={`font-medium text-sm ${isRead ? 'text-muted-foreground' : 'text-foreground'}`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center gap-1">
                              {!isRead && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {notification.time}
                              </span>
                            </div>
                          </div>
                          <p className={`text-sm mt-1 line-clamp-2 ${
                            isRead ? 'text-muted-foreground' : 'text-muted-foreground'
                          }`}>
                            {notification.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80" side="right">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${getBgColor(notification.color)}`}>
                        <Icon className={`h-5 w-5 ${getIconColor(notification.color, false)}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{notification.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                          {!isRead && (
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => toggleRead(notification.id)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Sender Info */}
                    {notification.sender && (
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={notification.avatar || ""} alt={notification.sender} />
                          <AvatarFallback className="text-xs">
                            {notification.sender.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{notification.sender}</div>
                          <div className="text-xs text-muted-foreground">
                            {notification.type === "message" ? "Sent you a message" :
                             notification.type === "follow" ? "Started following you" :
                             "Interacted with your content"}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Full Description */}
                    <div className="space-y-2">
                      <p className="text-sm leading-relaxed">{notification.description}</p>
                      
                      {/* Additional Context */}
                      {notification.type === "order" && (
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-2 text-green-700">
                            <Gift className="h-4 w-4" />
                            <span className="text-sm font-medium">Tracking: TRK123456789</span>
                          </div>
                        </div>
                      )}
                      
                      {notification.type === "warning" && (
                        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <div className="text-orange-700 text-sm">
                            <strong>Location:</strong> San Francisco, CA<br />
                            <strong>Device:</strong> Chrome on macOS<br />
                            <strong>IP:</strong> 192.168.1.1
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {notification.actions.map((action, index) => (
                        <Button 
                          key={index}
                          variant={index === 0 ? "default" : "outline"} 
                          size="sm"
                          className="flex-1"
                        >
                          {action}
                        </Button>
                      ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex justify-between items-center pt-2 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRead(notification.id)}
                        className="text-xs"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        {isRead ? "Mark unread" : "Mark read"}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                        <X className="h-3 w-3 mr-1" />
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}