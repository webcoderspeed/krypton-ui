import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputWithLabelDemo() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="Enter your email"
      />
      <p className="text-sm text-muted-foreground">
        We&apos;ll never share your email with anyone else.
      </p>
    </div>
  );
}