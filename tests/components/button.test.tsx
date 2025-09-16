import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports disabled state', () => {
    render(<Button disabled>Disabled Button</Button>);
    
    const button = screen.getByText('Disabled Button');
    expect(button).toBeDisabled();
  });

  it('renders with default variant', () => {
    render(<Button>Default Button</Button>);
    
    const button = screen.getByText('Default Button');
    expect(button).toHaveClass('bg-primary');
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    
    const button = screen.getByText('Secondary Button');
    expect(button).toHaveClass('bg-secondary');
  });

  it('renders with destructive variant', () => {
    render(<Button variant="destructive">Destructive Button</Button>);
    
    const button = screen.getByText('Destructive Button');
    expect(button).toHaveClass('bg-destructive');
  });

  it('renders with outline variant', () => {
    render(<Button variant="outline">Outline Button</Button>);
    
    const button = screen.getByText('Outline Button');
    expect(button).toHaveClass('border-input');
  });

  it('renders with ghost variant', () => {
    render(<Button variant="ghost">Ghost Button</Button>);
    
    const button = screen.getByText('Ghost Button');
    expect(button).toHaveClass('hover:bg-accent');
  });

  it('renders with link variant', () => {
    render(<Button variant="link">Link Button</Button>);
    
    const button = screen.getByText('Link Button');
    expect(button).toHaveClass('text-primary');
  });

  it('renders with small size', () => {
    render(<Button size="sm">Small Button</Button>);
    
    const button = screen.getByText('Small Button');
    expect(button).toHaveClass('h-9');
  });

  it('renders with large size', () => {
    render(<Button size="lg">Large Button</Button>);
    
    const button = screen.getByText('Large Button');
    expect(button).toHaveClass('h-11');
  });

  it('supports custom className', () => {
    render(<Button className="custom-button">Custom Button</Button>);
    
    const button = screen.getByText('Custom Button');
    expect(button).toHaveClass('custom-button');
  });

  it('renders as different element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="#">Link Button</a>
      </Button>
    );
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#');
  });
});