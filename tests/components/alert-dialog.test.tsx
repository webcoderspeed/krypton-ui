import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
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
} from '../../components/ui/alert-dialog'
import { Button } from '../../components/ui/button'

// Test component for controlled alert dialog
function ControlledAlertDialog({ 
  open, 
  onOpenChange 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void 
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button>Open Alert</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Test Alert</AlertDialogTitle>
          <AlertDialogDescription>This is a test alert dialog</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// Test component for destructive alert dialog
function DestructiveAlertDialog() {
  const [open, setOpen] = useState(false)
  const handleAction = vi.fn(() => setOpen(false))

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Item</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={handleAction}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// Test component for confirmation alert dialog
function ConfirmationAlertDialog() {
  const [open, setOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  
  const handleConfirm = () => {
    setConfirmed(true)
    setOpen(false)
  }

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button>Save Changes</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Do you want to save them?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Don&apos;t Save</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {confirmed && <div data-testid="confirmation-message">Changes saved!</div>}
    </div>
  )
}

describe('AlertDialog', () => {
  describe('Rendering', () => {
    it('renders alert dialog trigger', () => {
      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Open Alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Test Alert</AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialog>
      )

      expect(screen.getByRole('button', { name: 'Open Alert' })).toBeInTheDocument()
    })

    it('does not render alert dialog content initially', () => {
      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Open Alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Test Alert</AlertDialogTitle>
            <AlertDialogDescription>Test content</AlertDialogDescription>
          </AlertDialogContent>
        </AlertDialog>
      )

      expect(screen.queryByText('Test Alert')).not.toBeInTheDocument()
      expect(screen.queryByText('Test content')).not.toBeInTheDocument()
    })

    it('renders alert dialog content when opened', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Open Alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Test Alert</AlertDialogTitle>
            <AlertDialogDescription>Test content</AlertDialogDescription>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByRole('button', { name: 'Open Alert' }))

      await waitFor(() => {
        expect(screen.getByText('Test Alert')).toBeInTheDocument()
        expect(screen.getByText('Test content')).toBeInTheDocument()
      })
    })

    it('renders all alert dialog components correctly', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Open Alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Alert Title</AlertDialogTitle>
              <AlertDialogDescription>Alert Description</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByRole('button', { name: 'Open Alert' }))

      await waitFor(() => {
        expect(screen.getByText('Alert Title')).toBeInTheDocument()
        expect(screen.getByText('Alert Description')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument()
      })
    })
  })

  describe('Interactions', () => {
    it('opens alert dialog when trigger is clicked', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Open Alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Test Alert</AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByRole('button', { name: 'Open Alert' }))

      await waitFor(() => {
        expect(screen.getByRole('alertdialog')).toBeInTheDocument()
      })
    })

    it('closes alert dialog when cancel button is clicked', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Open Alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Test Alert</AlertDialogTitle>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

      // Open alert dialog
      await user.click(screen.getByRole('button', { name: 'Open Alert' }))
      await waitFor(() => {
        expect(screen.getByRole('alertdialog')).toBeInTheDocument()
      })

      // Close alert dialog
      await user.click(screen.getByRole('button', { name: 'Cancel' }))
      await waitFor(() => {
        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
      })
    })

    it('closes alert dialog when action button is clicked', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Open Alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Test Alert</AlertDialogTitle>
            <AlertDialogFooter>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

      // Open alert dialog
      await user.click(screen.getByRole('button', { name: 'Open Alert' }))
      await waitFor(() => {
        expect(screen.getByRole('alertdialog')).toBeInTheDocument()
      })

      // Close alert dialog
      await user.click(screen.getByRole('button', { name: 'Continue' }))
      await waitFor(() => {
        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
      })
    })

    it('closes alert dialog when escape key is pressed', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Open Alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Test Alert</AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialog>
      )

      // Open alert dialog
      await user.click(screen.getByRole('button', { name: 'Open Alert' }))
      await waitFor(() => {
        expect(screen.getByRole('alertdialog')).toBeInTheDocument()
      })

      // Close alert dialog using escape key
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
      })
    })

    it('does not close when clicking outside (unlike regular dialog)', async () => {
      const user = userEvent.setup()
      render(
        <div>
          <div data-testid="outside-element">Outside</div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Open Alert</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>Test Alert</AlertDialogTitle>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )

      // Open alert dialog
      await user.click(screen.getByRole('button', { name: 'Open Alert' }))
      await waitFor(() => {
        expect(screen.getByRole('alertdialog')).toBeInTheDocument()
      })

      // Try to click outside using fireEvent (since modal overlay blocks pointer events)
      const overlay = document.querySelector('[data-radix-dialog-overlay]')
      if (overlay) {
        fireEvent.click(overlay)
      }
      
      // Alert dialog should still be open
      expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    })
  })

  describe('Controlled State', () => {
    it('works with controlled open state', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      
      render(<ControlledAlertDialog open={false} onOpenChange={onOpenChange} />)

      await user.click(screen.getByRole('button', { name: 'Open Alert' }))
      
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })

    it('calls onOpenChange when closed', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      
      render(<ControlledAlertDialog open={true} onOpenChange={onOpenChange} />)

      await waitFor(() => {
        expect(screen.getByRole('alertdialog')).toBeInTheDocument()
      })

      await user.click(screen.getByRole('button', { name: 'Cancel' }))
      
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })
  })

  describe('Event Handlers', () => {
    it('calls action button onClick handler', async () => {
      const user = userEvent.setup()
      const handleAction = vi.fn()
      
      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Open Alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Test Alert</AlertDialogTitle>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleAction}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByRole('button', { name: 'Open Alert' }))
      await waitFor(() => {
        expect(screen.getByRole('alertdialog')).toBeInTheDocument()
      })

      await user.click(screen.getByRole('button', { name: 'Continue' }))
      
      expect(handleAction).toHaveBeenCalled()
    })

    it('calls cancel button onClick handler', async () => {
      const user = userEvent.setup()
      const handleCancel = vi.fn()
      
      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Open Alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Test Alert</AlertDialogTitle>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByRole('button', { name: 'Open Alert' }))
      await waitFor(() => {
        expect(screen.getByRole('alertdialog')).toBeInTheDocument()
      })

      await user.click(screen.getByRole('button', { name: 'Cancel' }))
      
      expect(handleCancel).toHaveBeenCalled()
    })
  })

  describe('Use Cases', () => {
    it('handles destructive actions correctly', async () => {
      const user = userEvent.setup()
      render(<DestructiveAlertDialog />)

      await user.click(screen.getByRole('button', { name: 'Delete' }))
      
      await waitFor(() => {
        expect(screen.getByText('Delete Item')).toBeInTheDocument()
        expect(screen.getByText('This action cannot be undone. This will permanently delete the item.')).toBeInTheDocument()
      })

      const deleteButton = screen.getByRole('button', { name: 'Delete' })
      expect(deleteButton).toHaveClass('bg-destructive')
    })

    it('handles confirmation flow correctly', async () => {
      const user = userEvent.setup()
      render(<ConfirmationAlertDialog />)

      await user.click(screen.getByRole('button', { name: 'Save Changes' }))
      
      await waitFor(() => {
        expect(screen.getByText('Save Changes?')).toBeInTheDocument()
      })

      await user.click(screen.getByRole('button', { name: 'Save' }))
      
      await waitFor(() => {
        expect(screen.getByTestId('confirmation-message')).toBeInTheDocument()
        expect(screen.getByText('Changes saved!')).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Open Alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Test Alert</AlertDialogTitle>
            <AlertDialogDescription>Test description</AlertDialogDescription>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByRole('button', { name: 'Open Alert' }))

      await waitFor(() => {
        const alertDialog = screen.getByRole('alertdialog')
        expect(alertDialog).toBeInTheDocument()
        expect(alertDialog).toHaveAttribute('aria-labelledby')
        expect(alertDialog).toHaveAttribute('aria-describedby')
      })
    })

    it('manages focus correctly', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Open Alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Test Alert</AlertDialogTitle>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

      const trigger = screen.getByRole('button', { name: 'Open Alert' })
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByRole('alertdialog')).toBeInTheDocument()
      })

      // Focus should be trapped within the dialog
      await user.tab()
      expect(screen.getByRole('button', { name: 'Continue' })).toHaveFocus()

      await user.tab()
      expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Open Alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Test Alert</AlertDialogTitle>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

      // Open with Enter key
      const trigger = screen.getByRole('button', { name: 'Open Alert' })
      trigger.focus()
      await user.keyboard('{Enter}')

      await waitFor(() => {
        expect(screen.getByRole('alertdialog')).toBeInTheDocument()
      })

      // Navigate with Tab
      await user.tab()
      expect(screen.getByRole('button', { name: 'Continue' })).toHaveFocus()

      // Activate with Space
      await user.keyboard(' ')
      
      await waitFor(() => {
        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('Custom Styling', () => {
    it('applies custom className to components', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Open Alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="custom-content">
            <AlertDialogTitle className="custom-title">Test Alert</AlertDialogTitle>
            <AlertDialogDescription className="custom-description">
              Test description
            </AlertDialogDescription>
            <AlertDialogFooter className="custom-footer">
              <AlertDialogCancel className="custom-cancel">Cancel</AlertDialogCancel>
              <AlertDialogAction className="custom-action">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByRole('button', { name: 'Open Alert' }))

      await waitFor(() => {
        expect(screen.getByRole('alertdialog')).toHaveClass('custom-content')
        expect(screen.getByText('Test Alert')).toHaveClass('custom-title')
        expect(screen.getByText('Test description')).toHaveClass('custom-description')
        expect(screen.getByRole('button', { name: 'Cancel' })).toHaveClass('custom-cancel')
        expect(screen.getByRole('button', { name: 'Continue' })).toHaveClass('custom-action')
      })
    })
  })
})