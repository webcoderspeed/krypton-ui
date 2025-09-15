import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputTypes() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">Text</Label>
          <Input id="text" type="text" placeholder="Enter text" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter email" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter password" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="number">Number</Label>
          <Input id="number" type="number" placeholder="Enter number" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tel">Phone</Label>
          <Input id="tel" type="tel" placeholder="Enter phone number" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="url">URL</Label>
          <Input id="url" type="url" placeholder="Enter URL" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input id="time" type="time" />
        </div>
      </div>
    </div>
  );
}