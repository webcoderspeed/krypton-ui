import { Button } from "@/components/ui/button";

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-6">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}