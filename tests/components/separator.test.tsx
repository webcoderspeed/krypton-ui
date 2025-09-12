import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Separator } from '@/components/ui/separator'

describe('Separator', () => {
  it('renders correctly', () => {
    render(<Separator data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    expect(separator).toBeInTheDocument()
  })

  it('has default horizontal orientation', () => {
    render(<Separator data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveAttribute('data-orientation', 'horizontal')
  })

  it('applies vertical orientation when specified', () => {
    render(<Separator orientation="vertical" data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveAttribute('data-orientation', 'vertical')
  })

  it('has default styling classes', () => {
    render(<Separator data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveClass('shrink-0', 'bg-border')
  })

  it('applies horizontal-specific classes by default', () => {
    render(<Separator data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveClass('h-[1px]', 'w-full')
  })

  it('applies vertical-specific classes when orientation is vertical', () => {
    render(<Separator orientation="vertical" data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveClass('h-full', 'w-[1px]')
  })

  it('applies custom className', () => {
    render(<Separator className="custom-class" data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveClass('custom-class')
  })

  it('is decorative by default', () => {
    render(<Separator data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    // When decorative=true, Radix sets role="none" to indicate it's decorative
    expect(separator).toHaveAttribute('role', 'none')
  })

  it('can be semantic when decorative is false', () => {
    render(<Separator decorative={false} data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    expect(separator).not.toHaveAttribute('aria-hidden')
    expect(separator).toHaveAttribute('role', 'separator')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Separator ref={ref} data-testid="separator" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('passes through additional props', () => {
    render(
      <Separator 
        data-testid="separator" 
        title="Custom separator"
        id="custom-separator"
      />
    )
    
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveAttribute('title', 'Custom separator')
    expect(separator).toHaveAttribute('id', 'custom-separator')
  })

  it('works in navigation context', () => {
    render(
      <nav>
        <div className="flex items-center space-x-4">
          <a href="#">Home</a>
          <Separator orientation="vertical" data-testid="nav-separator" />
          <a href="#">About</a>
        </div>
      </nav>
    )
    
    const separator = screen.getByTestId('nav-separator')
    expect(separator).toHaveAttribute('data-orientation', 'vertical')
    expect(separator).toHaveClass('h-full', 'w-[1px]')
  })

  it('works in content sections', () => {
    render(
      <article>
        <section>
          <h2>Section 1</h2>
          <p>Content 1</p>
        </section>
        <Separator data-testid="content-separator" />
        <section>
          <h2>Section 2</h2>
          <p>Content 2</p>
        </section>
      </article>
    )
    
    const separator = screen.getByTestId('content-separator')
    expect(separator).toHaveAttribute('data-orientation', 'horizontal')
    expect(separator).toHaveClass('h-[1px]', 'w-full')
  })

  it('supports custom colors', () => {
    const { rerender } = render(
      <Separator className="bg-primary" data-testid="separator" />
    )
    expect(screen.getByTestId('separator')).toHaveClass('bg-primary')
    
    rerender(<Separator className="bg-destructive" data-testid="separator" />)
    expect(screen.getByTestId('separator')).toHaveClass('bg-destructive')
    
    rerender(<Separator className="bg-muted" data-testid="separator" />)
    expect(screen.getByTestId('separator')).toHaveClass('bg-muted')
  })

  it('supports custom thickness', () => {
    const { rerender } = render(
      <Separator className="h-[2px]" data-testid="separator" />
    )
    expect(screen.getByTestId('separator')).toHaveClass('h-[2px]')
    
    rerender(
      <Separator 
        orientation="vertical" 
        className="w-[2px]" 
        data-testid="separator" 
      />
    )
    expect(screen.getByTestId('separator')).toHaveClass('w-[2px]')
  })

  it('supports gradient styling', () => {
    render(
      <Separator 
        className="bg-gradient-to-r from-transparent via-border to-transparent" 
        data-testid="separator" 
      />
    )
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveClass(
      'bg-gradient-to-r',
      'from-transparent',
      'via-border',
      'to-transparent'
    )
  })

  it('supports dashed styling', () => {
    render(
      <Separator 
        className="border-dashed border-t border-border bg-transparent h-0" 
        data-testid="separator" 
      />
    )
    const separator = screen.getByTestId('separator')
    expect(separator).toHaveClass(
      'border-dashed',
      'border-t',
      'border-border',
      'bg-transparent',
      'h-0'
    )
  })

  it('works in complex layouts', () => {
    render(
      <div className="flex">
        <main className="flex-1">
          <h1>Main Content</h1>
          <p>This is the main content area.</p>
        </main>
        <Separator orientation="vertical" data-testid="layout-separator" />
        <aside className="w-64">
          <h2>Sidebar</h2>
          <p>This is the sidebar content.</p>
        </aside>
      </div>
    )
    
    const separator = screen.getByTestId('layout-separator')
    expect(separator).toHaveAttribute('data-orientation', 'vertical')
    expect(separator).toHaveClass('h-full', 'w-[1px]')
  })

  it('maintains accessibility in semantic mode', () => {
    render(
      <div>
        <section aria-labelledby="section1">
          <h2 id="section1">First Section</h2>
          <p>Content for first section</p>
        </section>
        <Separator 
          decorative={false} 
          aria-label="Section divider"
          data-testid="semantic-separator" 
        />
        <section aria-labelledby="section2">
          <h2 id="section2">Second Section</h2>
          <p>Content for second section</p>
        </section>
      </div>
    )
    
    const separator = screen.getByTestId('semantic-separator')
    expect(separator).toHaveAttribute('role', 'separator')
    expect(separator).toHaveAttribute('aria-label', 'Section divider')
    expect(separator).not.toHaveAttribute('aria-hidden')
  })

  it('works with different spacing', () => {
    const { rerender } = render(
      <div>
        <p>Content before</p>
        <Separator className="my-2" data-testid="separator" />
        <p>Content after</p>
      </div>
    )
    expect(screen.getByTestId('separator')).toHaveClass('my-2')
    
    rerender(
      <div>
        <p>Content before</p>
        <Separator className="my-8" data-testid="separator" />
        <p>Content after</p>
      </div>
    )
    expect(screen.getByTestId('separator')).toHaveClass('my-8')
  })

  it('handles multiple separators in sequence', () => {
    render(
      <div className="flex items-center space-x-2">
        <span>Item 1</span>
        <Separator orientation="vertical" data-testid="sep-1" />
        <span>Item 2</span>
        <Separator orientation="vertical" data-testid="sep-2" />
        <span>Item 3</span>
        <Separator orientation="vertical" data-testid="sep-3" />
        <span>Item 4</span>
      </div>
    )
    
    expect(screen.getByTestId('sep-1')).toBeInTheDocument()
    expect(screen.getByTestId('sep-2')).toBeInTheDocument()
    expect(screen.getByTestId('sep-3')).toBeInTheDocument()
    
    // All should have vertical orientation
    expect(screen.getByTestId('sep-1')).toHaveAttribute('data-orientation', 'vertical')
    expect(screen.getByTestId('sep-2')).toHaveAttribute('data-orientation', 'vertical')
    expect(screen.getByTestId('sep-3')).toHaveAttribute('data-orientation', 'vertical')
  })
})