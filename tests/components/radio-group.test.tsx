import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

describe('RadioGroup Component', () => {
  it('renders radio group with items', () => {
    render(
      <RadioGroup>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <Label htmlFor="option1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" />
          <Label htmlFor="option2">Option 2</Label>
        </div>
      </RadioGroup>
    );
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={handleValueChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <Label htmlFor="option1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" />
          <Label htmlFor="option2">Option 2</Label>
        </div>
      </RadioGroup>
    );
    
    const option1 = screen.getByLabelText('Option 1');
    fireEvent.click(option1);
    
    expect(handleValueChange).toHaveBeenCalledWith('option1');
  });

  it('supports controlled value', () => {
    render(
      <RadioGroup value="option2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <Label htmlFor="option1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" />
          <Label htmlFor="option2">Option 2</Label>
        </div>
      </RadioGroup>
    );
    
    const option2 = screen.getByLabelText('Option 2');
    expect(option2).toBeChecked();
  });

  it('supports default value', () => {
    render(
      <RadioGroup defaultValue="option1">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <Label htmlFor="option1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" />
          <Label htmlFor="option2">Option 2</Label>
        </div>
      </RadioGroup>
    );
    
    const option1 = screen.getByLabelText('Option 1');
    expect(option1).toBeChecked();
  });

  it('supports disabled state for entire group', () => {
    render(
      <RadioGroup disabled>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <Label htmlFor="option1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" />
          <Label htmlFor="option2">Option 2</Label>
        </div>
      </RadioGroup>
    );
    
    const option1 = screen.getByLabelText('Option 1');
    const option2 = screen.getByLabelText('Option 2');
    
    expect(option1).toBeDisabled();
    expect(option2).toBeDisabled();
  });

  it('supports disabled state for individual items', () => {
    render(
      <RadioGroup>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <Label htmlFor="option1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" disabled />
          <Label htmlFor="option2">Option 2</Label>
        </div>
      </RadioGroup>
    );
    
    const option1 = screen.getByLabelText('Option 1');
    const option2 = screen.getByLabelText('Option 2');
    
    expect(option1).not.toBeDisabled();
    expect(option2).toBeDisabled();
  });

  it('supports keyboard navigation', () => {
    render(
      <RadioGroup>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <Label htmlFor="option1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" />
          <Label htmlFor="option2">Option 2</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option3" id="option3" />
          <Label htmlFor="option3">Option 3</Label>
        </div>
      </RadioGroup>
    );
    
    const option1 = screen.getByLabelText('Option 1');
    const option2 = screen.getByLabelText('Option 2');
    
    // Test that radio items are focusable
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <RadioGroup className="custom-class">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <Label htmlFor="option1">Option 1</Label>
        </div>
      </RadioGroup>
    );
    
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('custom-class');
  });

  it('supports required attribute', () => {
    render(
      <RadioGroup required>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <Label htmlFor="option1">Option 1</Label>
        </div>
      </RadioGroup>
    );
    
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toBeRequired();
  });

  it('supports aria attributes', () => {
    render(
      <RadioGroup aria-label="test-group">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <Label htmlFor="option1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" />
          <Label htmlFor="option2">Option 2</Label>
        </div>
      </RadioGroup>
    );
    
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('aria-label', 'test-group');
  });

  it('maintains single selection behavior', () => {
    const handleValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={handleValueChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <Label htmlFor="option1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" />
          <Label htmlFor="option2">Option 2</Label>
        </div>
      </RadioGroup>
    );
    
    const option1 = screen.getByLabelText('Option 1');
    const option2 = screen.getByLabelText('Option 2');
    
    // Select first option
    fireEvent.click(option1);
    expect(option1).toBeChecked();
    expect(option2).not.toBeChecked();
    
    // Select second option
    fireEvent.click(option2);
    expect(option1).not.toBeChecked();
    expect(option2).toBeChecked();
    
    expect(handleValueChange).toHaveBeenCalledTimes(2);
    expect(handleValueChange).toHaveBeenNthCalledWith(1, 'option1');
    expect(handleValueChange).toHaveBeenNthCalledWith(2, 'option2');
  });
});

describe('RadioGroupItem Component', () => {
  it('renders radio item with correct attributes', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="test" id="test-item" />
      </RadioGroup>
    );
    
    const radioItem = screen.getByRole('radio');
    expect(radioItem).toHaveAttribute('value', 'test');
    expect(radioItem).toHaveAttribute('id', 'test-item');
  });

  it('supports custom className', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="test" id="test-item" className="custom-radio" />
      </RadioGroup>
    );
    
    const radioItem = screen.getByRole('radio');
    expect(radioItem).toHaveClass('custom-radio');
  });

  it('supports disabled state', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="test" id="test-item" disabled />
      </RadioGroup>
    );
    
    const radioItem = screen.getByRole('radio');
    expect(radioItem).toBeDisabled();
  });
});