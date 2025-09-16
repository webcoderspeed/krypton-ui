import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'

export default function AspectRatioResponsive() {
  return (
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mobile: Square, Desktop: 16:9 */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Responsive (Square on mobile, 16:9 on desktop)</p>
          <AspectRatio ratio={16 / 9} className="md:aspect-video aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="Responsive image"
              width={800}
              height={450}
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
        
        {/* Always 4:3 */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Fixed 4:3 ratio</p>
          <AspectRatio ratio={4 / 3}>
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&dpr=2&q=80"
              alt="Fixed ratio image"
              width={800}
              height={600}
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  )
}