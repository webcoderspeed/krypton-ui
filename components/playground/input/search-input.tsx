import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchInputDemo() {
  return (
    <div className="relative flex items-center">
      <div className="absolute left-3 text-muted-foreground">
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