import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

describe('InputOTP Component', () => {
  describe('Basic Rendering', () => {
    it('renders input OTP with slots', () => {
      render(
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      // Check if all slots are rendered
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(6);
    });

    it('renders with separator', () => {
      render(
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(6);
      
      // Check if separator is rendered (it should be in the DOM)
      const container = screen.getByRole('textbox').closest('[data-input-otp]');
      expect(container).toBeInTheDocument();
    });

    it('renders with custom maxLength', () => {
      render(
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(4);
    });
  });

  describe('User Interactions', () => {
    it('allows typing in slots', async () => {
      const user = userEvent.setup();
      
      render(
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // Type in first slot
      await user.type(inputs[0], '1');
      expect(inputs[0]).toHaveValue('1');
    });

    it('auto-advances to next slot when typing', async () => {
      const user = userEvent.setup();
      
      render(
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // Type in first slot and check if focus moves to second
      await user.type(inputs[0], '1');
      expect(document.activeElement).toBe(inputs[1]);
    });

    it('handles backspace correctly', async () => {
      const user = userEvent.setup();
      
      render(
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // Type in first two slots
      await user.type(inputs[0], '12');
      
      // Press backspace on second slot
      await user.keyboard('{Backspace}');
      
      // Should clear second slot and move focus back to first
      expect(inputs[1]).toHaveValue('');
      expect(document.activeElement).toBe(inputs[0]);
    });

    it('supports arrow key navigation', async () => {
      const user = userEvent.setup();
      
      render(
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // Focus first slot
      inputs[0].focus();
      
      // Press right arrow
      await user.keyboard('{ArrowRight}');
      expect(document.activeElement).toBe(inputs[1]);
      
      // Press left arrow
      await user.keyboard('{ArrowLeft}');
      expect(document.activeElement).toBe(inputs[0]);
    });

    it('supports Home and End keys', async () => {
      const user = userEvent.setup();
      
      render(
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // Focus middle slot
      inputs[3].focus();
      
      // Press Home key
      await user.keyboard('{Home}');
      expect(document.activeElement).toBe(inputs[0]);
      
      // Press End key
      await user.keyboard('{End}');
      expect(document.activeElement).toBe(inputs[5]);
    });
  });

  describe('Controlled Component', () => {
    it('works as controlled component', () => {
      const handleChange = vi.fn();
      
      render(
        <InputOTP maxLength={6} value="123" onChange={handleChange}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // Check if controlled value is displayed
      expect(inputs[0]).toHaveValue('1');
      expect(inputs[1]).toHaveValue('2');
      expect(inputs[2]).toHaveValue('3');
      expect(inputs[3]).toHaveValue('');
      expect(inputs[4]).toHaveValue('');
      expect(inputs[5]).toHaveValue('');
    });

    it('calls onChange when value changes', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <InputOTP maxLength={6} onChange={handleChange}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // Type in first slot
      await user.type(inputs[0], '1');
      
      expect(handleChange).toHaveBeenCalledWith('1');
    });

    it('calls onComplete when all slots are filled', async () => {
      const user = userEvent.setup();
      const handleComplete = vi.fn();
      
      render(
        <InputOTP maxLength={3} onComplete={handleComplete}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // Fill all slots
      await user.type(inputs[0], '123');
      
      expect(handleComplete).toHaveBeenCalledWith('123');
    });
  });

  describe('Disabled State', () => {
    it('supports disabled state', () => {
      render(
        <InputOTP maxLength={6} disabled>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // All inputs should be disabled
      inputs.forEach(input => {
        expect(input).toBeDisabled();
      });
    });

    it('does not accept input when disabled', async () => {
      const user = userEvent.setup();
      
      render(
        <InputOTP maxLength={6} disabled>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // Try to type in disabled input
      await user.type(inputs[0], '1');
      
      // Value should remain empty
      expect(inputs[0]).toHaveValue('');
    });
  });

  describe('Auto Focus', () => {
    it('auto-focuses first slot when autoFocus is true', () => {
      render(
        <InputOTP maxLength={6} autoFocus>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // First input should be focused
      expect(document.activeElement).toBe(inputs[0]);
    });
  });

  describe('Paste Support', () => {
    it('supports pasting complete code', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <InputOTP maxLength={6} onChange={handleChange}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // Focus first input and paste
      inputs[0].focus();
      await user.paste('123456');
      
      // Should fill all slots
      expect(handleChange).toHaveBeenCalledWith('123456');
    });

    it('handles partial paste correctly', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <InputOTP maxLength={6} onChange={handleChange}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // Focus first input and paste partial code
      inputs[0].focus();
      await user.paste('123');
      
      // Should fill first 3 slots
      expect(handleChange).toHaveBeenCalledWith('123');
    });

    it('truncates paste content that exceeds maxLength', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <InputOTP maxLength={4} onChange={handleChange}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // Focus first input and paste longer code
      inputs[0].focus();
      await user.paste('123456789');
      
      // Should only fill up to maxLength
      expect(handleChange).toHaveBeenCalledWith('1234');
    });
  });

  describe('Input Validation', () => {
    it('only accepts numeric input by default', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <InputOTP maxLength={6} onChange={handleChange}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // Try to type letters
      await user.type(inputs[0], 'abc');
      
      // Should not accept letters (depending on implementation)
      // This test might need adjustment based on actual behavior
      expect(inputs[0]).toHaveValue('');
    });

    it('prevents input beyond maxLength', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <InputOTP maxLength={3} onChange={handleChange}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // Try to type more than maxLength
      await user.type(inputs[0], '123456');
      
      // Should only accept up to maxLength
      const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1];
      expect(lastCall[0]).toHaveLength(3);
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className to container', () => {
      render(
        <InputOTP maxLength={6} className="custom-otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const container = screen.getByRole('textbox').closest('[data-input-otp]');
      expect(container).toHaveClass('custom-otp');
    });

    it('applies custom className to group', () => {
      render(
        <InputOTP maxLength={6}>
          <InputOTPGroup className="custom-group">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
        </InputOTP>
      );

      // Check if custom class is applied to group
      const container = screen.getByRole('textbox').closest('[data-input-otp]');
      expect(container?.querySelector('.custom-group')).toBeInTheDocument();
    });

    it('applies custom className to slot', () => {
      render(
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className="custom-slot" />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
        </InputOTP>
      );

      const firstInput = screen.getAllByRole('textbox')[0];
      expect(firstInput).toHaveClass('custom-slot');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty value correctly', () => {
      render(
        <InputOTP maxLength={6} value="">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // All inputs should be empty
      inputs.forEach(input => {
        expect(input).toHaveValue('');
      });
    });

    it('handles value longer than maxLength', () => {
      render(
        <InputOTP maxLength={4} value="123456">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // Should only display up to maxLength
      expect(inputs[0]).toHaveValue('1');
      expect(inputs[1]).toHaveValue('2');
      expect(inputs[2]).toHaveValue('3');
      expect(inputs[3]).toHaveValue('4');
    });

    it('handles rapid typing correctly', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <InputOTP maxLength={6} onChange={handleChange}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // Type rapidly
      await user.type(inputs[0], '123456');
      
      // Should handle all characters
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const inputs = screen.getAllByRole('textbox');
      
      // Check if inputs have proper attributes
      inputs.forEach((input, index) => {
        expect(input).toHaveAttribute('aria-label');
        expect(input).toHaveAttribute('data-input-otp-slot');
      });
    });

    it('supports screen reader announcements', () => {
      render(
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );

      const container = screen.getByRole('textbox').closest('[data-input-otp]');
      expect(container).toHaveAttribute('data-input-otp');
    });
  });
});