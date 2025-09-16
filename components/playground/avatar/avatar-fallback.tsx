import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AvatarFallbackDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      
      <Avatar>
        <AvatarImage src="/broken-image.jpg" alt="Broken" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      
      <Avatar>
        <AvatarFallback className="bg-blue-500 text-white">XY</AvatarFallback>
      </Avatar>
    </div>
  )
}