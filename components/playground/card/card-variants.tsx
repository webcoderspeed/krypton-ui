import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function CardVariants() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Simple Card */}
      <Card>
        <CardHeader>
          <CardTitle>Simple Card</CardTitle>
          <CardDescription>
            A basic card with header and content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a simple card example with minimal content.</p>
        </CardContent>
      </Card>

      {/* Card with Footer */}
      <Card>
        <CardHeader>
          <CardTitle>Card with Footer</CardTitle>
          <CardDescription>
            This card includes a footer section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content goes here with additional footer actions.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>

      {/* Card with Badge */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Featured Post</CardTitle>
            <Badge>New</Badge>
          </div>
          <CardDescription>
            A card with a badge indicator.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card demonstrates how to include badges and other elements.</p>
        </CardContent>
      </Card>

      {/* Notification Card */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="text-blue-600">Notification</CardTitle>
          <CardDescription>
            Important system notification.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Your account has been successfully updated.</p>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-4xl">$45,231.89</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +20.1% from last month
          </div>
        </CardContent>
      </Card>

      {/* Interactive Card */}
      <Card className="cursor-pointer hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>
            This card responds to hover.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Hover over this card to see the shadow effect.</p>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm">
            Learn More →
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}