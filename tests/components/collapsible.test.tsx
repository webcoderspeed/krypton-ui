import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

describe('Collapsible Component', () => {
  it('renders collapsible with trigger and content', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>
    );
    
    expect(screen.getByText('Toggle')).toBeInTheDocument();
    expect(screen.getByText('Hidden content')).toBeInTheDocument();
  });

  it('expands content when trigger is clicked', async () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Click me</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>
    );
    
    const trigger = screen.getByText('Click me');
    fireEvent.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByText('Hidden content')).toBeVisible();
    });
  });

  it('collapses content when trigger is clicked again', async () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Click me</CollapsibleTrigger>
        <CollapsibleContent>Visible content</CollapsibleContent>
      </Collapsible>
    );
    
    const trigger = screen.getByText('Click me');
    
    // Content should be visible initially
    expect(screen.getByText('Visible content')).toBeVisible();
    
    // Click to collapse
    fireEvent.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByText('Visible content')).not.toBeVisible();
    });
  });

  it('respects defaultOpen prop', () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Initially visible</CollapsibleContent>
      </Collapsible>
    );
    
    expect(screen.getByText('Initially visible')).toBeVisible();
  });

  it('works in controlled mode', async () => {
    const ControlledCollapsible = () => {
      const [isOpen, setIsOpen] = useState(false);
      
      return (
        <div>
          <Button onClick={() => setIsOpen(!isOpen)}>External Toggle</Button>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger>Internal Toggle</CollapsibleTrigger>
            <CollapsibleContent>Controlled content</CollapsibleContent>
          </Collapsible>
        </div>
      );
    };
    
    render(<ControlledCollapsible />);
    
    const externalToggle = screen.getByText('External Toggle');
    const internalToggle = screen.getByText('Internal Toggle');
    
    // Initially closed
    expect(screen.getByText('Controlled content')).not.toBeVisible();
    
    // Open via external button
    fireEvent.click(externalToggle);
    await waitFor(() => {
      expect(screen.getByText('Controlled content')).toBeVisible();
    });
    
    // Close via internal trigger
    fireEvent.click(internalToggle);
    await waitFor(() => {
      expect(screen.getByText('Controlled content')).not.toBeVisible();
    });
  });

  it('calls onOpenChange when state changes', () => {
    const onOpenChange = vi.fn();
    
    render(
      <Collapsible onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    
    const trigger = screen.getByText('Toggle');
    fireEvent.click(trigger);
    
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('respects disabled prop', () => {
    const onOpenChange = vi.fn();
    
    render(
      <Collapsible disabled onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    
    const trigger = screen.getByText('Toggle');
    fireEvent.click(trigger);
    
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('supports keyboard navigation', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    
    const trigger = screen.getByText('Toggle');
    
    // Focus the trigger
    trigger.focus();
    expect(trigger).toHaveFocus();
    
    // Press Enter to toggle
    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(screen.getByText('Content')).toBeVisible();
    
    // Press Space to toggle
    fireEvent.keyDown(trigger, { key: ' ' });
    expect(screen.getByText('Content')).not.toBeVisible();
  });

  it('works with asChild prop on trigger', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button>Custom Button</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    
    const customButton = screen.getByRole('button', { name: 'Custom Button' });
    expect(customButton).toBeInTheDocument();
    
    fireEvent.click(customButton);
    expect(screen.getByText('Content')).toBeVisible();
  });

  it('works with asChild prop on content', () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent asChild>
          <div data-testid="custom-content">Custom content wrapper</div>
        </CollapsibleContent>
      </Collapsible>
    );
    
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    expect(screen.getByText('Custom content wrapper')).toBeVisible();
  });

  it('handles multiple collapsibles independently', async () => {
    render(
      <div>
        <Collapsible>
          <CollapsibleTrigger>First Toggle</CollapsibleTrigger>
          <CollapsibleContent>First Content</CollapsibleContent>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger>Second Toggle</CollapsibleTrigger>
          <CollapsibleContent>Second Content</CollapsibleContent>
        </Collapsible>
      </div>
    );
    
    const firstToggle = screen.getByText('First Toggle');
    const secondToggle = screen.getByText('Second Toggle');
    
    // Open first collapsible
    fireEvent.click(firstToggle);
    await waitFor(() => {
      expect(screen.getByText('First Content')).toBeVisible();
    });
    expect(screen.getByText('Second Content')).not.toBeVisible();
    
    // Open second collapsible
    fireEvent.click(secondToggle);
    await waitFor(() => {
      expect(screen.getByText('Second Content')).toBeVisible();
    });
    // First should still be open
    expect(screen.getByText('First Content')).toBeVisible();
  });

  it('has proper ARIA attributes', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    
    const trigger = screen.getByText('Toggle');
    const content = screen.getByText('Content');
    
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-controls');
    expect(content).toHaveAttribute('id');
    
    // After clicking
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('supports nested collapsibles', async () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Parent Toggle</CollapsibleTrigger>
        <CollapsibleContent>
          <div>Parent Content</div>
          <Collapsible>
            <CollapsibleTrigger>Child Toggle</CollapsibleTrigger>
            <CollapsibleContent>Child Content</CollapsibleContent>
          </Collapsible>
        </CollapsibleContent>
      </Collapsible>
    );
    
    const parentToggle = screen.getByText('Parent Toggle');
    
    // Open parent
    fireEvent.click(parentToggle);
    await waitFor(() => {
      expect(screen.getByText('Parent Content')).toBeVisible();
      expect(screen.getByText('Child Toggle')).toBeVisible();
    });
    
    // Child content should not be visible yet
    expect(screen.getByText('Child Content')).not.toBeVisible();
    
    // Open child
    const childToggle = screen.getByText('Child Toggle');
    fireEvent.click(childToggle);
    await waitFor(() => {
      expect(screen.getByText('Child Content')).toBeVisible();
    });
  });

  it('maintains state when re-rendered', async () => {
    const TestComponent = ({ extraProp }: { extraProp?: string }) => (
      <Collapsible>
        <CollapsibleTrigger>Toggle {extraProp}</CollapsibleTrigger>
        <CollapsibleContent>Content {extraProp}</CollapsibleContent>
      </Collapsible>
    );
    
    const { rerender } = render(<TestComponent />);
    
    const trigger = screen.getByText('Toggle');
    fireEvent.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByText('Content')).toBeVisible();
    });
    
    // Re-render with different props
    rerender(<TestComponent extraProp="updated" />);
    
    // State should be maintained
    expect(screen.getByText('Content updated')).toBeVisible();
  });

  it('handles rapid toggle clicks', async () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    
    const trigger = screen.getByText('Toggle');
    
    // Rapid clicks
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    
    await waitFor(() => {
      expect(screen.getByText('Content')).toBeVisible();
    });
  });
});

// Integration tests with real-world examples
describe('Collapsible Integration Tests', () => {
  it('works in FAQ component pattern', async () => {
    const FAQComponent = () => {
      const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
      
      const toggleItem = (id: number) => {
        setOpenItems(prev => ({
          ...prev,
          [id]: !prev[id]
        }));
      };
      
      const faqs = [
        { id: 1, question: 'Question 1', answer: 'Answer 1' },
        { id: 2, question: 'Question 2', answer: 'Answer 2' }
      ];
      
      return (
        <div>
          {faqs.map((faq) => (
            <Collapsible 
              key={faq.id}
              open={openItems[faq.id]} 
              onOpenChange={() => toggleItem(faq.id)}
            >
              <CollapsibleTrigger>{faq.question}</CollapsibleTrigger>
              <CollapsibleContent>{faq.answer}</CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      );
    };
    
    render(<FAQComponent />);
    
    // Both questions should be visible
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Question 2')).toBeInTheDocument();
    
    // Answers should not be visible initially
    expect(screen.getByText('Answer 1')).not.toBeVisible();
    expect(screen.getByText('Answer 2')).not.toBeVisible();
    
    // Open first FAQ
    fireEvent.click(screen.getByText('Question 1'));
    await waitFor(() => {
      expect(screen.getByText('Answer 1')).toBeVisible();
    });
    expect(screen.getByText('Answer 2')).not.toBeVisible();
    
    // Open second FAQ (both should be open)
    fireEvent.click(screen.getByText('Question 2'));
    await waitFor(() => {
      expect(screen.getByText('Answer 2')).toBeVisible();
    });
    expect(screen.getByText('Answer 1')).toBeVisible();
  });

  it('works in accordion-like pattern (only one open)', async () => {
    const AccordionLikeComponent = () => {
      const [activeItem, setActiveItem] = useState<number | null>(null);
      
      const toggleItem = (id: number) => {
        setActiveItem(prev => prev === id ? null : id);
      };
      
      const items = [
        { id: 1, title: 'Section 1', content: 'Content 1' },
        { id: 2, title: 'Section 2', content: 'Content 2' }
      ];
      
      return (
        <div>
          {items.map((item) => (
            <Collapsible 
              key={item.id}
              open={activeItem === item.id} 
              onOpenChange={() => toggleItem(item.id)}
            >
              <CollapsibleTrigger>{item.title}</CollapsibleTrigger>
              <CollapsibleContent>{item.content}</CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      );
    };
    
    render(<AccordionLikeComponent />);
    
    // Open first section
    fireEvent.click(screen.getByText('Section 1'));
    await waitFor(() => {
      expect(screen.getByText('Content 1')).toBeVisible();
    });
    
    // Open second section (should close first)
    fireEvent.click(screen.getByText('Section 2'));
    await waitFor(() => {
      expect(screen.getByText('Content 2')).toBeVisible();
      expect(screen.getByText('Content 1')).not.toBeVisible();
    });
  });
});