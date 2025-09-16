import { Badge } from "@/components/ui/badge";

export default function StatusIndicators() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Order Status:</span>
        <Badge variant="default">Processing</Badge>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Payment:</span>
        <Badge variant="secondary">Pending</Badge>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Delivery:</span>
        <Badge variant="destructive">Failed</Badge>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Review:</span>
        <Badge variant="outline">Draft</Badge>
      </div>
    </div>
  );
}