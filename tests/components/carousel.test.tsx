import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../components/ui/carousel'

// Mock embla-carousel-react
vi.mock('embla-carousel-react', () => ({
  default: vi.fn(() => [
    vi.fn(), // carouselRef
    {
      canScrollPrev: vi.fn(() => true),
      canScrollNext: vi.fn(() => true),
      scrollPrev: vi.fn(),
      scrollNext: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
      selectedScrollSnap: vi.fn(() => 0),
      scrollSnapList: vi.fn(() => [0, 1, 2]),
    },
  ]),
}))

const CarouselTestComponent = () => (
  <Carousel className="w-full max-w-xs">
    <CarouselContent>
      <CarouselItem>
        <div>Slide 1</div>
      </CarouselItem>
      <CarouselItem>
        <div>Slide 2</div>
      </CarouselItem>
      <CarouselItem>
        <div>Slide 3</div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
)

describe('Carousel', () => {
  it('renders carousel with content and navigation', () => {
    render(<CarouselTestComponent />)
    
    // Check if carousel content is rendered
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
    expect(screen.getByText('Slide 2')).toBeInTheDocument()
    expect(screen.getByText('Slide 3')).toBeInTheDocument()
    
    // Check if navigation buttons are present
    expect(screen.getByRole('button', { name: /previous slide/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next slide/i })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<CarouselTestComponent />)
    
    // Check for carousel region
    const carousel = screen.getByRole('region')
    expect(carousel).toHaveAttribute('aria-roledescription', 'carousel')
    
    // Check for slide groups
    const slides = screen.getAllByRole('group')
    slides.forEach(slide => {
      expect(slide).toHaveAttribute('aria-roledescription', 'slide')
    })
  })

  it('applies custom className', () => {
    const customClass = 'custom-carousel-class'
    
    render(
      <Carousel className={customClass}>
        <CarouselContent>
          <CarouselItem>Test</CarouselItem>
        </CarouselContent>
      </Carousel>
    )
    
    const carousel = screen.getByRole('region')
    expect(carousel).toHaveClass(customClass)
  })

  it('renders with vertical orientation', () => {
    render(
      <Carousel orientation="vertical">
        <CarouselContent>
          <CarouselItem>Test</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
    
    // Check if vertical orientation classes are applied
    const prevButton = screen.getByRole('button', { name: /previous slide/i })
    const nextButton = screen.getByRole('button', { name: /next slide/i })
    
    expect(prevButton).toHaveClass('rotate-90')
    expect(nextButton).toHaveClass('rotate-90')
  })

  it('handles keyboard navigation', () => {
    render(<CarouselTestComponent />)
    
    const carousel = screen.getByRole('region')
    
    // Test arrow key navigation
    fireEvent.keyDown(carousel, { key: 'ArrowLeft' })
    fireEvent.keyDown(carousel, { key: 'ArrowRight' })
    
    // The actual scrolling behavior is mocked, so we just verify the component doesn't crash
    expect(carousel).toBeInTheDocument()
  })

  it('renders navigation buttons with custom variants', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Test</CarouselItem>
        </CarouselContent>
        <CarouselPrevious variant="ghost" />
        <CarouselNext variant="secondary" />
      </Carousel>
    )
    
    const prevButton = screen.getByRole('button', { name: /previous slide/i })
    const nextButton = screen.getByRole('button', { name: /next slide/i })
    
    // Check if custom variant classes are applied
    expect(prevButton).toHaveClass('hover:bg-accent')
    expect(nextButton).toHaveClass('bg-secondary')
  })

  it('handles carousel item custom className', () => {
    const customItemClass = 'custom-item-class'
    
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem className={customItemClass}>
            Test Item
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    )
    
    const carouselItem = screen.getByRole('group')
    expect(carouselItem).toHaveClass(customItemClass)
  })

  it('renders carousel content with custom className', () => {
    const customContentClass = 'custom-content-class'
    
    render(
      <Carousel>
        <CarouselContent className={customContentClass}>
          <CarouselItem>Test</CarouselItem>
        </CarouselContent>
      </Carousel>
    )
    
    // The content div should have the custom class
    const contentDiv = screen.getByRole('group').parentElement
    expect(contentDiv).toHaveClass(customContentClass)
  })

  it('handles navigation button clicks', () => {
    render(<CarouselTestComponent />)
    
    const prevButton = screen.getByRole('button', { name: /previous slide/i })
    const nextButton = screen.getByRole('button', { name: /next slide/i })
    
    // Test button clicks
    fireEvent.click(prevButton)
    fireEvent.click(nextButton)
    
    // The actual scrolling behavior is mocked, so we just verify the buttons are clickable
    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  it('applies proper spacing classes for horizontal orientation', () => {
    render(
      <Carousel orientation="horizontal">
        <CarouselContent>
          <CarouselItem>Test 1</CarouselItem>
          <CarouselItem>Test 2</CarouselItem>
        </CarouselContent>
      </Carousel>
    )
    
    const items = screen.getAllByRole('group')
    items.forEach(item => {
      expect(item).toHaveClass('pl-4')
    })
  })

  it('applies proper spacing classes for vertical orientation', () => {
    render(
      <Carousel orientation="vertical">
        <CarouselContent>
          <CarouselItem>Test 1</CarouselItem>
          <CarouselItem>Test 2</CarouselItem>
        </CarouselContent>
      </Carousel>
    )
    
    const items = screen.getAllByRole('group')
    items.forEach(item => {
      expect(item).toHaveClass('pt-4')
    })
  })
})