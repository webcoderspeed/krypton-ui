import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';
import { describe, it, expect } from 'vitest';

describe('Badge Component', () => {
  it('renders with default variant', () => {
    render(<Badge>Test Badge</Badge>);
    const badge = screen.getByText('Test Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-primary');
  });

  it('renders with secondary variant', () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    const badge = screen.getByText('Secondary Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-secondary');
  });

  it('renders with destructive variant', () => {
    render(<Badge variant="destructive">Destructive Badge</Badge>);
    const badge = screen.getByText('Destructive Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-destructive');
  });

  it('renders with outline variant', () => {
    render(<Badge variant="outline">Outline Badge</Badge>);
    const badge = screen.getByText('Outline Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('border');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    const badge = screen.getByText('Custom Badge');
    expect(badge).toHaveClass('custom-class');
  });

  it('renders children correctly', () => {
    render(
      <Badge>
        <span>Icon</span>
        Text Content
      </Badge>
    );
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Text Content')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<Badge>Accessible Badge</Badge>);
    const badge = screen.getByText('Accessible Badge');
    expect(badge.tagName).toBe('DIV');
  });

  it('supports all variant types', () => {
    const variants = ['default', 'secondary', 'destructive', 'outline'] as const;
    
    variants.forEach((variant) => {
      const { unmount } = render(<Badge variant={variant}>{variant} badge</Badge>);
      const badge = screen.getByText(`${variant} badge`);
      expect(badge).toBeInTheDocument();
      unmount();
    });
  });

  it('handles empty content', () => {
    render(<Badge></Badge>);
    const badge = document.querySelector('[class*="inline-flex"]');
    expect(badge).toBeInTheDocument();
  });

  it('maintains proper styling structure', () => {
    render(<Badge>Styled Badge</Badge>);
    const badge = screen.getByText('Styled Badge');
    expect(badge).toHaveClass('inline-flex');
    expect(badge).toHaveClass('items-center');
    expect(badge).toHaveClass('rounded-full');
    expect(badge).toHaveClass('px-2.5');
    expect(badge).toHaveClass('py-0.5');
  });
});