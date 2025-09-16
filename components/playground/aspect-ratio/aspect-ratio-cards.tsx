import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

export default function AspectRatioCards() {
  const items = [
    {
      title: "Mountain Landscape",
      description: "Beautiful mountain scenery",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&dpr=2&q=80",
      category: "Nature"
    },
    {
      title: "City Skyline",
      description: "Urban architecture at sunset",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&dpr=2&q=80",
      category: "Urban"
    },
    {
      title: "Ocean Waves",
      description: "Peaceful ocean view",
      image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&dpr=2&q=80",
      category: "Ocean"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <Card key={index} className="overflow-hidden">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={item.image}
              alt={item.title}
              width={800}
              height={450}
              className="object-cover"
            />
          </AspectRatio>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <Badge variant="secondary">{item.category}</Badge>
            </div>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}