import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

describe('Avatar Component', () => {
  it('renders avatar with image', () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    );
    
    // Check if avatar container is rendered
    const avatar = container.querySelector('[class*="relative flex"]');
    expect(avatar).toBeInTheDocument();
  });

  it('shows fallback when image fails to load', () => {
    render(
      <Avatar>
        <AvatarImage src="invalid-url" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    );
    
    const fallback = screen.getByText('CN');
    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveClass('flex', 'h-full', 'w-full', 'items-center', 'justify-center');
  });

  it('renders only fallback when no image provided', () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('applies correct avatar styles', () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    
    const avatar = container.firstChild;
    expect(avatar).toHaveClass('relative');
    expect(avatar).toHaveClass('flex');
    expect(avatar).toHaveClass('h-10');
    expect(avatar).toHaveClass('w-10');
    expect(avatar).toHaveClass('shrink-0');
    expect(avatar).toHaveClass('overflow-hidden');
    expect(avatar).toHaveClass('rounded-full');
  });

  it('supports custom className', () => {
    const { container } = render(
      <Avatar className="custom-avatar">
        <AvatarFallback>CA</AvatarFallback>
      </Avatar>
    );
    
    const avatar = container.firstChild;
    expect(avatar).toHaveClass('custom-avatar');
  });

  it('fallback has correct styles', () => {
    render(
      <Avatar>
        <AvatarFallback>FB</AvatarFallback>
      </Avatar>
    );
    
    const fallback = screen.getByText('FB');
    expect(fallback).toHaveClass('flex');
    expect(fallback).toHaveClass('h-full');
    expect(fallback).toHaveClass('w-full');
    expect(fallback).toHaveClass('items-center');
    expect(fallback).toHaveClass('justify-center');
    expect(fallback).toHaveClass('rounded-full');
    expect(fallback).toHaveClass('bg-muted');
  });
});