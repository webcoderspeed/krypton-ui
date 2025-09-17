import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Brush, Sparkles, Zap } from "lucide-react"

export default function TabsCustomStyling() {
  return (
    <Tabs defaultValue="colors" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-purple-100 to-pink-100 p-1">
        <TabsTrigger 
          value="colors" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white flex items-center gap-2"
        >
          <Palette className="h-4 w-4" />
          Colors
        </TabsTrigger>
        <TabsTrigger 
          value="gradients" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white flex items-center gap-2"
        >
          <Brush className="h-4 w-4" />
          Gradients
        </TabsTrigger>
        <TabsTrigger 
          value="effects" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4" />
          Effects
        </TabsTrigger>
        <TabsTrigger 
          value="animations" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white flex items-center gap-2"
        >
          <Zap className="h-4 w-4" />
          Animations
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="colors">
        <div className="p-6 border rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Palette className="h-5 w-5 text-purple-600" />
            Color Palette
          </h3>
          <div className="grid grid-cols-6 gap-2 mb-4">
            {[
              'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 
              'bg-green-500', 'bg-blue-500', 'bg-purple-500'
            ].map((color, index) => (
              <div key={index} className={`h-12 w-full rounded ${color}`}></div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Explore our beautiful color palette with vibrant and harmonious colors.
          </p>
        </div>
      </TabsContent>
      
      <TabsContent value="gradients">
        <div className="p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brush className="h-5 w-5 text-blue-600" />
            Gradient Collection
          </h3>
          <div className="space-y-2 mb-4">
            <div className="h-12 w-full rounded bg-gradient-to-r from-purple-400 to-pink-400"></div>
            <div className="h-12 w-full rounded bg-gradient-to-r from-blue-400 to-cyan-400"></div>
            <div className="h-12 w-full rounded bg-gradient-to-r from-green-400 to-emerald-400"></div>
          </div>
          <p className="text-sm text-muted-foreground">
            Beautiful gradient combinations for modern design aesthetics.
          </p>
        </div>
      </TabsContent>
      
      <TabsContent value="effects">
        <div className="p-6 border rounded-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-green-600" />
            Visual Effects
          </h3>
          <div className="space-y-4 mb-4">
            <div className="h-16 w-full rounded bg-white shadow-lg border flex items-center justify-center">
              <span className="text-sm font-medium">Drop Shadow Effect</span>
            </div>
            <div className="h-16 w-full rounded bg-gradient-to-r from-green-400 to-emerald-400 blur-sm opacity-75 flex items-center justify-center">
              <span className="text-sm font-medium text-white">Blur Effect</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Add depth and visual interest with shadows, blurs, and other effects.
          </p>
        </div>
      </TabsContent>
      
      <TabsContent value="animations">
        <div className="p-6 border rounded-lg bg-gradient-to-br from-orange-50 to-red-50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-600" />
            Animations
          </h3>
          <div className="space-y-4 mb-4">
            <div className="h-16 w-full rounded bg-gradient-to-r from-orange-400 to-red-400 animate-pulse flex items-center justify-center">
              <span className="text-sm font-medium text-white">Pulse Animation</span>
            </div>
            <div className="h-16 w-full rounded bg-gradient-to-r from-red-400 to-pink-400 animate-bounce flex items-center justify-center">
              <span className="text-sm font-medium text-white">Bounce Animation</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Bring your interface to life with smooth and engaging animations.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}