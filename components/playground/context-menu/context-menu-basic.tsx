"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";
import { Card } from "@/components/ui/card";

export default function ContextMenuBasic() {
  return (
    <div className="flex items-center justify-center p-8">
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Card className="w-64 h-32 flex items-center justify-center cursor-pointer border-dashed border-2 hover:border-primary transition-colors">
            <p className="text-sm text-muted-foreground">
              Right click here to open context menu
            </p>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem>
            Profile
            <ContextMenuShortcut>⇧⌘P</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Billing
            <ContextMenuShortcut>⌘B</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Settings
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            Keyboard shortcuts
            <ContextMenuShortcut>⌘K</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}