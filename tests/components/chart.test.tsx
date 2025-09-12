import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '../../components/ui/chart'
import { BarChart, Bar, XAxis, YAxis } from 'recharts'
import React from 'react'

// Mock recharts
vi.mock('recharts', () => ({
  __esModule: true,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  Tooltip: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="tooltip">{children}</div>
  ),
  Legend: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="legend">{children}</div>
  ),
}))

const mockChartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
}

const mockChartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
]

const TestChart = () => (
  <ChartContainer config={mockChartConfig}>
    <BarChart data={mockChartData}>
      <XAxis dataKey="month" />
      <YAxis />
      <Bar dataKey="desktop" fill="var(--color-desktop)" />
      <Bar dataKey="mobile" fill="var(--color-mobile)" />
    </BarChart>
  </ChartContainer>
)

describe('ChartContainer', () => {
  it('renders chart container with responsive container', () => {
    render(<TestChart />)
    
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-chart-class'
    
    render(
      <ChartContainer config={mockChartConfig} className={customClass}>
        <BarChart data={mockChartData}>
          <Bar dataKey="desktop" />
        </BarChart>
      </ChartContainer>
    )
    
    const container = screen.getByTestId('responsive-container').parentElement
    expect(container).toHaveClass(customClass)
  })

  it('generates unique chart id', () => {
    render(<TestChart />)
    
    const container = screen.getByTestId('responsive-container').parentElement
    expect(container).toHaveAttribute('data-chart')
    
    const chartId = container?.getAttribute('data-chart')
    expect(chartId).toMatch(/^chart-/)
  })

  it('uses custom id when provided', () => {
    const customId = 'my-custom-chart'
    
    render(
      <ChartContainer config={mockChartConfig} id={customId}>
        <BarChart data={mockChartData}>
          <Bar dataKey="desktop" />
        </BarChart>
      </ChartContainer>
    )
    
    const container = screen.getByTestId('responsive-container').parentElement
    expect(container).toHaveAttribute('data-chart', `chart-${customId}`)
  })

  it('renders chart style when config has colors', () => {
    render(<TestChart />)
    
    const styleElement = document.querySelector('style')
    expect(styleElement).toBeInTheDocument()
    expect(styleElement?.innerHTML).toContain('--color-desktop')
    expect(styleElement?.innerHTML).toContain('--color-mobile')
  })

  it('does not render style when config has no colors', () => {
    const configWithoutColors = {
      desktop: { label: 'Desktop' },
      mobile: { label: 'Mobile' },
    }
    
    render(
      <ChartContainer config={configWithoutColors}>
        <BarChart data={mockChartData}>
          <Bar dataKey="desktop" />
        </BarChart>
      </ChartContainer>
    )
    
    const styleElement = document.querySelector('style')
    expect(styleElement).not.toBeInTheDocument()
  })
})

describe('ChartTooltip', () => {
  it('renders tooltip component', () => {
    render(
      <ChartContainer config={mockChartConfig}>
        <BarChart data={mockChartData}>
          <ChartTooltip />
        </BarChart>
      </ChartContainer>
    )
    
    expect(screen.getByTestId('tooltip')).toBeInTheDocument()
  })
})

describe('ChartTooltipContent', () => {
  const mockPayload = [
    {
      dataKey: 'desktop',
      name: 'desktop',
      value: 186,
      color: 'hsl(var(--chart-1))',
      payload: { month: 'January', desktop: 186, mobile: 80 },
    },
  ]

  it('renders tooltip content when active', () => {
    render(
      <ChartContainer config={mockChartConfig}>
        <ChartTooltipContent
          active={true}
          payload={mockPayload}
          label="January"
        />
      </ChartContainer>
    )
    
    expect(screen.getByText('Desktop')).toBeInTheDocument()
    expect(screen.getByText('186')).toBeInTheDocument()
  })

  it('does not render when not active', () => {
    render(
      <ChartContainer config={mockChartConfig}>
        <ChartTooltipContent
          active={false}
          payload={mockPayload}
          label="January"
        />
      </ChartContainer>
    )
    
    expect(screen.queryByText('Desktop')).not.toBeInTheDocument()
  })

  it('hides label when hideLabel is true', () => {
    render(
      <ChartContainer config={mockChartConfig}>
        <ChartTooltipContent
          active={true}
          payload={mockPayload}
          label="January"
          hideLabel={true}
        />
      </ChartContainer>
    )
    
    expect(screen.queryByText('January')).not.toBeInTheDocument()
    expect(screen.getByText('Desktop')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-tooltip-class'
    
    render(
      <ChartContainer config={mockChartConfig}>
        <ChartTooltipContent
          active={true}
          payload={mockPayload}
          className={customClass}
        />
      </ChartContainer>
    )
    
    const tooltipContainer = screen.getByText('Desktop', { selector: '.font-medium' }).closest('.grid')
    expect(tooltipContainer).toHaveClass(customClass)
  })
})

describe('ChartLegend', () => {
  it('renders legend component', () => {
    render(
      <ChartContainer config={mockChartConfig}>
        <BarChart data={mockChartData}>
          <ChartLegend />
        </BarChart>
      </ChartContainer>
    )
    
    expect(screen.getByTestId('legend')).toBeInTheDocument()
  })
})

describe('ChartLegendContent', () => {
  const mockLegendPayload = [
    {
      value: 'desktop',
      dataKey: 'desktop',
      color: 'hsl(var(--chart-1))',
    },
    {
      value: 'mobile',
      dataKey: 'mobile',
      color: 'hsl(var(--chart-2))',
    },
  ]

  it('renders legend content with payload', () => {
    render(
      <ChartContainer config={mockChartConfig}>
        <ChartLegendContent payload={mockLegendPayload} />
      </ChartContainer>
    )
    
    expect(screen.getByText('Desktop')).toBeInTheDocument()
    expect(screen.getByText('Mobile')).toBeInTheDocument()
  })

  it('does not render when payload is empty', () => {
    render(
      <ChartContainer config={mockChartConfig}>
        <ChartLegendContent payload={[]} />
      </ChartContainer>
    )
    
    expect(screen.queryByText('Desktop')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-legend-class'
    render(
      <ChartContainer config={mockChartConfig}>
        <ChartLegendContent
          payload={mockLegendPayload}
          className={customClass}
        />
      </ChartContainer>
    )
    
    const legendContainer = screen.getByText('Desktop').closest('div')?.parentElement
    expect(legendContainer).toHaveClass(customClass)
  })

  it('applies vertical align classes', () => {
    render(
      <ChartContainer config={mockChartConfig}>
        <ChartLegendContent
          payload={mockLegendPayload}
          verticalAlign="top"
        />
      </ChartContainer>
    )
    
    const legendContainer = screen.getByText('Desktop').closest('div')?.parentElement
    expect(legendContainer).toHaveClass('pb-3')
  })
})