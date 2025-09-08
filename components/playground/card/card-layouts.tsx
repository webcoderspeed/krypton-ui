import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CardLayouts() {
  return (
    <div className="space-y-8">
      {/* Horizontal Layout */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Horizontal Layout</h3>
        <Card className="flex flex-row">
          <div className="w-1/3 bg-muted rounded-l-lg flex items-center justify-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              📊
            </div>
          </div>
          <div className="flex-1">
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>
                View your website analytics and performance metrics.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button>View Dashboard</Button>
            </CardFooter>
          </div>
        </Card>
      </div>

      {/* Grid Layout */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Grid Layout</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Users</CardDescription>
              <CardTitle className="text-2xl">1,234</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-green-600">+12% from last month</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Revenue</CardDescription>
              <CardTitle className="text-2xl">$12,345</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-green-600">+8% from last month</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Orders</CardDescription>
              <CardTitle className="text-2xl">567</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-red-600">-3% from last month</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Conversion</CardDescription>
              <CardTitle className="text-2xl">3.2%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-green-600">+0.5% from last month</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* List Layout */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">List Layout</h3>
        <div className="space-y-3">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  👤
                </div>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-muted-foreground">john@example.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Admin</Badge>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  👤
                </div>
                <div>
                  <div className="font-medium">Jane Smith</div>
                  <div className="text-sm text-muted-foreground">jane@example.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">User</Badge>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  👤
                </div>
                <div>
                  <div className="font-medium">Bob Johnson</div>
                  <div className="text-sm text-muted-foreground">bob@example.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="destructive">Suspended</Badge>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Masonry Layout */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Masonry Layout</h3>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          <Card className="break-inside-avoid">
            <CardHeader>
              <CardTitle>Short Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This is a short card with minimal content.</p>
            </CardContent>
          </Card>
          
          <Card className="break-inside-avoid">
            <CardHeader>
              <CardTitle>Medium Content</CardTitle>
              <CardDescription>A card with more content</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card has more content than the previous one. It demonstrates how cards can have varying heights in a masonry layout.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Read More</Button>
            </CardFooter>
          </Card>
          
          <Card className="break-inside-avoid">
            <CardHeader>
              <CardTitle>Long Content</CardTitle>
              <CardDescription>A card with extensive content</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card contains much more content to demonstrate how the masonry layout handles cards of different heights. The layout automatically adjusts to create a visually pleasing arrangement.</p>
              <p className="mt-2">Additional paragraph to make this card even taller and show the masonry effect more clearly.</p>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <Button size="sm">Action 1</Button>
                <Button variant="outline" size="sm">Action 2</Button>
              </div>
            </CardFooter>
          </Card>
          
          <Card className="break-inside-avoid">
            <CardHeader>
              <CardTitle>Another Short Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Back to short content.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}