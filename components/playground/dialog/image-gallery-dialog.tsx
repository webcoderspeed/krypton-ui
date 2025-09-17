"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Download, Share2, Heart } from "lucide-react"

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    title: "Mountain Landscape",
    description: "Beautiful mountain view during sunset",
    tags: ["nature", "landscape", "sunset"]
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    title: "Forest Path",
    description: "Peaceful forest trail in autumn",
    tags: ["forest", "autumn", "path"]
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
    title: "Ocean Waves",
    description: "Calm ocean waves at the beach",
    tags: ["ocean", "beach", "waves"]
  }
]

export default function ImageGalleryDialog() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const currentImage = images[currentIndex]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Gallery</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{currentImage.title}</DialogTitle>
          <DialogDescription>
            {currentImage.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <img 
              src={currentImage.src} 
              alt={currentImage.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          {/* Image counter */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
        
        {/* Image info */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {currentImage.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Thumbnail navigation */}
          <div className="flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-16 h-12 rounded border-2 overflow-hidden ${
                  index === currentIndex ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsLiked(!isLiked)}>
            <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            {isLiked ? 'Liked' : 'Like'}
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}