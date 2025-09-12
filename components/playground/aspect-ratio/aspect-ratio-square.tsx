import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"

export function AspectRatioSquare() {
  return (
    <div className="w-[300px]">
      <AspectRatio ratio={1} className="bg-muted">
        <Image
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&dpr=2&q=80"
          alt="Avatar"
          fill
          className="rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  )
}