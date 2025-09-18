"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Card } from "@/components/ui/card";
import {
  Copy,
  Download,
  Edit,
  Eye,
  FileText,
  Share,
  Trash2,
} from "lucide-react";

export default function ContextMenuFile() {
  return (
    <div className="flex items-center justify-center p-8">
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Card className="w-64 h-40 flex flex-col items-center justify-center cursor-pointer border hover:border-primary transition-colors p-4">
            <FileText className="h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Document.pdf</p>
            <p className="text-xs text-muted-foreground">Right click for options</p>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem>
            <Eye className="mr-2 h-4 w-4" />
            Open
            <ContextMenuShortcut>⌘O</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            Edit
            <ContextMenuShortcut>⌘E</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <Copy className="mr-2 h-4 w-4" />
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Share className="mr-2 h-4 w-4" />
            Share
            <ContextMenuShortcut>⌘⇧S</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Download className="mr-2 h-4 w-4" />
            Download
            <ContextMenuShortcut>⌘D</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
            <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}