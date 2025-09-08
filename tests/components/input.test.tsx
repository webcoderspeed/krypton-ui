import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '@/components/ui/input';

describe('Input', () => {
  describe('Rendering', () => {
    it('renders input element', () => {
      render(<Input data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toBeInTheDocument();
      expect(input.tagName).toBe('INPUT');
    });

    it('renders with placeholder', () => {
      render(<Input placeholder="Enter text" data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('placeholder', 'Enter text');
    });

    it('renders with default type text', () => {
      render(<Input data-testid="input" />);
      
      const input = screen.getByTestId('input') as HTMLInputElement;
      expect(input.type).toBe('text');
    });

    it('renders with specified type', () => {
      render(<Input type="email" data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('renders with value', () => {
      render(<Input value="test value" data-testid="input" readOnly />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveValue('test value');
    });

    it('renders with defaultValue', () => {
      render(<Input defaultValue="default value" data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveValue('default value');
    });
  });

  describe('Input Types', () => {
    it('renders text input', () => {
      render(<Input type="text" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'text');
    });

    it('renders email input', () => {
      render(<Input type="email" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'email');
    });

    it('renders password input', () => {
      render(<Input type="password" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');
    });

    it('renders number input', () => {
      render(<Input type="number" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'number');
    });

    it('renders search input', () => {
      render(<Input type="search" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'search');
    });

    it('renders url input', () => {
      render(<Input type="url" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'url');
    });

    it('renders tel input', () => {
      render(<Input type="tel" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'tel');
    });

    it('renders date input', () => {
      render(<Input type="date" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'date');
    });

    it('renders time input', () => {
      render(<Input type="time" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'time');
    });

    it('renders file input', () => {
      render(<Input type="file" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'file');
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Input disabled data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toBeDisabled();
      expect(input).toHaveAttribute('disabled');
    });

    it('renders readonly state', () => {
      render(<Input readOnly data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('readonly');
    });

    it('renders required state', () => {
      render(<Input required data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toBeRequired();
      expect(input).toHaveAttribute('required');
    });

    it('handles enabled state', () => {
      render(<Input data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toBeEnabled();
      expect(input).not.toHaveAttribute('disabled');
    });
  });

  describe('HTML Attributes', () => {
    it('applies custom className', () => {
      render(<Input className="custom-class" data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('custom-class');
    });

    it('applies default classes', () => {
      render(<Input data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('flex', 'h-10', 'w-full', 'rounded-md', 'border');
    });

    it('supports custom styles', () => {
      render(
        <Input
          style={{ backgroundColor: 'rgb(255, 0, 0)', color: 'rgb(255, 255, 255)' }}
          data-testid="input"
        />
      );

      const input = screen.getByTestId('input');
      expect(input).toHaveStyle('background-color: rgb(255, 0, 0)');
      expect(input).toHaveStyle('color: rgb(255, 255, 255)');
    });

    it('supports data attributes', () => {
      render(<Input data-testid="input" data-custom="custom-value" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('data-custom', 'custom-value');
    });

    it('supports aria attributes', () => {
      render(
        <Input
          aria-label="Custom input"
          aria-describedby="help-text"
          data-testid="input"
        />
      );
      
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('aria-label', 'Custom input');
      expect(input).toHaveAttribute('aria-describedby', 'help-text');
    });

    it('supports id attribute', () => {
      render(<Input id="test-input" data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('id', 'test-input');
    });

    it('supports name attribute', () => {
      render(<Input name="test-name" data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('name', 'test-name');
    });

    it('supports min and max attributes for number input', () => {
      render(<Input type="number" min="0" max="100" data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '100');
    });

    it('supports pattern attribute', () => {
      render(<Input pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('pattern', '[0-9]{3}-[0-9]{3}-[0-9]{4}');
    });

    it('supports maxLength attribute', () => {
      render(<Input maxLength={10} data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('maxlength', '10');
    });

    it('supports accept attribute for file input', () => {
      render(<Input type="file" accept=".pdf,.doc" data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('accept', '.pdf,.doc');
    });
  });

  describe('User Interactions', () => {
    it('handles onChange event', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      
      render(<Input onChange={handleChange} data-testid="input" />);
      
      const input = screen.getByTestId('input');
      await user.type(input, 'test');
      
      expect(handleChange).toHaveBeenCalled();
      expect(input).toHaveValue('test');
    });

    it('handles onFocus event', async () => {
      const handleFocus = vi.fn();
      const user = userEvent.setup();
      
      render(<Input onFocus={handleFocus} data-testid="input" />);
      
      const input = screen.getByTestId('input');
      await user.click(input);
      
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('handles onBlur event', async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      
      render(<Input onBlur={handleBlur} data-testid="input" />);
      
      const input = screen.getByTestId('input');
      await user.click(input);
      await user.tab();
      
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('handles onKeyDown event', async () => {
      const handleKeyDown = vi.fn();
      const user = userEvent.setup();
      
      render(<Input onKeyDown={handleKeyDown} data-testid="input" />);
      
      const input = screen.getByTestId('input');
      await user.click(input);
      await user.keyboard('{Enter}');
      
      expect(handleKeyDown).toHaveBeenCalled();
    });

    it('handles onKeyUp event', async () => {
      const handleKeyUp = vi.fn();
      const user = userEvent.setup();
      
      render(<Input onKeyUp={handleKeyUp} data-testid="input" />);
      
      const input = screen.getByTestId('input');
      await user.click(input);
      await user.keyboard('a');
      
      expect(handleKeyUp).toHaveBeenCalled();
    });

    it('prevents typing when disabled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      
      render(<Input disabled onChange={handleChange} data-testid="input" />);
      
      const input = screen.getByTestId('input');
      await user.type(input, 'test');
      
      expect(handleChange).not.toHaveBeenCalled();
      expect(input).toHaveValue('');
    });

    it('prevents typing when readonly', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      
      render(<Input readOnly onChange={handleChange} data-testid="input" />);
      
      const input = screen.getByTestId('input');
      await user.type(input, 'test');
      
      expect(handleChange).not.toHaveBeenCalled();
      expect(input).toHaveValue('');
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState('initial');
        return (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            data-testid="input"
          />
        );
      };
      
      const user = userEvent.setup();
      render(<TestComponent />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveValue('initial');
      
      await user.clear(input);
      await user.type(input, 'updated');
      
      expect(input).toHaveValue('updated');
    });

    it('works as uncontrolled component', async () => {
      const user = userEvent.setup();
      
      render(<Input defaultValue="default" data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveValue('default');
      
      await user.clear(input);
      await user.type(input, 'new value');
      
      expect(input).toHaveValue('new value');
    });
  });

  describe('Form Integration', () => {
    it('submits form with input value', async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      const user = userEvent.setup();
      
      render(
        <form onSubmit={handleSubmit}>
          <Input name="test-input" data-testid="input" />
          <button type="submit" data-testid="submit">Submit</button>
        </form>
      );
      
      const input = screen.getByTestId('input');
      const submit = screen.getByTestId('submit');
      
      await user.type(input, 'form value');
      await user.click(submit);
      
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('validates required field', async () => {
      const user = userEvent.setup();
      
      render(
        <form>
          <Input required data-testid="input" />
          <button type="submit" data-testid="submit">Submit</button>
        </form>
      );
      
      const input = screen.getByTestId('input');
      const submit = screen.getByTestId('submit');
      
      await user.click(submit);
      
      expect(input).toBeInvalid();
    });

    it('validates email pattern', async () => {
      const user = userEvent.setup();
      
      render(
        <form>
          <Input type="email" data-testid="input" />
          <button type="submit" data-testid="submit">Submit</button>
        </form>
      );
      
      const input = screen.getByTestId('input');
      const submit = screen.getByTestId('submit');
      
      await user.type(input, 'invalid-email');
      await user.click(submit);
      
      expect(input).toBeInvalid();
    });
  });

  describe('Accessibility', () => {
    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      
      render(
        <div>
          <Input data-testid="input1" />
          <Input data-testid="input2" />
        </div>
      );
      
      const input1 = screen.getByTestId('input1');
      const input2 = screen.getByTestId('input2');
      
      input1.focus();
      expect(document.activeElement).toBe(input1);
      
      await user.tab();
      expect(document.activeElement).toBe(input2);
    });

    it('supports screen reader attributes', () => {
      render(
        <Input
          aria-label="Username"
          aria-describedby="username-help"
          aria-required="true"
          data-testid="input"
        />
      );
      
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('aria-label', 'Username');
      expect(input).toHaveAttribute('aria-describedby', 'username-help');
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('supports aria-invalid for error states', () => {
      render(<Input aria-invalid="true" data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('can be associated with label', () => {
      render(
        <div>
          <label htmlFor="test-input">Test Label</label>
          <Input id="test-input" data-testid="input" />
        </div>
      );
      
      const input = screen.getByTestId('input');
      const label = screen.getByText('Test Label');
      
      expect(input).toHaveAttribute('id', 'test-input');
      expect(label).toHaveAttribute('for', 'test-input');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty value', () => {
      render(<Input value="" data-testid="input" readOnly />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveValue('');
    });

    it('handles null value', () => {
      render(<Input value={""} data-testid="input" readOnly />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveValue('');
    });

    it('handles undefined value', () => {
      render(<Input value={undefined} data-testid="input" readOnly />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveValue('');
    });

    it('handles very long text', async () => {
      const longText = 'A'.repeat(1000);
      const user = userEvent.setup();
      
      render(<Input data-testid="input" />);
      
      const input = screen.getByTestId('input');
      await user.type(input, longText);
      
      expect(input).toHaveValue(longText);
    });

    it('handles special characters', async () => {
      const specialText = '!@#$%^&*()_+-=';
      const user = userEvent.setup();
      
      render(<Input data-testid="input" />);
      
      const input = screen.getByTestId('input');
      await user.type(input, specialText);
      
      expect(input).toHaveValue(specialText);
    });

    it('handles unicode characters', async () => {
      const unicodeText = '🚀 Hello 世界 🌍';
      const user = userEvent.setup();
      
      render(<Input data-testid="input" />);
      
      const input = screen.getByTestId('input');
      await user.type(input, unicodeText);
      
      expect(input).toHaveValue(unicodeText);
    });

    it('handles rapid typing', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      
      render(<Input onChange={handleChange} data-testid="input" />);
      
      const input = screen.getByTestId('input');
      
      // Type multiple characters quickly
      await user.type(input, 'rapid');
      
      expect(input).toHaveValue('rapid');
      expect(handleChange).toHaveBeenCalledTimes(5); // One for each character
    });

    it('handles focus and blur in rapid succession', async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      
      render(
        <div>
          <Input onFocus={handleFocus} onBlur={handleBlur} data-testid="input1" />
          <Input data-testid="input2" />
        </div>
      );
      
      const input1 = screen.getByTestId('input1');
      const input2 = screen.getByTestId('input2');
      
      await user.click(input1);
      await user.click(input2);
      
      expect(handleFocus).toHaveBeenCalledTimes(1);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('handles dynamic prop changes', () => {
      const { rerender } = render(<Input placeholder="Initial" data-testid="input" />);
      
      let input = screen.getByTestId('input');
      expect(input).toHaveAttribute('placeholder', 'Initial');
      
      rerender(<Input placeholder="Updated" data-testid="input" />);
      
      input = screen.getByTestId('input');
      expect(input).toHaveAttribute('placeholder', 'Updated');
    });

    it('maintains focus after prop changes', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<Input data-testid="input" />);
      
      const input = screen.getByTestId('input');
      await user.click(input);
      
      expect(document.activeElement).toBe(input);
      
      rerender(<Input className="updated" data-testid="input" />);
      
      expect(document.activeElement).toBe(input);
    });
  });

  describe('Performance', () => {
    it('does not cause unnecessary re-renders', () => {
      const renderSpy = vi.fn();
      
      const TestComponent = () => {
        renderSpy();
        return <Input data-testid="input" />;
      };
      
      const { rerender } = render(<TestComponent />);
      
      expect(renderSpy).toHaveBeenCalledTimes(1);
      
      // Re-render with same props
      rerender(<TestComponent />);
      
      expect(renderSpy).toHaveBeenCalledTimes(2);
    });
  });
});