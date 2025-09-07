import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function AlertWithoutIcon() {
  return (
    <Alert>
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>
        This is a simple alert without an icon. It still provides important information to users.
      </AlertDescription>
    </Alert>
  )
}