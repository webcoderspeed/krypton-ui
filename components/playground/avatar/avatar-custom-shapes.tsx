import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AvatarCustomShapes() {
  return (
    <div className="flex items-center space-x-4">
      {/* Square Avatar */}
      <Avatar className="rounded-lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      
      {/* Hexagon-like Avatar */}
      <Avatar className="rounded-none" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
        <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
        <AvatarFallback style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>VC</AvatarFallback>
      </Avatar>
      
      {/* Rounded Rectangle */}
      <Avatar className="rounded-xl">
        <AvatarImage src="https://github.com/nextjs.png" alt="@nextjs" />
        <AvatarFallback className="rounded-xl">NJ</AvatarFallback>
      </Avatar>
      
      {/* Default Circle */}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}