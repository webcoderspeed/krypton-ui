import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function PopoverPositions() {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center min-h-[300px]">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top" className="w-64">
          <p className="text-sm">This popover appears on top.</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right" className="w-64">
          <p className="text-sm">This popover appears on the right.</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" className="w-64">
          <p className="text-sm">This popover appears on the bottom.</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left" className="w-64">
          <p className="text-sm">This popover appears on the left.</p>
        </PopoverContent>
      </Popover>
    </div>
  )
}