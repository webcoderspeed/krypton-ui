"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Card } from "@/components/ui/card";
import {
  Mail,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

export default function ContextMenuSubmenu() {
  return (
    <div className="flex items-center justify-center p-8">
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Card className="w-64 h-32 flex items-center justify-center cursor-pointer border-dashed border-2 hover:border-primary transition-colors">
            <p className="text-sm text-muted-foreground">
              Right click for submenu
            </p>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profile
            <ContextMenuShortcut>⇧⌘P</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
            <ContextMenuShortcut>⌘,</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite users
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Email
              </ContextMenuItem>
              <ContextMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                More...
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <Users className="mr-2 h-4 w-4" />
              Team
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <User className="mr-2 h-4 w-4" />
                View Team
              </ContextMenuItem>
              <ContextMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Member
              </ContextMenuItem>
              <ContextMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Team Settings
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}