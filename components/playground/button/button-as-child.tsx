import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ButtonAsChild() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-6">
      <Button asChild>
        <Link href="/docs">Go to Docs</Link>
      </Button>
      <Button variant="outline" asChild>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          Visit GitHub
        </a>
      </Button>
    </div>
  );
}