import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AspectRatio } from '../../components/ui/aspect-ratio'

// Test components
function TestAspectRatioWithImage({ ratio = 16 / 9 }: { ratio?: number }) {
  return (
    <AspectRatio ratio={ratio} data-testid="aspect-ratio">
      <img
        src="https://via.placeholder.com/800x450"
        alt="Test image"
        className="object-cover w-full h-full"
      />
    </AspectRatio>
  )
}

function TestAspectRatioWithVideo() {
  return (
    <AspectRatio ratio={16 / 9} data-testid="aspect-ratio-video">
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Test video"
        className="w-full h-full"
      />
    </AspectRatio>
  )
}

function TestAspectRatioWithCustomContent() {
  return (
    <AspectRatio ratio={1} data-testid="aspect-ratio-custom">
      <div className="bg-blue-500 w-full h-full flex items-center justify-center">
        <span>Custom Content</span>
      </div>
    </AspectRatio>
  )
}

describe('AspectRatio', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<TestAspectRatioWithImage />)
      expect(screen.getByTestId('aspect-ratio')).toBeInTheDocument()
    })

    it('renders with image content', () => {
      render(<TestAspectRatioWithImage />)
      const image = screen.getByAltText('Test image')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', 'https://via.placeholder.com/800x450')
    })

    it('renders with video content', () => {
      render(<TestAspectRatioWithVideo />)
      const iframe = screen.getByTitle('Test video')
      expect(iframe).toBeInTheDocument()
      expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ')
    })

    it('renders with custom content', () => {
      render(<TestAspectRatioWithCustomContent />)
      expect(screen.getByText('Custom Content')).toBeInTheDocument()
    })
  })

  describe('Aspect Ratios', () => {
    it('applies 16:9 ratio correctly', () => {
      render(<TestAspectRatioWithImage ratio={16 / 9} />)
      const container = screen.getByTestId('aspect-ratio')
      expect(container).toBeInTheDocument()
    })

    it('applies 1:1 (square) ratio correctly', () => {
      render(<TestAspectRatioWithImage ratio={1} />)
      const container = screen.getByTestId('aspect-ratio')
      expect(container).toBeInTheDocument()
    })

    it('applies 4:3 ratio correctly', () => {
      render(<TestAspectRatioWithImage ratio={4 / 3} />)
      const container = screen.getByTestId('aspect-ratio')
      expect(container).toBeInTheDocument()
    })

    it('applies custom ratio correctly', () => {
      render(<TestAspectRatioWithImage ratio={21 / 9} />)
      const container = screen.getByTestId('aspect-ratio')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Props', () => {
    it('accepts custom className', () => {
      render(
        <AspectRatio ratio={16 / 9} className="custom-class" data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      const container = screen.getByTestId('aspect-ratio')
      expect(container).toHaveClass('custom-class')
    })

    it('accepts data attributes', () => {
      render(
        <AspectRatio ratio={16 / 9} data-testid="custom-test-id">
          <div>Content</div>
        </AspectRatio>
      )
      expect(screen.getByTestId('custom-test-id')).toBeInTheDocument()
    })

    it('forwards other props', () => {
      render(
        <AspectRatio ratio={16 / 9} id="custom-id" data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      const container = screen.getByTestId('aspect-ratio')
      expect(container).toHaveAttribute('id', 'custom-id')
    })
  })

  describe('Content Types', () => {
    it('works with image elements', () => {
      render(
        <AspectRatio ratio={16 / 9} data-testid="aspect-ratio">
          <img src="test.jpg" alt="Test" />
        </AspectRatio>
      )
      expect(screen.getByAltText('Test')).toBeInTheDocument()
    })

    it("works with video elements", () => {
      const { container } = render(
        <AspectRatio ratio={16 / 9}>
          <video controls>
            <source src="test.mp4" type="video/mp4" />
          </video>
        </AspectRatio>
      )
      expect(container.querySelector('video')).toBeInTheDocument()
    })

    it('works with iframe elements', () => {
      render(
        <AspectRatio ratio={16 / 9} data-testid="aspect-ratio">
          <iframe src="https://example.com" title="Test iframe" />
        </AspectRatio>
      )
      expect(screen.getByTitle('Test iframe')).toBeInTheDocument()
    })

    it('works with div elements', () => {
      render(
        <AspectRatio ratio={1} data-testid="aspect-ratio">
          <div className="bg-red-500">Custom div content</div>
        </AspectRatio>
      )
      expect(screen.getByText('Custom div content')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('maintains semantic structure with images', () => {
      render(
        <AspectRatio ratio={16 / 9} data-testid="aspect-ratio">
          <img src="test.jpg" alt="Descriptive alt text" />
        </AspectRatio>
      )
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('alt', 'Descriptive alt text')
    })

    it('maintains semantic structure with videos', () => {
      render(
        <AspectRatio ratio={16 / 9} data-testid="aspect-ratio">
          <video controls aria-label="Test video">
            <source src="test.mp4" type="video/mp4" />
          </video>
        </AspectRatio>
      )
      const video = screen.getByLabelText('Test video')
      expect(video).toHaveAttribute('aria-label', 'Test video')
    })
  })

  describe('Edge Cases', () => {
    it('handles very small ratios', () => {
      render(<TestAspectRatioWithImage ratio={0.1} />)
      expect(screen.getByTestId('aspect-ratio')).toBeInTheDocument()
    })

    it('handles very large ratios', () => {
      render(<TestAspectRatioWithImage ratio={10} />)
      expect(screen.getByTestId('aspect-ratio')).toBeInTheDocument()
    })

    it('handles zero ratio gracefully', () => {
      render(<TestAspectRatioWithImage ratio={0} />)
      expect(screen.getByTestId('aspect-ratio')).toBeInTheDocument()
    })

    it('handles undefined ratio (should use default)', () => {
      render(
        <AspectRatio data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      expect(screen.getByTestId('aspect-ratio')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('applies background styling correctly', () => {
      render(
        <AspectRatio ratio={16 / 9} className="bg-gray-100" data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      const container = screen.getByTestId('aspect-ratio')
      expect(container).toHaveClass('bg-gray-100')
    })

    it('applies border styling correctly', () => {
      render(
        <AspectRatio ratio={16 / 9} className="border border-gray-300" data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      const container = screen.getByTestId('aspect-ratio')
      expect(container).toHaveClass('border', 'border-gray-300')
    })

    it('applies rounded corners correctly', () => {
      render(
        <AspectRatio ratio={16 / 9} className="rounded-lg" data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>
      )
      const container = screen.getByTestId('aspect-ratio')
      expect(container).toHaveClass('rounded-lg')
    })
  })
})