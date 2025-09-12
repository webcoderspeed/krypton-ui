import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function InputWithIconDemo() {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
        <Search className="h-4 w-4" />
      </div>
      <Input
        type="search"
        placeholder="Search..."
        className="pl-10"
      />
    </div>
  );
}