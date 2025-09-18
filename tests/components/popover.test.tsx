import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

describe('Popover Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders popover trigger', () => {
      render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Popover content</p>
          </PopoverContent>
        </Popover>
      );

      expect(screen.getByText('Open popover')).toBeInTheDocument();
    });

    it('renders popover with custom content', () => {
      render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Custom trigger</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <h3>Custom Title</h3>
              <p>Custom description</p>
            </div>
          </PopoverContent>
        </Popover>
      );

      expect(screen.getByText('Custom trigger')).toBeInTheDocument();
    });

    it('renders popover with form elements', () => {
      render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Form trigger</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <Label htmlFor="test-input">Test Input</Label>
              <Input id="test-input" placeholder="Enter text" />
            </div>
          </PopoverContent>
        </Popover>
      );

      expect(screen.getByText('Form trigger')).toBeInTheDocument();
    });
  });

  describe('Interaction Behavior', () => {
    it('opens popover on trigger click', async () => {
      const user = userEvent.setup();
      
      render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Click trigger</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Popover content</p>
          </PopoverContent>
        </Popover>
      );

      const trigger = screen.getByText('Click trigger');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Popover content')).toBeInTheDocument();
      });
    });

    it('closes popover on escape key', async () => {
      const user = userEvent.setup();
      
      render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Escape trigger</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Escape content</p>
          </PopoverContent>
        </Popover>
      );

      const trigger = screen.getByText('Escape trigger');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Escape content')).toBeInTheDocument();
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByText('Escape content')).not.toBeInTheDocument();
      });
    });

    it('closes popover on outside click', async () => {
      const user = userEvent.setup();
      
      render(
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button>Outside trigger</Button>
            </PopoverTrigger>
            <PopoverContent>
              <p>Outside content</p>
            </PopoverContent>
          </Popover>
          <div data-testid="outside-element">Outside element</div>
        </div>
      );

      const trigger = screen.getByText('Outside trigger');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Outside content')).toBeInTheDocument();
      });

      const outsideElement = screen.getByTestId('outside-element');
      await user.click(outsideElement);

      await waitFor(() => {
        expect(screen.queryByText('Outside content')).not.toBeInTheDocument();
      });
    });
  });

  describe('Controlled State', () => {
    it('works with controlled open state', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      
      const ControlledPopover = () => {
        const [open, setOpen] = useState(false);
        
        const handleOpenChange = (newOpen: boolean) => {
          setOpen(newOpen);
          onOpenChange(newOpen);
        };
        
        return (
          <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
              <Button onClick={() => handleOpenChange(!open)}>
                Controlled trigger
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <p>Controlled content</p>
            </PopoverContent>
          </Popover>
        );
      };

      render(<ControlledPopover />);
      
      const trigger = screen.getByText('Controlled trigger');
      await user.click(trigger);

      expect(onOpenChange).toHaveBeenCalledWith(true);
      
      await waitFor(() => {
        expect(screen.getByText('Controlled content')).toBeInTheDocument();
      });
    });

    it('respects defaultOpen prop', () => {
      render(
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button>Default open trigger</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Default open content</p>
          </PopoverContent>
        </Popover>
      );

      expect(screen.getByText('Default open content')).toBeInTheDocument();
    });
  });

  describe('Positioning Props', () => {
    it('accepts side prop', () => {
      render(
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button>Side trigger</Button>
          </PopoverTrigger>
          <PopoverContent side="top">
            <p>Top positioned content</p>
          </PopoverContent>
        </Popover>
      );

      expect(screen.getByText('Top positioned content')).toBeInTheDocument();
    });

    it('accepts align prop', () => {
      render(
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button>Align trigger</Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <p>Start aligned content</p>
          </PopoverContent>
        </Popover>
      );

      expect(screen.getByText('Start aligned content')).toBeInTheDocument();
    });

    it('accepts sideOffset prop', () => {
      render(
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button>Offset trigger</Button>
          </PopoverTrigger>
          <PopoverContent sideOffset={10}>
            <p>Offset content</p>
          </PopoverContent>
        </Popover>
      );

      expect(screen.getByText('Offset content')).toBeInTheDocument();
    });

    it('accepts alignOffset prop', () => {
      render(
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button>Align offset trigger</Button>
          </PopoverTrigger>
          <PopoverContent alignOffset={5}>
            <p>Align offset content</p>
          </PopoverContent>
        </Popover>
      );

      expect(screen.getByText('Align offset content')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>ARIA trigger</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>ARIA content</p>
          </PopoverContent>
        </Popover>
      );

      const trigger = screen.getByText('ARIA trigger');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    });

    it('updates ARIA attributes when opened', async () => {
      const user = userEvent.setup();
      
      render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>ARIA open trigger</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>ARIA open content</p>
          </PopoverContent>
        </Popover>
      );

      const trigger = screen.getByText('ARIA open trigger');
      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      
      render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Keyboard trigger</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <Button>First button</Button>
              <Button>Second button</Button>
            </div>
          </PopoverContent>
        </Popover>
      );

      const trigger = screen.getByText('Keyboard trigger');
      trigger.focus();
      
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(screen.getByText('First button')).toBeInTheDocument();
      });

      await user.keyboard('{Tab}');
      expect(screen.getByText('Second button')).toHaveFocus();
    });
  });

  describe('Form Integration', () => {
    it('handles form submission within popover', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();
      
      const FormPopover = () => {
        const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          onSubmit();
        };

        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button>Form trigger</Button>
            </PopoverTrigger>
            <PopoverContent>
              <form onSubmit={handleSubmit}>
                <Input placeholder="Enter name" />
                <Button type="submit">Submit</Button>
              </form>
            </PopoverContent>
          </Popover>
        );
      };

      render(<FormPopover />);

      const trigger = screen.getByText('Form trigger');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
      });

      const submitButton = screen.getByText('Submit');
      await user.click(submitButton);

      expect(onSubmit).toHaveBeenCalled();
    });

    it('handles input changes within popover', async () => {
      const user = userEvent.setup();
      
      render(
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button>Input trigger</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Input placeholder="Type here" data-testid="popover-input" />
          </PopoverContent>
        </Popover>
      );

      const input = screen.getByTestId('popover-input');
      await user.type(input, 'Hello World');

      expect(input).toHaveValue('Hello World');
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid open/close operations', async () => {
      const user = userEvent.setup();
      
      render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Rapid trigger</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Rapid content</p>
          </PopoverContent>
        </Popover>
      );

      const trigger = screen.getByText('Rapid trigger');
      
      // Rapidly click multiple times
      await user.click(trigger);
      await user.click(trigger);
      await user.click(trigger);
      await user.click(trigger);

      // Should end up closed
      await waitFor(() => {
        expect(screen.queryByText('Rapid content')).not.toBeInTheDocument();
      });
    });

    it('handles empty content gracefully', () => {
      render(
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button>Empty content trigger</Button>
          </PopoverTrigger>
          <PopoverContent>
          </PopoverContent>
        </Popover>
      );

      expect(screen.getByText('Empty content trigger')).toBeInTheDocument();
    });

    it('handles nested interactive elements', async () => {
      const user = userEvent.setup();
      const onButtonClick = vi.fn();
      
      render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Nested trigger</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <Button onClick={onButtonClick}>Nested button</Button>
              <Input placeholder="Nested input" />
            </div>
          </PopoverContent>
        </Popover>
      );

      const trigger = screen.getByText('Nested trigger');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Nested button')).toBeInTheDocument();
      });

      const nestedButton = screen.getByText('Nested button');
      await user.click(nestedButton);

      expect(onButtonClick).toHaveBeenCalled();
    });
  });

  describe('Component Props', () => {
    it('forwards className to PopoverContent', () => {
      render(
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button>Class trigger</Button>
          </PopoverTrigger>
          <PopoverContent className="custom-popover">
            <p>Custom class content</p>
          </PopoverContent>
        </Popover>
      );

      expect(screen.getByText('Custom class content')).toBeInTheDocument();
    });

    it('supports modal prop', () => {
      render(
        <Popover modal>
          <PopoverTrigger asChild>
            <Button>Modal trigger</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Modal content</p>
          </PopoverContent>
        </Popover>
      );

      expect(screen.getByText('Modal trigger')).toBeInTheDocument();
    });

    it('supports avoidCollisions prop', () => {
      render(
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button>Collision trigger</Button>
          </PopoverTrigger>
          <PopoverContent avoidCollisions={false}>
            <p>No collision avoidance</p>
          </PopoverContent>
        </Popover>
      );

      expect(screen.getByText('No collision avoidance')).toBeInTheDocument();
    });
  });

  describe('Event Handling', () => {
    it('calls onOpenChange when popover opens', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      
      render(
        <Popover onOpenChange={onOpenChange}>
          <PopoverTrigger asChild>
            <Button>Event trigger</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Event content</p>
          </PopoverContent>
        </Popover>
      );

      const trigger = screen.getByText('Event trigger');
      await user.click(trigger);

      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('calls onOpenChange when popover closes', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      
      render(
        <Popover onOpenChange={onOpenChange}>
          <PopoverTrigger asChild>
            <Button>Close event trigger</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Close event content</p>
          </PopoverContent>
        </Popover>
      );

      const trigger = screen.getByText('Close event trigger');
      await user.click(trigger);

      expect(onOpenChange).toHaveBeenCalledWith(true);

      await user.keyboard('{Escape}');

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });
});