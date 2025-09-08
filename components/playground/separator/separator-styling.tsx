import { Separator } from '@/components/ui/separator'

export default function SeparatorStyling() {
  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium leading-none mb-4">Default Separator</h4>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This is the default separator with standard border color.
          </p>
          <Separator />
          <p className="text-sm text-muted-foreground">
            Content after the separator.
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium leading-none mb-4">Custom Colors</h4>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Primary colored separator</p>
            <Separator className="bg-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Destructive colored separator</p>
            <Separator className="bg-destructive" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Muted separator</p>
            <Separator className="bg-muted" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Accent colored separator</p>
            <Separator className="bg-accent" />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium leading-none mb-4">Custom Thickness</h4>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Thin separator (0.5px)</p>
            <Separator className="h-[0.5px]" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Default separator (1px)</p>
            <Separator />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Thick separator (2px)</p>
            <Separator className="h-[2px]" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Extra thick separator (4px)</p>
            <Separator className="h-1" />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium leading-none mb-4">Vertical Separators with Custom Heights</h4>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Item 1</span>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm">Item 2</span>
          <Separator orientation="vertical" className="h-6" />
          <span className="text-sm">Item 3</span>
          <Separator orientation="vertical" className="h-8" />
          <span className="text-sm">Item 4</span>
          <Separator orientation="vertical" className="h-10" />
          <span className="text-sm">Item 5</span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium leading-none mb-4">Dashed and Dotted Styles</h4>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Dashed separator</p>
            <Separator className="border-dashed border-t border-border bg-transparent h-0 border-b-0" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Dotted separator</p>
            <Separator className="border-dotted border-t border-border bg-transparent h-0 border-b-0" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Double line separator</p>
            <Separator className="border-double border-t-4 border-border bg-transparent h-0 border-b-0" />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium leading-none mb-4">Gradient Separators</h4>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Gradient separator (left to right)</p>
            <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Gradient separator (primary colors)</p>
            <Separator className="bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium leading-none mb-4">Spacing Variations</h4>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Tight spacing</p>
          <Separator className="my-1" />
          <p className="text-sm text-muted-foreground">Normal spacing</p>
          <Separator className="my-4" />
          <p className="text-sm text-muted-foreground">Loose spacing</p>
          <Separator className="my-8" />
          <p className="text-sm text-muted-foreground">Content after loose spacing</p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium leading-none mb-4">Complex Layout Example</h4>
        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-medium">Settings Panel</h5>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Last updated</span>
              <Separator orientation="vertical" className="h-3" />
              <span>2 hours ago</span>
            </div>
          </div>
          <Separator className="mb-4" />
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h6 className="font-medium mb-2">General</h6>
              <p className="text-sm text-muted-foreground">
                Configure general application settings.
              </p>
            </div>
            <div>
              <h6 className="font-medium mb-2">Security</h6>
              <p className="text-sm text-muted-foreground">
                Manage security and privacy options.
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-end space-x-2">
            <button className="px-3 py-1 text-sm border rounded">Cancel</button>
            <Separator orientation="vertical" className="h-6" />
            <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded">Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}