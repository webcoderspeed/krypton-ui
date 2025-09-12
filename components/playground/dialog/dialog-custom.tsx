import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DialogCustom() {
  return (
    <div className="flex flex-wrap gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Success Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] border-green-200 bg-green-50">
          <DialogHeader>
            <DialogTitle className="text-green-800 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Success!
            </DialogTitle>
            <DialogDescription className="text-green-700">
              Your action has been completed successfully.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-green-600">
              Everything went according to plan. You can now proceed with the next steps.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Warning Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] border-yellow-200 bg-yellow-50">
          <DialogHeader>
            <DialogTitle className="text-yellow-800 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Warning
            </DialogTitle>
            <DialogDescription className="text-yellow-700">
              Please review the following information carefully.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-yellow-600">
              This action may have consequences. Make sure you understand what will happen before proceeding.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Error Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] border-red-200 bg-red-50">
          <DialogHeader>
            <DialogTitle className="text-red-800 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Error
            </DialogTitle>
            <DialogDescription className="text-red-700">
              Something went wrong. Please try again.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              <p className="text-sm text-red-600">
                An unexpected error occurred while processing your request.
              </p>
              <Badge variant="destructive" className="text-xs">
                Error Code: 500
              </Badge>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Info Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] border-blue-200 bg-blue-50">
          <DialogHeader>
            <DialogTitle className="text-blue-800 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Information
            </DialogTitle>
            <DialogDescription className="text-blue-700">
              Here&apos;s some important information for you.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              <p className="text-sm text-blue-600">
                This feature is currently in beta. Your feedback is valuable to us.
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  Beta
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Feedback Welcome
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" size="sm">
                Got it
              </Button>
            </DialogClose>
            <Button size="sm">
              Learn More
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}