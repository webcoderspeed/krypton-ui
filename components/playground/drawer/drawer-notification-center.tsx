import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bell, Check, X, Mail, ShoppingBag, Heart, MessageSquare } from "lucide-react";

export default function DrawerNotificationCenter() {
  const notifications = [
    {
      id: 1,
      type: "message",
      icon: MessageSquare,
      title: "New message from Sarah",
      description: "Hey! Are we still on for lunch tomorrow?",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      type: "order",
      icon: ShoppingBag,
      title: "Order shipped",
      description: "Your order #12345 has been shipped and is on its way.",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      type: "like",
      icon: Heart,
      title: "Someone liked your post",
      description: "Your photo received 15 new likes.",
      time: "3 hours ago",
      unread: false,
    },
    {
      id: 4,
      type: "email",
      icon: Mail,
      title: "Weekly newsletter",
      description: "Check out this week&apos;s featured articles and updates.",
      time: "1 day ago",
      unread: false,
    },
    {
      id: 5,
      type: "message",
      icon: MessageSquare,
      title: "Team meeting reminder",
      description: "Don&apos;t forget about the team standup at 2 PM today.",
      time: "2 days ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="relative">
          <Bell className="h-4 w-4 mr-2" />
          Notifications
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>
            Stay updated with your latest activities
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-1 max-h-[60vh] overflow-y-auto">
          {notifications.map((notification, index) => {
            const IconComponent = notification.icon;
            return (
              <div key={notification.id}>
                <div className={`flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors ${
                  notification.unread ? 'bg-muted/30' : ''
                }`}>
                  <div className={`p-2 rounded-full ${
                    notification.type === 'message' ? 'bg-blue-100 text-blue-600' :
                    notification.type === 'order' ? 'bg-green-100 text-green-600' :
                    notification.type === 'like' ? 'bg-red-100 text-red-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-medium ${notification.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.title}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {notification.unread && (
                          <div className="h-2 w-2 bg-blue-600 rounded-full" />
                        )}
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Check className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                {index < notifications.length - 1 && <Separator className="my-1" />}
              </div>
            );
          })}
        </div>
        <DrawerFooter>
          <Button variant="outline">Mark All as Read</Button>
          <DrawerClose asChild>
            <Button variant="ghost">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}