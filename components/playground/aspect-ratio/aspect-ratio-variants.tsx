import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function AspectRatioVariants() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">16:9 (Widescreen)</h3>
        <div className="w-[200px]">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
            <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
              16:9
            </div>
          </AspectRatio>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">4:3 (Standard)</h3>
        <div className="w-[200px]">
          <AspectRatio ratio={4 / 3} className="bg-muted rounded-md">
            <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
              4:3
            </div>
          </AspectRatio>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">1:1 (Square)</h3>
        <div className="w-[200px]">
          <AspectRatio ratio={1} className="bg-muted rounded-md">
            <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
              1:1
            </div>
          </AspectRatio>
        </div>
      </div>
    </div>
  )
}