import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle, AlertTriangle, X } from "lucide-react";

export default function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge className="flex items-center gap-1">
        <Star className="h-3 w-3" />
        Featured
      </Badge>
      <Badge variant="secondary" className="flex items-center gap-1">
        <CheckCircle className="h-3 w-3" />
        Verified
      </Badge>
      <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        Warning
      </Badge>
      <Badge variant="outline" className="flex items-center gap-1">
        <X className="h-3 w-3" />
        Closed
      </Badge>
    </div>
  );
}