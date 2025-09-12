import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioVideo() {
  return (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-md h-full w-full"
        />
      </AspectRatio>
    </div>
  )
}