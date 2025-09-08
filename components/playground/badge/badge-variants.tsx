import { Badge } from "@/components/ui/badge"

export default function BadgeVariants() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Default</h3>
        <div className="flex gap-2">
          <Badge>Badge</Badge>
          <Badge>New</Badge>
          <Badge>Featured</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Secondary</h3>
        <div className="flex gap-2">
          <Badge variant="secondary">Badge</Badge>
          <Badge variant="secondary">Draft</Badge>
          <Badge variant="secondary">In Progress</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Destructive</h3>
        <div className="flex gap-2">
          <Badge variant="destructive">Badge</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="destructive">Deleted</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Outline</h3>
        <div className="flex gap-2">
          <Badge variant="outline">Badge</Badge>
          <Badge variant="outline">Pending</Badge>
          <Badge variant="outline">Review</Badge>
        </div>
      </div>
    </div>
  )
}