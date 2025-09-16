import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import LucideIcon from "@/components/lucide-icon"

export default function AlertDialogCustom() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <LucideIcon name="AlertTriangle" className="mr-2 h-4 w-4" />
          Show Warning
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            <LucideIcon name="AlertTriangle" className="h-5 w-5 text-amber-500" />
            <AlertDialogTitle>Warning</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            You have unsaved changes. Are you sure you want to leave this page?
            Your changes will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay on Page</AlertDialogCancel>
          <AlertDialogAction className="bg-amber-500 text-white hover:bg-amber-600">
            Leave Page
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}