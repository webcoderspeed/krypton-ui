import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

describe('AspectRatio Component', () => {
  it('renders aspect ratio container', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <div>Content inside aspect ratio</div>
      </AspectRatio>
    );
    
    expect(screen.getByText('Content inside aspect ratio')).toBeInTheDocument();
  });

  it('applies correct aspect ratio styles', () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <div>Content</div>
      </AspectRatio>
    );
    
    const aspectRatioElement = container.firstChild;
    expect(aspectRatioElement).toBeInTheDocument();
    expect(aspectRatioElement).toHaveStyle('position: relative');
  });

  it('renders with different aspect ratios', () => {
    const { rerender, container } = render(
      <AspectRatio ratio={1}>
        <div>Square content</div>
      </AspectRatio>
    );
    
    expect(screen.getByText('Square content')).toBeInTheDocument();
    
    rerender(
      <AspectRatio ratio={4 / 3}>
        <div>4:3 content</div>
      </AspectRatio>
    );
    
    expect(screen.getByText('4:3 content')).toBeInTheDocument();
  });

  it('supports custom className', () => {
    const { container } = render(
      <AspectRatio ratio={1} className="custom-aspect-ratio">
        <div>Square content</div>
      </AspectRatio>
    );
    
    const aspectRatioElement = container.firstChild;
    expect(aspectRatioElement).toBeInTheDocument();
    // AspectRatio component renders successfully with custom props
    expect(container.querySelector('.custom-aspect-ratio')).toBeTruthy();
  });
});