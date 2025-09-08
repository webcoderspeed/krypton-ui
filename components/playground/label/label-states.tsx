import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function LabelStates() {
  return (
    <div className="space-y-6">
      {/* Default Label */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="default">Default Label</Label>
        <Input type="text" id="default" placeholder="Enter text" />
      </div>

      {/* Required Label */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="required">
          Required Field <span className="text-red-500">*</span>
        </Label>
        <Input type="text" id="required" placeholder="Required field" />
      </div>

      {/* Disabled Label */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="disabled" className="text-muted-foreground">
          Disabled Field
        </Label>
        <Input type="text" id="disabled" placeholder="Disabled" disabled />
      </div>

      {/* Label with Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </Label>
      </div>

      {/* Label with Description */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="description">Username</Label>
        <Input type="text" id="description" placeholder="Enter username" />
        <p className="text-sm text-muted-foreground">
          This will be your public display name.
        </p>
      </div>
    </div>
  )
}