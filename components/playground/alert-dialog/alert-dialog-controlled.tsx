"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export default function AlertDialogControlled() {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleAction = () => {
    setResult("Action confirmed")
    setOpen(false)
  }

  const handleCancel = () => {
    setResult("Action cancelled")
    setOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Button variant="outline" onClick={() => setResult(null)}>Clear Result</Button>
      </div>
      
      {result && (
        <div className="p-3 bg-muted rounded-md">
          <p className="text-sm">Result: {result}</p>
        </div>
      )}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Controlled Dialog</AlertDialogTitle>
            <AlertDialogDescription>
              This dialog is controlled by external state. The result will be displayed above.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}