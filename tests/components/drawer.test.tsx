import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

// Mock the vaul library
vi.mock("vaul", () => ({
  Drawer: {
    Root: ({ children, ...props }: any) => <div data-testid="drawer-root" {...props}>{children}</div>,
    Trigger: ({ children, ...props }: any) => <button data-testid="drawer-trigger" {...props}>{children}</button>,
    Portal: ({ children }: any) => <div data-testid="drawer-portal">{children}</div>,
    Overlay: ({ children, ...props }: any) => <div data-testid="drawer-overlay" {...props}>{children}</div>,
    Content: ({ children, ...props }: any) => <div data-testid="drawer-content" {...props}>{children}</div>,
    Close: ({ children, ...props }: any) => <button data-testid="drawer-close" {...props}>{children}</button>,
    Title: ({ children, ...props }: any) => <h2 data-testid="drawer-title" {...props}>{children}</h2>,
    Description: ({ children, ...props }: any) => <p data-testid="drawer-description" {...props}>{children}</p>,
  },
}));

describe("Drawer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders drawer trigger correctly", () => {
      render(
        <Drawer>
          <DrawerTrigger>Open Drawer</DrawerTrigger>
        </Drawer>
      );

      expect(screen.getByTestId("drawer-trigger")).toBeInTheDocument();
      expect(screen.getByText("Open Drawer")).toBeInTheDocument();
    });

    it("renders drawer content when provided", () => {
      render(
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Test Title</DrawerTitle>
              <DrawerDescription>Test Description</DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      );

      expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
      expect(screen.getByTestId("drawer-title")).toBeInTheDocument();
      expect(screen.getByTestId("drawer-description")).toBeInTheDocument();
      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
    });

    it("renders drawer with footer", () => {
      render(
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose>Cancel</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );

      expect(screen.getByText("Submit")).toBeInTheDocument();
      expect(screen.getByTestId("drawer-close")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("applies correct CSS classes to drawer content", () => {
      render(
        <Drawer>
          <DrawerContent>Test Content</DrawerContent>
        </Drawer>
      );

      const content = screen.getByTestId("drawer-content");
      expect(content).toHaveClass(
        "fixed",
        "inset-x-0",
        "bottom-0",
        "z-50",
        "mt-24",
        "flex",
        "h-auto",
        "flex-col",
        "rounded-t-[10px]",
        "border",
        "bg-background"
      );
    });

    it("applies correct CSS classes to drawer header", () => {
      render(
        <Drawer>
          <DrawerContent>
            <DrawerHeader>Header Content</DrawerHeader>
          </DrawerContent>
        </Drawer>
      );

      const header = screen.getByText("Header Content").parentElement;
      expect(header).toHaveClass("grid", "gap-1.5", "p-4", "text-center", "sm:text-left");
    });

    it("applies correct CSS classes to drawer footer", () => {
      render(
        <Drawer>
          <DrawerContent>
            <DrawerFooter>Footer Content</DrawerFooter>
          </DrawerContent>
        </Drawer>
      );

      const footer = screen.getByText("Footer Content").parentElement;
      expect(footer).toHaveClass("mt-auto", "flex", "flex-col", "gap-2", "p-4");
    });

    it("applies correct CSS classes to drawer title", () => {
      render(
        <Drawer>
          <DrawerContent>
            <DrawerTitle>Test Title</DrawerTitle>
          </DrawerContent>
        </Drawer>
      );

      const title = screen.getByTestId("drawer-title");
      expect(title).toHaveClass(
        "text-lg",
        "font-semibold",
        "leading-none",
        "tracking-tight"
      );
    });

    it("applies correct CSS classes to drawer description", () => {
      render(
        <Drawer>
          <DrawerContent>
            <DrawerDescription>Test Description</DrawerDescription>
          </DrawerContent>
        </Drawer>
      );

      const description = screen.getByTestId("drawer-description");
      expect(description).toHaveClass("text-sm", "text-muted-foreground");
    });
  });

  describe("Props and Configuration", () => {
    it("passes shouldScaleBackground prop to root", () => {
      render(
        <Drawer shouldScaleBackground={false}>
          <DrawerTrigger>Open</DrawerTrigger>
        </Drawer>
      );

      const root = screen.getByTestId("drawer-root");
      expect(root).toHaveAttribute("shouldScaleBackground", "false");
    });

    it("accepts custom className for content", () => {
      render(
        <Drawer>
          <DrawerContent className="custom-class">
            Test Content
          </DrawerContent>
        </Drawer>
      );

      const content = screen.getByTestId("drawer-content");
      expect(content).toHaveClass("custom-class");
    });

    it("accepts custom className for header", () => {
      render(
        <Drawer>
          <DrawerContent>
            <DrawerHeader className="custom-header">
              Header Content
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      );

      const header = screen.getByText("Header Content").parentElement;
      expect(header).toHaveClass("custom-header");
    });

    it("accepts custom className for footer", () => {
      render(
        <Drawer>
          <DrawerContent>
            <DrawerFooter className="custom-footer">
              Footer Content
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );

      const footer = screen.getByText("Footer Content").parentElement;
      expect(footer).toHaveClass("custom-footer");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes on title", () => {
      render(
        <Drawer>
          <DrawerContent>
            <DrawerTitle>Accessible Title</DrawerTitle>
          </DrawerContent>
        </Drawer>
      );

      const title = screen.getByTestId("drawer-title");
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("H2");
    });

    it("has proper ARIA attributes on description", () => {
      render(
        <Drawer>
          <DrawerContent>
            <DrawerDescription>Accessible Description</DrawerDescription>
          </DrawerContent>
        </Drawer>
      );

      const description = screen.getByTestId("drawer-description");
      expect(description).toBeInTheDocument();
      expect(description.tagName).toBe("P");
    });

    it("supports asChild prop on trigger", () => {
      render(
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Custom Trigger</Button>
          </DrawerTrigger>
        </Drawer>
      );

      const trigger = screen.getByTestId("drawer-trigger");
      expect(trigger).toHaveAttribute("asChild", "true");
    });

    it("supports asChild prop on close", () => {
      render(
        <Drawer>
          <DrawerContent>
            <DrawerClose asChild>
              <Button>Custom Close</Button>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      );

      const close = screen.getByTestId("drawer-close");
      expect(close).toHaveAttribute("asChild", "true");
    });
  });

  describe("Real-World Usage Examples", () => {
    it("renders shopping cart drawer correctly", () => {
      render(
        <Drawer>
          <DrawerTrigger>
            <Button>Cart (3)</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Shopping Cart</DrawerTitle>
              <DrawerDescription>Review your items</DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <div className="space-y-2">
                <div>Item 1 - $10.00</div>
                <div>Item 2 - $15.00</div>
                <div>Item 3 - $8.00</div>
              </div>
              <div className="mt-4 font-bold">Total: $33.00</div>
            </div>
            <DrawerFooter>
              <Button>Checkout</Button>
              <DrawerClose>Continue Shopping</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );

      expect(screen.getByText("Cart (3)")).toBeInTheDocument();
      expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
      expect(screen.getByText("Review your items")).toBeInTheDocument();
      expect(screen.getByText("Item 1 - $10.00")).toBeInTheDocument();
      expect(screen.getByText("Total: $33.00")).toBeInTheDocument();
      expect(screen.getByText("Checkout")).toBeInTheDocument();
    });

    it("renders user profile drawer correctly", () => {
      render(
        <Drawer>
          <DrawerTrigger>Profile</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>User Profile</DrawerTitle>
              <DrawerDescription>Manage your account</DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <div className="space-y-2">
                <div>Name: John Doe</div>
                <div>Email: john@example.com</div>
                <div>Member since: 2023</div>
              </div>
            </div>
            <DrawerFooter>
              <Button>Edit Profile</Button>
              <Button variant="outline">Settings</Button>
              <DrawerClose>Close</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );

      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("User Profile")).toBeInTheDocument();
      expect(screen.getByText("Name: John Doe")).toBeInTheDocument();
      expect(screen.getByText("Edit Profile")).toBeInTheDocument();
    });

    it("renders notification center drawer correctly", () => {
      render(
        <Drawer>
          <DrawerTrigger>Notifications (5)</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Notifications</DrawerTitle>
              <DrawerDescription>Recent updates</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-3">
              <div className="border-l-4 border-blue-500 pl-3">
                <div className="font-medium">New message</div>
                <div className="text-sm text-muted-foreground">2 minutes ago</div>
              </div>
              <div className="border-l-4 border-green-500 pl-3">
                <div className="font-medium">Order shipped</div>
                <div className="text-sm text-muted-foreground">1 hour ago</div>
              </div>
            </div>
            <DrawerFooter>
              <Button>Mark All Read</Button>
              <DrawerClose>Close</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );

      expect(screen.getByText("Notifications (5)")).toBeInTheDocument();
      expect(screen.getByText("New message")).toBeInTheDocument();
      expect(screen.getByText("Order shipped")).toBeInTheDocument();
      expect(screen.getByText("Mark All Read")).toBeInTheDocument();
    });
  });

  describe("Interactive Behavior", () => {
    it("handles click events on trigger", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();

      render(
        <Drawer onOpenChange={onOpenChange}>
          <DrawerTrigger>Open Drawer</DrawerTrigger>
          <DrawerContent>Content</DrawerContent>
        </Drawer>
      );

      const trigger = screen.getByTestId("drawer-trigger");
      await user.click(trigger);

      expect(trigger).toBeInTheDocument();
    });

    it("handles click events on close button", async () => {
      const user = userEvent.setup();

      render(
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>
            <DrawerClose>Close</DrawerClose>
          </DrawerContent>
        </Drawer>
      );

      const closeButton = screen.getByTestId("drawer-close");
      await user.click(closeButton);

      expect(closeButton).toBeInTheDocument();
    });

    it("supports controlled state", () => {
      const onOpenChange = vi.fn();

      render(
        <Drawer open={true} onOpenChange={onOpenChange}>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>Controlled Content</DrawerContent>
        </Drawer>
      );

      const root = screen.getByTestId("drawer-root");
      expect(root).toHaveAttribute("open", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty content gracefully", () => {
      render(
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent></DrawerContent>
        </Drawer>
      );

      expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
    });

    it("handles missing title and description", () => {
      render(
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader></DrawerHeader>
          </DrawerContent>
        </Drawer>
      );

      expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
    });

    it("handles multiple close buttons", () => {
      render(
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>
            <DrawerClose>Close 1</DrawerClose>
            <DrawerClose>Close 2</DrawerClose>
          </DrawerContent>
        </Drawer>
      );

      expect(screen.getByText("Close 1")).toBeInTheDocument();
      expect(screen.getByText("Close 2")).toBeInTheDocument();
    });

    it("handles very long content", () => {
      const longContent = "A".repeat(1000);

      render(
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>
            <div>{longContent}</div>
          </DrawerContent>
        </Drawer>
      );

      expect(screen.getByText(longContent)).toBeInTheDocument();
    });

    it("handles special characters in content", () => {
      render(
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>
            <DrawerTitle>Special: &lt;&gt;&amp;&quot;&apos;</DrawerTitle>
            <DrawerDescription>Unicode: 🎉 ñ ü ß</DrawerDescription>
          </DrawerContent>
        </Drawer>
      );

      expect(screen.getByText("Special: <>&\"'")).toBeInTheDocument();
      expect(screen.getByText("Unicode: 🎉 ñ ü ß")).toBeInTheDocument();
    });
  });

  describe("Styling and Layout", () => {
    it("includes drag handle in content", () => {
      render(
        <Drawer>
          <DrawerContent>Test Content</DrawerContent>
        </Drawer>
      );

      const content = screen.getByTestId("drawer-content");
      const dragHandle = content.querySelector(".mx-auto.mt-4.h-2.w-\\[100px\\].rounded-full.bg-muted");
      expect(dragHandle).toBeInTheDocument();
    });

    it("applies overlay styling correctly", () => {
      render(
        <Drawer>
          <DrawerContent>Content</DrawerContent>
        </Drawer>
      );

      const overlay = screen.getByTestId("drawer-overlay");
      expect(overlay).toHaveClass("fixed", "inset-0", "z-50", "bg-black/80");
    });

    it("supports custom styling through className", () => {
      render(
        <Drawer>
          <DrawerContent className="max-h-[90vh] bg-red-500">
            Custom Styled Content
          </DrawerContent>
        </Drawer>
      );

      const content = screen.getByTestId("drawer-content");
      expect(content).toHaveClass("max-h-[90vh]", "bg-red-500");
    });
  });

  describe("Component Integration", () => {
    it("works with form elements", () => {
      render(
        <Drawer>
          <DrawerTrigger>Open Form</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Contact Form</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <input type="text" placeholder="Name" />
              <textarea placeholder="Message"></textarea>
            </div>
            <DrawerFooter>
              <Button type="submit">Submit</Button>
              <DrawerClose>Cancel</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );

      expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Message")).toBeInTheDocument();
      expect(screen.getByText("Submit")).toBeInTheDocument();
    });

    it("works with complex nested content", () => {
      render(
        <Drawer>
          <DrawerTrigger>Open Complex</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Complex Content</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>Column 1</div>
                <div>Column 2</div>
              </div>
              <div className="mt-4">
                <ul>
                  <li>Item 1</li>
                  <li>Item 2</li>
                </ul>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      );

      expect(screen.getByText("Column 1")).toBeInTheDocument();
      expect(screen.getByText("Column 2")).toBeInTheDocument();
      expect(screen.getByText("Item 1")).toBeInTheDocument();
    });
  });
});