import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import LucideIcon from '@/components/lucide-icon'

export default function AspectRatioCustom() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
      {/* Chart Placeholder */}
      <Card>
        <CardContent className="p-0">
          <AspectRatio ratio={16 / 9}>
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-md">
              <div className="text-center space-y-2">
                <LucideIcon name="BarChart3" className="h-12 w-12 mx-auto text-blue-500" />
                <p className="text-sm font-medium text-blue-700">Chart Placeholder</p>
                <p className="text-xs text-blue-600">16:9 Aspect Ratio</p>
              </div>
            </div>
          </AspectRatio>
        </CardContent>
      </Card>
      
      {/* Interactive Content */}
      <Card>
        <CardContent className="p-0">
          <AspectRatio ratio={1}>
            <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-50 to-pink-100 rounded-md p-4">
              <LucideIcon name="Play" className="h-16 w-16 text-purple-500 mb-4" />
              <h3 className="font-semibold text-purple-700 mb-2">Interactive Demo</h3>
              <Button size="sm" variant="outline">
                Start Demo
              </Button>
            </div>
          </AspectRatio>
        </CardContent>
      </Card>
    </div>
  )
}