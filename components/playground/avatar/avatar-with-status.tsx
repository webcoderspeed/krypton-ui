import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface AvatarWithStatusProps {
  src?: string
  alt?: string
  fallback: string
  status?: 'online' | 'offline' | 'away' | 'busy'
  className?: string
}

function AvatarWithStatus({ src, alt, fallback, status = 'offline', className }: AvatarWithStatusProps) {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  }

  return (
    <div className={cn('relative', className)}>
      <Avatar>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <div className={cn(
        'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background',
        statusColors[status]
      )} />
    </div>
  )
}

export default function AvatarWithStatusDemo() {
  return (
    <div className="flex items-center space-x-6">
      <AvatarWithStatus
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        fallback="CN"
        status="online"
      />
      <AvatarWithStatus
        src="https://github.com/vercel.png"
        alt="@vercel"
        fallback="VC"
        status="away"
      />
      <AvatarWithStatus
        fallback="JS"
        status="busy"
      />
      <AvatarWithStatus
        fallback="OF"
        status="offline"
      />
    </div>
  )
}