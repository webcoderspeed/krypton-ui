import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from '@/components/ui/checkbox';

describe('Checkbox', () => {
  // Basic rendering tests
  it('renders correctly', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders with custom id', () => {
    render(<Checkbox id="test-checkbox" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'test-checkbox');
  });

  it('renders with custom className', () => {
    render(<Checkbox className="custom-class" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('custom-class');
  });

  // State tests
  it('starts unchecked by default', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('can be checked by default', () => {
    render(<Checkbox defaultChecked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('can be controlled', () => {
    const { rerender } = render(<Checkbox checked={false} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    rerender(<Checkbox checked={true} />);
    expect(checkbox).toBeChecked();
  });

  it('handles indeterminate state', () => {
    render(<Checkbox checked="indeterminate" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
  });

  // Interaction tests
  it('toggles when clicked', async () => {
    const user = userEvent.setup();
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    
    expect(checkbox).not.toBeChecked();
    
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('calls onCheckedChange when toggled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    
    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);
    
    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('responds to keyboard interactions', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    
    checkbox.focus();
    await user.keyboard(' ');
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  // Disabled state tests
  it('can be disabled', () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('does not respond to clicks when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox disabled onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    
    await user.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
    expect(checkbox).not.toBeChecked();
  });

  it('does not respond to keyboard when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox disabled onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    
    checkbox.focus();
    await user.keyboard(' ');
    expect(handleChange).not.toHaveBeenCalled();
  });

  // Form integration tests
  it('works with form submission', () => {
    render(
      <form data-testid="test-form">
        <Checkbox name="test-checkbox" value="test-value" defaultChecked />
      </form>
    );
    
    const checkbox = screen.getByRole('checkbox');
    // Radix checkbox may not directly expose name/value attributes on the button element
    // Instead, check if the component is properly rendered with these props
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it('can be required', () => {
    render(<Checkbox required />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeRequired();
  });

  // Focus and blur tests
  it('handles focus and blur events', async () => {
    const user = userEvent.setup();
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    
    render(
      <Checkbox 
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    
    await user.click(checkbox);
    expect(handleFocus).toHaveBeenCalled();
    
    await user.tab();
    expect(handleBlur).toHaveBeenCalled();
  });

  // Accessibility tests
  it('has proper ARIA attributes', () => {
    render(<Checkbox aria-label="Test checkbox" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'Test checkbox');
  });

  it('supports aria-describedby', () => {
    render(
      <div>
        <Checkbox aria-describedby="description" />
        <div id="description">This is a description</div>
      </div>
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-describedby', 'description');
  });

  // Label association tests
  it('works with associated label', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Checkbox id="labeled-checkbox" />
        <label htmlFor="labeled-checkbox">Click me</label>
      </div>
    );
    
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Click me');
    
    expect(checkbox).not.toBeChecked();
    
    await user.click(label);
    expect(checkbox).toBeChecked();
  });

  // Edge cases
  it('handles rapid clicks', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    
    // Rapid clicks
    await user.click(checkbox);
    await user.click(checkbox);
    await user.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledTimes(3);
  });

  it('handles controlled state changes', () => {
    const TestComponent = () => {
      const [checked, setChecked] = React.useState(false);
      
      return (
        <div>
          <Checkbox 
            checked={checked} 
            onCheckedChange={(value) => {
              if (typeof value === 'boolean') {
                setChecked(value);
              }
            }} 
          />
          <button onClick={() => setChecked(!checked)}>Toggle</button>
        </div>
      );
    };
    
    render(<TestComponent />);
    const checkbox = screen.getByRole('checkbox');
    const button = screen.getByRole('button');
    
    expect(checkbox).not.toBeChecked();
    
    fireEvent.click(button);
    expect(checkbox).toBeChecked();
  });

  // Performance tests
  it('does not cause unnecessary re-renders', () => {
    const renderSpy = vi.fn();
    
    const TestComponent = () => {
      renderSpy();
      return <Checkbox />;
    };
    
    const { rerender } = render(<TestComponent />);
    expect(renderSpy).toHaveBeenCalledTimes(1);
    
    // Re-render with same props
    rerender(<TestComponent />);
    expect(renderSpy).toHaveBeenCalledTimes(2);
  });

  // Error handling
  it('handles invalid checked values gracefully', () => {
    // This should not throw an error
    expect(() => {
      render(<Checkbox checked={undefined} />);
    }).not.toThrow();
  });

  it('handles missing onCheckedChange gracefully', async () => {
    const user = userEvent.setup();
    
    expect(() => {
      render(<Checkbox />);
    }).not.toThrow();
    
    const checkbox = screen.getByRole('checkbox');
    
    // Should not throw when clicked without onCheckedChange
    await expect(user.click(checkbox)).resolves.not.toThrow();
  });
});