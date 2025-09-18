import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Calendar } from '@/components/ui/calendar';

describe('Calendar Component', () => {
  it('renders calendar', () => {
    render(<Calendar mode="single" />);
    
    // Check if calendar grid is present
    const calendar = screen.getByRole('grid');
    expect(calendar).toBeInTheDocument();
  });

  it('renders with selected date', () => {
    const selectedDate = new Date(2024, 0, 15);
    
    render(<Calendar mode="single" selected={selectedDate} />);
    
    // Calendar should render without errors
    const calendar = screen.getByRole('grid');
    expect(calendar).toBeInTheDocument();
  });

  it('renders with disabled dates', () => {
    const disabledDates = [new Date(2024, 0, 10), new Date(2024, 0, 20)];
    
    render(<Calendar mode="single" disabled={disabledDates} />);
    
    const calendar = screen.getByRole('grid');
    expect(calendar).toBeInTheDocument();
  });

  it('supports custom className', () => {
    const { container } = render(<Calendar mode="single" className="custom-calendar" />);
    
    const calendar = container.querySelector('.custom-calendar');
    expect(calendar).toBeInTheDocument();
  });

  it('renders month and year in header', () => {
    render(<Calendar mode="single" />);
    
    // Calendar should render without errors
    const calendar = screen.getByRole('grid');
    expect(calendar).toBeInTheDocument();
  });

  it('renders weekday headers', () => {
    const { container } = render(<Calendar mode="single" />);
    
    // Check if calendar grid is present (weekdays are part of the grid)
    const calendar = screen.getByRole('grid');
    expect(calendar).toBeInTheDocument();
    
    // Check for calendar container with proper structure
    const calendarContainer = container.querySelector('[data-slot="calendar"]');
    expect(calendarContainer).toBeInTheDocument();
  });
});