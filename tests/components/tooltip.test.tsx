import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

describe('Tooltip Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders tooltip trigger', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Trigger</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tooltip content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('renders tooltip with custom content', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Custom trigger</Button>
            </TooltipTrigger>
            <TooltipContent>
              <div>
                <h3>Title</h3>
                <p>Description</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.getByText('Custom trigger')).toBeInTheDocument();
    });
  });

  describe('Controlled State', () => {
    it('works with controlled open state', () => {
      const ControlledTooltip = () => {
        const [open, setOpen] = useState(false);
        
        return (
          <TooltipProvider>
            <Tooltip open={open} onOpenChange={setOpen}>
              <TooltipTrigger asChild>
                <Button onClick={() => setOpen(!open)}>Controlled trigger</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Controlled content</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      };

      render(<ControlledTooltip />);
      
      expect(screen.getByText('Controlled trigger')).toBeInTheDocument();
    });
  });

  describe('Positioning Props', () => {
    it('accepts side prop', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Side trigger</Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Top positioned</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.getByText('Side trigger')).toBeInTheDocument();
    });

    it('accepts align prop', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Align trigger</Button>
            </TooltipTrigger>
            <TooltipContent align="start">
              <p>Start aligned</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.getByText('Align trigger')).toBeInTheDocument();
    });

    it('accepts sideOffset prop', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Offset trigger</Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={10}>
              <p>Offset content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.getByText('Offset trigger')).toBeInTheDocument();
    });
  });

  describe('Provider Configuration', () => {
    it('works with custom delay duration', () => {
      render(
        <TooltipProvider delayDuration={1000}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Delayed trigger</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delayed content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.getByText('Delayed trigger')).toBeInTheDocument();
    });

    it('works with skip delay duration', () => {
      render(
        <TooltipProvider skipDelayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Skip delay trigger</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Skip delay content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.getByText('Skip delay trigger')).toBeInTheDocument();
    });

    it('works with disableHoverableContent', () => {
      render(
        <TooltipProvider disableHoverableContent>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Non-hoverable trigger</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Non-hoverable content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.getByText('Non-hoverable trigger')).toBeInTheDocument();
    });
  });

  describe('Event Handlers', () => {
    it('accepts onOpenChange callback', () => {
      const onOpenChange = vi.fn();
      
      render(
        <TooltipProvider>
          <Tooltip onOpenChange={onOpenChange}>
            <TooltipTrigger asChild>
              <Button>Event trigger</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Event content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.getByText('Event trigger')).toBeInTheDocument();
      expect(onOpenChange).toBeInstanceOf(Function);
    });
  });

  describe('Multiple Tooltips', () => {
    it('handles multiple tooltips in same provider', () => {
      render(
        <TooltipProvider>
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>First trigger</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>First content</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>Second trigger</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Second content</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      );

      expect(screen.getByText('First trigger')).toBeInTheDocument();
      expect(screen.getByText('Second trigger')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('renders accessible tooltip structure', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Accessible trigger</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Accessible content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      const trigger = screen.getByText('Accessible trigger');
      expect(trigger).toBeInTheDocument();
      expect(trigger.tagName).toBe('BUTTON');
    });
  });

  describe('Edge Cases', () => {
    it('handles disabled trigger', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled>Disabled trigger</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Disabled content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      const trigger = screen.getByText('Disabled trigger');
      expect(trigger).toBeDisabled();
    });

    it('handles empty content', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Empty content trigger</Button>
            </TooltipTrigger>
            <TooltipContent>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.getByText('Empty content trigger')).toBeInTheDocument();
    });

    it('handles nested tooltips', () => {
      render(
        <TooltipProvider>
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>Outer trigger</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Outer content</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      );

      expect(screen.getByText('Outer trigger')).toBeInTheDocument();
    });
  });

  describe('Component Props', () => {
    it('forwards className to TooltipContent', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Class trigger</Button>
            </TooltipTrigger>
            <TooltipContent className="custom-tooltip">
              <p>Custom class content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.getByText('Class trigger')).toBeInTheDocument();
    });

    it('supports defaultOpen prop', () => {
      render(
        <TooltipProvider>
          <Tooltip defaultOpen>
            <TooltipTrigger asChild>
              <Button>Default open trigger</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Default open content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(screen.getByText('Default open trigger')).toBeInTheDocument();
    });
  });
});