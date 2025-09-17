import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

// Test wrapper component for controlled dialog
function ControlledDialogWrapper() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Dialog</button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>
              This is a test dialog description.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Dialog content goes here.</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Test wrapper component for uncontrolled dialog
function UncontrolledDialogWrapper() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Uncontrolled Dialog</DialogTitle>
          <DialogDescription>
            This dialog manages its own state.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>Dialog content</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Test wrapper component for form dialog
function FormDialogWrapper() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
  };
  
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Form Dialog</button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Test wrapper component for confirmation dialog
function ConfirmationDialogWrapper() {
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  
  const handleConfirm = () => {
    setConfirmed(true);
    setOpen(false);
  };
  
  return (
    <>
      <button onClick={() => setOpen(true)}>Delete Item</button>
      {confirmed && <div data-testid="confirmed">Item deleted</div>}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

describe('Dialog Component', () => {
  describe('Basic Dialog', () => {
    it('renders dialog trigger and content', () => {
      render(<UncontrolledDialogWrapper />);
      
      expect(screen.getByText('Open Dialog')).toBeInTheDocument();
      
      // Dialog content should not be visible initially
      expect(screen.queryByText('Uncontrolled Dialog')).not.toBeInTheDocument();
    });
    
    it('opens dialog when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(<UncontrolledDialogWrapper />);
      
      const trigger = screen.getByText('Open Dialog');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Uncontrolled Dialog')).toBeInTheDocument();
        expect(screen.getByText('This dialog manages its own state.')).toBeInTheDocument();
      });
    });
    
    it('closes dialog when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<UncontrolledDialogWrapper />);
      
      // Open dialog
      const trigger = screen.getByText('Open Dialog');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Uncontrolled Dialog')).toBeInTheDocument();
      });
      
      // Close dialog
      const closeButton = screen.getByText('Close');
      await user.click(closeButton);
      
      await waitFor(() => {
        expect(screen.queryByText('Uncontrolled Dialog')).not.toBeInTheDocument();
      });
    });
    
    it('closes dialog when X button is clicked', async () => {
      const user = userEvent.setup();
      render(<UncontrolledDialogWrapper />);
      
      // Open dialog
      const trigger = screen.getByText('Open Dialog');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Uncontrolled Dialog')).toBeInTheDocument();
      });
      
      // Close dialog using X button
      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);
      
      await waitFor(() => {
        expect(screen.queryByText('Uncontrolled Dialog')).not.toBeInTheDocument();
      });
    });
    
    it('closes dialog when escape key is pressed', async () => {
      const user = userEvent.setup();
      render(<UncontrolledDialogWrapper />);
      
      // Open dialog
      const trigger = screen.getByText('Open Dialog');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Uncontrolled Dialog')).toBeInTheDocument();
      });
      
      // Press escape key
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByText('Uncontrolled Dialog')).not.toBeInTheDocument();
      });
    });
  });
  
  describe('Controlled Dialog', () => {
    it('opens and closes dialog programmatically', async () => {
      const user = userEvent.setup();
      render(<ControlledDialogWrapper />);
      
      // Dialog should be closed initially
      expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument();
      
      // Open dialog
      const openButton = screen.getByText('Open Dialog');
      await user.click(openButton);
      
      await waitFor(() => {
        expect(screen.getByText('Test Dialog')).toBeInTheDocument();
        expect(screen.getByText('This is a test dialog description.')).toBeInTheDocument();
      });
      
      // Close dialog
      const closeButton = screen.getByText('Close');
      await user.click(closeButton);
      
      await waitFor(() => {
        expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument();
      });
    });
    
    it('calls onOpenChange when dialog state changes', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      
      function TestDialog() {
        const [open, setOpen] = useState(false);
        
        const handleOpenChange = (newOpen: boolean) => {
          setOpen(newOpen);
          onOpenChange(newOpen);
        };
        
        return (
          <>
            <button onClick={() => setOpen(true)}>Open</button>
            <Dialog open={open} onOpenChange={handleOpenChange}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Test</DialogTitle>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
        );
      }
      
      render(<TestDialog />);
      
      const openButton = screen.getByText('Open');
      await user.click(openButton);
      
      expect(onOpenChange).toHaveBeenCalledWith(true);
      
      // Close with escape
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false);
      });
    });
  });
  
  describe('Form Dialog', () => {
    it('renders form elements correctly', async () => {
      const user = userEvent.setup();
      render(<FormDialogWrapper />);
      
      // Open dialog
      const openButton = screen.getByText('Open Form Dialog');
      await user.click(openButton);
      
      await waitFor(() => {
        expect(screen.getByText('Edit Profile')).toBeInTheDocument();
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Save changes')).toBeInTheDocument();
      });
    });
    
    it('handles form input changes', async () => {
      const user = userEvent.setup();
      render(<FormDialogWrapper />);
      
      // Open dialog
      const openButton = screen.getByText('Open Form Dialog');
      await user.click(openButton);
      
      await waitFor(() => {
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
      });
      
      // Type in name field
      const nameInput = screen.getByLabelText('Name');
      await user.type(nameInput, 'John Doe');
      
      expect(nameInput).toHaveValue('John Doe');
      
      // Type in email field
      const emailInput = screen.getByLabelText('Email');
      await user.type(emailInput, 'john@example.com');
      
      expect(emailInput).toHaveValue('john@example.com');
    });
    
    it('submits form and closes dialog', async () => {
      const user = userEvent.setup();
      render(<FormDialogWrapper />);
      
      // Open dialog
      const openButton = screen.getByText('Open Form Dialog');
      await user.click(openButton);
      
      await waitFor(() => {
        expect(screen.getByText('Edit Profile')).toBeInTheDocument();
      });
      
      // Fill form
      const nameInput = screen.getByLabelText('Name');
      await user.type(nameInput, 'John Doe');
      
      // Submit form
      const submitButton = screen.getByText('Save changes');
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument();
      });
    });
    
    it('cancels form without submitting', async () => {
      const user = userEvent.setup();
      render(<FormDialogWrapper />);
      
      // Open dialog
      const openButton = screen.getByText('Open Form Dialog');
      await user.click(openButton);
      
      await waitFor(() => {
        expect(screen.getByText('Edit Profile')).toBeInTheDocument();
      });
      
      // Fill form
      const nameInput = screen.getByLabelText('Name');
      await user.type(nameInput, 'John Doe');
      
      // Cancel form
      const cancelButton = screen.getByText('Cancel');
      await user.click(cancelButton);
      
      await waitFor(() => {
        expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument();
      });
    });
  });
  
  describe('Confirmation Dialog', () => {
    it('renders confirmation dialog correctly', async () => {
      const user = userEvent.setup();
      render(<ConfirmationDialogWrapper />);
      
      // Open dialog
      const deleteButton = screen.getByText('Delete Item');
      await user.click(deleteButton);
      
      await waitFor(() => {
        expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();
        expect(screen.getByText('Are you sure you want to delete this item? This action cannot be undone.')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
      });
    });
    
    it('confirms action and closes dialog', async () => {
      const user = userEvent.setup();
      render(<ConfirmationDialogWrapper />);
      
      // Open dialog
      const deleteButton = screen.getByText('Delete Item');
      await user.click(deleteButton);
      
      await waitFor(() => {
        expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();
      });
      
      // Confirm deletion
      const confirmButton = screen.getByText('Delete');
      await user.click(confirmButton);
      
      await waitFor(() => {
        expect(screen.queryByText('Confirm Deletion')).not.toBeInTheDocument();
        expect(screen.getByTestId('confirmed')).toBeInTheDocument();
        expect(screen.getByText('Item deleted')).toBeInTheDocument();
      });
    });
    
    it('cancels action and closes dialog', async () => {
      const user = userEvent.setup();
      render(<ConfirmationDialogWrapper />);
      
      // Open dialog
      const deleteButton = screen.getByText('Delete Item');
      await user.click(deleteButton);
      
      await waitFor(() => {
        expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();
      });
      
      // Cancel deletion
      const cancelButton = screen.getByText('Cancel');
      await user.click(cancelButton);
      
      await waitFor(() => {
        expect(screen.queryByText('Confirm Deletion')).not.toBeInTheDocument();
        expect(screen.queryByTestId('confirmed')).not.toBeInTheDocument();
      });
    });
  });
  
  describe('Accessibility', () => {
    it('has proper ARIA attributes', async () => {
      const user = userEvent.setup();
      render(<UncontrolledDialogWrapper />);
      
      // Open dialog
      const trigger = screen.getByText('Open Dialog');
      await user.click(trigger);
      
      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveAttribute('aria-labelledby');
        expect(dialog).toHaveAttribute('aria-describedby');
      });
    });
    
    it('focuses first focusable element when opened', async () => {
      const user = userEvent.setup();
      render(<UncontrolledDialogWrapper />);
      
      // Open dialog
      const trigger = screen.getByText('Open Dialog');
      await user.click(trigger);
      
      await waitFor(() => {
        const closeButton = screen.getByText('Close');
        expect(closeButton).toHaveFocus();
      });
    });
    
    it('traps focus within dialog', async () => {
      const user = userEvent.setup();
      render(<FormDialogWrapper />);
      
      // Open dialog
      const openButton = screen.getByText('Open Form Dialog');
      await user.click(openButton);
      
      await waitFor(() => {
        expect(screen.getByText('Edit Profile')).toBeInTheDocument();
      });
      
      // Tab through focusable elements
      await user.tab();
      expect(screen.getByLabelText('Name')).toHaveFocus();
      
      await user.tab();
      expect(screen.getByLabelText('Email')).toHaveFocus();
      
      await user.tab();
      expect(screen.getByText('Cancel')).toHaveFocus();
      
      await user.tab();
      expect(screen.getByText('Save changes')).toHaveFocus();
    });
    
    it('returns focus to trigger when closed', async () => {
      const user = userEvent.setup();
      render(<UncontrolledDialogWrapper />);
      
      const trigger = screen.getByText('Open Dialog');
      
      // Focus and open dialog
      trigger.focus();
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Uncontrolled Dialog')).toBeInTheDocument();
      });
      
      // Close dialog
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByText('Uncontrolled Dialog')).not.toBeInTheDocument();
        expect(trigger).toHaveFocus();
      });
    });
  });
  
  describe('Custom Props', () => {
    it('applies custom className to DialogContent', async () => {
      const user = userEvent.setup();
      
      function CustomDialog() {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open</Button>
            </DialogTrigger>
            <DialogContent className="custom-dialog-class">
              <DialogHeader>
                <DialogTitle>Custom Dialog</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      }
      
      render(<CustomDialog />);
      
      const trigger = screen.getByText('Open');
      await user.click(trigger);
      
      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveClass('custom-dialog-class');
      });
    });
    
    it('supports modal={false} prop', async () => {
      const user = userEvent.setup();
      
      function NonModalDialog() {
        return (
          <>
            <button>Outside Button</button>
            <Dialog modal={false}>
              <DialogTrigger asChild>
                <Button>Open Non-Modal</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Non-Modal Dialog</DialogTitle>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
        );
      }
      
      render(<NonModalDialog />);
      
      const trigger = screen.getByText('Open Non-Modal');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Non-Modal Dialog')).toBeInTheDocument();
      });
      
      // Should be able to interact with elements outside the dialog
      const outsideButton = screen.getByText('Outside Button');
      await user.click(outsideButton);
      
      // Dialog should still be open
      expect(screen.getByText('Non-Modal Dialog')).toBeInTheDocument();
    });
  });
  
  describe('Event Handlers', () => {
    it('calls onOpenAutoFocus when dialog opens', async () => {
      const onOpenAutoFocus = vi.fn();
      const user = userEvent.setup();
      
      function TestDialog() {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open</Button>
            </DialogTrigger>
            <DialogContent onOpenAutoFocus={onOpenAutoFocus}>
              <DialogHeader>
                <DialogTitle>Test</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      }
      
      render(<TestDialog />);
      
      const trigger = screen.getByText('Open');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(onOpenAutoFocus).toHaveBeenCalled();
      });
    });
    
    it('calls onCloseAutoFocus when dialog closes', async () => {
      const onCloseAutoFocus = vi.fn();
      const user = userEvent.setup();
      
      function TestDialog() {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open</Button>
            </DialogTrigger>
            <DialogContent onCloseAutoFocus={onCloseAutoFocus}>
              <DialogHeader>
                <DialogTitle>Test</DialogTitle>
              </DialogHeader>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        );
      }
      
      render(<TestDialog />);
      
      // Open dialog
      const trigger = screen.getByText('Open');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Test')).toBeInTheDocument();
      });
      
      // Close dialog
      const closeButton = screen.getByText('Close');
      await user.click(closeButton);
      
      await waitFor(() => {
        expect(onCloseAutoFocus).toHaveBeenCalled();
      });
    });
    
    it('calls onEscapeKeyDown when escape is pressed', async () => {
      const onEscapeKeyDown = vi.fn();
      const user = userEvent.setup();
      
      function TestDialog() {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open</Button>
            </DialogTrigger>
            <DialogContent onEscapeKeyDown={onEscapeKeyDown}>
              <DialogHeader>
                <DialogTitle>Test</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      }
      
      render(<TestDialog />);
      
      // Open dialog
      const trigger = screen.getByText('Open');
      await user.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Test')).toBeInTheDocument();
      });
      
      // Press escape
      await user.keyboard('{Escape}');
      
      expect(onEscapeKeyDown).toHaveBeenCalled();
    });
  });
});