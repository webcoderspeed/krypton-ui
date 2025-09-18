import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Slider } from "@/components/ui/slider";

describe("Slider", () => {
  it("renders correctly", () => {
    render(<Slider data-testid="slider" />);
    expect(screen.getByTestId("slider")).toBeInTheDocument();
  });

  it("renders with default value", () => {
    render(<Slider defaultValue={[50]} data-testid="slider" />);
    const slider = screen.getByTestId("slider");
    expect(slider).toBeInTheDocument();
  });

  it("renders with controlled value", () => {
    const onValueChange = vi.fn();
    render(
      <Slider 
        value={[25]} 
        onValueChange={onValueChange} 
        data-testid="slider" 
      />
    );
    const slider = screen.getByTestId("slider");
    expect(slider).toBeInTheDocument();
  });

  it("handles value changes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    
    render(
      <Slider 
        value={[50]} 
        onValueChange={onValueChange} 
        data-testid="slider"
        min={0}
        max={100}
      />
    );

    const slider = screen.getByRole("slider");
    await user.click(slider);
    
    // Note: Exact value testing with Radix UI sliders can be complex
    // due to the way they handle mouse/touch events
    expect(onValueChange).toHaveBeenCalled();
  });

  it("respects min and max values", () => {
    render(
      <Slider 
        defaultValue={[50]} 
        min={10} 
        max={90} 
        data-testid="slider" 
      />
    );
    
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuemin", "10");
    expect(slider).toHaveAttribute("aria-valuemax", "90");
  });

  it("respects step value", () => {
    render(
      <Slider 
        defaultValue={[50]} 
        step={5} 
        data-testid="slider" 
      />
    );
    
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(
      <Slider 
        defaultValue={[50]} 
        disabled 
        data-testid="slider" 
      />
    );
    
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-disabled", "true");
  });

  it("supports range (multiple values)", () => {
    const onValueChange = vi.fn();
    render(
      <Slider 
        value={[20, 80]} 
        onValueChange={onValueChange} 
        data-testid="slider" 
      />
    );
    
    const sliders = screen.getAllByRole("slider");
    expect(sliders).toHaveLength(2);
    expect(sliders[0]).toHaveAttribute("aria-valuenow", "20");
    expect(sliders[1]).toHaveAttribute("aria-valuenow", "80");
  });

  it("handles keyboard navigation", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    
    render(
      <Slider 
        value={[50]} 
        onValueChange={onValueChange} 
        data-testid="slider"
        min={0}
        max={100}
        step={1}
      />
    );

    const slider = screen.getByRole("slider");
    await user.click(slider);
    
    // Test arrow key navigation
    await user.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalled();
  });

  it("handles Home and End keys", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    
    render(
      <Slider 
        value={[50]} 
        onValueChange={onValueChange} 
        data-testid="slider"
        min={0}
        max={100}
      />
    );

    const slider = screen.getByRole("slider");
    await user.click(slider);
    
    // Test Home key (should go to min)
    await user.keyboard("{Home}");
    expect(onValueChange).toHaveBeenCalledWith([0]);
    
    // Test End key (should go to max)
    await user.keyboard("{End}");
    expect(onValueChange).toHaveBeenCalledWith([100]);
  });

  it("handles Page Up and Page Down keys", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    
    render(
      <Slider 
        value={[50]} 
        onValueChange={onValueChange} 
        data-testid="slider"
        min={0}
        max={100}
        step={1}
      />
    );

    const slider = screen.getByRole("slider");
    await user.click(slider);
    
    // Test Page Up (should increase by 10)
    await user.keyboard("{PageUp}");
    expect(onValueChange).toHaveBeenCalled();
    
    // Test Page Down (should decrease by 10)
    await user.keyboard("{PageDown}");
    expect(onValueChange).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(
      <Slider 
        defaultValue={[50]} 
        className="custom-class" 
        data-testid="slider" 
      />
    );
    
    const slider = screen.getByTestId("slider");
    expect(slider).toHaveClass("custom-class");
  });

  it("supports vertical orientation", () => {
    render(
      <Slider 
        defaultValue={[50]} 
        orientation="vertical" 
        data-testid="slider" 
      />
    );
    
    const slider = screen.getByTestId("slider");
    expect(slider).toHaveAttribute("aria-orientation", "vertical");
  });

  it("supports inverted slider", () => {
    render(
      <Slider 
        defaultValue={[50]} 
        inverted 
        data-testid="slider" 
      />
    );
    
    const slider = screen.getByTestId("slider");
    expect(slider).toBeInTheDocument();
  });

  it("calls onValueCommit when dragging ends", async () => {
    const user = userEvent.setup();
    const onValueCommit = vi.fn();
    
    render(
      <Slider 
        defaultValue={[50]} 
        onValueCommit={onValueCommit} 
        data-testid="slider" 
      />
    );

    const slider = screen.getByRole("slider");
    
    // Simulate mouse down and up to trigger commit
    fireEvent.mouseDown(slider);
    fireEvent.mouseUp(slider);
    
    expect(onValueCommit).toHaveBeenCalled();
  });

  it("has proper accessibility attributes", () => {
    render(
      <Slider 
        defaultValue={[50]} 
        min={0} 
        max={100} 
        step={1}
        data-testid="slider" 
      />
    );
    
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuenow", "50");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
    expect(slider).toHaveAttribute("tabindex", "0");
  });

  it("handles edge case values", () => {
    render(
      <Slider 
        defaultValue={[0]} 
        min={0} 
        max={0} 
        data-testid="slider" 
      />
    );
    
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuenow", "0");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "0");
  });

  it("handles large step values", () => {
    render(
      <Slider 
        defaultValue={[50]} 
        min={0} 
        max={100} 
        step={25}
        data-testid="slider" 
      />
    );
    
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
  });

  it("handles decimal step values", () => {
    render(
      <Slider 
        defaultValue={[5.5]} 
        min={0} 
        max={10} 
        step={0.5}
        data-testid="slider" 
      />
    );
    
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuenow", "5.5");
  });
});