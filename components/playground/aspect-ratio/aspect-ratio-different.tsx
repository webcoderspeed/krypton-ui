import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'

export default function AspectRatioDifferent() {
  const ratios = [
    { ratio: 16 / 9, label: '16:9 (Widescreen)' },
    { ratio: 4 / 3, label: '4:3 (Standard)' },
    { ratio: 1, label: '1:1 (Square)' },
    { ratio: 3 / 4, label: '3:4 (Portrait)' }
  ]

  return (
    <div className="grid grid-cols-2 gap-4 max-w-2xl">
      {ratios.map(({ ratio, label }) => (
        <div key={label} className="space-y-2">
          <p className="text-sm font-medium text-center">{label}</p>
          <AspectRatio ratio={ratio}>
            <Image
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="Photo by Drew Beamer"
              width={800}
              height={450}
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      ))}
    </div>
  )
}