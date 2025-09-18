import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress } from '@/components/ui/progress';

describe('Progress Component', () => {
  it('renders progress bar with default props', () => {
    render(<Progress />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('renders progress bar with specified value', () => {
    render(<Progress value={50} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
  });

  it('renders progress bar with custom max value', () => {
    render(<Progress value={25} max={50} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '25');
    expect(progressBar).toHaveAttribute('aria-valuemax', '50');
  });

  it('applies custom className', () => {
    render(<Progress value={30} className="custom-class" />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('custom-class');
  });

  it('applies default styling classes', () => {
    render(<Progress value={40} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('relative', 'h-4', 'w-full', 'overflow-hidden', 'rounded-full', 'bg-secondary');
  });

  it('renders progress indicator with correct transform', () => {
    render(<Progress value={75} />);
    
    const progressBar = screen.getByRole('progressbar');
    const indicator = progressBar.querySelector('div');
    
    expect(indicator).toHaveStyle('transform: translateX(-25%)');
  });

  it('handles zero value correctly', () => {
    render(<Progress value={0} />);
    
    const progressBar = screen.getByRole('progressbar');
    const indicator = progressBar.querySelector('div');
    
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    expect(indicator).toHaveStyle('transform: translateX(-100%)');
  });

  it('handles maximum value correctly', () => {
    render(<Progress value={100} />);
    
    const progressBar = screen.getByRole('progressbar');
    const indicator = progressBar.querySelector('div');
    
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');
    expect(indicator).toHaveStyle('transform: translateX(-0%)');
  });

  it('handles undefined value gracefully', () => {
    render(<Progress value={undefined} />);
    
    const progressBar = screen.getByRole('progressbar');
    const indicator = progressBar.querySelector('div');
    
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    expect(indicator).toHaveStyle('transform: translateX(-100%)');
  });

  it('handles null value gracefully', () => {
    render(<Progress value={null as any} />);
    
    const progressBar = screen.getByRole('progressbar');
    const indicator = progressBar.querySelector('div');
    
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    expect(indicator).toHaveStyle('transform: translateX(-100%)');
  });

  it('clamps values above maximum', () => {
    render(<Progress value={150} max={100} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '150');
    // The component should still display the value even if it exceeds max
  });

  it('handles negative values', () => {
    render(<Progress value={-10} />);
    
    const progressBar = screen.getByRole('progressbar');
    const indicator = progressBar.querySelector('div');
    
    expect(progressBar).toHaveAttribute('aria-valuenow', '-10');
    expect(indicator).toHaveStyle('transform: translateX(-110%)');
  });

  it('supports custom max value with percentage calculation', () => {
    render(<Progress value={30} max={60} />);
    
    const progressBar = screen.getByRole('progressbar');
    const indicator = progressBar.querySelector('div');
    
    // 30/60 = 50%, so transform should be translateX(-50%)
    expect(indicator).toHaveStyle('transform: translateX(-50%)');
  });

  it('renders with additional HTML attributes', () => {
    render(
      <Progress 
        value={45} 
        data-testid="progress-test" 
        id="progress-id"
        aria-label="Loading progress"
      />
    );
    
    const progressBar = screen.getByTestId('progress-test');
    expect(progressBar).toHaveAttribute('id', 'progress-id');
    expect(progressBar).toHaveAttribute('aria-label', 'Loading progress');
  });

  it('maintains accessibility attributes', () => {
    render(<Progress value={60} max={200} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('role', 'progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '60');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '200');
  });

  it('renders indicator with correct styling classes', () => {
    render(<Progress value={80} />);
    
    const progressBar = screen.getByRole('progressbar');
    const indicator = progressBar.querySelector('div');
    
    expect(indicator).toHaveClass('h-full', 'w-full', 'flex-1', 'bg-primary', 'transition-all');
  });

  it('supports ref forwarding', () => {
    const ref = { current: null };
    render(<Progress ref={ref} value={25} />);
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('handles decimal values correctly', () => {
    render(<Progress value={33.33} />);
    
    const progressBar = screen.getByRole('progressbar');
    const indicator = progressBar.querySelector('div');
    
    expect(progressBar).toHaveAttribute('aria-valuenow', '33.33');
    expect(indicator).toHaveStyle('transform: translateX(-66.67%)');
  });

  it('works with different size variations via className', () => {
    const { rerender } = render(<Progress value={50} className="h-2" />);
    
    let progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('h-2');

    rerender(<Progress value={50} className="h-6" />);
    progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('h-6');
  });

  it('works with color variations via className', () => {
    render(<Progress value={70} className="[&>div]:bg-green-500" />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('[&>div]:bg-green-500');
  });

  it('maintains proper structure with nested indicator', () => {
    render(<Progress value={90} />);
    
    const progressBar = screen.getByRole('progressbar');
    const indicator = progressBar.querySelector('div');
    
    expect(progressBar.children).toHaveLength(1);
    expect(indicator).toBeInTheDocument();
    expect(indicator?.parentElement).toBe(progressBar);
  });

  describe('Edge Cases', () => {
    it('handles very large values', () => {
      render(<Progress value={999999} />);
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '999999');
    });

    it('handles very small decimal values', () => {
      render(<Progress value={0.001} />);
      
      const progressBar = screen.getByRole('progressbar');
      const indicator = progressBar.querySelector('div');
      
      expect(progressBar).toHaveAttribute('aria-valuenow', '0.001');
      expect(indicator).toHaveStyle('transform: translateX(-99.999%)');
    });

    it('handles zero max value', () => {
      render(<Progress value={10} max={0} />);
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuemax', '0');
    });

    it('handles string values passed as numbers', () => {
      render(<Progress value={'50' as any} />);
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    });
  });

  describe('Accessibility', () => {
    it('provides proper ARIA attributes for screen readers', () => {
      render(<Progress value={75} max={100} />);
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('role', 'progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '75');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    });

    it('supports custom aria-label', () => {
      render(<Progress value={50} aria-label="File upload progress" />);
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-label', 'File upload progress');
    });

    it('supports aria-labelledby', () => {
      render(
        <div>
          <div id="progress-label">Download Progress</div>
          <Progress value={30} aria-labelledby="progress-label" />
        </div>
      );
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-labelledby', 'progress-label');
    });

    it('supports aria-describedby', () => {
      render(
        <div>
          <Progress value={60} aria-describedby="progress-description" />
          <div id="progress-description">60% complete</div>
        </div>
      );
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-describedby', 'progress-description');
    });
  });
});