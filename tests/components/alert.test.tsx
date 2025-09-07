import { render, screen } from '@testing-library/react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal, AlertCircle } from 'lucide-react'
import { describe, it, expect } from 'vitest'

describe('Alert', () => {
  it('renders correctly', () => {
    render(
      <Alert>
        <AlertTitle>Test Title</AlertTitle>
        <AlertDescription>Test Description</AlertDescription>
      </Alert>
    )
    
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('applies default variant classes', () => {
    render(
      <Alert>
        <AlertTitle>Default Alert</AlertTitle>
      </Alert>
    )
    
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('bg-background', 'text-foreground')
  })

  it('applies destructive variant classes', () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Destructive Alert</AlertTitle>
      </Alert>
    )
    
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('border-destructive/50', 'text-destructive')
  })

  it('applies custom className', () => {
    render(
      <Alert className="custom-alert">
        <AlertTitle>Custom Alert</AlertTitle>
      </Alert>
    )
    
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('custom-alert')
  })

  it('renders with icon', () => {
    render(
      <Alert>
        <Terminal className="h-4 w-4" data-testid="alert-icon" />
        <AlertTitle>Alert with Icon</AlertTitle>
        <AlertDescription>This alert has an icon</AlertDescription>
      </Alert>
    )
    
    expect(screen.getByTestId('alert-icon')).toBeInTheDocument()
    expect(screen.getByText('Alert with Icon')).toBeInTheDocument()
  })

  it('renders without icon', () => {
    render(
      <Alert>
        <AlertTitle>Alert without Icon</AlertTitle>
        <AlertDescription>This alert has no icon</AlertDescription>
      </Alert>
    )
    
    expect(screen.queryByTestId('alert-icon')).not.toBeInTheDocument()
    expect(screen.getByText('Alert without Icon')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(
      <Alert ref={ref}>
        <AlertTitle>Ref Test</AlertTitle>
      </Alert>
    )
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('passes through additional props', () => {
    render(
      <Alert data-testid="alert-with-props" id="test-alert">
        <AlertTitle>Props Test</AlertTitle>
      </Alert>
    )
    
    const alert = screen.getByTestId('alert-with-props')
    expect(alert).toHaveAttribute('id', 'test-alert')
  })
})

describe('AlertTitle', () => {
  it('renders as h5 element', () => {
    render(<AlertTitle>Test Title</AlertTitle>)
    
    const title = screen.getByText('Test Title')
    expect(title.tagName).toBe('H5')
  })

  it('applies default classes', () => {
    render(<AlertTitle>Styled Title</AlertTitle>)
    
    const title = screen.getByText('Styled Title')
    expect(title).toHaveClass('mb-1', 'font-medium', 'leading-none', 'tracking-tight')
  })

  it('applies custom className', () => {
    render(<AlertTitle className="custom-title">Custom Title</AlertTitle>)
    
    const title = screen.getByText('Custom Title')
    expect(title).toHaveClass('custom-title')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<AlertTitle ref={ref}>Ref Title</AlertTitle>)
    
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement)
  })
})

describe('AlertDescription', () => {
  it('renders as div element', () => {
    render(<AlertDescription>Test Description</AlertDescription>)
    
    const description = screen.getByText('Test Description')
    expect(description.tagName).toBe('DIV')
  })

  it('applies default classes', () => {
    render(<AlertDescription>Styled Description</AlertDescription>)
    
    const description = screen.getByText('Styled Description')
    expect(description).toHaveClass('text-sm')
  })

  it('applies custom className', () => {
    render(<AlertDescription className="custom-description">Custom Description</AlertDescription>)
    
    const description = screen.getByText('Custom Description')
    expect(description).toHaveClass('custom-description')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<AlertDescription ref={ref}>Ref Description</AlertDescription>)
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('handles paragraph content correctly', () => {
    render(
      <AlertDescription>
        <p>Paragraph content</p>
      </AlertDescription>
    )
    
    const description = screen.getByText('Paragraph content')
    expect(description.tagName).toBe('P')
    expect(description.parentElement).toHaveClass('text-sm')
  })
})

describe('Alert Integration', () => {
  it('renders complete alert with all components', () => {
    render(
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" data-testid="error-icon" />
        <AlertTitle>Error occurred</AlertTitle>
        <AlertDescription>
          <p>Something went wrong. Please try again.</p>
        </AlertDescription>
      </Alert>
    )
    
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByTestId('error-icon')).toBeInTheDocument()
    expect(screen.getByText('Error occurred')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument()
  })

  it('maintains accessibility with proper role', () => {
    render(
      <Alert>
        <AlertTitle>Accessible Alert</AlertTitle>
        <AlertDescription>This alert is accessible</AlertDescription>
      </Alert>
    )
    
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveAttribute('role', 'alert')
  })
})