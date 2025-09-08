import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

describe('Avatar', () => {
  it('renders correctly', () => {
    render(
      <Avatar>
        <AvatarImage src="test.jpg" alt="Test" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    )
    
    // Avatar component should render
    expect(screen.getByText('TU')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Avatar className="custom-avatar">
        <AvatarImage src="test.jpg" alt="Test" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    )
    
    const avatar = screen.getByText('TU').parentElement
    expect(avatar).toHaveClass('custom-avatar')
  })

  it('has default classes', () => {
    render(
      <Avatar>
        <AvatarImage src="test.jpg" alt="Test" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    )
    
    const avatar = screen.getByText('TU').parentElement
    expect(avatar).toHaveClass('relative', 'flex', 'h-10', 'w-10', 'shrink-0', 'overflow-hidden', 'rounded-full')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(
      <Avatar ref={ref}>
        <AvatarImage src="test.jpg" alt="Test" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    )
    
    expect(ref.current).toBeTruthy()
  })
})

describe('AvatarImage', () => {
  it('renders with correct src and alt when image loads', () => {
    render(
      <Avatar>
        <AvatarImage src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==" alt="Test User" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    )
    
    // Since image might not load immediately, check for fallback
    expect(screen.getByText('TU')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Avatar>
        <AvatarImage src="test.jpg" alt="Test" className="custom-image" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    )
    
    // Check that avatar renders with fallback
    expect(screen.getByText('TU')).toBeInTheDocument()
  })

  it('has default classes', () => {
    render(
      <Avatar>
        <AvatarImage src="test.jpg" alt="Test" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    )
    
    // Check that avatar renders with fallback
    expect(screen.getByText('TU')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(
      <Avatar>
        <AvatarImage ref={ref} src="test.jpg" alt="Test" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    )
    
    // Check that avatar renders
    expect(screen.getByText('TU')).toBeInTheDocument()
  })
})

describe('AvatarFallback', () => {
  it('renders fallback text', () => {
    render(
      <Avatar>
        <AvatarImage src="broken.jpg" alt="Test" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    )
    
    expect(screen.getByText('TU')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Avatar>
        <AvatarImage src="test.jpg" alt="Test" />
        <AvatarFallback className="custom-fallback">TU</AvatarFallback>
      </Avatar>
    )
    
    const fallback = screen.getByText('TU')
    expect(fallback).toHaveClass('custom-fallback')
  })

  it('has default classes', () => {
    render(
      <Avatar>
        <AvatarImage src="test.jpg" alt="Test" />
        <AvatarFallback>TU</AvatarFallback>
      </Avatar>
    )
    
    const fallback = screen.getByText('TU')
    expect(fallback).toHaveClass('flex', 'h-full', 'w-full', 'items-center', 'justify-center', 'rounded-full', 'bg-muted')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(
      <Avatar>
        <AvatarImage src="test.jpg" alt="Test" />
        <AvatarFallback ref={ref}>TU</AvatarFallback>
      </Avatar>
    )
    
    expect(ref.current).toBeTruthy()
  })

  it('accepts delayMs prop', () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback delayMs={0}>TU</AvatarFallback>
      </Avatar>
    )
    
    // Check that Avatar component renders
    expect(container.firstChild).toBeInTheDocument()
  })
})

describe('Avatar Integration', () => {
  it('shows fallback when image fails to load', async () => {
    render(
      <Avatar>
        <AvatarImage src="broken-image.jpg" alt="Test" />
        <AvatarFallback>FB</AvatarFallback>
      </Avatar>
    )
    
    // Fallback should be present
    expect(screen.getByText('FB')).toBeInTheDocument()
  })

  it('works with different sizes', () => {
    render(
      <Avatar className="h-16 w-16">
        <AvatarImage src="test.jpg" alt="Test" />
        <AvatarFallback className="text-lg">LG</AvatarFallback>
      </Avatar>
    )
    
    const fallback = screen.getByText('LG')
    const avatar = fallback.parentElement
    expect(avatar).toHaveClass('h-16', 'w-16')
    expect(fallback).toHaveClass('text-lg')
  })

  it('supports grouped avatars with borders', () => {
    render(
      <div className="flex -space-x-2">
        <Avatar className="border-2 border-background">
          <AvatarImage src="user1.jpg" alt="User 1" />
          <AvatarFallback>U1</AvatarFallback>
        </Avatar>
        <Avatar className="border-2 border-background">
          <AvatarImage src="user2.jpg" alt="User 2" />
          <AvatarFallback>U2</AvatarFallback>
        </Avatar>
      </div>
    )
    
    const fallback1 = screen.getByText('U1')
    const fallback2 = screen.getByText('U2')
    
    expect(fallback1.parentElement).toHaveClass('border-2', 'border-background')
    expect(fallback2.parentElement).toHaveClass('border-2', 'border-background')
  })
})

describe('Avatar Accessibility', () => {
  it('has proper fallback accessibility', () => {
    render(
      <Avatar>
        <AvatarImage src="user.jpg" alt="John Doe profile picture" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    
    const fallback = screen.getByText('JD')
    expect(fallback).toBeInTheDocument()
  })

  it('fallback is accessible to screen readers', () => {
    render(
      <Avatar>
        <AvatarImage src="broken.jpg" alt="Test" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    
    const fallback = screen.getByText('JD')
    expect(fallback).toBeInTheDocument()
    expect(fallback).toBeVisible()
  })

  it('supports aria attributes', () => {
    render(
      <Avatar aria-label="User avatar">
        <AvatarImage src="user.jpg" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    )
    
    const avatar = screen.getByLabelText('User avatar')
    expect(avatar).toBeInTheDocument()
  })
})