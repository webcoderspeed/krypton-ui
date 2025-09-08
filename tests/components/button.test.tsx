import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/button';
import { describe, it, expect, vi } from 'vitest';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-primary')
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')

    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('border')

    rerender(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-secondary')

    rerender(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button')).toHaveClass('hover:bg-accent')

    rerender(<Button variant="link">Link</Button>)
    expect(screen.getByRole('button')).toHaveClass('underline-offset-4')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-9')

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-11')

    rerender(<Button size="icon">Icon</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-10', 'w-10')
  })

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard interactions', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Keyboard test</Button>);
    
    const button = screen.getByRole('button');
    button.focus();
    
    // Test Enter key
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    // Test Space key
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('prevents interaction when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')
    
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50')
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByRole('button')
    
    expect(button).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Button ref={ref}>Ref test</Button>)
    
    expect(ref).toHaveBeenCalled()
  })

  it('renders as child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
    expect(link).toHaveClass('bg-primary')
  })

  it('supports all HTML button attributes', () => {
    render(
      <Button
        type="submit"
        form="test-form"
        name="test-button"
        value="test-value"
      >
        Submit
      </Button>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toHaveAttribute('form', 'test-form')
    expect(button).toHaveAttribute('name', 'test-button')
    expect(button).toHaveAttribute('value', 'test-value')
  })

  it('has correct accessibility attributes', () => {
    render(<Button aria-label="Close dialog">×</Button>)
    const button = screen.getByRole('button')
    
    expect(button).toHaveAttribute('aria-label', 'Close dialog')
  })

  it('maintains focus styles', () => {
    render(<Button>Focus test</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('focus-visible:outline-none');
    expect(button).toHaveClass('focus-visible:ring-2');
  });

  it('handles form submission', async () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    const user = userEvent.setup();
    
    render(
      <form onSubmit={handleSubmit}>
        <Button type="submit">Submit</Button>
      </form>
    );
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('handles focus and blur events', async () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    const user = userEvent.setup();
    
    render(
      <div>
        <Button onFocus={handleFocus} onBlur={handleBlur}>Focus me</Button>
        <Button>Other button</Button>
      </div>
    );
    
    const button = screen.getByRole('button', { name: 'Focus me' });
    const otherButton = screen.getByRole('button', { name: 'Other button' });
    
    await user.click(button);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    await user.click(otherButton);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('supports complex children', () => {
    render(
      <Button>
        <span>Icon</span>
        <span>Text</span>
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('IconText');
    expect(button.children).toHaveLength(2);
  });

  it('handles rapid clicks', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Rapid click</Button>);
    
    const button = screen.getByRole('button');
    
    // Click multiple times rapidly
    await user.click(button);
    await user.click(button);
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  it('maintains button type attribute', () => {
    const { rerender } = render(<Button type="button">Default</Button>);
    let button = screen.getByRole('button') as HTMLButtonElement;
    expect(button.type).toBe('button');
    
    rerender(<Button type="submit">Submit</Button>);
    button = screen.getByRole('button') as HTMLButtonElement;
    expect(button.type).toBe('submit');
    
    rerender(<Button type="reset">Reset</Button>);
    button = screen.getByRole('button') as HTMLButtonElement;
    expect(button.type).toBe('reset');
  })
})