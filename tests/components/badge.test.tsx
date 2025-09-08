import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/badge'
import { describe, it, expect, vi } from 'vitest'

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<Badge>Test Badge</Badge>)
      expect(screen.getByText('Test Badge')).toBeInTheDocument()
    })

    it('renders with children', () => {
      render(
        <Badge>
          <span>Child Content</span>
        </Badge>
      )
      expect(screen.getByText('Child Content')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      const { container } = render(
        <Badge className="custom-class">Test</Badge>
      )
      expect(container.firstChild).toHaveClass('custom-class')
    })

    it('has default classes', () => {
      const { container } = render(<Badge>Test</Badge>)
      const badge = container.firstChild as HTMLElement
      expect(badge).toHaveClass(
        'inline-flex',
        'items-center',
        'rounded-full',
        'border',
        'px-2.5',
        'py-0.5',
        'text-xs',
        'font-semibold'
      )
    })
  })

  describe('Variants', () => {
    it('applies default variant styles', () => {
      const { container } = render(<Badge>Default</Badge>)
      const badge = container.firstChild as HTMLElement
      expect(badge).toHaveClass(
        'border-transparent',
        'bg-primary',
        'text-primary-foreground'
      )
    })

    it('applies secondary variant styles', () => {
      const { container } = render(
        <Badge variant="secondary">Secondary</Badge>
      )
      const badge = container.firstChild as HTMLElement
      expect(badge).toHaveClass(
        'border-transparent',
        'bg-secondary',
        'text-secondary-foreground'
      )
    })

    it('applies destructive variant styles', () => {
      const { container } = render(
        <Badge variant="destructive">Destructive</Badge>
      )
      const badge = container.firstChild as HTMLElement
      expect(badge).toHaveClass(
        'border-transparent',
        'bg-destructive',
        'text-destructive-foreground'
      )
    })

    it('applies outline variant styles', () => {
      const { container } = render(
        <Badge variant="outline">Outline</Badge>
      )
      const badge = container.firstChild as HTMLElement
      expect(badge).toHaveClass('text-foreground')
    })
  })

  describe('HTML Attributes', () => {
    it('forwards HTML attributes', () => {
      render(
        <Badge data-testid="badge" id="test-badge" title="Test Title">
          Test
        </Badge>
      )
      const badge = screen.getByTestId('badge')
      expect(badge).toHaveAttribute('id', 'test-badge')
      expect(badge).toHaveAttribute('title', 'Test Title')
    })

    it('supports onClick handler', () => {
      const handleClick = vi.fn()
      render(<Badge onClick={handleClick}>Clickable</Badge>)
      const badge = screen.getByText('Clickable')
      badge.click()
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('supports custom styles', () => {
      const customStyle = { backgroundColor: 'red', color: 'white' }
      const { container } = render(
        <Badge style={customStyle}>Styled</Badge>
      )
      const badge = container.firstChild as HTMLElement
      expect(badge).toHaveStyle('background-color: rgb(255, 0, 0)')
      expect(badge).toHaveStyle('color: rgb(255, 255, 255)')
    })
  })

  describe('Integration', () => {
    it('works with different content types', () => {
      render(
        <div>
          <Badge>Text Content</Badge>
          <Badge>{123}</Badge>
          <Badge>
            <span>Nested</span> Content
          </Badge>
        </div>
      )
      
      expect(screen.getByText('Text Content')).toBeInTheDocument()
      expect(screen.getByText('123')).toBeInTheDocument()
      expect(screen.getByText('Nested')).toBeInTheDocument()
      expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('supports multiple badges in a container', () => {
      render(
        <div>
          <Badge variant="default">Badge 1</Badge>
          <Badge variant="secondary">Badge 2</Badge>
          <Badge variant="destructive">Badge 3</Badge>
          <Badge variant="outline">Badge 4</Badge>
        </div>
      )
      
      expect(screen.getByText('Badge 1')).toBeInTheDocument()
      expect(screen.getByText('Badge 2')).toBeInTheDocument()
      expect(screen.getByText('Badge 3')).toBeInTheDocument()
      expect(screen.getByText('Badge 4')).toBeInTheDocument()
    })

    it('works with custom className and variant together', () => {
      const { container } = render(
        <Badge variant="secondary" className="custom-badge">
          Combined
        </Badge>
      )
      const badge = container.firstChild as HTMLElement
      expect(badge).toHaveClass('custom-badge')
      expect(badge).toHaveClass('bg-secondary')
      expect(badge).toHaveClass('text-secondary-foreground')
    })
  })

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      const { container } = render(<Badge>Accessible Badge</Badge>)
      const badge = container.firstChild as HTMLElement
      expect(badge.tagName).toBe('DIV')
    })

    it('supports ARIA attributes', () => {
      render(
        <Badge aria-label="Status badge" role="status">
          Active
        </Badge>
      )
      const badge = screen.getByRole('status')
      expect(badge).toHaveAttribute('aria-label', 'Status badge')
    })

    it('supports focus management', () => {
      render(<Badge tabIndex={0}>Focusable Badge</Badge>)
      const badge = screen.getByText('Focusable Badge')
      expect(badge).toHaveAttribute('tabIndex', '0')
      badge.focus()
      expect(badge).toHaveFocus()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty content', () => {
      const { container } = render(<Badge></Badge>)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles null children', () => {
      const { container } = render(<Badge>{null}</Badge>)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles undefined variant gracefully', () => {
      const { container } = render(
        <Badge variant={undefined as any}>Test</Badge>
      )
      const badge = container.firstChild as HTMLElement
      expect(badge).toHaveClass('bg-primary') // Should fallback to default
    })

    it('handles very long text content', () => {
      const longText = 'This is a very long badge text that might overflow'
      render(<Badge>{longText}</Badge>)
      expect(screen.getByText(longText)).toBeInTheDocument()
    })
  })
})