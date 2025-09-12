import { render, screen, fireEvent } from "@testing-library/react"
import { useState } from "react"
import { describe, it, expect } from "vitest"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible"

function TestCollapsible() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Content</CollapsibleContent>
    </Collapsible>
  )
}

function UncontrolledCollapsible() {
  return (
    <Collapsible defaultOpen={false}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Content</CollapsibleContent>
    </Collapsible>
  )
}

describe("Collapsible", () => {
  it("renders correctly", () => {
    render(<TestCollapsible />)
    
    const trigger = screen.getByRole("button")
    const root = trigger.parentElement
    
    expect(root).toBeInTheDocument()
    expect(trigger).toBeInTheDocument()
    expect(root).toHaveAttribute("data-state", "closed")
  })

  it("displays trigger text", () => {
    render(<TestCollapsible />)
    
    expect(screen.getByText("Toggle")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveTextContent("Toggle")
  })

  it("starts in closed state", () => {
    render(<TestCollapsible />)
    
    const trigger = screen.getByRole("button")
    const root = trigger.parentElement
    expect(root).toHaveAttribute("data-state", "closed")
  })

  it("toggles state when trigger is clicked", () => {
    render(<TestCollapsible />)
    
    const trigger = screen.getByRole("button")
    const root = trigger.parentElement
    
    // Initially closed
    expect(root).toHaveAttribute("data-state", "closed")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    
    // Click to open
    fireEvent.click(trigger)
    expect(root).toHaveAttribute("data-state", "open")
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    
    // Click to close
    fireEvent.click(trigger)
    expect(root).toHaveAttribute("data-state", "closed")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("works in uncontrolled mode", () => {
    render(<UncontrolledCollapsible />)
    
    const trigger = screen.getByRole("button")
    const root = trigger.parentElement
    
    expect(root).toBeInTheDocument()
    expect(trigger).toBeInTheDocument()
    expect(root).toHaveAttribute("data-state", "closed")
  })

  it("accepts custom className", () => {
    render(
      <Collapsible className="custom-class" defaultOpen>
        <CollapsibleTrigger className="trigger-class">Toggle</CollapsibleTrigger>
        <CollapsibleContent className="content-class">Content</CollapsibleContent>
      </Collapsible>
    )
    
    const trigger = screen.getByRole("button")
    const content = screen.getByText("Content")
    const root = trigger.parentElement
    
    expect(root).toHaveClass("custom-class")
    expect(trigger).toHaveClass("trigger-class")
    expect(content).toHaveClass("content-class")
  })

  it("forwards props to underlying elements", () => {
    render(
      <Collapsible data-custom="root" defaultOpen>
        <CollapsibleTrigger data-custom="trigger">Toggle</CollapsibleTrigger>
        <CollapsibleContent data-custom="content">Content</CollapsibleContent>
      </Collapsible>
    )
    
    const trigger = screen.getByRole("button")
    const content = screen.getByText("Content")
    const root = trigger.parentElement
    
    expect(root).toHaveAttribute("data-custom", "root")
    expect(trigger).toHaveAttribute("data-custom", "trigger")
    expect(content).toHaveAttribute("data-custom", "content")
  })

  it("handles disabled state", () => {
    render(
      <Collapsible disabled>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>
          <div>Content</div>
        </CollapsibleContent>
      </Collapsible>
    )
    
    const trigger = screen.getByRole("button")
    expect(trigger).toBeDisabled()
  })
})

describe("CollapsibleTrigger", () => {
  it("renders as button by default", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    )
    
    const trigger = screen.getByRole("button")
    expect(trigger.tagName).toBe("BUTTON")
  })

  it("supports asChild prop", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger asChild>
          <div data-testid="custom-trigger">Custom Toggle</div>
        </CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    )
    
    const trigger = screen.getByTestId("custom-trigger")
    expect(trigger).toBeInTheDocument()
    expect(trigger.tagName).toBe("DIV")
    expect(trigger).toHaveAttribute("data-state", "closed")
  })
})

describe("CollapsibleContent", () => {
  it("renders content correctly when open", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>
          <p>Paragraph content</p>
          <span>Span content</span>
        </CollapsibleContent>
      </Collapsible>
    )
    
    expect(screen.getByText("Paragraph content")).toBeInTheDocument()
    expect(screen.getByText("Span content")).toBeInTheDocument()
  })

  it("supports asChild prop", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent asChild>
          <div data-testid="custom-content">Custom content</div>
        </CollapsibleContent>
      </Collapsible>
    )
    
    expect(screen.getByTestId("custom-content")).toBeInTheDocument()
  })

  it("supports forceMount prop", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent forceMount>Always mounted content</CollapsibleContent>
      </Collapsible>
    )
    
    expect(screen.getByText("Always mounted content")).toBeInTheDocument()
  })
})