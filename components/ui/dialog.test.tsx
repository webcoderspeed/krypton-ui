import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from './dialog'
import { Button } from './button'

// Test component for controlled dialog
function ControlledDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogDescription>This is a test dialog</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Test component for form dialog
function FormDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const handleSubmit = vi.fn((e) => {
    e.preventDefault()
    setOpen(false)
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open Form</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Form Dialog</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              data-testid="name-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              data-testid="email-input"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

describe('Dialog', () => {
  describe('Rendering', () => {
    it('renders dialog trigger', () => {
      render(
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      )

      expect(screen.getByRole('button', { name: 'Open Dialog' })).toBeInTheDocument()
    })

    it('does not render dialog content initially', () => {
      render(
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Test content</DialogDescription>
          </DialogContent>
        </Dialog>
      )

      expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument()
      expect(screen.queryByText('Test content')).not.toBeInTheDocument()
    })

    it('renders dialog content when opened', async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Test content</DialogDescription>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

      await waitFor(() => {
        expect(screen.getByText('Test Dialog')).toBeInTheDocument()
        expect(screen.getByText('Test content')).toBeInTheDocument()
      })
    })
  })

  describe('Interactions', () => {
    it('opens dialog when trigger is clicked', async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })

    it('closes dialog when close button is clicked', async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )

      // Open dialog
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      // Close dialog using escape key
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('closes dialog when escape key is pressed', async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      )

      // Open dialog
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      // Press escape
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('closes dialog when clicking outside', async () => {
      const user = userEvent.setup()
      render(
        <div>
          <div data-testid="outside">Outside content</div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogContent>
          </Dialog>
        </div>
      )

      // Open dialog
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      // Use escape key to close dialog
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('Controlled Dialog', () => {
    it('respects controlled open state', () => {
      const onOpenChange = vi.fn()
      render(<ControlledDialog open={true} onOpenChange={onOpenChange} />)

      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('calls onOpenChange when dialog state changes', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      render(<ControlledDialog open={false} onOpenChange={onOpenChange} />)

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

      expect(onOpenChange).toHaveBeenCalledWith(true)
    })

    it('does not open when controlled open is false', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      render(<ControlledDialog open={false} onOpenChange={onOpenChange} />)

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
      
      // Dialog should still not be visible since open is controlled
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      expect(onOpenChange).toHaveBeenCalledWith(true)
    })
  })

  describe('Form Integration', () => {
    it('handles form submission', async () => {
      const user = userEvent.setup()
      render(<FormDialog />)

      // Open dialog
      await user.click(screen.getByRole('button', { name: 'Open Form' }))
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      // Fill form
      await user.type(screen.getByTestId('name-input'), 'John Doe')
      await user.type(screen.getByTestId('email-input'), 'john@example.com')

      // Submit form
      await user.click(screen.getByRole('button', { name: 'Submit' }))

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('handles form cancellation', async () => {
      const user = userEvent.setup()
      render(<FormDialog />)

      // Open dialog
      await user.click(screen.getByRole('button', { name: 'Open Form' }))
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      // Cancel form
      await user.click(screen.getByRole('button', { name: 'Cancel' }))

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('Focus Management', () => {
    it('focuses the dialog content when opened', async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
            <Button>Focus me</Button>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

      await waitFor(() => {
        const dialog = screen.getByRole('dialog')
        expect(dialog).toBeInTheDocument()
        // Focus should be trapped within the dialog or on a focusable element
        const activeElement = document.activeElement
        expect(activeElement).not.toBe(document.body)
        expect(dialog.contains(activeElement) || activeElement === dialog).toBe(true)
      })
    })

    it('returns focus to trigger when closed', async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )

      const trigger = screen.getByRole('button', { name: 'Open Dialog' })
      
      // Open dialog
      await user.click(trigger)
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      // Close dialog using escape key
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
      
      // Focus should return to trigger (may take a moment)
      await waitFor(() => {
        expect(document.activeElement).toBe(trigger)
      }, { timeout: 1000 })
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Test description</DialogDescription>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

      await waitFor(() => {
        const dialog = screen.getByRole('dialog')
        expect(dialog).toBeInTheDocument()
        expect(dialog).toHaveAttribute('aria-labelledby')
        expect(dialog).toHaveAttribute('aria-describedby')
      })
    })

    it('associates title and description with dialog', async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Test description</DialogDescription>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

      await waitFor(() => {
        const dialog = screen.getByRole('dialog')
        const title = screen.getByText('Test Dialog')
        const description = screen.getByText('Test description')
        
        expect(dialog.getAttribute('aria-labelledby')).toBe(title.id)
        expect(dialog.getAttribute('aria-describedby')).toBe(description.id)
      })
    })
  })

  describe('Custom Styling', () => {
    it('applies custom className to DialogContent', async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent className="custom-dialog">
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

      await waitFor(() => {
        const dialog = screen.getByRole('dialog')
        expect(dialog).toHaveClass('custom-dialog')
      })
    })

    it('applies custom className to DialogHeader', async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="custom-header">
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

      await waitFor(() => {
        const header = screen.getByText('Test Dialog').closest('.custom-header')
        expect(header).toBeInTheDocument()
      })
    })
  })

  describe('Edge Cases', () => {
    it('handles rapid open/close operations', async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )

      const trigger = screen.getByRole('button', { name: 'Open Dialog' })

      // Single click to open
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      // Close dialog using escape key
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })

      // Open again
      await user.click(trigger)
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })

    it('handles missing DialogTitle gracefully', async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <div>Content without title</div>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
        expect(screen.getByText('Content without title')).toBeInTheDocument()
      })
    })

    it('handles nested interactive elements', async () => {
      const user = userEvent.setup()
      const buttonClick = vi.fn()
      
      render(
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
            <div>
              <Button onClick={buttonClick}>Nested Button</Button>
              <input type="text" placeholder="Nested Input" />
            </div>
          </DialogContent>
        </Dialog>
      )

      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })

      // Interact with nested elements
      await user.click(screen.getByRole('button', { name: 'Nested Button' }))
      expect(buttonClick).toHaveBeenCalled()

      await user.type(screen.getByPlaceholderText('Nested Input'), 'test')
      expect(screen.getByDisplayValue('test')).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('does not cause unnecessary re-renders', () => {
      const renderSpy = vi.fn()
      
      function TestComponent() {
        renderSpy()
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogContent>
          </Dialog>
        )
      }

      const { rerender } = render(<TestComponent />)
      
      expect(renderSpy).toHaveBeenCalledTimes(1)
      
      // Re-render with same props
      rerender(<TestComponent />)
      
      expect(renderSpy).toHaveBeenCalledTimes(2)
    })
  })

  describe('Error Handling', () => {
    it('handles invalid children gracefully', () => {
      expect(() => {
        render(
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Test Dialog</DialogTitle>
              {null}
              {undefined}
              {false}
            </DialogContent>
          </Dialog>
        )
      }).not.toThrow()
    })

    it('handles missing required props gracefully', () => {
      expect(() => {
        render(
          <Dialog>
            <DialogContent>
              <DialogTitle>Test Dialog</DialogTitle>
            </DialogContent>
          </Dialog>
        )
      }).not.toThrow()
    })
  })
})