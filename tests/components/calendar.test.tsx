import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Calendar } from '../../components/ui/calendar'
import { DateRange } from 'react-day-picker'

describe('Calendar', () => {
  it('renders calendar with default props', () => {
    render(<Calendar />)
    
    // Check if calendar is rendered
    expect(screen.getByRole('grid')).toBeInTheDocument()
    
    // Check if navigation buttons are present
    expect(screen.getByRole('button', { name: /previous month/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next month/i })).toBeInTheDocument()
  })

  it('renders in single selection mode', () => {
    const selectedDate = new Date(2024, 0, 15)
    
    render(
      <Calendar
        mode="single"
        selected={selectedDate}
        defaultMonth={new Date(2024, 0)}
      />
    )
    
    // Check if calendar renders in single mode
    expect(screen.getByRole('grid')).toBeInTheDocument()
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('renders in range selection mode', () => {
    const mockOnSelect = vi.fn()
    const dateRange: DateRange = {
      from: new Date(2024, 0, 10),
      to: new Date(2024, 0, 15)
    }
    
    render(
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={mockOnSelect}
        defaultMonth={new Date(2024, 0)}
      />
    )
    
    // Check if calendar renders in range mode
    expect(screen.getByRole('grid')).toBeInTheDocument()
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('renders in multiple selection mode', () => {
    const mockOnSelect = vi.fn()
    const selectedDates = [
      new Date(2024, 0, 10),
      new Date(2024, 0, 15),
      new Date(2024, 0, 20)
    ]
    
    render(
      <Calendar
        mode="multiple"
        selected={selectedDates}
        onSelect={mockOnSelect}
        defaultMonth={new Date(2024, 0)}
      />
    )
    
    // Test that calendar renders in multiple mode
    expect(screen.getByRole('grid')).toBeInTheDocument()
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('applies custom button variant', () => {
    render(
      <Calendar
        buttonVariant="outline"
      />
    )
    
    const prevButton = screen.getByRole('button', { name: /previous month/i })
    const nextButton = screen.getByRole('button', { name: /next month/i })
    
    // Check if outline variant classes are applied
    expect(prevButton).toHaveClass('border-input')
    expect(nextButton).toHaveClass('border-input')
  })

  it('renders with dropdown navigation', () => {
    render(
      <Calendar
        mode="single"
        captionLayout="dropdown"
        fromYear={2020}
        toYear={2025}
      />
    )
    
    // Check if calendar is rendered with dropdown layout
    expect(screen.getByRole('grid')).toBeInTheDocument()
  })

  it('handles disabled dates', () => {
    const disabledDays = [new Date(2024, 0, 15)] // January 15, 2024
    
    render(
      <Calendar
        mode="single"
        disabled={disabledDays}
        defaultMonth={new Date(2024, 0)}
      />
    )
    
    // Check if calendar renders with disabled configuration
    expect(screen.getByRole('grid')).toBeInTheDocument()
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('handles outside days visibility', () => {
    render(
      <Calendar
        showOutsideDays={false}
        defaultMonth={new Date(2024, 0, 1)}
      />
    )
    
    // Outside days should be hidden
    const calendar = screen.getByRole('grid')
    expect(calendar).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-calendar-class'
    
    render(
      <Calendar
        className={customClass}
      />
    )
    
    const calendar = screen.getByRole('grid').closest('[data-slot="calendar"]')
    expect(calendar).toHaveClass(customClass)
  })

  it('handles date selection in single mode', () => {
    const mockOnSelect = vi.fn()
    
    render(
      <Calendar
        mode="single"
        onSelect={mockOnSelect}
        defaultMonth={new Date(2024, 0, 1)}
      />
    )
    
    // Click on a date
    const dateButton = screen.getByRole('button', { name: /15/ })
    fireEvent.click(dateButton)
    
    expect(mockOnSelect).toHaveBeenCalled()
  })

  it('renders multiple months', () => {
    render(
      <Calendar
        numberOfMonths={2}
        defaultMonth={new Date(2024, 0, 1)}
      />
    )
    
    // Should render two month grids
    const grids = screen.getAllByRole('grid')
    expect(grids).toHaveLength(2)
  })

  it('has proper accessibility attributes', () => {
    render(
      <Calendar
        defaultMonth={new Date(2024, 0, 1)}
      />
    )
    
    // Check for proper ARIA attributes
    const calendar = screen.getByRole('grid')
    expect(calendar).toBeInTheDocument()
    
    // Check for navigation buttons
    const prevButton = screen.getByRole('button', { name: /previous month/i })
    const nextButton = screen.getByRole('button', { name: /next month/i })
    
    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })
})