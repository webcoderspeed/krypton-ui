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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Home, 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight 
} from "lucide-react";

export default function DrawerMobileMenu() {
  const menuItems = [
    { icon: Home, label: "Home", href: "/", badge: null },
    { icon: Search, label: "Discover", href: "/discover", badge: null },
    { icon: ShoppingBag, label: "Orders", href: "/orders", badge: "3" },
    { icon: Heart, label: "Wishlist", href: "/wishlist", badge: "12" },
    { icon: User, label: "Profile", href: "/profile", badge: null },
  ];

  const secondaryItems = [
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: HelpCircle, label: "Help & Support", href: "/help" },
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerDescription>
            Navigate through the app
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
              JD
            </div>
            <div>
              <h3 className="font-medium">John Doe</h3>
              <p className="text-sm text-muted-foreground">john@example.com</p>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="space-y-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="w-full justify-between h-12 px-3"
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Button>
              );
            })}
          </div>

          <Separator />

          {/* Secondary Navigation */}
          <div className="space-y-1">
            {secondaryItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="w-full justify-between h-12 px-3"
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Button>
              );
            })}
          </div>

          <Separator />

          {/* Sign Out */}
          <Button variant="ghost" className="w-full justify-start h-12 px-3 text-destructive">
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close Menu</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}