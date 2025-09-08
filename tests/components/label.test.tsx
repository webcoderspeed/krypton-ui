import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

describe('Label', () => {
  it('renders correctly', () => {
    render(<Label>Test Label</Label>)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Label className="custom-class">Test Label</Label>)
    const label = screen.getByText('Test Label')
    expect(label).toHaveClass('custom-class')
  })

  it('has default styling classes', () => {
    render(<Label>Test Label</Label>)
    const label = screen.getByText('Test Label')
    expect(label).toHaveClass('text-sm', 'font-medium', 'leading-none')
  })

  it('associates with form control using htmlFor', () => {
    render(
      <div>
        <Label htmlFor="test-input">Test Label</Label>
        <Input id="test-input" />
      </div>
    )
    
    const label = screen.getByText('Test Label')
    const input = screen.getByRole('textbox')
    
    expect(label).toHaveAttribute('for', 'test-input')
    expect(input).toHaveAttribute('id', 'test-input')
  })

  it('focuses associated input when clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <div>
        <Label htmlFor="clickable-input">Clickable Label</Label>
        <Input id="clickable-input" />
      </div>
    )
    
    const label = screen.getByText('Clickable Label')
    const input = screen.getByRole('textbox')
    
    await user.click(label)
    expect(input).toHaveFocus()
  })

  it('renders with required indicator', () => {
    render(
      <Label htmlFor="required-field">
        Required Field <span className="text-red-500">*</span>
      </Label>
    )
    
    expect(screen.getByText('Required Field')).toBeInTheDocument()
    expect(screen.getByText('*')).toBeInTheDocument()
    expect(screen.getByText('*')).toHaveClass('text-red-500')
  })

  it('handles disabled state styling', () => {
    render(
      <div>
        <Label htmlFor="disabled-input" className="peer-disabled:opacity-70">
          Disabled Label
        </Label>
        <Input id="disabled-input" disabled className="peer" />
      </div>
    )
    
    const label = screen.getByText('Disabled Label')
    expect(label).toHaveClass('peer-disabled:opacity-70')
  })

  it('supports different text sizes', () => {
    const { rerender } = render(
      <Label className="text-xs">Small Label</Label>
    )
    expect(screen.getByText('Small Label')).toHaveClass('text-xs')
    
    rerender(<Label className="text-base">Large Label</Label>)
    expect(screen.getByText('Large Label')).toHaveClass('text-base')
  })

  it('supports different colors', () => {
    const { rerender } = render(
      <Label className="text-primary">Primary Label</Label>
    )
    expect(screen.getByText('Primary Label')).toHaveClass('text-primary')
    
    rerender(<Label className="text-destructive">Error Label</Label>)
    expect(screen.getByText('Error Label')).toHaveClass('text-destructive')
    
    rerender(<Label className="text-muted-foreground">Muted Label</Label>)
    expect(screen.getByText('Muted Label')).toHaveClass('text-muted-foreground')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Label ref={ref}>Ref Label</Label>)
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
  })

  it('passes through additional props', () => {
    render(
      <Label data-testid="custom-label" title="Custom title">
        Custom Label
      </Label>
    )
    
    const label = screen.getByTestId('custom-label')
    expect(label).toHaveAttribute('title', 'Custom title')
  })

  it('works with complex form structures', () => {
    render(
      <form>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" />
          <p id="username-help">Enter your username</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" aria-describedby="email-help" />
          <p id="email-help">We&apos;ll never share your email</p>
        </div>
      </form>
    )
    
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByText('Enter your username')).toBeInTheDocument()
    expect(screen.getByText("We'll never share your email")).toBeInTheDocument()
  })

  it('maintains accessibility with screen readers', () => {
    render(
      <div>
        <Label htmlFor="accessible-input">
          Accessible Field
          <span className="sr-only">(Required for form submission)</span>
        </Label>
        <Input 
          id="accessible-input" 
          aria-describedby="field-help"
          required
        />
        <p id="field-help">Additional context for screen readers</p>
      </div>
    )
    
    const label = screen.getByText('Accessible Field')
    const input = screen.getByRole('textbox')
    const hiddenText = screen.getByText('(Required for form submission)')
    
    expect(label).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-describedby', 'field-help')
    expect(input).toBeRequired()
    expect(hiddenText).toHaveClass('sr-only')
  })

  it('handles multiple labels for same input', () => {
    render(
      <div>
        <Label htmlFor="multi-label-input">Primary Label</Label>
        <Label htmlFor="multi-label-input">Secondary Label</Label>
        <Input id="multi-label-input" />
      </div>
    )
    
    const input = screen.getByRole('textbox')
    const primaryLabel = screen.getByText('Primary Label')
    const secondaryLabel = screen.getByText('Secondary Label')
    
    expect(primaryLabel).toHaveAttribute('for', 'multi-label-input')
    expect(secondaryLabel).toHaveAttribute('for', 'multi-label-input')
    expect(input).toHaveAttribute('id', 'multi-label-input')
  })

  it('works with different input types', () => {
    render(
      <div>
        <Label htmlFor="checkbox-input">Checkbox Label</Label>
        <input type="checkbox" id="checkbox-input" />
        
        <Label htmlFor="radio-input">Radio Label</Label>
        <input type="radio" id="radio-input" name="radio-group" />
        
        <Label htmlFor="select-input">Select Label</Label>
        <select id="select-input">
          <option>Option 1</option>
        </select>
      </div>
    )
    
    expect(screen.getByLabelText('Checkbox Label')).toHaveAttribute('type', 'checkbox')
    expect(screen.getByLabelText('Radio Label')).toHaveAttribute('type', 'radio')
    expect(screen.getByLabelText('Select Label')).toBeInTheDocument()
  })
})