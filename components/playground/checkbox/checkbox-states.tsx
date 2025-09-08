import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxStates() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="default" />
        <label htmlFor="default" className="text-sm font-medium">
          Default
        </label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="checked" defaultChecked />
        <label htmlFor="checked" className="text-sm font-medium">
          Checked
        </label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled" disabled />
        <label htmlFor="disabled" className="text-sm font-medium text-muted-foreground">
          Disabled
        </label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <label htmlFor="disabled-checked" className="text-sm font-medium text-muted-foreground">
          Disabled Checked
        </label>
      </div>
    </div>
  );
}