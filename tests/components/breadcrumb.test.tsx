import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "../../components/ui/breadcrumb"

describe("Breadcrumb", () => {
  it("renders correctly", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.getByLabelText("breadcrumb")).toBeInTheDocument()
  })

  it("renders with custom separator", () => {
    render(
      <Breadcrumb separator={<span>/</span>}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByRole("navigation")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(
      <Breadcrumb className="custom-breadcrumb">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByRole("navigation")).toHaveClass("custom-breadcrumb")
  })
})

describe("BreadcrumbList", () => {
  it("renders as ordered list", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByRole("list")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList className="custom-list">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByRole("list")).toHaveClass("custom-list")
  })
})

describe("BreadcrumbItem", () => {
  it("renders as list item", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByRole("listitem")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="custom-item">
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByRole("listitem")).toHaveClass("custom-item")
  })
})

describe("BreadcrumbLink", () => {
  it("renders as anchor link", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    const link = screen.getByRole("link", { name: "Home" })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/home")
  })

  it("applies custom className", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="custom-link">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByRole("link")).toHaveClass("custom-link")
  })

  it("renders with asChild prop", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <button>Custom Button</button>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByRole("button", { name: "Custom Button" })).toBeInTheDocument()
  })
})

describe("BreadcrumbPage", () => {
  it("renders current page correctly", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Current Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    const currentPage = screen.getByText("Current Page")
    expect(currentPage).toBeInTheDocument()
    expect(currentPage).toHaveAttribute("aria-current", "page")
    expect(currentPage).toHaveAttribute("aria-disabled", "true")
    expect(currentPage).toHaveAttribute("role", "link")
  })

  it("applies custom className", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="custom-page">Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByText("Current")).toHaveClass("custom-page")
  })
})

describe("BreadcrumbSeparator", () => {
  it("renders default separator", () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    const separator = container.querySelector('li[role="presentation"]')
    expect(separator).toBeInTheDocument()
    expect(separator).toHaveAttribute("aria-hidden", "true")
  })

  it("renders custom separator", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <span>/</span>
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByText("/")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="custom-separator" />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(container.querySelector('li[role="presentation"]')).toHaveClass("custom-separator")
  })
})

describe("BreadcrumbEllipsis", () => {
  it("renders ellipsis correctly", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByText("More")).toBeInTheDocument()
    expect(screen.getByText("More")).toHaveClass("sr-only")
  })

  it("applies custom className", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbEllipsis className="custom-ellipsis" />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    const ellipsis = screen.getByText("More").parentElement
    expect(ellipsis).toHaveClass("custom-ellipsis")
  })

  it("has correct accessibility attributes", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    const ellipsis = screen.getByText("More").parentElement
    expect(ellipsis).toHaveAttribute("role", "presentation")
    expect(ellipsis).toHaveAttribute("aria-hidden", "true")
  })
})

describe("Breadcrumb Accessibility", () => {
  it("has proper ARIA labels and roles", () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    // Navigation has proper label
    expect(screen.getByLabelText("breadcrumb")).toBeInTheDocument()
    
    // Current page has proper attributes
    const currentPage = screen.getByText("Current Product")
    expect(currentPage).toHaveAttribute("aria-current", "page")
    expect(currentPage).toHaveAttribute("aria-disabled", "true")
    
    // Separators are hidden from screen readers
    const separatorElements = container.querySelectorAll('li[aria-hidden="true"]')
    expect(separatorElements.length).toBe(2) // We have 2 BreadcrumbSeparator components
    separatorElements.forEach((separator: Element) => {
      expect(separator).toHaveAttribute("aria-hidden", "true")
      expect(separator).toHaveAttribute("role", "presentation")
    })
  })
})

describe("Breadcrumb Integration", () => {
  it("renders complete breadcrumb navigation", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/category">Category</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current Item</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    // Check all components are rendered
    expect(screen.getByRole("navigation")).toBeInTheDocument()
    expect(screen.getByRole("list")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Category" })).toBeInTheDocument()
    expect(screen.getByText("Current Item")).toBeInTheDocument()
    expect(screen.getByText("More")).toBeInTheDocument()
  })
})