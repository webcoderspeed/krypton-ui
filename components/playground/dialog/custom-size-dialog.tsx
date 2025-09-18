import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function CustomSizeDialog() {
  return (
    <div className="flex gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Small Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[300px]">
          <DialogHeader>
            <DialogTitle>Small Dialog</DialogTitle>
            <DialogDescription>
              This is a small dialog with limited width.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">Compact content goes here.</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Large Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Large Dialog</DialogTitle>
            <DialogDescription>
              This is a large dialog with extended width for more content.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-sm text-muted-foreground">
              This dialog has more space for detailed content, forms, or complex layouts.
              You can use this for data tables, detailed forms, or rich content.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded">
                <h4 className="font-medium">Section 1</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Content for the first section.
                </p>
              </div>
              <div className="p-4 border rounded">
                <h4 className="font-medium">Section 2</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Content for the second section.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}