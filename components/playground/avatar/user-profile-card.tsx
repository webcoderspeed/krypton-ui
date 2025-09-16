import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function UserProfileCard() {
  return (
    <Card className="w-80">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback className="text-lg">CN</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">John Doe</h3>
            <p className="text-sm text-muted-foreground">Software Engineer</p>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Pro</Badge>
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}