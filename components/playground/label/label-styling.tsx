import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export default function LabelStyling() {
  return (
    <div className="space-y-8">
      {/* Different Label Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Label Sizes</h3>
        <div className="space-y-3">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="small" className="text-xs">
              Small Label (text-xs)
            </Label>
            <Input type="text" id="small" placeholder="Small label" />
          </div>
          
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="default">Default Label (text-sm)</Label>
            <Input type="text" id="default" placeholder="Default label" />
          </div>
          
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="large" className="text-base">
              Large Label (text-base)
            </Label>
            <Input type="text" id="large" placeholder="Large label" />
          </div>
        </div>
      </div>

      {/* Label Colors */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Label Colors</h3>
        <div className="space-y-3">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="primary" className="text-primary">
              Primary Label
            </Label>
            <Input type="text" id="primary" placeholder="Primary colored" />
          </div>
          
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="muted" className="text-muted-foreground">
              Muted Label
            </Label>
            <Input type="text" id="muted" placeholder="Muted colored" />
          </div>
          
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="destructive" className="text-destructive">
              Error Label
            </Label>
            <Input type="text" id="destructive" placeholder="Error state" />
          </div>
        </div>
      </div>

      {/* Labels with Different Controls */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Labels with Different Controls</h3>
        <div className="space-y-4">
          {/* Slider with Label */}
          <div className="space-y-2">
            <Label htmlFor="volume">Volume: 50%</Label>
            <Slider
              id="volume"
              defaultValue={[50]}
              max={100}
              step={1}
              className="w-full max-w-sm"
            />
          </div>
          
          {/* Switch with Label */}
          <div className="flex items-center space-x-2">
            <Switch id="notifications" />
            <Label htmlFor="notifications">Enable notifications</Label>
          </div>
        </div>
      </div>

      {/* Accessibility Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Accessibility Features</h3>
        <div className="space-y-3">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="screen-reader">
              Field with Screen Reader Support
              <span className="sr-only">(This field is required for form submission)</span>
            </Label>
            <Input 
              type="text" 
              id="screen-reader" 
              placeholder="Accessible input"
              aria-describedby="screen-reader-help"
            />
            <p id="screen-reader-help" className="text-xs text-muted-foreground">
              This field includes additional context for screen readers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}