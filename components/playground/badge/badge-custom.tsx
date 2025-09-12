import { Badge } from "@/components/ui/badge"

export default function BadgeCustom() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Custom Colors</h3>
        <div className="flex gap-2">
          <Badge className="bg-blue-500 text-white hover:bg-blue-600">Blue</Badge>
          <Badge className="bg-green-500 text-white hover:bg-green-600">Green</Badge>
          <Badge className="bg-purple-500 text-white hover:bg-purple-600">Purple</Badge>
          <Badge className="bg-orange-500 text-white hover:bg-orange-600">Orange</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Custom Sizes</h3>
        <div className="flex items-center gap-2">
          <Badge className="text-xs px-2 py-0.5">Small</Badge>
          <Badge className="text-sm px-3 py-1">Medium</Badge>
          <Badge className="text-base px-4 py-1.5">Large</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">With Icons</h3>
        <div className="flex gap-2">
          <Badge className="gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Online
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            Away
          </Badge>
          <Badge variant="destructive" className="gap-1">
            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
            Offline
          </Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Rounded Variants</h3>
        <div className="flex gap-2">
          <Badge className="rounded-none">Square</Badge>
          <Badge className="rounded-sm">Small Rounded</Badge>
          <Badge className="rounded-md">Medium Rounded</Badge>
          <Badge className="rounded-full">Pill</Badge>
        </div>
      </div>
    </div>
  )
}