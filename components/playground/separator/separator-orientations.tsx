import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function SeparatorOrientations() {
  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium leading-none mb-4">Navigation Menu</h4>
        <div className="flex items-center space-x-4 text-sm">
          <Button variant="ghost" size="sm">Home</Button>
          <Separator orientation="vertical" className="h-4" />
          <Button variant="ghost" size="sm">About</Button>
          <Separator orientation="vertical" className="h-4" />
          <Button variant="ghost" size="sm">Services</Button>
          <Separator orientation="vertical" className="h-4" />
          <Button variant="ghost" size="sm">Contact</Button>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium leading-none mb-4">Content Sections</h4>
        <div className="space-y-4">
          <div>
            <h5 className="font-medium">Introduction</h5>
            <p className="text-sm text-muted-foreground mt-1">
              This is the introduction section with some sample content.
            </p>
          </div>
          <Separator />
          <div>
            <h5 className="font-medium">Main Content</h5>
            <p className="text-sm text-muted-foreground mt-1">
              This is the main content section with detailed information.
            </p>
          </div>
          <Separator />
          <div>
            <h5 className="font-medium">Conclusion</h5>
            <p className="text-sm text-muted-foreground mt-1">
              This is the conclusion section wrapping up the content.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium leading-none mb-4">Sidebar Layout</h4>
        <div className="flex h-32 border rounded-lg">
          <div className="flex-1 p-4">
            <h5 className="font-medium mb-2">Main Content</h5>
            <p className="text-sm text-muted-foreground">
              This is the main content area of the layout.
            </p>
          </div>
          <Separator orientation="vertical" />
          <div className="w-48 p-4">
            <h5 className="font-medium mb-2">Sidebar</h5>
            <div className="space-y-2">
              <Badge variant="secondary">Tag 1</Badge>
              <Badge variant="secondary">Tag 2</Badge>
              <Badge variant="secondary">Tag 3</Badge>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium leading-none mb-4">Metadata Display</h4>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Published on Jan 15, 2024</span>
          <Separator orientation="vertical" className="h-3" />
          <span>5 min read</span>
          <Separator orientation="vertical" className="h-3" />
          <span>Technology</span>
          <Separator orientation="vertical" className="h-3" />
          <span>John Doe</span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium leading-none mb-4">Card Grid</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h5 className="font-medium mb-2">Card 1</h5>
            <p className="text-sm text-muted-foreground mb-3">
              Content for the first card.
            </p>
            <Separator className="mb-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Updated</span>
              <span>2 days ago</span>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <h5 className="font-medium mb-2">Card 2</h5>
            <p className="text-sm text-muted-foreground mb-3">
              Content for the second card.
            </p>
            <Separator className="mb-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Updated</span>
              <span>1 week ago</span>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <h5 className="font-medium mb-2">Card 3</h5>
            <p className="text-sm text-muted-foreground mb-3">
              Content for the third card.
            </p>
            <Separator className="mb-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Updated</span>
              <span>3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}