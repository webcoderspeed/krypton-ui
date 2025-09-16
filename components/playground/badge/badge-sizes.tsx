import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function BadgeSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Badge className={cn("text-xs px-2 py-0.5")}>Small</Badge>
      <Badge>Default</Badge>
      <Badge className={cn("text-sm px-3 py-1")}>Large</Badge>
      <Badge className={cn("text-base px-4 py-1.5")}>Extra Large</Badge>
    </div>
  );
}