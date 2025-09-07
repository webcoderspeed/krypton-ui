import { Button } from "@/components/ui/button";
import LucideIcon from "@/components/lucide-icon";

export default function ButtonLoading() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-6">
      <Button disabled>
        <LucideIcon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
      <Button variant="outline" disabled>
        <LucideIcon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    </div>
  );
}