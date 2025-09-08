import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DialogSizes() {
  return (
    <div className="flex flex-wrap gap-4">
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
            <p className="text-sm">Content for small dialog.</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Medium Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Medium Dialog</DialogTitle>
            <DialogDescription>
              This is a medium-sized dialog with moderate width.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">Content for medium dialog with more space for content.</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Large Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Large Dialog</DialogTitle>
            <DialogDescription>
              This is a large dialog with extended width for more content.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">
              Content for large dialog with plenty of space for detailed information,
              forms, or complex layouts.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Full Width Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[90vw]">
          <DialogHeader>
            <DialogTitle>Full Width Dialog</DialogTitle>
            <DialogDescription>
              This dialog takes up most of the viewport width.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">
              Content for full-width dialog that utilizes most of the available screen space.
              Perfect for complex forms or data tables.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}