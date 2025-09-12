import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxControlled() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="controlled" defaultChecked />
      <label htmlFor="controlled" className="text-sm font-medium">
        Controlled Checkbox
      </label>
    </div>
  );
}