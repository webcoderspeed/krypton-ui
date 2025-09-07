import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

describe('Accordion', () => {
  describe('Single Type Accordion', () => {
    it('renders accordion with items', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Trigger 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      expect(screen.getByText('Trigger 1')).toBeInTheDocument()
      expect(screen.getByText('Trigger 2')).toBeInTheDocument()
    })

    it('opens and closes items when clicked', async () => {
      const user = userEvent.setup()
      
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      const trigger = screen.getByText('Trigger 1')
      
      // Initially closed
      expect(trigger).toHaveAttribute('data-state', 'closed')
      
      // Click to open
      await user.click(trigger)
      expect(trigger).toHaveAttribute('data-state', 'open')
      
      // Click to close (collapsible)
      await user.click(trigger)
      expect(trigger).toHaveAttribute('data-state', 'closed')
    })

    it('only allows one item open at a time', async () => {
      const user = userEvent.setup()
      
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Trigger 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      const trigger1 = screen.getByText('Trigger 1')
      const trigger2 = screen.getByText('Trigger 2')
      
      // Open first item
      await user.click(trigger1)
      expect(trigger1).toHaveAttribute('data-state', 'open')
      expect(trigger2).toHaveAttribute('data-state', 'closed')
      
      // Open second item - first should close
      await user.click(trigger2)
      expect(trigger1).toHaveAttribute('data-state', 'closed')
      expect(trigger2).toHaveAttribute('data-state', 'open')
    })

    it('supports controlled state', async () => {
      const onValueChange = vi.fn()
      const user = userEvent.setup()
      
      const { rerender } = render(
        <Accordion type="single" value="" onValueChange={onValueChange}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      const trigger = screen.getByText('Trigger 1')
      
      // Click trigger
      await user.click(trigger)
      expect(onValueChange).toHaveBeenCalledWith('item-1')
      
      // Update with controlled value
      rerender(
        <Accordion type="single" value="item-1" onValueChange={onValueChange}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      
      expect(trigger).toHaveAttribute('data-state', 'open')
    })

    it('supports default value', () => {
      render(
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      const trigger = screen.getByText('Trigger 1')
      expect(trigger).toHaveAttribute('data-state', 'open')
    })
  })

  describe('Multiple Type Accordion', () => {
    it('allows multiple items to be open', async () => {
      const user = userEvent.setup()
      
      render(
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Trigger 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      const trigger1 = screen.getByText('Trigger 1')
      const trigger2 = screen.getByText('Trigger 2')
      
      // Open both items
      await user.click(trigger1)
      await user.click(trigger2)
      
      expect(trigger1).toHaveAttribute('data-state', 'open')
      expect(trigger2).toHaveAttribute('data-state', 'open')
    })

    it('supports controlled state with multiple values', async () => {
      const onValueChange = vi.fn()
      const user = userEvent.setup()
      
      render(
        <Accordion type="multiple" value={[]} onValueChange={onValueChange}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Trigger 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      const trigger1 = screen.getByText('Trigger 1')
      
      await user.click(trigger1)
      expect(onValueChange).toHaveBeenCalledWith(['item-1'])
    })

    it('supports default values', () => {
      render(
        <Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Trigger 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      const trigger1 = screen.getByText('Trigger 1')
      const trigger2 = screen.getByText('Trigger 2')
      
      expect(trigger1).toHaveAttribute('data-state', 'open')
      expect(trigger2).toHaveAttribute('data-state', 'open')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      const trigger = screen.getByText('Trigger 1')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
      expect(trigger).toHaveAttribute('aria-controls')
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      const trigger = screen.getByText('Trigger 1')
      
      // Focus and activate with Enter
      trigger.focus()
      await user.keyboard('{Enter}')
      expect(trigger).toHaveAttribute('data-state', 'open')
      
      // Activate with Space
      await user.keyboard(' ')
      expect(trigger).toHaveAttribute('data-state', 'closed')
    })

    it('handles disabled state', () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item-1" disabled>
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      const trigger = screen.getByText('Trigger 1')
      expect(trigger).toHaveAttribute('data-disabled')
    })
  })

  describe('Custom Props', () => {
    it('applies custom className to AccordionItem', () => {
      const { container } = render(
        <Accordion type="single">
          <AccordionItem value="item-1" className="custom-item">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      const itemElement = container.querySelector('.custom-item')
      expect(itemElement).toBeInTheDocument()
      expect(itemElement).toHaveClass('border-b')
    })

    it('applies custom className to AccordionTrigger', () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger className="custom-trigger">Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      const trigger = screen.getByText('Trigger 1')
      expect(trigger).toHaveClass('custom-trigger')
    })

    it('applies custom className to AccordionContent', () => {
      render(
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent className="custom-content">Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      const content = screen.getByText('Content 1')
      expect(content).toHaveClass('custom-content')
    })
  })

  describe('Animation', () => {
    it('has animation classes on content', () => {
      render(
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      const contentContainer = screen.getByText('Content 1').parentElement
      expect(contentContainer).toHaveClass('data-[state=open]:animate-accordion-down')
      expect(contentContainer).toHaveClass('data-[state=closed]:animate-accordion-up')
    })
  })
})