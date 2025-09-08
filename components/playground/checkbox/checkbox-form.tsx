import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxForm() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="newsletter" />
        <label htmlFor="newsletter" className="text-sm font-medium">
          Subscribe to newsletter
        </label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="marketing" defaultChecked />
        <label htmlFor="marketing" className="text-sm font-medium">
          Receive marketing emails
        </label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="analytics" />
        <label htmlFor="analytics" className="text-sm font-medium">
          Allow analytics tracking
        </label>
      </div>
    </div>
  );
}