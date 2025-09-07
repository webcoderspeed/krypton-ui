import { Button } from "@/components/ui/button";
import LucideIcon from "@/components/lucide-icon";

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-6">
      <Button>
        <LucideIcon name="Mail" className="mr-2 h-4 w-4" />
        Login with Email
      </Button>
      <Button variant="outline">
        <LucideIcon name="Github" className="mr-2 h-4 w-4" />
        GitHub
      </Button>
      <Button size="icon">
        <LucideIcon name="Search" className="h-4 w-4" />
      </Button>
    </div>
  );
}