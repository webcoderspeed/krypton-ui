import { Button } from "@/components/ui/button";

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-6">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🔥</Button>
    </div>
  );
}